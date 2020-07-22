from db.Mapper import Mapper
from bo.User import User

"""User Objekte werden noch nicht erzeugt. 
   Business Objekte fehlen noch alle"""

"""Standartaktion: Erstellung des BO's kann in eigene Methode auslager --> zeilen sparen"""


class UserMapper(Mapper):

    def __init__(self):
        super().__init__()

    def build_bo(self, tuples):

        result = []

        if len(tuples) == 1:
            for (id, name, creation_date, google_id, email) in tuples:
                user = User()
                user.set_id(id)
                user.set_name(name)
                user.set_creation_date(creation_date)
                user.set_google_id(google_id)
                user.set_email(email)
                result = user
        else:
            for (id, name, creation_date, google_id, email) in tuples:
                user = User()
                user.set_id(id)
                user.set_name(name)
                user.set_creation_date(creation_date)
                user.set_google_id(google_id)
                user.set_email(email)
                result.append(user)

        return result

    def find_all(self):

        result = []

        cursor = self._cnx.cursor()
        command = "SELECT * FROM user"
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = (self.build_bo(tuples))

        self._cnx.commit()
        cursor.close()

        return result

    def find_user_by_email(self, email):

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, name, creation_date, google_id, email FROM user WHERE email LIKE '{}' ".format(email)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            result = self.build_bo(tuples)
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

        """Haben wir einen Tuple gefunden ? -> ja BO bauen -> nein nix zurück geben. """
        if len(tuples) != 0:
            try:
                result = self.build_bo(tuples)
            except IndexError:
                """Falls kein User mit der angegebenen email gefunden werden konnte,
                wird hier None als Rückgabewert deklariert"""
                result = None
        else:
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

        try:
            result = self.build_bo(tuples)
        except IndexError:
            """Falls kein User mit der angegebenen id gefunden werden konnte,
            wird hier None als Rückgabewert deklariert"""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, user):

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) as maxid from user")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            user.set_id(maxid[0]+1)

        command = "INSERT INTO user (id, name, creation_date, google_id, email) VALUES ('{}','{}','{}','{}','{}')"\
                .format(user.get_id(), user.get_name(), user.get_creation_date(), user.get_google_id(),
                        user.get_email())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def update(self, user):

        cursor = self._cnx.cursor()
        command = "UPDATE user SET name = ('{}'), creation_date = ('{}'), google_id = ('{}'), email = ('{}') " \
                  "WHERE id = ('{}')"\
            .format(user.get_name(), user.get_creation_date(), user.get_google_id(),user.get_email(), user.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def delete(self, user):

        cursor = self._cnx.cursor()
        try:
            cursor.execute("DELETE FROM user WHERE id LIKE ('{}');".format(user.get_id()))
        except:
            print("User konnte nicht gefunden werden!")

        self._cnx.commit()
        cursor.close()


if __name__ == "__main__":
    with UserMapper() as mapper:
        # Nach mapper jegliche Methode dieser Klasse

        result = mapper.find_by_id(2)
        print(result.get_id())
