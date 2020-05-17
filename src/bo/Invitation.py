from bo.BusinessObject import BusinessObject


class Invitation(BusinessObject):
    """Diese Klasse bildet die Relation in der n zu m beziehung zwischen dem User und der Gruppe ab"""

    def __init__(self):
        super().__init__()
        self._party = None
        self._target_user = None
        self._source_user = None
        self._is_accepted = None


    def get_party(self):
        """Auslesen der Party"""
        return self._party

    def set_party(self, party):
        """Zugehörige Party wird festgelegt"""
        self._party = party

    def get_target_user(self):
        """Auslesen des Users welcher eingeladen wird (target-user)."""
        return self._target_user

    def set_target_user(self, target_user):
        """Setzen des Users welcher eingeladen wird (target-user)."""
        self._target_user = target_user

    def get_source_user(self):
        """Auslesen des Users welcher den target-user einlädt"""
        return self._source_user

    def set_source_user(self, source_user):
        """Setzen des Users welcher den target-user einlädt"""
        self._source_user = source_user

    def get_is_accepted(self):
        return self._is_accepted

    def set_is_accepted(self, boolean):
        self._is_accepted = boolean

