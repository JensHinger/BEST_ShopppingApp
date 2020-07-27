from server.bo.BusinessObject import BusinessObject
from datetime import datetime
class ListEntry(BusinessObject):

    def __init__(self):
        super().__init__()
        self._item_id = 0
        self._retailer_id = 0
        self._user_id = 0
        self._list_id = 0
        self._checked = 0
        self._amount = 0
        self._unit = 0

    def get_item_id(self):
        """Auslesen des Produkts in dem Listeneintrag"""
        return self._item_id

    def set_item_id(self, item_id):
        """Setzen des Produktes in dem Listeneintrag"""
        self._item_id = item_id

    def get_retailer_id(self):
        """Auslesen des Einkaufsladen in dem Listeneintrag"""
        return self._retailer_id

    def set_retailer_id(self, retailer_id):
        """Setzen des Einkaufsladen in dem Listeneintrag"""
        self._retailer_id = retailer_id

    def get_user_id(self):
        """Auslesen des Zugehörigen Käufer in dem Listeneintrag"""
        return self._user_id

    def set_user_id(self, user_id):
        """Setzen des Zugehörigen Käufer in dem Listeneintrag"""
        self._user_id = user_id

    def get_list_id(self):
        """Au slesen der übergeordneten Liste des Listenelement"""
        return self._list_id

    def set_list_id(self, list_id):
        """Setzen der Übergeordneten Liste des Listenelements"""
        self._list_id = list_id

    def get_amount(self):
        """Auslesen der gewünschten Kaufmenge"""
        return self._amount

    def set_amount(self, amount):
        """Setzen der gewünschten Kaufmenge"""
        self._amount = amount

    def get_unit(self):
        """Auslesen der Einheit des gewünschten Artikels"""
        return self._unit

    def set_unit(self, unit):
        """Setzen der Einheit des gewünschten Artikels"""
        self._unit = unit

    def get_checked(self):
        """Auslesen des checked Status"""
        return self._checked

    def set_checked(self, condition):
        """Setzen des checked Status"""
        self._checked = condition

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in einen listentry()."""
        obj = ListEntry()
        obj.set_name(dictionary["name"])
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_item_id(dictionary["item_id"])
        obj.set_list_id(dictionary["list_id"])
        obj.set_retailer_id(dictionary["retailer_id"])
        obj.set_user_id(dictionary["user_id"])
        obj.set_amount(dictionary["amount"])
        obj.set_unit(dictionary["unit"])
        obj.set_checked(dictionary["checked"])
        return obj

    def __str__(self):
        """Erzeugen eines Strings welcher das Objekt beschreibt"""
        return "Listentry id: {}, name: {}, creation_date {}, item_id: {}, retailer_id:{}, " \
               "user_id: {}, list_id: {}, checked: {} "\
            .format(self.get_id(), self.get_name(), self.get_creation_date(), self.get_item_id(),
                    self.get_retailer_id(), self.get_user_id(), self.get_list_id(), self.get_amount(), self.get_unit(), self.get_checked())