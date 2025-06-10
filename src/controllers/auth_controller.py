from bottle import Bottle, template, request, redirect
from src.models.utilisateurs import get_user_by_email, get_user_by_credentials, create_user
import hashlib

app = Bottle()
session = {"user": None} # Dictionnaire simple pour gérer la session utilisateur

# Fonction utilitaire pour hasher les mots de passe avec SHA-256
def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

# Route principale : affiche la page d'accueil
@app.route('/')
def index():
    return template('index')

# Route pour l'inscription d'un nouvel utilisateur
@app.route('/signup', method=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        # Récupération des données du formulaire
        nom = request.forms.get('nom_util')
        email = request.forms.get('email_util')
        mdp = hash_password(request.forms.get('mdp')) # Hash du mot de passe

        # Vérifie si l'email existe déjà
        if get_user_by_email(email):
            return template('signup', error="Email déjà utilisé")

        # Création du nouvel utilisateur
        create_user(nom, email, mdp)
        return redirect('/login')

    # Affiche le formulaire d'inscription (GET)
    return template('signup', error=None)


# Route pour la connexion utilisateur 
@app.route('/login', method=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Récupération des identifiants
        username = request.forms.get('username')
        password = hash_password(request.forms.get('password'))

        # Vérifie les identifiants dans la base de données
        user = get_user_by_credentials(username, password)
        if user:
            session['user'] = user # Stocke l'utilisateur en session
            return redirect('/chanson')
        return template('login', error="Identifiants incorrects")

    # Affiche le formulaire de connexion (GET)
    return template('login', error=None)

# Route pour la déconnexion utilisateur
@app.route('/logout')
def logout():
    session['user'] = None # Réinitialise la session
    return redirect('/login')
