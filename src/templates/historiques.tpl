%# Page d'historique des reconnaissances musicales de l'utilisateur
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Historique des musiques</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <link rel="shortcut icon" href="/public/image/ChatGPT Image 9 mai 2025, 10_26_52.png" type="image/x-icon">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    /* Animation de fond décorative */
    :root { --main-color: #1DB954; }
    body {
      background-color: #121212;
      color: white;
      font-family: 'Arial', sans-serif;
    }

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
<body class="min-h-screen flex flex-col items-center justify-center p-4 relative">
  <!-- Animation de fond avec des cercles animés -->
  <div class="animated-bg">
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
  </div>

  <div class="w-full max-w-3xl">
    <div class="bg-[#1e1e1e] rounded-2xl shadow-2xl p-6 animate-fadeIn">
    <!-- Bouton retour vers le lecteur -->
      <a href="/chanson" class="mb-4 inline-block text-sm text-gray-300 hover:text-white transition">
        <i class="fas fa-arrow-left"></i>
      </a>

      <!-- Titre principal -->
      <h1 class="text-3xl font-bold text-center text-[#1DB954] mb-6"><i class="fas fa-clock"></i> Historique des reconnaissances</h1>
      
      <div class="space-y-4">
      %# Affiche la liste des historiques si elle existe
        % if historiques:
          % for h in historiques:
          <!-- Carte d'un historique avec titre, artiste, date, heure et bouton suppression -->
            <div class="bg-[#2a2a2a] p-4 rounded-lg shadow flex items-center justify-between hover:scale-[1.01] transition">
              <div>
                <p class="text-lg font-semibold text-[#1DB954]">{{h['titre']}}</p>
                <p class="text-sm text-gray-300">{{h['artiste']}}</p>
              </div>
              <div class="flex items-center text-sm text-gray-400">
                {{h['daterecherche']}} - {{h['heurerecherche']}}
                <!-- Formulaire de suppression avec confirmation SweetAlert -->
                <form class="delete-form" data-id="{{h['id_histo']}}" method="POST" action="/historique/delete/{{h['id_histo']}}">
                  <button type="button" class="text-red-500 hover:text-red-700 transition ml-4 delete-button">
                    <i class="fas fa-trash"></i>
                  </button>
                </form>
              </div>
            </div>
          % end
        % else:
        <!-- Message si aucun historique -->
          <p class="text-center text-gray-400">Aucune reconnaissance pour le moment.</p>
        % end
      </div>
    </div>
  </div>

  <!-- Icônes et gestion du popup de suppression -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/js/all.min.js" crossorigin="anonymous"></script>
  <script src="/public/js/popups.js"></script>
</body>
</html>
