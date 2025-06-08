from .database import get_db


#verification de l'email 
def get_user_by_email(email):
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM utilisateurs WHERE email_util = %s", (email,))
    user = cursor.fetchone()
    db.close()
    return user

#verification auth
def get_user_by_credentials(nom, mdp):
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM utilisateurs WHERE nom_util = %s AND mdp = %s", (nom, mdp))
    user = cursor.fetchone()
    db.close()
    return user

#création d'un noveau utilisateur
def create_user(nom, email, mdp):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO utilisateurs (nom_util, email_util, mdp) VALUES (%s, %s, %s)", (nom, email, mdp))
    db.commit()
    db.close()
