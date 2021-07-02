from server.db.Mapper import Mapper
from server.bo.StandardListEntry import StandardListEntry


class StandardListEntryMapper(Mapper):

    def __init__(self):
        super().__init__()

    def build_bo(self, tuples):

        result = []

        if len(tuples) == 1:

            for (id, name, creation_date, item_id, retailer_id, user_id, party_id, amount, unit) in tuples:
                standardlistentry = StandardListEntry()
                standardlistentry.set_id(id)
                standardlistentry.set_name(name)
                standardlistentry.set_creation_date(creation_date)
                standardlistentry.set_item_id(item_id)
                standardlistentry.set_retailer_id(retailer_id)
                standardlistentry.set_user_id(user_id)
                standardlistentry.set_party_id(party_id)
                standardlistentry.set_amount(amount)
                standardlistentry.set_unit(unit)
                result = standardlistentry

        else:

            for (id, name, creation_date, item_id, retailer_id, user_id, party_id, amount, unit) in tuples:
                standardlistentry = StandardListEntry()
                standardlistentry.set_id(id)
                standardlistentry.set_name(name)
                standardlistentry.set_creation_date(creation_date)
                standardlistentry.set_item_id(item_id)
                standardlistentry.set_retailer_id(retailer_id)
                standardlistentry.set_user_id(user_id)
                standardlistentry.set_party_id(party_id)
                standardlistentry.set_amount(amount)
                standardlistentry.set_unit(unit)
                result.append(standardlistentry)

        return result

    def set_sle_user_one(self, standard_listentry):
        cursor = self._cnx.cursor()
        command = "UPDATE standardlistentry SET user_id = 1 WHERE id LIKE ('{}')".format(standard_listentry.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def find_all(self):

        result = []

        cursor = self._cnx.cursor()
        command = "SELECT * FROM standardlistentry"
        cursor.execute(command)
        tuples = cursor.fetchall()

        result = self.build_bo(tuples)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_id(self, id):

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, name, creation_date, item_id, retailer_id, user_id, party_sle_id, amount, unit " \
                  "FROM standardlistentry WHERE id LIKE ('{}')".format(id)
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

    def find_by_party_id(self, party_id):
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, name, creation_date, item_id, retailer_id, user_id, party_sle_id, amount, unit " \
                  "FROM standardlistentry WHERE party_sle_id LIKE ('{}')".format(party_id)
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

    def find_user_by_id(self, user_id):
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, name, creation_date, item_id, retailer_id, user_id, party_sle_id, amount, unit " \
                  "FROM standardlistentry WHERE user_id LIKE ('{}')".format(user_id)
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

    def insert(self, standardlistentry):

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) as maxid from standardlistentry")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is None:
                standardlistentry.set_id(1)
            else:
                standardlistentry.set_id(maxid[0] + 1)


        command = "INSERT INTO standardlistentry " \
                  "(id, name, creation_date, item_id, retailer_id, user_id, party_sle_id, amount, unit) " \
                  "VALUES ('{}','{}','{}','{}','{}','{}','{}','{}','{}')".format(standardlistentry.get_id(),
                  standardlistentry.get_name(), standardlistentry.get_creation_date(), standardlistentry.get_item_id(),
                  standardlistentry.get_retailer_id(), standardlistentry.get_user_id(), standardlistentry.get_party_id(),
                  standardlistentry.get_amount(), standardlistentry.get_unit())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def update(self, standardlistentry):

        cursor = self._cnx.cursor()
        command = "UPDATE standardlistentry SET name = ('{}'), creation_date = ('{}'), item_id = ('{}'), " \
                  "retailer_id = ('{}'), user_id = ('{}'), party_sle_id = ('{}'), amount = ('{}'), unit = ('{}') " \
                  " WHERE id LIKE ('{}')".format(standardlistentry.get_name(), standardlistentry.get_creation_date(),
                  standardlistentry.get_item_id(), standardlistentry.get_retailer_id(), standardlistentry.get_user_id(),
                  standardlistentry.get_party_id(), standardlistentry.get_amount(), standardlistentry.get_unit(),
                  standardlistentry.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def delete(self, listentry):

        cursor = self._cnx.cursor()
        command = "DELETE FROM standardlistentry WHERE id LIKE ('{}')".format(listentry.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


if __name__ == "__main__":
    with StandardListEntryMapper() as mapper:
        result = mapper.find_by_id(3)
        result.set_retailer_id(2)
        mapper.update(result)
