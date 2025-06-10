%# Page du lecteur musical Jamendo
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Recherche Musicale Jamendo</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/js/all.min.js" crossorigin="anonymous"></script>
    <link rel="shortcut icon" href="/public/image/ChatGPT Image 9 mai 2025, 10_26_52.png" type="image/x-icon">
    <style>
        /* Spinner de chargement pour la recherche */
        .spinner {
            border: 4px solid rgba(255, 255, 255, 0.1);
            border-top: 4px solid #10B981;
            border-radius: 50%;
            width: 36px;
            height: 36px;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
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
            background: rgba(16, 185, 129, 0.3); /* Green with transparency */
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

<body class="bg-gray-900 text-white min-h-screen flex flex-col items-center pb-36 px-4 pt-6 relative">
    <!-- Background animation -->
    <div class="animated-bg">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
    </div>

    <!-- Menu burger pour la navigation (reconnaissance, historique, logout) -->
    <header class="w-full max-w-3xl mb-4 flex justify-between items-center animate-fade-in-down">
        <div class="relative">
            <button id="menuBtn" class="text-white text-2xl focus:outline-none">
                <i class="fas fa-bars"></i>
            </button>
            <div id="menuDropdown"
                class="absolute mt-2 left-0 bg-gray-800 border border-gray-700 rounded shadow-lg w-48 hidden z-50">
                <a href="/reconnaitre" class="block px-4 py-2 text-white hover:bg-gray-700">
                    <i class="fas fa-microphone"></i> Reconnaissance musicale
                </a>
                <a href="/historique" class="block px-4 py-2 text-white hover:bg-gray-700">
                    <i class="fas fa-clock"></i> Historique
                </a>
                <a href="/logout" class="block px-4 py-2 text-red-400 hover:bg-red-600 hover:text-white">
                    <i class="fas fa-sign-out-alt"></i> Logout
                </a>
            </div>
        </div>
    </header>

    <div class="w-full max-w-3xl animate-fade-in">
        <!-- Titre principal -->
        <h1 class="text-2xl sm:text-3xl font-bold text-green-500 mb-6 text-center">
            <i class="fas fa-music"></i> Recherche Musicale
        </h1>

        <!-- Champ de recherche Jamendo -->
        <input type="text" id="searchInput" placeholder="Rechercher une musique ou un artiste..."
            class="w-full p-2 sm:p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300" />

        <!-- Loader de recherche -->
        <div id="loader" class="flex justify-center mt-6 hidden">
            <div class="spinner"></div>
        </div>

        <!-- Résultats de recherche affichés ici -->
        <div id="results" class="mt-6 space-y-4"></div>
    </div>

    <!-- Lecteur audio fixe en bas de page avec contrôle du mode de lecture -->
    <div id="playerContainer"
        class="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 px-4 py-3 hidden z-50 shadow-lg animate-fade-in-up">
        <div class="max-w-3xl mx-auto flex flex-wrap sm:flex-nowrap items-center justify-between gap-4">
            <div class="flex-1 min-w-[200px]">
                <!-- Affichage du morceau en cours -->
                <p id="currentTrack" class="text-xs sm:text-sm text-green-400 truncate">
                    <i class="fas fa-play"></i> Lecture en cours :
                </p>
                <audio id="audioPlayer" controls class="w-full mt-1 bg-gray-700 rounded-lg shadow-inner"></audio>
            </div>
            <!-- Boutons de mode de lecture : normal, répéter, aléatoire -->
            <div class="flex gap-2">
                <button id="normalBtn"
                    class="text-xs sm:text-sm bg-gray-700 hover:bg-green-600 px-2 sm:px-3 py-1 rounded shadow">
                    <i class="fas fa-play"></i> Normal
                </button>
                <button id="repeatBtn"
                    class="text-xs sm:text-sm bg-gray-700 hover:bg-green-600 px-2 sm:px-3 py-1 rounded shadow">
                    <i class="fas fa-redo-alt"></i> Répéter
                </button>
                <button id="shuffleBtn"
                    class="text-xs sm:text-sm bg-gray-700 hover:bg-green-600 px-2 sm:px-3 py-1 rounded shadow">
                    <i class="fas fa-random"></i> Aléatoire
                </button>
            </div>
        </div>
    </div>

    <!-- Script JS pour la logique de recherche et de lecture Jamendo -->
    <script src="/public/js/api2.js"></script>
</body>

</html>
