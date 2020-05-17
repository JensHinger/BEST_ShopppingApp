from db.Mapper import Mapper
from bo.Party import Party


class PartyMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_by_id(self, id):

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, name, creation_date FROM party WHERE id LIKE '{}' ".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, creation_date) in tuples:
            party = Party()
            party.set_id(id)
            party.set_name(name)
            party.set_creation_date(creation_date)
            result = party

        self._cnx.commit()
        cursor.close()

        return result

    def find_all(self):
        pass

    def insert(self, object):
        pass

    def update(self, object):
        pass

    def delete(self, object):
        pass


if (__name__ == "__main__"):
    with PartyMapper() as mapper:
        # Nach mapper jegliche Methode dieser Klasse
        result = mapper.find_by_id(4)
        print(result)
