const apiKey = 'e18239cf61ae28112e6796fc0b8b993b'; // Remplace par ta vraie clé AudD

async function recognizeMusic(audioData) {
  const formData = new FormData();
  formData.append('api_token', apiKey);
  formData.append('file', audioData);
  formData.append('return', 'spotify');

  const loader = document.getElementById('loader');
  const resultDiv = document.getElementById('result');
  const spotifyPlayer = document.getElementById('spotifyPlayer');

  loader.style.display = 'block';
  resultDiv.style.display = 'none';
  spotifyPlayer.innerHTML = '';

  try {
    const response = await fetch('https://api.audd.io/', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();
    console.log('%c🎧 Résultat AudD complet :', 'color: #1DB954; font-weight: bold;', result);

    loader.style.display = 'none';

    if (result.status === 'success' && result.result) {
      const song = result.result;
      const titre = song.title || 'Titre inconnu';
      const artiste = song.artist || 'Artiste inconnu';

      resultDiv.style.display = 'block';
      document.getElementById('songTitle').innerText = song.title || 'Titre inconnu';
      document.getElementById('songArtist').innerText = song.artist || 'Artiste inconnu';
      document.getElementById('albumCover').src = song.album?.cover || 'https://via.placeholder.com/200?text=No+Cover';
      document.getElementById('songTitle').innerText = titre;
      document.getElementById('songArtist').innerText = artiste;

      // Envoie vers le serveur
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
        spotifyPlayer.innerHTML = `<p class="text-gray-400">🔍 Aucun lien Spotify disponible pour ce morceau.</p>`;
      }

      spotifyPlayer.style.display = 'block';
    } else {
      alert('🎵 Musique non reconnue. Essaie avec un autre extrait.');
    }

  } catch (error) {
    console.error('❌ Erreur API AudD :', error);
    loader.style.display = 'none';
    alert('Erreur pendant la reconnaissance audio.');
  }
}

document.getElementById('fileButton').addEventListener('click', () => {
  document.getElementById('audioInput').click();
});

document.getElementById('audioInput').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    recognizeMusic(file);
  }
});

document.getElementById('micButton').addEventListener('click', () => {
  recordFromMic();
});

function recordFromMic() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    alert('Ton navigateur ne supporte pas l\'enregistrement audio.');
    return;
  }

  navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
    const mediaRecorder = new MediaRecorder(stream);
    const chunks = [];

    mediaRecorder.ondataavailable = e => {
      if (e.data.size > 0) {
        chunks.push(e.data);
      }
    };

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

    setTimeout(() => {
      mediaRecorder.stop();
      stream.getTracks().forEach(track => track.stop());
    }, 8000);
  }).catch(err => {
    console.error('Erreur micro :', err);
    alert('Erreur pour accéder au micro.');
  });
}

function audioBufferToWav(buffer) {
  const numOfChan = buffer.numberOfChannels;
  const length = buffer.length * numOfChan * 2 + 44;
  const bufferArray = new ArrayBuffer(length);
  const view = new DataView(bufferArray);
  const channels = [];
  let offset = 0;

  function writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

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

  offset = 44;
  for (let i = 0; i < numOfChan; i++) {
    channels.push(buffer.getChannelData(i));
  }

  for (let i = 0; i < buffer.length; i++) {
    for (let chan = 0; chan < numOfChan; chan++) {
      const sample = Math.max(-1, Math.min(1, channels[chan][i]));
      view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
      offset += 2;
    }
  }

  return new Blob([view], { type: 'audio/wav' });
}