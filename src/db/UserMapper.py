from db.Mapper import Mapper

"""User Objekte werden noch nicht erzeugt. 
   Business Objekte fehlen noch alle"""


class UserMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_user_by_email(self, email):

        cursor = self._cnx.cursor()
        command = "SELECT id, name, creation_date, google_id FROM user WHERE email LIKE '{}' ".format(email)
        cursor.execute(command)
        tuples = cursor.fetchall()

        self._cnx.commit()
        cursor.close()

        return tuples

    def find_user_by_google_id(self, google_id):

        cursor = self._cnx.cursor()
        command = "SELECT id, name, creation_date, email FROM user WHERE google_id LIKE '{}' ".format(google_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        self._cnx.commit()
        cursor.close()

        return tuples

    def find_by_id(self, id):

        cursor = self._cnx.cursor()
        command = "SELECT id, name, creation_date, google_id, email FROM user WHERE id LIKE '{}' ".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        self._cnx.commit()
        cursor.close()

        return tuples

    def find_all(self):
        pass

    def insert(self, object):
        pass

    def update(self, object):
        pass

    def delete(self, object):
        pass

# Für Testzwecke

if (__name__ == "__main__"):
    with UserMapper() as mapper:
        # Nach mapper jegliche Methode dieser Klasse
        result = mapper.find_user_by_email("hpiddockf@twitter.com")
        print(result)
