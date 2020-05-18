from bo.BusinessObject import BusinessObject


class Item(BusinessObject):

    def __init__(self):
        super().__init__()
        self._unit = ""
        self._amount = 0
