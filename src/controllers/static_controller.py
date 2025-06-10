from bottle import Bottle, static_file

app = Bottle()

# Route pour servir les fichiers statiques (CSS, JS, images, etc.)
# Cette route permet d'accéder à tous les fichiers du dossier 'public'
@app.route('/public/<filepath:path>')
def server_static(filepath):
    # Retourne le fichier statique demandé depuis le dossier 'public'
    return static_file(filepath, root='public')
