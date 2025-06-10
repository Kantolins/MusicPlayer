%# Page d'inscription utilisateur
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Inscription</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="shortcut icon" href="/public/image/ChatGPT Image 9 mai 2025, 10_26_52.png" type="image/x-icon">
</head>
<body class="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center px-4 sm:px-6 lg:px-8">

  <div class="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md sm:max-w-lg lg:max-w-xl">
    <!-- Titre principal de la page d'inscription -->
    <h2 class="text-2xl font-bold text-center text-white mb-6 sm:text-3xl">Créer un compte</h2>

    %# Affiche un message d'erreur si l'inscription échoue (ex: email déjà utilisé)
    % if error:
      <p class="text-red-500 text-center mb-4 text-sm sm:text-base">{{error}}</p>
    % end

    <!-- Formulaire d'inscription -->
    <form method="POST" class="space-y-4">
      <input type="text" name="nom_util" placeholder="Nom d'utilisateur"
        class="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base" required>

      <input type="email" name="email_util" placeholder="Adresse email"
        class="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base" required>

      <input type="password" name="mdp" placeholder="Mot de passe"
        class="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base" required>

      <input type="submit" value="S'inscrire"
        class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg cursor-pointer transition text-sm sm:text-base">
    </form>

    <!-- Lien vers la page de connexion si l'utilisateur a déjà un compte -->
    <p class="text-center text-gray-400 mt-4 text-sm sm:text-base">
      Déjà un compte ?
      <a href="/login" class="text-green-400 hover:underline">Se connecter</a>
    </p>
  </div>

</body>
</html>
