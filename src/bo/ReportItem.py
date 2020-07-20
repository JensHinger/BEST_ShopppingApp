from bo.BusinessObject import BusinessObject


class ReportItem(BusinessObject):

    def __init__(self):
        super().__init__()
        self._commonness = 0

    def get_commonness(self):
        return self._commonness

    def set_commonness(self, value):
        self._commonness = value

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in einen listentry()."""
        obj = ReportItem()
        obj.set_name(dictionary["name"])
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        return obj

    def __str__(self):
        """Erzeugen eines Strings welcher das Objekt beschreibt"""
        return "Item id: {}, name: {}, commonness: {}".format(self.get_id(), self.get_name(), self.get_commonness())
