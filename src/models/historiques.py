from .database import get_db

# Récupère tous les historiques d'un utilisateur donné (par son id)
def get_historiques_by_user(id_util):
    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute("""
        SELECT * FROM historiques
        WHERE id_util = %s
        ORDER BY daterecherche DESC, heurerecherche DESC
    """, (id_util,))
    rows = cursor.fetchall()
    db.close()
    return rows

# Supprime un historique spécifique à partir de son id et de l'id utilisateur
def delete_historique_by_id(id_histo, id_util):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM historiques WHERE id_histo = %s AND id_util = %s", (id_histo, id_util))
    db.commit()
    db.close()

# Insère une nouvelle entrée dans l'historique de l'utilisateur
def insert_historique(id_util, date, heure, titre, artiste):
    db = get_db()
    cursor = db.cursor()
    cursor.execute("""
        INSERT INTO historiques (id_util, daterecherche, heurerecherche, titre, artiste)
        VALUES (%s, %s, %s, %s, %s)
    """, (id_util, date, heure, titre, artiste))
    db.commit()
    db.close()
