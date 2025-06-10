const client_id = '6a6bec6c'; // Clé API Jamendo

// Récupération des éléments du DOM pour l'UI du lecteur et de la recherche
const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('results');
const audioPlayer = document.getElementById('audioPlayer');
const playerContainer = document.getElementById('playerContainer');
const currentTrackLabel = document.getElementById('currentTrack');
const repeatBtn = document.getElementById('repeatBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const normalBtn = document.getElementById('normalBtn');

let currentPlaylist = []; // Liste des morceaux actuellement affichés
let currentIndex = 0; // Index du morceau en cours de lecture
let mode = 'normal'; // Mode de lecture : normal, repeat ou shuffle

// Recherche dynamique de morceaux sur Jamendo à chaque saisie utilisateur
searchInput.addEventListener('input', async () => {
    const query = searchInput.value.trim();
    if (query.length < 3) {
        resultsContainer.innerHTML = '';
        return;
    }

    // Appel à l'API Jamendo pour récupérer les morceaux correspondant à la recherche
    const response = await fetch(
        `https://api.jamendo.com/v3.0/tracks/?client_id=${client_id}&format=json&limit=10&namesearch=${encodeURIComponent(query)}&include=musicinfo`
    );
    const data = await response.json();
    currentPlaylist = data.results;
    currentIndex = 0;

    resultsContainer.innerHTML = '';
    if (data.results.length === 0) {
        resultsContainer.innerHTML = '<p class="text-gray-400">Aucun résultat trouvé.</p>';
        return;
    }

    // Affiche chaque résultat sous forme de carte avec lecture et téléchargement
    data.results.forEach((track, index) => {
        const trackCard = document.createElement('div');
        trackCard.className = 'bg-gray-800 p-4 rounded shadow flex items-center justify-between hover:bg-gray-700 transition';

        // Partie gauche : infos du morceau, clic pour lecture
        const left = document.createElement('div');
        left.className = 'cursor-pointer';
        left.innerHTML = `
          <h3 class="text-lg font-semibold text-green-400">${track.name}</h3>
          <p class="text-sm text-gray-300">${track.artist_name}</p>
        `;
        left.addEventListener('click', () => {
            playTrack(index);
        });

        // Partie droite : bouton de téléchargement
        const right = document.createElement('div');
        right.innerHTML = `
          <a href="${track.audio}" download class="text-sm bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded">
            📥 Télécharger
          </a>
        `;

        trackCard.appendChild(left);
        trackCard.appendChild(right);
        resultsContainer.appendChild(trackCard);
    });
});

// Fonction pour lancer la lecture d'un morceau sélectionné
function playTrack(index) {
    const track = currentPlaylist[index];
    if (!track) return;

    currentIndex = index;
    audioPlayer.src = track.audio;
    audioPlayer.play();
    currentTrackLabel.textContent = `Lecture en cours : ${track.name} - ${track.artist_name}`;
    playerContainer.classList.remove('hidden');
}

// Gestion de la fin de lecture selon le mode choisi
audioPlayer.addEventListener('ended', () => {
    if (mode === 'repeat') {
        audioPlayer.currentTime = 0;
        audioPlayer.play();
    } else if (mode === 'shuffle') {
        const randomIndex = Math.floor(Math.random() * currentPlaylist.length);
        playTrack(randomIndex);
    } else if (mode === 'normal' && currentIndex < currentPlaylist.length - 1) {
        playTrack(currentIndex + 1);
    }
});

// Gestion des boutons de mode de lecture
repeatBtn.addEventListener('click', () => {
    mode = 'repeat';
    updateModeUI();
});

shuffleBtn.addEventListener('click', () => {
    mode = 'shuffle';
    updateModeUI();
});

normalBtn.addEventListener('click', () => {
    mode = 'normal';
    updateModeUI();
});

// Met à jour l'affichage des boutons selon le mode actif
function updateModeUI() {
    repeatBtn.classList.toggle('bg-green-600', mode === 'repeat');
    shuffleBtn.classList.toggle('bg-green-600', mode === 'shuffle');
    normalBtn.classList.toggle('bg-green-600', mode === 'normal');
}

// Gestion du menu burger pour la navigation mobile
const menuBtn = document.getElementById('menuBtn');
const menuDropdown = document.getElementById('menuDropdown');

menuBtn.addEventListener('click', () => {
    menuDropdown.classList.toggle('hidden');
});

// Ferme le menu burger si clic en dehors
document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !menuDropdown.contains(e.target)) {
        menuDropdown.classList.add('hidden');
    }
});
