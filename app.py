from bottle import Bottle, TEMPLATE_PATH
from src.controllers import auth_controller, music_controller, static_controller

app = Bottle()
TEMPLATE_PATH.insert(0, 'src/templates')

# Montage des routes
app.merge(auth_controller.app)
app.merge(music_controller.app)
app.merge(static_controller.app)

# Démarrage
if __name__ == '__main__':
    app.run(host='localhost', port=8082, debug=True)
