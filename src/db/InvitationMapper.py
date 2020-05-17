from db.Mapper import Mapper
from bo.Invitation import Invitation

#find all Users in party
#find User in party

class InvitationMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        pass

    def find_by_id(self, id):
        pass

    def find_all_user_in_party(self, party):
        """Alle User """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, creation_date, is_accepted, partyi_id, target_user, source_user FROM invitation WHERE " \
                  "partyi_id LIKE '{}' ".format(party)
        cursor.execute(command)
        tuples = cursor.fetchall()
        try:
            for (id, creation_date, is_accepted, partyi_id, target_user, source_user) in tuples:
                invitation = Invitation()
                invitation.set_id(id)
                invitation.set_creation_date(creation_date)
                invitation.set_is_accepted(is_accepted)
                invitation.set_party(partyi_id)




