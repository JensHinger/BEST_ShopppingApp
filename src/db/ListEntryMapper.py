from db.Mapper import Mapper
from bo.ListEntry import ListEntry


class ListEntryMapper(Mapper):

    def __init__(self):
        super().__init__()

    def build_bo(self, tuples):

        result = []

        if len(tuples) == 1:

            for (id, name, creation_date, item, retailer, user) in tuples:
                listentry = ListEntry()
                listentry.set_id(id)
                listentry.set_name(name)
                listentry.set_creation_date(creation_date)
                listentry.set_item(item)
                listentry.set_retailer(retailer)
                listentry.set_user(user)
                result = listentry

        else:

            for (id, name, creation_date, item, retailer, user) in tuples:
                listentry = ListEntry()
                listentry.set_id(id)
                listentry.set_name(name)
                listentry.set_creation_date(creation_date)
                listentry.set_item(item)
                listentry.set_retailer(retailer)
                listentry.set_user(user)
                result = listentry

        return result

    def find_all(self):
        pass

    def find_by_id(self, id):
        pass

    def insert(self, object):
        pass

    def update(self, object):
        pass

    def delete(self, object):
        pass


if __name__ == "__main__":
    with ListEntryMapper() as mapper:
        result = mapper.find_all()
        print(result)