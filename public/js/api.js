const apiKey = '8107943458cdc09ce78652f07741ba5d'; // Clé API AudD

// Fonction principale pour reconnaître la musique à partir d'un fichier audio (Blob)
async function recognizeMusic(audioData) {
  const formData = new FormData();
  formData.append('api_token', apiKey); // Ajoute la clé API AudD
  formData.append('file', audioData); // Ajoute le fichier audio à analyser
  formData.append('return', 'spotify'); // Demande les infos Spotify dans la réponse

  // Récupère les éléments d'UI pour afficher le résultat et le loader
  const loader = document.getElementById('loader');
  const resultDiv = document.getElementById('result');
  const spotifyPlayer = document.getElementById('spotifyPlayer');

  loader.style.display = 'block'; // Affiche le loader pendant la requête
  resultDiv.style.display = 'none'; // Cache le résultat précédent
  spotifyPlayer.innerHTML = ''; // Vide le lecteur Spotify

  try {
    // Envoie la requête à l'API AudD
    const response = await fetch('https://api.audd.io/', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();
    console.log('%c🎧 Résultat AudD complet :', 'color: #1DB954; font-weight: bold;', result);

    loader.style.display = 'none'; // Cache le loader après la réponse

    // Si la reconnaissance a réussi et qu'une chanson a été trouvée
    if (result.status === 'success' && result.result) {
      const song = result.result;
      const titre = song.title || 'Titre inconnu';
      const artiste = song.artist || 'Artiste inconnu';

      // Affiche les informations de la chanson reconnue
      resultDiv.style.display = 'block';
      document.getElementById('songTitle').innerText = song.title || 'Titre inconnu';
      document.getElementById('songArtist').innerText = song.artist || 'Artiste inconnu';
      document.getElementById('albumCover').src = song.album?.cover || 'https://via.placeholder.com/200?text=No+Cover';
      document.getElementById('songTitle').innerText = titre;
      document.getElementById('songArtist').innerText = artiste;

      // Envoie les infos au serveur pour ajouter à l'historique utilisateur
      fetch('/api/ajouter_historique', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          titre: titre,
          artiste: artiste
        })
      }).then(res => res.json())
        .then(data => {
          console.log('✅ Historique ajouté :', data);
        }).catch(err => {
          console.error('❌ Erreur lors de l’envoi au serveur :', err);
        });

      // Si un lien Spotify est disponible, affiche le lecteur intégré
      if (song.spotify?.external_urls?.spotify) {
        const spotifyUrl = song.spotify.external_urls.spotify;
        const embedUrl = spotifyUrl.replace('/track/', '/embed/track/');

        spotifyPlayer.innerHTML = `
            <iframe 
              src="${embedUrl}" 
              allowtransparency="true" 
              allow="encrypted-media"
              loading="lazy"
              class="rounded-xl w-full max-w-xs h-[380px] mx-auto">
            </iframe>
          `;
      } else {
        // Sinon, affiche un message d'absence de lien Spotify
        spotifyPlayer.innerHTML = `<p class="text-gray-400">🔍 Aucun lien Spotify disponible pour ce morceau.</p>`;
      }

      spotifyPlayer.style.display = 'block';
    } else {
      alert('🎵 Musique non reconnue. Essaie avec un autre extrait.');
    }

  } catch (error) {
    // Gestion des erreurs réseau ou API
    console.error('❌ Erreur API AudD :', error);
    loader.style.display = 'none';
    alert('Erreur pendant la reconnaissance audio.');
  }
}

// Gestion du bouton pour sélectionner un fichier audio
document.getElementById('fileButton').addEventListener('click', () => {
  document.getElementById('audioInput').click();
});

// Quand un fichier audio est sélectionné, lance la reconnaissance
document.getElementById('audioInput').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    recognizeMusic(file);
  }
});

// Gestion du bouton micro pour lancer l'enregistrement
document.getElementById('micButton').addEventListener('click', () => {
  recordFromMic();
});

// Fonction pour enregistrer l'audio depuis le micro de l'utilisateur
function recordFromMic() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    alert('Ton navigateur ne supporte pas l\'enregistrement audio.');
    return;
  }

  navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
    const mediaRecorder = new MediaRecorder(stream);
    const chunks = [];

    // Stocke les morceaux d'audio enregistrés
    mediaRecorder.ondataavailable = e => {
      if (e.data.size > 0) {
        chunks.push(e.data);
      }
    };

    // Quand l'enregistrement est terminé, convertit en WAV et lance la reconnaissance
    mediaRecorder.onstop = async () => {
      const webmBlob = new Blob(chunks, { type: 'audio/webm' });
      const arrayBuffer = await webmBlob.arrayBuffer();

      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
      const wavBlob = audioBufferToWav(audioBuffer);

      const audio = document.getElementById('recordedAudio');
      audio.src = URL.createObjectURL(wavBlob);
      audio.style.display = 'block';

      recognizeMusic(wavBlob);
    };

    mediaRecorder.start();
    alert('🎤 Enregistrement en cours... Patiente 8 secondes.');

    // Arrête l'enregistrement après 8 secondes
    setTimeout(() => {
      mediaRecorder.stop();
      stream.getTracks().forEach(track => track.stop());
    }, 8000);
  }).catch(err => {
    console.error('Erreur micro :', err);
    alert('Erreur pour accéder au micro.');
  });
}

// Convertit un AudioBuffer en fichier WAV (Blob) pour l'envoyer à l'API AudD
function audioBufferToWav(buffer) {
  const numOfChan = buffer.numberOfChannels;
  const length = buffer.length * numOfChan * 2 + 44;
  const bufferArray = new ArrayBuffer(length);
  const view = new DataView(bufferArray);
  const channels = [];
  let offset = 0;

  // Fonction utilitaire pour écrire une chaîne dans le DataView
  function writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  // Écrit l'entête WAV
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + buffer.length * numOfChan * 2, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numOfChan, true);
  view.setUint32(24, buffer.sampleRate, true);
  view.setUint32(28, buffer.sampleRate * 4, true);
  view.setUint16(32, numOfChan * 2, true);
  view.setUint16(34, 16, true);
  writeString(view, 36, 'data');
  view.setUint32(40, buffer.length * numOfChan * 2, true);

  // Récupère les données audio de chaque canal
  offset = 44;
  for (let i = 0; i < numOfChan; i++) {
    channels.push(buffer.getChannelData(i));
  }

  // Écrit les échantillons audio dans le DataView (PCM 16 bits)
  for (let i = 0; i < buffer.length; i++) {
    for (let chan = 0; chan < numOfChan; chan++) {
      const sample = Math.max(-1, Math.min(1, channels[chan][i]));
      view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
      offset += 2;
    }
  }

  // Retourne le Blob WAV prêt à être envoyé à l'API
  return new Blob([view], { type: 'audio/wav' });
}
