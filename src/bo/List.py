from bo.BusinessObject import BusinessObject


class List(BusinessObject):

    def __init__(self):
        super().__init__()
        self._party = None

    def get_group(self):
        """Auslesen der Gruppe in welcher die Liste existiert"""
        return self._party

    def set_group(self, party):
        """Setzen der Gruppe in welcher die Liste erstellt wurde"""
        self._party = party
