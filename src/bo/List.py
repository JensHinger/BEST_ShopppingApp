from bo.BusinessObject import BusinessObject


class List(BusinessObject):

    def __init__(self):
        super().__init__()
        self._partyl_id = 0

    def get_partyl_id(self):
        """Auslesen der Gruppe in welcher die Liste existiert"""
        return self._partyl_id

    def set_partyl_id(self, party):
        """Setzen der Gruppe in welcher die Liste erstellt wurde"""
        self._partyl_id = party
