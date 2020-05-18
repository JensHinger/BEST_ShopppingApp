from bo.BusinessObject import BusinessObject


class ListEntry(BusinessObject):

    def __init__(self):
        super().__init__()
        self._item = None
        self._retailer = None
        self._user = None

    def get_item(self):
        """Auslesen des Produkts in dem Listeneintrag"""
        return self._item

    def set_item(self, item):
        """Setzen des Produktes in dem Listeneintrag"""
        self._item = item

    def get_retailer(self):
        """Auslesen des Einkaufsladen in dem Listeneintrag"""
        return self._retailer

    def set_retailer(self, retailer):
        """Setzen des Einkaufsladen in dem Listeneintrag"""
        self._retailer = retailer

    def get_user(self):
        """Auslesen des Zugehörigen Käufer in dem Listeneintrag"""
        return self._user
    
    def set_user(self, user):
        """Setzen des Zugehörigen Käufer in dem Listeneintrag"""
        self._user = user
