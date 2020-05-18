from bo.BusinessObject import BusinessObject


class Invitation(BusinessObject):
    """Diese Klasse bildet die Relation in der n zu m beziehung zwischen dem User und der Gruppe ab"""

    def __init__(self):
        super().__init__()
        self._partyi_id = None
        self._target_user_id = None
        self._source_user_id = None
        self._is_accepted = None


    def get_partyi_id(self):
        """Auslesen der Party"""
        return self._partyi_id

    def set_partyi_id(self, partyi_id):
        """Zugehörige Party wird festgelegt"""
        self._partyi_id = partyi_id

    def get_target_user_id(self):
        """Auslesen des Users welcher eingeladen wird (target-user)."""
        return self._target_user_id

    def set_target_user_id(self, target_user_id):
        """Setzen des Users welcher eingeladen wird (target-user)."""
        self._target_user_id = target_user_id

    def get_source_user_id(self):
        """Auslesen des Users welcher den target-user einlädt"""
        return self._source_user_id

    def set_source_user_id(self, source_user_id):
        """Setzen des Users welcher den target-user einlädt"""
        self._source_user_id = source_user_id

    def get_is_accepted(self):
        return self._is_accepted

    def set_is_accepted(self, boolean):
        self._is_accepted = boolean

