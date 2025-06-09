from bottle import Bottle, static_file

app = Bottle()

#route vers le dossier public
@app.route('/public/<filepath:path>')
def server_static(filepath):
    return static_file(filepath, root='public')
