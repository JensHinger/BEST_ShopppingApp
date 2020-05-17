from db.Mapper import Mapper
from bo.User import User

"""User Objekte werden noch nicht erzeugt. 
   Business Objekte fehlen noch alle"""

"""Standartaktion: Erstellung des BO's kann in eigene Methode auslager --> zeilen sparen"""


class UserMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_user_by_email(self, email):

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, name, creation_date, google_id, email FROM user WHERE email LIKE '{}' ".format(email)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:

            for (id, name, creation_date, google_id, email) in tuples:
                user = User()
                user.set_id(id)
                user.set_name(name)
                user.set_creation_date(creation_date)
                user.set_google_id(google_id)
                user.set_email(email)
                result = user

        except IndexError:
            """Falls kein User mit der angegebenen email gefunden werden konnte,
            wird hier None als Rückgabewert deklariert"""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_user_by_google_id(self, google_id):

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, name, creation_date, google_id, email FROM user WHERE google_id LIKE '{}' ".format(google_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:

            for (id, name, creation_date, google_id, email) in tuples:
                user = User()
                user.set_id(id)
                user.set_name(name)
                user.set_creation_date(creation_date)
                user.set_google_id(google_id)
                user.set_email(email)
                result = user

        except IndexError:
            """Falls kein User mit der angegebenen email gefunden werden konnte,
            wird hier None als Rückgabewert deklariert"""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_id(self, id):

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, name, creation_date, google_id, email FROM user WHERE id LIKE '{}' ".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, creation_date, google_id, email) in tuples:
            user = User()
            user.set_id(id)
            user.set_name(name)
            user.set_creation_date(creation_date)
            user.set_google_id(google_id)
            user.set_email(email)
            result = user

        self._cnx.commit()
        cursor.close()

        return result

    def find_all(self):

        result = []

        cursor = self._cnx.cursor()
        command = "SELECT * FROM user"
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, creation_date, google_id, email) in tuples:
            user = User()
            user.set_id(id)
            user.set_name(name)
            user.set_creation_date(creation_date)
            user.set_google_id(google_id)
            user.set_email(email)
            result.append(user)

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, user):

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) as maxid from user")
        tuples = cursor.fetchall()

        id = tuples[0][0] + 1

        self._cnx.commit()
        cursor.close()

        return tuples[0][0]

    def update(self, object):
        pass

    def delete(self, object):
        pass

# Für Testzwecke


if (__name__ == "__main__"):
    with UserMapper() as mapper:
        # Nach mapper jegliche Methode dieser Klasse
        result = mapper.find_all()
        print(result)
