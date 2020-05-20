from src.bo.List import List
from src.bo.ListEntry import ListEntry
from src.bo.Item import Item

from src.db.ListMapper import ListMapper
from src.db.ListEntryMapper import ListEntryMapper
from src.db.ItemMapper import ItemMapper

"""
Autoren: 
Michael Hofmann & René Hofmann

Diese Klasse aggregiert nahezu sämtliche Applikationslogik (engl. Business Logic).

Sie ist wie eine Spinne, die sämtliche Zusammenhänge in ihrem Netz (in unserem
Fall die Daten der Applikation) überblickt und für einen geordneten Ablauf und
dauerhafte Konsistenz der Daten und Abläufe sorgt.

Die Applikationslogik findet sich in den Methoden dieser Klasse. Jede dieser
Methoden kann als *Transaction Script* bezeichnet werden. Dieser Name
lässt schon vermuten, dass hier analog zu Datenbanktransaktion pro
Transaktion gleiche mehrere Teilaktionen durchgeführt werden, die das System
von einem konsistenten Zustand in einen anderen, auch wieder konsistenten
Zustand überführen. Wenn dies zwischenzeitig scheitern sollte, dann ist das
jeweilige Transaction Script dafür verwantwortlich, eine Fehlerbehandlung
durchzuführen.

Diese Klasse steht mit einer Reihe weiterer Datentypen in Verbindung. Diese
sind:
- die Klassen BusinessObject und deren Subklassen,
- die Mapper-Klassen für den DB-Zugriff.
"""


class ShoppingAdministration(object):
    def __init__(self):
        pass


    """
    Hier geht es um die Listen
    """


    def get_all_Lists(self):
        """Alle Listen auslesen."""
        with ListMapper() as mapper:
            return mapper.find_all()

    def get_all_Lists_by_party(self, party):
        """Alle Listen einer Party auslesen."""
        with ListMapper() as mapper:
            return mapper.find_by_party(party)

    def get_List_by_id(self, id):
        """Eine Liste anhand ihrer ID auslesen."""
        with ListMapper() as mapper:
            return mapper.find_by_id(id)

    def create_List(self, name, partyl_id):
        """Eine Liste anlegen."""
        list = List()
        list.set_name(name)
        list.set_partyl_id(partyl_id)

        with ListMapper() as mapper:
            return mapper.insert(list)

    def update_List(self, list):
        """Eine Liste updaten."""
        with ListMapper as mapper:
            mapper.update(list)

    def delete_List(self, list):
        """Eine Liste löschen."""
        with ListMapper as mapper:
            mapper.delete(list)


    """
    Hier geht es um die Listentrys
    """


    def get_all_Listentrys(self):
        """Alle Listeneinträge auslesen."""
        with ListEntryMapper() as mapper:
            return mapper.find_all()

    def get_all_Listentrys_by_party(self, party):
        """Alle Listeneinträge einer Party auslesen."""
        with ListEntryMapper() as mapper:
            return mapper.find_by_party(party)

    def get_Listentry_by_id(self, id):
        """Einen Listeneintrag auslesen."""
        with ListEntryMapper() as mapper:
            return mapper.find_by_id(id)

    def create_Listentry(self, name, item_id, retailer_id, user_id, list_id):
        """Einen Listeneintrag erstellen."""
        listentry = ListEntry()
        listentry.set_name(name)
        listentry.set_item_id(item_id)
        listentry.set_retailer_id(retailer_id)
        listentry.set_user_id(user_id)
        listentry.set_list_id(list_id)

        with ListEntryMapper() as mapper:
            mapper.insert(listentry)

    def update_Listentry(self, listentry):
        """Einen Listeneintrag updaten."""
        with ListEntryMapper() as mapper:
            mapper.update(listentry)

    def delete_Listentry(self, listentry):
        """Einen Listeneintrag löschen."""
        with ListEntryMapper() as mapper:
            mapper.delete(listentry)


    """
    Ab hier geht es um Items.
    """


    def get_all_Items(self):
        """Alle Items auslesen."""
        with ItemMapper() as mapper:
            return mapper.find_all()

    def get_all_Items_by_party(self, party):
        """Alle Items einer Party auslesen."""
        with ItemMapper() as mapper:
            return mapper.find_by_party(party)

    def get_Item_by_id(self, id):
        """Ein Item anhand seiner ID auslesen."""
        with ItemMapper() as mapper:
            return mapper.find_by_id(id)

    def create_Item(self, name, amount, unit):
        """Ein Item anlegen."""
        item = Item()
        item.set_name(name)
        item.set_amount(amount)
        item.set_unit(unit)

        with ListMapper() as mapper:
            mapper.insert(item)

    def update_Item(self, item):
        """Ein Item updaten."""
        with ItemMapper() as mapper:
            mapper.update(item)

    def delete_Item(self, item):
        """Ein Item löschen."""
        with ItemMapper() as mapper:
            mapper.delete(item)

