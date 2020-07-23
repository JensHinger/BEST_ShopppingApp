from server.bo.BusinessObject import BusinessObject


class Item(BusinessObject):

    def __init__(self):
        super().__init__()

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in einen listentry()."""
        obj = Item()
        obj.set_name(dictionary["name"])
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        return obj

    def __str__(self):
        """Erzeugen eines Strings welcher das Objekt beschreibt"""
        return "Item id: {}, name: {}".format(self.get_id(), self.get_name())
