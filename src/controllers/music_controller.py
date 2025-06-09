from bottle import Bottle, template, redirect, request
from datetime import datetime
from src.models.historiques import get_historiques_by_user, delete_historique_by_id, insert_historique
from src.controllers.auth_controller import session

app = Bottle()

@app.route('/chanson')
def chanson():
    if not session.get("user"):
        return redirect('/login')
    return template('lecteur_musique')

@app.route('/reconnaitre')
def reconnaitre():
    return template('musicplayer')

@app.route('/historique')
def historique():
    if not session.get("user"):
        return redirect('/login')

    rows = get_historiques_by_user(session['user']['id_util'])
    for row in rows:
        if isinstance(row['daterecherche'], datetime):
            row['daterecherche'] = row['daterecherche'].strftime('%d/%m/%Y')
        if hasattr(row['heurerecherche'], 'seconds'):
            total_seconds = row['heurerecherche'].seconds
            hours = total_seconds // 3600
            minutes = (total_seconds % 3600) // 60
            row['heurerecherche'] = f"{hours:02d}:{minutes:02d}"

    return template('historiques', historiques=rows)

@app.post('/historique/delete/<id_histo:int>')
def delete_historique(id_histo):
    if not session.get('user'):
        return redirect('/login')

    delete_historique_by_id(id_histo, session['user']['id_util'])
    return redirect('/historique')

@app.post('/api/ajouter_historique')
def ajouter_historique():
    if not session.get('user'):
        return {"status": "error", "message": "Non connecté"}

    titre = request.forms.get('titre')
    artiste = request.forms.get('artiste')
    now = datetime.now()

    insert_historique(session['user']['id_util'], now.date(), now.time(), titre, artiste)
    return {"status": "success"}
