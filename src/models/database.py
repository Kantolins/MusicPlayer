import mysql.connector

# Fonction pour établir une connexion à la base de données MySQL
def get_db():
    # Retourne une connexion à la base 'musique' avec les paramètres spécifiés
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="1",
        database="musique",
        charset='utf8mb4',
        collation='utf8mb4_general_ci'
    )