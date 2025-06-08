DROP DATABASE IF EXISTS `musique`;
CREATE DATABASE IF NOT EXISTS `musique` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `musique`;
-- --------------------------------------------------------

--
-- Structure de la table `historiques`
--

DROP TABLE IF EXISTS `historiques`;
CREATE TABLE IF NOT EXISTS `historiques` (
  `id_histo` int NOT NULL AUTO_INCREMENT,
  `id_util` int NOT NULL,
  `daterecherche` date NOT NULL,
  `heurerecherche` time NOT NULL,
  `titre` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `artiste` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id_histo`),
  KEY `id_util` (`id_util`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `historiques`
--

INSERT INTO `historiques` (`id_histo`, `id_util`, `daterecherche`, `heurerecherche`, `titre`, `artiste`) VALUES
(3, 1, '2025-05-08', '20:47:57', 'The Boxer', 'Simon & Garfunkel');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

DROP TABLE IF EXISTS `utilisateurs`;
CREATE TABLE IF NOT EXISTS `utilisateurs` (
  `id_util` int NOT NULL AUTO_INCREMENT,
  `nom_util` varchar(155) COLLATE utf8mb4_general_ci NOT NULL,
  `email_util` varchar(155) COLLATE utf8mb4_general_ci NOT NULL,
  `mdp` varchar(155) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_util`),
  UNIQUE KEY `email_util` (`email_util`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

