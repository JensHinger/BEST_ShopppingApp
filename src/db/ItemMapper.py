from db.Mapper import Mapper
from bo.Item import Item


class ItemMapper(Mapper):

    def __init__(self):
        super().__init__()

    def build_bo(self, tuples):

        result = []

        if len(tuples) == 1:

            for (id, name, creation_date, amount, unit) in tuples:
                item = Item()
                item.set_id(id)
                item.set_name(name)
                item.set_creation_date(creation_date)
                item.set_amount(amount)
                item.set_unit(unit)
                result = item

        else:

            for (id, name, creation_date, amount, unit) in tuples:
                item = Item()
                item.set_id(id)
                item.set_name(name)
                item.set_creation_date(creation_date)
                item.set_amount(amount)
                item.set_unit(unit)
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
        pass

    def insert(self, item):
        pass

    def update(self, item):
        pass

    def delete(self, item):
        pass


if __name__ == "__main__":
    with ItemMapper() as mapper:
        result = mapper.find_all()
        print(result)