# 🎶 Projet de Reconnaissance Musicale Jamendo

Ce projet est une application web de reconnaissance musicale développée avec **Python (Bottle)** côté back-end et **HTML/CSS/JavaScript (Tailwind + FontAwesome)** côté front-end.  
Il permet d’enregistrer un extrait audio, de l’identifier via l’API de **Audd.io**, et de lire les résultats via un lecteur intégré. La recherche manuelle utilise l’API de **Jamendo**.

Remarque : l'utilisation de connexion internet est requise
---

## 🚀 Fonctionnalités principales

- 🎤 **Reconnaissance musicale** à partir d’un micro ou par upload de fichier
- 🔍 **Recherche manuelle** de titres/artistes via Jamendo
- 🎵 **Lecture audio intégrée**
- 🕓 **Historique des recherches par utilisateur**
- 👤 **Connexion / Déconnexion sécurisées**
- 📱 **Interface responsive** (mobile & desktop)

---

## 🛠️ Technologies utilisées

### Backend
- Python 3.12
- Bottle (micro-framework web)
- MySQL (base de données utilisateurs + historiques)

### Frontend
- HTML5 / CSS3
- Tailwind CSS
- JavaScript (Vanilla)
- Font Awesome (icônes)
- API Jamendo (recherche musicale)
- API Audd.io (reconnaissance musicale)

---

## 🔧 Installation

1. **Créer un environnement virtuel et installer les dépendances**
   ```bash
   python3.12 -m venv venv
   source venv/bin/activate  # ou venv\Scripts\activate sous Windows
   pip install -r requirements.txt # cela installera les dépendances
   ```

2. **Configurer la base de données MySQL**
   - Importer `public/sql/musique(1).sql` dans MySQL
   - Configurer le fichier de connection à la base de données `src/models/database.py` par rapport à votre server local sur cette ligne
   ```bash
   def get_db():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="1",
        database="musique",
        charset='utf8mb4',
        collation='utf8mb4_general_ci'
    )
   ```
   - Mettre à jour les identifiants MySQL dans `app.py` si nécessaire

3. **Lancer l'application**
   ```bash
   python app.py
   ```

4. Ouvrir [http://localhost:8082](http://localhost:8082) dans un navigateur

---

## 🔐 Authentification

- Les utilisateurs sont stockés dans la base de données
- Les routes principales (`/reconnaitre`, `/historique`, etc.) nécessitent une session utilisateur active

---

## ✅ À venir

- ✅ Enregistrement audio et traitement côté serveur
- ✅ Amélioration du lecteur (volume, shuffle, repeat)
- 🔒 Hashage des mots de passe pour une meilleure sécurité
- 📈 Statistiques d’utilisation (fréquence, morceaux les plus recherchés, etc.)

---

## 🤝 Auteurs

**RAKOTONAVALONA Henintsoa Ny Aina** 
**RAKOTONAVALONA Kanto Liantsoa** 
Étudiants en L3 Informatique à l’ESMIA  

---

## 📄 Licence

Ce projet est open-source, sous licence **MIT**.
