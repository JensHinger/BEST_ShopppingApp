from server.db.Mapper import Mapper
from server.bo.Item import Item


class ItemMapper(Mapper):

    def __init__(self):
        super().__init__()

    def build_bo(self, tuples):

        result = []

        if len(tuples) == 1:

            for (id, name, creation_date) in tuples:
                item = Item()
                item.set_id(id)
                item.set_name(name)
                item.set_creation_date(creation_date)
                result = item

        else:

            for (id, name, creation_date) in tuples:
                item = Item()
                item.set_id(id)
                item.set_name(name)
                item.set_creation_date(creation_date)
                result.append(item)

        return result

    def find_all(self):

        result = []

        cursor = self._cnx.cursor()
        command = "SELECT * FROM item"
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = self.build_bo(tuples)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_id(self, id):

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, name, creation_date FROM item WHERE id LIKE ('{}')".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            result = self.build_bo(tuples)
        except IndexError:
            """Falls kein Item mit der angegebenen id gefunden werden konnte,
                            wird hier None als Rückgabewert deklariert"""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, item):

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) as maxid from item")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            item.set_id(maxid[0] + 1)

        command = "INSERT INTO item (id, name, creation_date) VALUES ('{}','{}','{}')" \
            .format(item.get_id(), item.get_name(), item.get_creation_date())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

        return item

    def update(self, item):

        cursor = self._cnx.cursor()
        command = "UPDATE item SET name = ('{}'), creation_date = ('{}')" \
                  "WHERE id LIKE ('{}')"\
            .format(item.get_name(), item.get_creation_date(), item.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def delete(self, item):
        cursor = self._cnx.cursor()
        command = "DELETE FROM item WHERE id LIKE ('{}')".format(item.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


if __name__ == "__main__":
    with ItemMapper() as mapper:
        i = mapper.find_by_id(101)
        mapper.delete(i)
        i.set_name("test")
        print(mapper.insert(i))