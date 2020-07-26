from server.db.Mapper import Mapper
from server.bo.Invitation import Invitation


class InvitationMapper(Mapper):

    def __init__(self):
        super().__init__()

    def build_bo(self, tuples):
        result = []

        if len(tuples) == 1:
            "Baue nur einen"
            for (id, creation_date, is_accepted, partyi_id, target_user_id, source_user_id) in tuples:
                invitation = Invitation()
                invitation.set_id(id)
                invitation.set_creation_date(creation_date)
                invitation.set_is_accepted(is_accepted)
                invitation.set_partyi_id(partyi_id)
                invitation.set_target_user_id(target_user_id)
                invitation.set_source_user_id(source_user_id)
                result = invitation
        else:
            "Baue mehrere"
            for (id, creation_date, is_accepted, partyi_id, target_user_id, source_user_id) in tuples:
                invitation = Invitation()
                invitation.set_id(id)
                invitation.set_creation_date(creation_date)
                invitation.set_is_accepted(is_accepted)
                invitation.set_partyi_id(partyi_id)
                invitation.set_target_user_id(target_user_id)
                invitation.set_source_user_id(source_user_id)
                result.append(invitation)

        return result

    def set_source_user_one(self, invitation):
        cursor = self._cnx.cursor()
        command = "UPDATE invitation SET source_user = 1 WHERE id LIKE ('{}')".format(invitation.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

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
        command = "SELECT id, creation_date, is_accepted, partyi_id, target_user, source_user " \
                  "FROM invitation WHERE id LIKE '{}' ".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()
        print(tuples)

        try:
            result = self.build_bo(tuples)

        except IndexError:
            """Falls keine Party mit der angegebenen id gefunden werden konnte,
                wird hier None als Rückgabewert deklariert"""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_all_invitations_by_party(self, partyi_id):
        """Alle Invitations auslesen, bei denen der FK = partyi_id ist """
        cursor = self._cnx.cursor()
        command = "SELECT id, creation_date, is_accepted, partyi_id, target_user, source_user FROM invitation WHERE " \
                  "partyi_id LIKE '{}'".format(partyi_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            result = self.build_bo(tuples)
        except IndexError:
            result = None
        return result

    def find_all_invitations_by_target_user(self, target_user_id):
        """Alle Invitations auslesen, bei denen der FK = partyi_id ist """
        cursor = self._cnx.cursor()
        command = "SELECT id, creation_date, is_accepted, partyi_id, target_user, source_user FROM invitation WHERE " \
                  "target_user LIKE '{}'".format(target_user_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            result = self.build_bo(tuples)
        except IndexError:
            result = None
        return result

    def find_all_invitations_by_source_user(self, source_user_id):
        """Alle Invitations auslesen, bei denen der FK = partyi_id ist """
        cursor = self._cnx.cursor()
        command = "SELECT id, creation_date, is_accepted, partyi_id, target_user, source_user FROM invitation WHERE " \
                  "source_user LIKE '{}'".format(source_user_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            result = self.build_bo(tuples)
        except IndexError:
            result = None
        return result

    def find_all_pend_user_in_party(self, partyi_id):
        """Alle User einer party auslesen, gibt nur die ID zurück """
        cursor = self._cnx.cursor()
        command = "SELECT id, creation_date, is_accepted, partyi_id, target_user, source_user FROM invitation WHERE " \
                  "partyi_id LIKE '{}' AND is_accepted = 0".format(partyi_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            result = self.build_bo(tuples)
        except IndexError:
            result = None
        return result

    def find_all_accepted_user_in_party(self, partyi_id):
        """Alle User einer party auslesen, gibt nur die ID zurück """
        cursor = self._cnx.cursor()
        command = "SELECT id, creation_date, is_accepted, partyi_id, target_user, source_user FROM invitation WHERE " \
                  "partyi_id LIKE '{}' AND is_accepted = 1".format(partyi_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            result = self.build_bo(tuples)
        except IndexError:
            result = None
        return result

    def find_pend_invites_by_target_user(self, target_user_id):
        """Nicht angenommene invites mit entsprechendem target user finden"""
        cursor = self._cnx.cursor()
        command = "SELECT id, creation_date, is_accepted, partyi_id, target_user, source_user FROM invitation WHERE " \
                  "target_user LIKE '{}' AND is_accepted = 0".format(target_user_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            result = self.build_bo(tuples)
        except IndexError:
            result = None
        return result

    def find_pend_invites_by_source_user(self, source_user_id):
        """Invite mit dem entsprechenden source user finden"""
        cursor = self._cnx.cursor()
        command = "SELECT id, creation_date, is_accepted, partyi_id, target_user, source_user FROM invitation WHERE " \
                  "source_user LIKE '{}' AND is_accepted = 0".format(source_user_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            result = self.build_bo(tuples)
        except IndexError:
            result = None
        return result

    def find_accepted_invites_by_source_user(self, source_user_id):
        """Invite mit entsprechendem source user finden"""
        cursor = self._cnx.cursor()
        command = "SELECT id, creation_date, is_accepted, partyi_id, target_user, source_user FROM invitation WHERE " \
                  "source_user LIKE '{}' AND is_accepted = 1 ".format(source_user_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            result = self.build_bo(tuples)
        except IndexError:
            result = None
        return result

    def find_accepted_invites_by_target_user(self, target_user_id):
        """Invite mit entsprechendem target user finden"""
        cursor = self._cnx.cursor()
        command = "SELECT id, creation_date, is_accepted, partyi_id, target_user, source_user FROM invitation WHERE " \
                  "target_user LIKE '{}' AND is_accepted = 1".format(target_user_id)
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
            if maxid[0] is None:
                invitation.set_id(1)
            else:
                invitation.set_id(maxid[0] + 1)

        command = "INSERT INTO invitation (id, creation_date, is_accepted, partyi_id, target_user, source_user) " \
                  "VALUES ('{}','{}','{}','{}', '{}', '{}' )" \
                  .format(invitation.get_id(), invitation.get_creation_date(), invitation.get_is_accepted(),
                          invitation.get_partyi_id(), invitation.get_target_user_id(), invitation.get_source_user_id())
        cursor.execute(command)
        self._cnx.commit()
        cursor.close()

    def update(self, invitation):
        cursor = self._cnx.cursor()
        command = "UPDATE invitation SET creation_date = ('{}'), is_accepted = ('{}'), partyi_id = ('{}'), " \
                  "target_user = ('{}'), source_user = ('{}') WHERE id = ('{}')" \
            .format(invitation.get_creation_date(), invitation.get_is_accepted(), invitation.get_partyi_id(),
                    invitation.get_target_user_id(), invitation.get_source_user_id(), invitation.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def delete(self, invitation):
        cursor = self._cnx.cursor()
        command = "DELETE FROM invitation WHERE id = ('{}')".format(invitation.get_id())
        cursor.execute(command)
        self._cnx.commit()

if (__name__ == "__main__"):
    with InvitationMapper() as mapper:
        #Nach mapper jegliche Methode dieser Klasse
        testinv = mapper.find_by_id(6)
        mapper.delete(testinv)
        thisinv = mapper.find_by_id(7)
        mapper.delete(thisinv)

