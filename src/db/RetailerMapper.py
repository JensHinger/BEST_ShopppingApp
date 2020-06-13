from db.Mapper import Mapper
from bo.Retailer import Retailer


class RetailerMapper(Mapper):

    def __init__(self):
        super().__init__()

    def build_bo(self, tuples):
        result = []

        if len(tuples) == 1:
            "Baue nur einen"
            for (id, name, creation_date)  in tuples:
                retailer = Retailer()
                retailer.set_id(id)
                retailer.set_name(name)
                retailer.set_creation_date(creation_date)
                result = retailer
        else:
            "Baue mehrere"
            for (id, name, creation_date) in tuples:
                retailer = Retailer()
                retailer.set_id(id)
                retailer.set_name(name)
                retailer.set_creation_date(creation_date)
                result.append(retailer)

        return result

    def find_all(self):
        result = []

        cursor = self._cnx.cursor()
        command = "SELECT * FROM retailer"
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = self.build_bo(tuples)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_id(self, id):
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, name, creation_date FROM retailer WHERE id LIKE '{}' ".format(id)
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

    def insert(self, retailer):
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) as maxid from retailer")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            retailer.set_id(maxid[0] + 1)

        command = "INSERT INTO retailer (id, name, creation_date) VALUES ('{}','{}','{}')" \
            .format(retailer.get_id(), retailer.get_name(), retailer.get_creation_date())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def update(self, retailer):
        cursor = self._cnx.cursor()
        command = "UPDATE retailer SET name = ('{}'), creation_date = ('{}') " \
                  "WHERE id = ('{}')" \
            .format(retailer.get_name(), retailer.get_creation_date(), retailer.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def delete(self, retailer):
        cursor = self._cnx.cursor()
        command = "DELETE FROM retailer WHERE id = ('{}')".format(retailer.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


if (__name__ == "__main__"):
    with RetailerMapper() as mapper:
        # Nach mapper jegliche Methode dieser Klasse
        retailer = mapper.find_by_id(6)
        result = mapper.delete(retailer)
        print(result)
