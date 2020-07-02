from bo.BusinessObject import BusinessObject


class Report(BusinessObject):

    def __init__(self, owner, selected_party, selected_retailer, selected_item, start_time, end_time):
        super().__init__()
        self._owner = owner
        self._selected_party = selected_party
        self._selected_retailer = selected_retailer
        self._selected_item = selected_item
        self._start_time = start_time
        self._end_time = end_time

    def get_owner(self):
        """Auslesen des Nutzers, welcher einen Report erstellen möchte."""
        return self._owner

    def set_owner(self, owner):
        """Setzen des Nutzers, welcher einen Report erstellen möchte."""
        self._owner = owner

    def get_selected_party(self):
        """Auslesen der ausgewählten Party"""
        return self._selected_party

    def set_selected_party(self, selected_party):
        """Setzen der ausgewählten Party"""
        self._selected_party = selected_party

    def get_selected_retailer(self):
        """Auslesen des ausgewählten Retailer"""
        return self._selected_retailer

    def set_selected_retailer(self, selected_retailer):
        """Setzen der ausgewählten Party"""
        self._selected_retailer = selected_retailer

    def get_selected_item(self):
        """Auslesen des ausgewählten Artikels"""
        return self._selected_item

    def set_selected_item(self, selected_item):
        """Setzen der ausgewählten Artikels"""
        self._selected_item = selected_item

    def get_start_time(self):
        """Auslesen der ausgewählten Start-Time"""
        return self._start_time

    def set_start_time(self, start_time):
        """Setzen der ausgewählten Start-Time"""
        self._start_time = start_time

    def get_end_time(self):
        """Auslesen der ausgewählten End-Time"""
        return self._end_time

    def set_end_time(self, end_time):
        """Setzen der ausgwählten end_time"""
        self._end_time = end_time
