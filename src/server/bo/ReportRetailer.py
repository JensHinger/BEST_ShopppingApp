from server.bo.BusinessObject import BusinessObject


class ReportRetailer(BusinessObject):

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
        obj = ReportRetailer()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_name(dictionary["name"])
        return obj