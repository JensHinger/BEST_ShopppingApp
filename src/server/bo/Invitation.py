from server.bo.BusinessObject import BusinessObject


class Invitation(BusinessObject):
    """Diese Klasse bildet die Relation in der n zu m beziehung zwischen dem User und der Gruppe ab"""

    def __init__(self):
        super().__init__()
        self._partyi_id = None
        self._target_user_id = None
        self._source_user_id = None
        self._is_accepted = 0


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
        """Auslesen, ob die Invitation angenommen wurde"""
        return self._is_accepted

    def set_is_accepted(self, is_accepted):
        """Setzen der Invitation"""
        self._is_accepted = is_accepted

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in einen Invitation()."""
        obj = Invitation()
        obj.set_id(dictionary["id"])
        obj.set_is_accepted(dictionary["is_accepted"])
        obj.set_source_user_id(dictionary["source_user_id"])
        obj.set_target_user_id(dictionary["target_user_id"])
        obj.set_partyi_id(dictionary["partyi_id"])
        return obj

    def __str__(self):
        """Erzeugen eines Strings welcher das Objekt beschreibt"""
        return "Invitation id: {}, name: {}, is_accepted: {}, source_user_id: {}, target_user_id:{}," \
               " partyi_id: {} ".format(self.get_id(), self.get_name(), self.get_is_accepted(),
                                        self.get_source_user_id(), self.get_target_user_id(), self.get_partyi_id())
