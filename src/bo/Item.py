from bo.BusinessObject import BusinessObject


class Item(BusinessObject):

    def __init__(self):
        super().__init__()
        self._amount = 0
        self._unit = 0

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
