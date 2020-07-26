from server.db.Mapper import Mapper
from server.bo.ListEntry import ListEntry


class ListEntryMapper(Mapper):

    def __init__(self):
        super().__init__()

    def build_bo(self, tuples):

        result = []

        if len(tuples) == 1:

            for (id, name, creation_date, item_id, retailer_id, user_id, list_id, amount, unit, condition) in tuples:
                listentry = ListEntry()
                listentry.set_id(id)
                listentry.set_name(name)
                listentry.set_creation_date(creation_date)
                listentry.set_item_id(item_id)
                listentry.set_retailer_id(retailer_id)
                listentry.set_user_id(user_id)
                listentry.set_list_id(list_id)
                listentry.set_amount(amount)
                listentry.set_unit(unit)
                listentry.set_checked(condition)
                result = listentry

        else:

            for (id, name, creation_date, item_id, retailer_id, user_id, list_id, amount, unit, condition) in tuples:
                listentry = ListEntry()
                listentry.set_id(id)
                listentry.set_name(name)
                listentry.set_creation_date(creation_date)
                listentry.set_item_id(item_id)
                listentry.set_retailer_id(retailer_id)
                listentry.set_user_id(user_id)
                listentry.set_list_id(list_id)
                listentry.set_amount(amount)
                listentry.set_unit(unit)
                listentry.set_checked(condition)
                result.append(listentry)

        return result

    def set_user_one(self, listentry):
        cursor = self._cnx.cursor()
        command = "UPDATE listentry SET user_id = 1 WHERE id LIKE ('{}')".format(listentry.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


    def find_all(self):

        result = []

        cursor = self._cnx.cursor()
        command = "SELECT * FROM listentry"
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = self.build_bo(tuples)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_id(self, id):

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, name, creation_date, item_id, retailer_id, user_id, list_id, amount, unit, checked " \
                  "FROM listentry WHERE id LIKE ('{}')".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            result = self.build_bo(tuples)
        except IndexError:
            """Falls kein ListEntry mit der angegebenen id gefunden werden konnte,
                            wird hier None als Rückgabewert deklariert"""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_list_id(self, list_id):

        cursor = self._cnx.cursor()
        command = "SELECT id, name, creation_date, item_id, retailer_id, user_id, list_id, amount, unit, checked " \
                  "FROM listentry WHERE list_id LIKE ('{}')".format(list_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            result = self.build_bo(tuples)
        except IndexError:
            """Falls kein ListEntry mit der angegebenen id gefunden werden konnte,
                            wird hier None als Rückgabewert deklariert"""
            result = None

        self._cnx.commit()
        cursor.close()

        return result


    def find_by_user_id(self, user_id):

        cursor = self._cnx.cursor()
        command = "SELECT id, name, creation_date, item_id, retailer_id, user_id, list_id, amount, unit, checked " \
                  "FROM listentry WHERE user_id LIKE ('{}')".format(user_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            result = self.build_bo(tuples)
        except IndexError:
            """Falls kein ListEntry mit der angegebenen id gefunden werden konnte,
                            wird hier None als Rückgabewert deklariert"""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_checked_by_user_id(self, user_id):

        cursor = self._cnx.cursor()
        command = "SELECT id, name, creation_date, item_id, retailer_id, user_id, list_id, amount, unit, checked " \
                  "FROM listentry WHERE user_id LIKE ('{}') AND checked LIKE ('{}')".format(user_id, 1)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            result = self.build_bo(tuples)
        except IndexError:
            """Falls kein ListEntry mit der angegebenen id gefunden werden konnte,
                            wird hier None als Rückgabewert deklariert"""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, listentry):

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) as maxid from listentry")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is None:
                listentry.set_id(1)
            else:
                listentry.set_id(maxid[0] + 1)

        command = "INSERT INTO listentry (id, name, creation_date, item_id, retailer_id, user_id, list_id, amount, unit, checked) " \
                  "VALUES ('{}','{}','{}','{}','{}','{}','{}', '{}', '{}', '{}')"\
                  .format(listentry.get_id(), listentry.get_name(), listentry.get_creation_date(),
                          listentry.get_item_id(), listentry.get_retailer_id(), listentry.get_user_id(),
                          listentry.get_list_id(),listentry.get_amount(), listentry.get_unit(), listentry.get_checked())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def update(self, listentry):
        cursor = self._cnx.cursor()
        command = "UPDATE listentry" + \
                  " SET name = ('{}'), creation_date = ('{}'), item_id = ('{}'), retailer_id = ('{}'),"\
                  " user_id = ('{}'), list_id = ('{}'), amount = ('{}'), unit = ('{}'), checked = ('{}') WHERE id LIKE ('{}')".format(
                    listentry.get_name(),
                    listentry.get_creation_date(),
                    listentry.get_item_id(),
                    listentry.get_retailer_id(),
                    listentry.get_user_id(),
                    listentry.get_list_id(),
                    listentry.get_amount(),
                    listentry.get_unit(),
                    listentry.get_checked(),
                    listentry.get_id()
                    )
        print("command:", command)
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def delete(self, listentry):

        cursor = self._cnx.cursor()
        command = "DELETE FROM listentry WHERE id LIKE ('{}')".format(listentry)
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


if __name__ == "__main__":
    with ListEntryMapper() as mapper:
        l = mapper.find_by_id(1)
        l.set_name("Sussia")
        print(l)
        mapper.update(l)
        print(mapper.find_by_id(1))
        #mapper.update(l)