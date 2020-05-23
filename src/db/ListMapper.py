from bo.List import List
from db.Mapper import Mapper


class ListMapper(Mapper):

    def __init__(self):
        super().__init__()

    def build_bo(self, tuples):

        result = []

        if len(tuples) == 1:
            for (id, name, creation_date, partyl_id) in tuples:
                list = List()
                list.set_id(id)
                list.set_name(name)
                list.set_creation_date(creation_date)
                list.set_partyl_id(partyl_id)
                result = list
        else:
            for (id, name, creation_date, partyl_id) in tuples:
                list = List()
                list.set_id(id)
                list.set_name(name)
                list.set_creation_date(creation_date)
                list.set_partyl_id(partyl_id)
                result.append(list)

        return result

    def find_all(self):

        result = []

        cursor = self._cnx.cursor()
        command = "SELECT * FROM list"
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = (self.build_bo(tuples))

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_id(self, id):

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, name, creation_date, partyl_id FROM list WHERE id LIKE ('{}')".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            result = self.build_bo(tuples)

        except IndexError:
            """Falls keine Liste mit der angegebenen id gefunden werden konnte,
                wird hier None als Rückgabewert deklariert"""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_partyl_id(self, partyl_id):

        result = []

        cursor = self._cnx.cursor()
        command = "SELECT id, name, creation_date, partyl_id FROM list WHERE partyl_id LIKE ('{}')".format(partyl_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            result = self.build_bo(tuples)

        except IndexError:
            """Falls in der Gruppe keine Liste angelegt wurde, kann auch keine Liste hier gefunden werden"""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, list):

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) as maxid from list")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            list.set_id(maxid[0] + 1)

        command = "INSERT INTO list (id, name, creation_date, partyl_id) VALUES ('{}','{}','{}','{}')" \
            .format(list.get_id(), list.get_name(), list.get_creation_date(), list.get_partyl_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def update(self, list):

        cursor = self._cnx.cursor()
        command = "UPDATE list SET name = ('{}'), creation_date = ('{}'), partyl_id = ('{}') " \
                  "WHERE id = ('{}')" \
            .format(list.get_name(), list.get_creation_date(), list.get_partyl_id(), list.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def delete(self, list):

        cursor = self._cnx.cursor()
        command = "DELETE FROM list WHERE id LIKE ('{}')".format(list.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


if __name__ == "__main__":
    with ListMapper() as mapper:
        result = mapper.find_all()
        print(result)