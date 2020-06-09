from src.bo.List import List
from src.bo.ListEntry import ListEntry
from src.bo.Item import Item
from src.bo.Invitation import Invitation
from src.bo.Party import Party
from src.bo.User import User

from src.db.ListMapper import ListMapper
from src.db.ListEntryMapper import ListEntryMapper
from src.db.ItemMapper import ItemMapper
from src.db.InvitationMapper import InvitationMapper
from src.db.PartyMapper import PartyMapper
from src.db.UserMapper import UserMapper

"""
Autoren: 
Michael Hofmann & René Hofmann

Diese Klasse aggregiert nahezu sämtliche Applikationslogik (engl. Business Logic).

Sie ist wie eine Spinne, die sämtliche Zusammenhänge in ihrem Netz (in unserem
Fall die Daten der Applikation) überblickt und für einen geordneten Ablauf und
dauerhafte Konsistenz der Daten und Abläufe sorgt.

Die Applikationslogik findet sich in den Methoden dieser Klasse. Jede dieser
Methoden kann als *Transaction Script* bezeichnet werden. Dieser Name
lässt schon vermuten, dass hier analog zu Datenbanktransaktion pro
Transaktion gleiche mehrere Teilaktionen durchgeführt werden, die das System
von einem konsistenten Zustand in einen anderen, auch wieder konsistenten
Zustand überführen. Wenn dies zwischenzeitig scheitern sollte, dann ist das
jeweilige Transaction Script dafür verwantwortlich, eine Fehlerbehandlung
durchzuführen.

Diese Klasse steht mit einer Reihe weiterer Datentypen in Verbindung. Diese
sind:
- die Klassen BusinessObject und deren Subklassen,
- die Mapper-Klassen für den DB-Zugriff.
"""


class ShoppingAdministration(object):

    def __init__(self):
        pass

    """
    Hier geht es um die Listen
    """

    def get_all_lists(self):
        """Alle Listen auslesen."""
        with ListMapper() as mapper:
            return mapper.find_all()

    def get_all_lists_by_partyl_id(self, partyl_id):
        """Alle Listen einer Party auslesen."""
        with ListMapper() as mapper:
            return mapper.find_by_partyl_id(partyl_id)

    def get_list_by_id(self, id):
        """Eine Liste anhand ihrer ID auslesen."""
        with ListMapper() as mapper:
            return mapper.find_by_id(id)

    def create_list(self, name, partyl_id):
        """Eine Liste anlegen."""
        list = List()
        list.set_name(name)
        list.set_partyl_id(partyl_id)

        with ListMapper() as mapper:
            return mapper.insert(list)

    def update_list(self, list):
        """Eine Liste updaten."""
        with ListMapper as mapper:
            mapper.update(list)

    def delete_list(self, list):
        """Eine Liste löschen."""
        with ListMapper as mapper:
            mapper.delete(list)

    """
    Hier geht es um die Listentrys
    """

    def get_all_listentries(self):
        """Alle Listeneinträge auslesen."""
        with ListEntryMapper() as mapper:
            return mapper.find_all()

    def get_listentry_by_id(self, id):
        """Einen Listeneintrag auslesen."""
        with ListEntryMapper() as mapper:
            return mapper.find_by_id(id)

    def create_listentry(self, name, item_id, retailer_id, user_id, list_id):
        """Einen Listeneintrag erstellen."""
        listentry = ListEntry()
        listentry.set_name(name)
        listentry.set_item_id(item_id)
        listentry.set_retailer_id(retailer_id)
        listentry.set_user_id(user_id)
        listentry.set_list_id(list_id)

        with ListEntryMapper() as mapper:
            mapper.insert(listentry)

    def update_listentry(self, listentry):
        """Einen Listeneintrag updaten."""
        with ListEntryMapper() as mapper:
            mapper.update(listentry)

    def delete_listentry(self, listentry):
        """Einen Listeneintrag löschen."""
        with ListEntryMapper() as mapper:
            mapper.delete(listentry)

    """
    Ab hier geht es um Items.
    """

    def get_all_items(self):
        """Alle Items auslesen."""
        with ItemMapper() as mapper:
            return mapper.find_all()

    def get_item_by_id(self, id):
        """Ein Item anhand seiner ID auslesen."""
        with ItemMapper() as mapper:
            return mapper.find_by_id(id)

    def create_item(self, name, amount, unit):
        """Ein Item anlegen."""
        item = Item()
        item.set_name(name)
        item.set_amount(amount)
        item.set_unit(unit)

        with ListMapper() as mapper:
            mapper.insert(item)

    def update_item(self, item):
        """Ein Item updaten."""
        with ItemMapper() as mapper:
            mapper.update(item)

    def delete_item(self, item):
        """Ein Item löschen."""
        with ItemMapper() as mapper:
            mapper.delete(item)

    """ 
    Hier geht es um die Invitation
    """

    def get_all_invitation(self):
        """Alle Invitations auslesen."""
        with InvitationMapper() as mapper:
            return mapper.find_all()

    def get_invitation_by_id(self, id):
        """Invitations nach id auslesen."""
        with InvitationMapper() as mapper:
            return mapper.find_by_id(id)

    def get_all_user_in_party(self, partyi_id):
        """Alle User einer Party auslesen."""
        with InvitationMapper() as mapper:
            return mapper.find_all_user_in_party(partyi_id)

    def get_pen_invites_by_target_user(self, target_user_id):
        """Alle pending-Invitations von dem Target-User auslesen."""
        with InvitationMapper() as mapper:
            return mapper.find_pend_invites_by_target_user(target_user_id)

    def get_pen_invites_by_source_user(self, source_user_id):
        """Alle Invitations von Source-User auslesen."""
        with InvitationMapper() as mapper:
            return mapper.find_pend_invites_by_source_user(source_user_id)

    def get_source_user_by_id(self, source_user_id):
        """Den source-user auslesen."""
        with InvitationMapper() as mapper:
            return mapper.find_source_user(source_user_id)

    def get_target_user_by_id(self, target_user_id):
        """Den target-user auslesen."""
        with InvitationMapper() as mapper:
            return mapper.find_target_user(target_user_id)

    def get_all_parties_corr_user(self, target_user_id):
        """Alle Parties zu denen ein User gehört auslesen."""
        with InvitationMapper() as mapper:
            return mapper.find_all_parties_corr_user(target_user_id)

    def get_all_pend_invites(self):
        """Alle pending-invitations auslesen."""
        with InvitationMapper() as mapper:
            return mapper.find_all_pend_invites()

    def create_invitation(self, partyi_id, target_user_id, source_user_id):
        """Eine Invitation erstellen."""
        invitation = Invitation()
        invitation.set_partyi_id(partyi_id)
        invitation.set_target_user_id(target_user_id)
        invitation.set_source_user_id(source_user_id)

        with InvitationMapper() as mapper:
            mapper.insert(invitation)

    def update_invitation(self, invitation):
        """Invitation updaten/speichern."""
        with InvitationMapper() as mapper:
            mapper.update(invitation)

    def delete_invitation(self, invitation):
        """Eine Invitation löschen."""
        with InvitationMapper() as mapper:
            mapper.delete(invitation)

    """
    Hier geht es um die Party
    """

    def get_all_parties(self):
        """Alle Gruppen auslesen."""
        with PartyMapper() as mapper:
            mapper.find_all()

    def get_party_by_id(self, id):
        """Eine Gruppe anhand der ID auslesen."""
        with PartyMapper() as mapper:
            mapper.find_by_id(id)

    def create_party(self, name):
        """Eine Gruppe erstellen."""
        party = Party()
        party.set_name(name)

        with PartyMapper() as mapper:
            mapper.insert(party)

    def update_party(self, party):
        """Eine Gruppe updaten."""
        with PartyMapper() as mapper:
            mapper.update(party)

    def delete_party(self, party):
        """Eine Gruppe löschen."""
        with PartyMapper() as mapper:
            mapper.delete(party)

    """
    Hier geht es um den User
    """

    def get_all_users(self):
        """Alle User auslesen."""
        with UserMapper() as mapper:
            mapper.find_all()

    def get_user_by_email(self, email):
        """Einen User nach der email auslesen."""
        with UserMapper() as mapper:
            mapper.find_user_by_email(email)

    def get_user_by_google_id(self, google_id):
        """Einen User nach der Google-ID auslesen."""
        with UserMapper() as mapper:
            mapper.find_user_by_google_id(google_id)

    def get_user_by_id(self, id):
        """Einen User nach seiner ID auslesen"""
        with UserMapper() as mapper:
            mapper.find_by_id(id)

    def create_user(self, name, email, google_id):
        """Einen User erstellen."""
        user = User()
        user.set_name(name)
        user.set_email(email)
        user.set_google_id(google_id)

        with UserMapper() as mapper:
            mapper.insert(user)

    def update_user(self, user):
        """Einen User updaten."""
        with UserMapper() as mapper:
            mapper.update(user)

    def delete_user(self, user):
        """Einen User löschen."""
        with UserMapper() as mapper:
            mapper.delete(user)

