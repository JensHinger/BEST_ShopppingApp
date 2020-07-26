import collections

from server.bo.List import List
from server.bo.ListEntry import ListEntry
from server.bo.Item import Item
from server.bo.Invitation import Invitation
from server.bo.Party import Party
from server.bo.User import User
from server.bo.StandardListEntry import StandardListEntry
from server.bo.Retailer import Retailer

from server.db.ListMapper import ListMapper
from server.db.ListEntryMapper import ListEntryMapper
from server.db.ItemMapper import ItemMapper
from server.db.InvitationMapper import InvitationMapper
from server.db.PartyMapper import PartyMapper
from server.db.UserMapper import UserMapper
from server.db.StandardListEntryMapper import StandardListEntryMapper
from server.db.RetailerMapper import RetailerMapper

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
        with ListMapper() as mapper:
            mapper.update(list)

    def delete_list(self, list):
        """Eine Liste löschen."""
        listentries = self.get_listentry_by_list_id(list.get_id())
        for listentry in listentries:
            self.delete_listentry(listentry.get_id())

        with ListMapper() as mapper:
            mapper.delete(list)

    """
    Hier geht es um die Listentrys
    """

    def set_user_one(self, listentry):
        with ListEntryMapper() as mapper:
            return mapper.set_user_one(listentry)

    def get_all_listentries(self):
        """Alle Listeneinträge auslesen."""
        with ListEntryMapper() as mapper:
            return mapper.find_all()

    def get_listentry_by_list_id(self, list_id):
        with ListEntryMapper() as mapper:
            return mapper.find_by_list_id(list_id)

    def get_listentry_by_user_id(self, user_id):
        with ListEntryMapper() as mapper:
            return mapper.find_by_user_id(user_id)

    def get_listentry_by_id(self, id):
        """Einen Listeneintrag auslesen."""
        with ListEntryMapper() as mapper:
            return mapper.find_by_id(id)

    def create_listentry(self, name, item_id, retailer_id, user_id, list_id, amount, unit, condition):
        """Einen Listeneintrag erstellen."""
        listentry = ListEntry()
        listentry.set_name(name)
        listentry.set_item_id(item_id)
        listentry.set_retailer_id(retailer_id)
        listentry.set_user_id(user_id)
        listentry.set_list_id(list_id)
        listentry.set_amount(amount)
        listentry.set_unit(unit)
        listentry.set_checked(condition)

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
    Ab hier geht es um Retailer.
    """
    def get_all_retailer(self):
        with RetailerMapper() as mapper:
            return mapper.find_all()

    def get_retailer_by_id(self, id):
        with RetailerMapper() as mapper:
            return mapper.find_by_id(id)

    def get_retailer_by_name(self, name):
        with RetailerMapper() as mapper:
            return mapper.find_by_name(name)

    def create_retailer(self, name):
        retailer = Retailer()
        retailer.set_name(name)

        retailers = self.get_all_retailer()
        for sRetailer in retailers:
            if sRetailer.get_name().lower() == name.lower():
                return None

        with RetailerMapper() as mapper:
            return mapper.insert(retailer)

    def update_retailer(self, retailer):
        with RetailerMapper() as mapper:
            mapper.update(retailer)

    def delete_retailer(self, retailer):
        with RetailerMapper() as mapper:
            mapper.delete(retailer)

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

    def create_item(self, name):
        """Ein Item anlegen."""
        item = Item()
        item.set_name(name)

        items = self.get_all_items()
        for sItem in items:
            if sItem.get_name().lower() == name.lower():
                return sItem

        with ItemMapper() as mapper:
            return mapper.insert(item)

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

    def set_source_user_one(self, invitation):
        """Setze den FK source_user auf one"""
        with InvitationMapper() as mapper:
            return mapper.set_source_user_one(invitation)

    def get_all_invitation(self):
        """Alle Invitations auslesen."""
        with InvitationMapper() as mapper:
            return mapper.find_all()

    def get_invitation_by_id(self, id):
        """Invitations nach id auslesen."""
        with InvitationMapper() as mapper:
            return mapper.find_by_id(id)

    def get_all_invitations_by_party(self, partyi_id):
        """Alle Invitations welche den FK == partyi_id"""
        with InvitationMapper() as mapper:
            return mapper.find_all_invitations_by_party(partyi_id)

    def get_all_invitations_by_target_user(self, target_user_id):
        """Alle Invitations welche den FK == target_user_id"""
        with InvitationMapper() as mapper:
            return mapper.find_all_invitations_by_target_user(target_user_id)

    def get_all_invitations_by_source_user(self, source_user_id):
        """Alle Invitations welche den FK == source_user_id"""
        with InvitationMapper() as mapper:
            return mapper.find_all_invitations_by_source_user(source_user_id)

    def get_all_pend_user_in_party(self, partyi_id):
        """Alle User mit pend invites für eine Party auslesen."""
        with InvitationMapper() as mapper:
            return mapper.find_all_pend_user_in_party(partyi_id)

    def get_all_accepted_user_in_party(self, partyi_id):
        """Alle User welche in einer Party sind auslesen."""
        with InvitationMapper() as mapper:
            return mapper.find_all_accepted_user_in_party(partyi_id)

    def get_pen_invites_by_target_user(self, target_user_id):
        """Alle pending-Invitations von dem Target-User auslesen."""
        with InvitationMapper() as mapper:
            return mapper.find_pend_invites_by_target_user(target_user_id)

    def get_pen_invites_by_source_user(self, source_user_id):
        """Alle pending-Invitations von Source-User auslesen."""
        with InvitationMapper() as mapper:
            return mapper.find_pend_invites_by_source_user(source_user_id)

    def get_accepted_invites_by_source_user_by_id(self, source_user_id):
        """Invitation nach Source-User auslesen, welche akzeptiert wurde."""
        with InvitationMapper() as mapper:
            return mapper.find_accepted_invites_by_source_user(source_user_id)

    def get_accepted_invites_by_target_user_by_id(self, target_user_id):
        """Invitation nach Target-User auslesen, welche akzeptiert wurde."""
        with InvitationMapper() as mapper:
            return mapper.find_accepted_invites_by_target_user(target_user_id)

    def get_all_pend_invites(self):
        """Alle pending-invitations auslesen."""
        with InvitationMapper() as mapper:
            return mapper.find_all_pend_invites()

    def create_invitation(self, partyi_id, target_user_id, source_user_id, is_accepted):
        """Eine Invitation erstellen."""
        invitation = Invitation()
        invitation.set_partyi_id(partyi_id)
        invitation.set_target_user_id(target_user_id)
        invitation.set_source_user_id(source_user_id)
        invitation.set_is_accepted(is_accepted)

        with InvitationMapper() as mapper:
            return mapper.insert(invitation)

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
            return mapper.find_all()

    def get_party_by_id(self, id):
        """Eine Gruppe anhand der ID auslesen."""
        with PartyMapper() as mapper:
            return mapper.find_by_id(id)

    def create_party(self, name):
        """Eine Gruppe erstellen."""
        party = Party()
        party.set_name(name)

        with PartyMapper() as mapper:
            return mapper.insert(party)

    def update_party(self, party):
        """Eine Gruppe updaten."""
        with PartyMapper() as mapper:
            mapper.update(party)

    def delete_party(self, party_id):
        """Eine Gruppe löschen. Invitations und Listen werden gelöscht Listeintröge werden auf Dump-Liste gesetzt """

        invitations = self.get_all_invitations_by_party(party_id)
        for invitation in invitations:
            self.delete_invitation(invitation.get_id())

        lists = self.get_all_lists_by_partyl_id(party_id)
        for list in lists:
            listentries = self.get_listentry_by_list_id(list.get_id())
            for listentry in listentries:
                self.delete_listentry(listentry.get_id())
            self.delete_list(list.get_id())

        with PartyMapper() as mapper:
            mapper.delete(party_id)

    """
    Hier geht es um den User
    """

    def get_all_users(self):
        """Alle User auslesen."""
        with UserMapper() as mapper:
            return mapper.find_all()

    def get_user_by_email(self, email):
        """Einen User nach der email auslesen."""
        with UserMapper() as mapper:
            return mapper.find_user_by_email(email)

    def get_user_by_google_id(self, google_id):
        """Einen User nach der Google-ID auslesen."""
        with UserMapper() as mapper:
            return mapper.find_user_by_google_id(google_id)

    def get_user_by_id(self, id):
        """Einen User nach seiner ID auslesen"""
        with UserMapper() as mapper:
            return mapper.find_by_id(id)

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
        inc_invitations = self.get_all_invitations_by_target_user(user.get_id())
        if type(inc_invitations) is list:
            for inc_invitation in inc_invitations:
                self.delete_invitation(inc_invitation)
        else:
            self.delete_invitation(inc_invitations)

        out_invitations = self.get_all_invitations_by_source_user(user.get_id())
        if type(out_invitations) is list:
            for out_invitation in out_invitations:
                self.set_source_user_one(out_invitation)
        else:
            self.set_source_user_one(out_invitations)

        listentries = self.get_listentry_by_user_id(user.get_id())
        if type(listentries) is list:
            for listentry in listentries:
                self.set_user_one(listentry)
        else:
            self.set_user_one(listentries)

        standard_listentries = self.get_standard_listentry_by_user_id(user.get_id())
        if type(standard_listentries) is list:
            for standardListentry in standard_listentries:
                self.set_sle_user_one(standardListentry)
        else:
            self.set_sle_user_one(standard_listentries)

        with UserMapper() as mapper:
            mapper.delete(user)

    """
    Hier geht es um den Standartlisteneinträge
    """

    def set_sle_user_one(self, standard_listentry):
        """Setze den FK source_user auf one"""
        with StandardListEntryMapper() as mapper:
            return mapper.set_sle_user_one(standard_listentry)

    def get_all_standard_list_entrys(self):
        """Alle Standartlisteneinträge auslesen."""
        with StandardListEntryMapper() as mapper:
            return mapper.find_all()

    def get_standard_list_entry_by_id(self, id):
        """Standartlisteneintrag nach ID auslesen."""
        with StandardListEntryMapper() as mapper:
            return mapper.find_by_id(id)

    def get_standard_list_entry_by_party_id(self, party_id):
        """Standartlisteneinträge nach Gruppen-ID auslesen."""
        with StandardListEntryMapper() as mapper:
            return mapper.find_by_party_id(party_id)

    def get_standard_listentry_by_user_id(self, user_id):
        with StandardListEntryMapper() as mapper:
            return mapper.find_user_by_id(user_id)

    def create_standard_list_entry(self, name, item_id, retailer_id, user_id, party_id, amount, unit):
        """Ein Standartlisteneintrag erstellen."""
        standardlistentry = StandardListEntry()
        standardlistentry.set_name(name)
        standardlistentry.set_item_id(item_id)
        standardlistentry.set_retailer_id(retailer_id)
        standardlistentry.set_user_id(user_id)
        standardlistentry.set_party_id(party_id)
        standardlistentry.set_amount(amount)
        standardlistentry.set_unit(unit)

        with StandardListEntryMapper() as mapper:
            mapper.insert(standardlistentry)

    def update_standard_list_entry(self, standardlistentry):
        """Einen Standartlisteneintrag updaten."""
        with StandardListEntryMapper() as mapper:
            return mapper.update(standardlistentry)

    def delete_standard_list_entry(self, standardlistentry):
        """Einen Standartlisteneintrag löschen."""
        with StandardListEntryMapper() as mapper:
            mapper.delete(standardlistentry)

    """Report related"""

    def get_checked_by_user_id(self, user_id):
        """Alle Listeneinträge wo user_id == user_id und checked == 1"""
        with ListEntryMapper() as mapper:
            listentries = mapper.find_checked_by_user_id(user_id)

        return listentries
