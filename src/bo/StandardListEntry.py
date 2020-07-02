from bo.BusinessObject import BusinessObject


class StandardListEntry(BusinessObject):

    def __init__(self):
        super().__init__()
        self._item_id = 0
        self._retailer_id = 0
        self._user_id = 0
        self._party_id = 0

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

    def get_party_id(self):
        return self._party_id

    def set_party_id(self, party_id):
        self._party_id = party_id

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in einen Standardlistentry()."""
        obj = StandardListEntry()
        obj.set_name(dictionary["name"])
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_item_id(dictionary["item_id"])
        obj.set_party_id(dictionary["party_id"])
        obj.set_retailer_id(dictionary["retailer_id"])
        obj.set_user_id(dictionary["user_id"])
        return obj

    def __str__(self):
        """Erzeugen eines Strings welcher das Objekt beschreibt"""
        return "StandardListentry id: {}, name: {}, item_id: {}, retailer_id:{}, user_id: {}, party_id: {} ".format(
            self.get_id(),
            self.get_name(), self.get_item_id(), self.get_retailer_id(), self.get_user_id(), self.get_party_id(), )
