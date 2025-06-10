from bottle import Bottle, template, redirect, request
from datetime import datetime
from src.models.historiques import get_historiques_by_user, delete_historique_by_id, insert_historique
from src.controllers.auth_controller import session

app = Bottle()

# Route pour afficher le lecteur de musique
@app.route('/chanson')
def chanson():
    # Vérifie si l'utilisateur est connecté
    if not session.get("user"):
        # Redirige vers la page de connexion si l'utilisateur n'est pas connecté
        return redirect('/login')
    return template('lecteur_musique')


# Route pour afficher la page de reconnaissance musicale
@app.route('/reconnaitre')
def reconnaitre():
    return template('musicplayer')

# Route pour afficher l'historique des recherches de l'utilisateur
@app.route('/historique')
def historique():
    # Vérifie si l'utilisateur est connecté
    if not session.get("user"):
        # Redirige vers la page de connexion si l'utilisateur n'est pas connecté
        return redirect('/login')

    # Récupère les historiques de l'utilisateur connecté
    rows = get_historiques_by_user(session['user']['id_util'])
    for row in rows:
        # Formate la date au format JJ/MM/AAAA
        if isinstance(row['daterecherche'], datetime):
            row['daterecherche'] = row['daterecherche'].strftime('%d/%m/%Y')
        
        # Formate l'heure au format HH:MM
        if hasattr(row['heurerecherche'], 'seconds'):
            total_seconds = row['heurerecherche'].seconds
            hours = total_seconds // 3600
            minutes = (total_seconds % 3600) // 60
            row['heurerecherche'] = f"{hours:02d}:{minutes:02d}"

    # Retourne le template avec les historiques    
    return template('historiques', historiques=rows)

# Route POST pour supprimer un historique par son identifiant
@app.post('/historique/delete/<id_histo:int>')
def delete_historique(id_histo):
    # Vérifie si l'utilisateur est connecté
    if not session.get('user'):
        # Redirige vers la page de connexion si l'utilisateur n'est pas connecté
        return redirect('/login')

    # Supprime l'historique correspondant à l'utilisateur
    delete_historique_by_id(id_histo, session['user']['id_util'])
    # Redirige vers la page d'historique après la suppression
    return redirect('/historique')

# API POST pour ajouter un historique (appelé via AJAX)
@app.post('/api/ajouter_historique')
def ajouter_historique():
    # Vérifie si l'utilisateur est connecté
    if not session.get('user'):
        # Si l'utilisateur n'est pas connecté, retourne un message d'erreur
        return {"status": "error", "message": "Non connecté"}

    # Récupère les informations de la chanson à ajouter à l'historique
    titre = request.forms.get('titre')
    artiste = request.forms.get('artiste')
    now = datetime.now()

    # Insère l'historique dans la base de données
    insert_historique(session['user']['id_util'], now.date(), now.time(), titre, artiste)
    return {"status": "success"}
