from db.Mapper import Mapper
from bo.Party import Party


class PartyMapper(Mapper):

    def __init__(self):
        super().__init__()

    def build_bo(self, tuples):

        result = []

        if len(tuples) == 1:
            for (id, name, creation_date) in tuples:
                party = Party()
                party.set_id(id)
                party.set_name(name)
                party.set_creation_date(creation_date)
                result = party

        else:
            for (id, name, creation_date) in tuples:
                party = Party()
                party.set_id(id)
                party.set_name(name)
                party.set_creation_date(creation_date)
                result.append(party)

        return result

    def find_by_id(self, id):

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, name, creation_date FROM party WHERE id LIKE '{}' ".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            result = self.build_bo(tuples)

        except IndexError:
            """Falls keine Party mit der angegebenen id gefunden werden konnte,
                wird hier None als Rückgabewert deklariert"""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_all(self):

        result = []

        cursor = self._cnx.cursor()
        command = "SELECT * FROM party"
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = self.build_bo(tuples)

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, party):

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) as maxid from party")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            party.set_id(maxid[0] + 1)

        command = "INSERT INTO party (id, name, creation_date) VALUES ('{}','{}','{}')"\
                .format(party.get_id(), party.get_name(), party.get_creation_date())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def update(self, party):

        cursor = self._cnx.cursor()
        command = "UPDATE party SET name = ('{}'), creation_date = ('{}') " \
                  "WHERE id = ('{}')" \
            .format(party.get_name(), party.get_creation_date(), party.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def delete(self, party):

        cursor = self._cnx.cursor()
        command = "DELETE FROM party WHERE id = ('{}')".format(party.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


if (__name__ == "__main__"):
    with PartyMapper() as mapper:
        # Nach mapper jegliche Methode dieser Klasse
        party = mapper.find_by_id(6)
        result = mapper.delete(party)
        print(result)
