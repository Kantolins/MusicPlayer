from bottle import Bottle, template, request, redirect
from src.models.utilisateurs import get_user_by_email, get_user_by_credentials, create_user
import hashlib

app = Bottle()
session = {"user": None} #gère les session

#hashage des mpd
def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

#route principal
@app.route('/')
def index():
    return template('index')

#route pour l'inscription
@app.route('/signup', method=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        nom = request.forms.get('nom_util')
        email = request.forms.get('email_util')
        mdp = hash_password(request.forms.get('mdp'))

        if get_user_by_email(email):
            return template('signup', error="Email déjà utilisé")

        create_user(nom, email, mdp)
        return redirect('/login')

    return template('signup', error=None)


#route pour la connexion 
@app.route('/login', method=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.forms.get('username')
        password = hash_password(request.forms.get('password'))

        user = get_user_by_credentials(username, password)
        if user:
            session['user'] = user
            return redirect('/chanson')
        return template('login', error="Identifiants incorrects")

    return template('login', error=None)

#route pour la déconnexion 
@app.route('/logout')
def logout():
    session['user'] = None
    return redirect('/login')
