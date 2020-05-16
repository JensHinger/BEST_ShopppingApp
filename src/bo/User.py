from bo.BusinessObject import BusinessObject


class User(BusinessObject):

    def __init__(self):
        super().__init__()
        self._email = ""
        self.google_id = ""

    def get_email(self):
        """Auslesen der Email des gewählten Users"""
        return self._email

    def set_email(self, email):
        """Setzen der Email des gewählten Users"""
        self._email = email

    def get_google_id(self):
        """Auslesen der google_id des gewählten Users"""
        return self.google_id

