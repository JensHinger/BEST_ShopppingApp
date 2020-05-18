from db.Mapper import Mapper
from bo.Invitation import Invitation


class InvitationMapper(Mapper):

    def __init__(self):
        super().__init__()

    def build_bo(self, tuples):
        result = []

        if len(tuples) == 1:
            for (id, creation_date, is_accepted, partyi_id, target_user, source_user) in tuples:
                invitation = Invitation()
                invitation.set_id(id)
                invitation.set_creation_date(creation_date)
                invitation.set_is_accepted(is_accepted)
                invitation.set_party(partyi_id)
                invitation.set_target_user(target_user)
                invitation.set_source_user(source_user)
                result = invitation
        else:
            for (id, creation_date, is_accepted, partyi_id, target_user, source_user) in tuples:
                invitation = Invitation()
                invitation.set_id(id)
                invitation.set_creation_date(creation_date)
                invitation.set_is_accepted(is_accepted)
                invitation.set_party(partyi_id)
                invitation.set_target_user(target_user)
                invitation.set_source_user(source_user)
                result.append(invitation)

        return result


    def find_all(self):
        cursor = self._cnx.cursor()
        command = "SELECT * FROM invitation"
        cursor.execute(command)
        tuples = cursor.fetchall()
        result = self.build_bo(tuples)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_id(self, id):
        cursor = self._cnx.cursor()
        command = "SELECT id, creation_date FROM party WHERE id LIKE '{}' ".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            result = self.build_bo(tuples)

        except IndexError:
            """Falls keine Party mit der angegebenen id gefunden werden konnte,
                wird hier None als Rückgabewert deklariert"""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_all_user_in_party(self, party):
        """Alle User einer party auslesen """
        cursor = self._cnx.cursor()
        command = "SELECT id, creation_date, is_accepted, partyi_id, target_user, source_user FROM invitation WHERE " \
                  "partyi_id LIKE '{}' ".format(party)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            result = self.build_bo(tuples)

        except IndexError:
            result = None

        return result

    def find_pend_invites_by_target_user(self, target_user):
        """Invite mit entsprechendem target user finden"""
        cursor = self._cnx.cursor()
        command = "SELECT id, creation_date, is_accepted, partyi_id, target_user, source_user FROM invitation WHERE " \
                  "target_user LIKE '{}' AND is_accepted = 0".format(target_user)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            result = self.build_bo(tuples)
        except IndexError:
            result = None
        return result

    def find_pend_invites_by_source_user(self, source_user):
        """Invite mit dem entsprechenden source user finden"""
        cursor = self._cnx.cursor()
        command = "SELECT id, creation_date, is_accepted, partyi_id, target_user, source_user FROM invitation WHERE " \
                  "source_user LIKE '{}' AND is_accepted = 0".format(source_user)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            result = self.build_bo(tuples)
        except IndexError:
            result = None
        return result

    def find_source_user(self, source_user):
        """Invite mit entsprechendem source user finden"""
        cursor = self._cnx.cursor()
        command = "SELECT id, creation_date, is_accepted, partyi_id, target_user, source_user FROM invitation WHERE " \
                  "source_user LIKE '{}' ".format(source_user)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            result = self.build_bo(tuples)
        except IndexError:
            result = None
        return result

    def find_target_user(self, target_user):
        """Invite mit entsprechendem target user finden"""
        cursor = self._cnx.cursor()
        command = "SELECT id, creation_date, is_accepted, partyi_id, target_user, source_user FROM invitation WHERE " \
                  "target_user LIKE '{}' ".format(target_user)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            result = self.build_bo(tuples)
        except IndexError:
            result = None
        return result

    def find_all_parties(self, target_user):
        "Alle parties zu denen ein bestimmter User gehört auslesen"
        cursor = self._cnx.cursor()
        command = "SELECT id, creation_date, is_accepted, partyi_id, target_user, source_user FROM invitation WHERE " \
                  "target_user LIKE '{}' AND is_accepted = 1 ".format(target_user)
        cursor.execute(command)
        tuples = cursor.fetchall()
        try:
            result = self.build_bo(tuples)
        except IndexError:
            result = None
        return result

    def find_all_pend_invites(self):
        """Alle Invites die noch nicht akzeptiert wurden auslesen"""
        cursor = self._cnx.cursor()
        command = "SELECT id, creation_date, is_accepted, partyi_id, target_user, source_user FROM invitation WHERE " \
                  " is_accepted = 0 "
        cursor.execute(command)
        tuples = cursor.fetchall()
        try:
            result = self.build_bo(tuples)
        except IndexError:
            result = None
        return result

    def insert(self, invitation):
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) as maxid from invitation")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            invitation.set_id(maxid[0] + 1)

        command = "INSERT INTO invation (id, creation_date, is_accepted, partyi_id, target_user, source_user) " \
                  "VALUES ('{}','{}','{}','{}', '{}, '{} )" \
                  .format(invitation.get_id(), invitation.get_creation_date(), invitation.get_is_accepted(),
                          invitation.get_party(), invitation.get_target_user(), invitation.get_source_user())
        cursor.execute(command)
        self._cnx.commit()
        cursor.close()

    def update(self, invitation):
        cursor = self._cnx.cursor()
        command = "UPDATE invitation SET creation_date = ('{}'), is_accepted = ('{}'), partyi_id = ('{}'), " \
                  "target_user = ('{}'), source_user = ('{}'), WHERE id = ('{}')" \
            .format(invitation.get_creation_date(), invitation.get_is_accepted(), invitation.get_party(),
                    invitation.get_target_user(), invitation.get_source_user(),invitation.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def delete(self, invitation):
        cursor = self._cnx.cursor()
        command = "DELETE FROM invitaion WHERE id = ('{}')".format(invitation.get_id())
        cursor.execute(command)
        self._cnx.commit()



