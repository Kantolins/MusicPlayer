%# Page de reconnaissance musicale (API AudD)
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>Reconnaissance Musicale</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" crossorigin="anonymous" />
  <link rel="shortcut icon" href="/public/image/ChatGPT Image 9 mai 2025, 10_26_52.png" type="image/x-icon">
  <style>
    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 #1DB954; }
      70% { box-shadow: 0 0 0 10px transparent; }
      100% { box-shadow: 0 0 0 0 transparent; }
    }

    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    /* Background animation */
    .animated-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      z-index: -1;
    }

    .circle {
      position: absolute;
      border-radius: 50%;
      background: rgba(29, 185, 84, 0.3); /* Green with transparency */
      filter: blur(50px);
      animation: move 10s infinite ease-in-out;
    }

    .circle:nth-child(1) {
      width: 200px;
      height: 200px;
      top: 10%;
      left: 20%;
      animation-delay: 0s;
    }

    .circle:nth-child(2) {
      width: 300px;
      height: 300px;
      top: 50%;
      left: 70%;
      animation-delay: 2s;
    }

    .circle:nth-child(3) {
      width: 150px;
      height: 150px;
      top: 80%;
      left: 30%;
      animation-delay: 4s;
    }

    @keyframes move {
      0% {
        transform: translateY(0) translateX(0);
      }
      50% {
        transform: translateY(-20px) translateX(20px);
      }
      100% {
        transform: translateY(0) translateX(0);
      }
    }
  </style>
</head>
<body class="bg-[#121212] text-white min-h-screen flex items-center justify-center p-5 relative">
  <!-- Background animation -->
  <div class="animated-bg">
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
  </div>

  <div class="bg-[#1e1e1e] max-w-md w-full rounded-2xl p-8 shadow-2xl text-center animate-fadeIn">
  <!-- Bouton retour vers la page précédente -->
    <button onclick="history.back()" class="text-sm text-gray-400 hover:text-white mb-4 flex items-center gap-2">
      <i class="fas fa-arrow-left"></i> 
    </button>

    <!-- Titre principal de la page -->
    <h1 class="text-2xl text-[#1DB954] mb-8 font-bold flex items-center justify-center gap-2">
      <i class="fas fa-music"></i> Reconnaître une musique
    </h1>

    <!-- Bouton pour envoyer un fichier audio -->
    <button id="fileButton" class="btn bg-[#1DB954] hover:bg-[#17a74a] text-white py-3 px-5 rounded-lg transition transform hover:-translate-y-1 mb-3 w-full flex items-center justify-center gap-2">
      <i class="fas fa-folder-open"></i> Envoyer un fichier
    </button>

    <!-- Bouton pour utiliser le micro de l'utilisateur -->
    <button id="micButton" class="btn bg-[#1DB954] hover:bg-[#17a74a] text-white py-3 px-5 rounded-lg transition transform hover:-translate-y-1 mb-3 w-full flex items-center justify-center gap-2" style="animation: pulse 2s infinite;">
      <i class="fas fa-microphone"></i> Utiliser le micro
    </button>

    <!-- Input caché pour sélectionner un fichier audio -->
    <input type="file" id="audioInput" accept="audio/*" class="hidden" />

    <!-- Loader affiché pendant la reconnaissance -->
    <div id="loader" class="mt-5 text-lg text-gray-400 hidden" style="animation: blink 1.5s infinite;">
      🎵 Reconnaissance en cours...
    </div>

    <!-- Affichage du résultat de la reconnaissance -->
    <div id="result" class="hidden mt-6">
      <img id="albumCover" src="" alt="Pochette album" class="w-48 mx-auto rounded-xl border-2 border-[#1DB954] mb-4" />
      <h2 id="songTitle" class="text-xl font-semibold mb-1"></h2>
      <p id="songArtist" class="text-gray-300 mb-4"></p>
      <div id="spotifyPlayer" class="mt-4 hidden"></div>
    </div>

    <!-- Audio enregistré depuis le micro (affiché après enregistrement) -->
    <audio id="recordedAudio" controls class="mt-5 hidden w-full"></audio>
  </div>

  <!-- Script JS pour la logique de reconnaissance AudD -->
  <script src="/public/js/api.js"></script>
</body>
</html>
