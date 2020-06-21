from bo.BusinessObject import BusinessObject


class List(BusinessObject):

    def __init__(self):
        super().__init__()
        self._partyl_id = None

    def get_partyl_id(self):
        """Auslesen der Gruppe in welcher die Liste existiert"""
        return self._partyl_id

    def set_partyl_id(self, party):
        """Setzen der Gruppe in welcher die Liste erstellt wurde"""
        self._partyl_id = party

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in einen Invitation()."""
        obj = List()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_name(dictionary["name"])
        obj.set_partyl_id(dictionary["partyl_id"])
        return obj

    def __str__(self):
        """Erzeugen eines Strings welcher das Objekt beschreibt"""
        return "List id: {}, name: {}, partyl_id: {} ".format(self.get_id(), self.get_name(), self.get_partyl_id())
