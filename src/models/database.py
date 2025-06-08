import mysql.connector

#connection à la base de donnée
def get_db():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="1",
        database="musique",
        charset='utf8mb4',
        collation='utf8mb4_general_ci'
    )