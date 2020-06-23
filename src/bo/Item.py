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

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in einen listentry()."""
        obj = Item()
        obj.set_name(dictionary["name"])
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_amount(dictionary["amount"])
        obj.set_unit(dictionary["unit"])
        return obj

    def __str__(self):
        """Erzeugen eines Strings welcher das Objekt beschreibt"""
        return "Item id: {}, name: {}, amount: {}, unit:{}".format(self.get_id(), self.get_name(),
                                                                   self.get_unit(), self.get_amount())
