from bottle import Bottle, TEMPLATE_PATH
from src.controllers import auth_controller, music_controller, static_controller

app = Bottle()
TEMPLATE_PATH.insert(0, 'src/templates') # Définit le dossier des templates pour Bottle

# Montage des routes des différents controllers dans l'application principale
app.merge(auth_controller.app)
app.merge(music_controller.app)
app.merge(static_controller.app)

# Point d'entrée de l'application
if __name__ == '__main__':
    # Démarre le serveur Bottle en mode debug sur le port 8082
    app.run(host='localhost', port=8082, debug=True)
