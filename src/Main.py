from flask import Flask
from flask_restx import Resource, Api, fields
from flask_cors import CORS

from bo.ListEntry import ListEntry
from bo.Party import Party
from bo.Retailer import Retailer
from bo.StandardListEntry import StandardListEntry
from bo.User import User
from bo.Invitation import Invitation
from bo.Item import Item
from bo.List import List

from ShoppingAdministration import ShoppingAdministration


app = Flask(__name__)

CORS(app, resources=r'/shopping/*')

api = Api(app, version='0.1 pre-alpha', title='SSLS API',
    description='Demo-API für das Shared-Shopping-List-System')

shopping = api.namespace('shopping', description='Funktionen des SSLS')

bo = api.model('BusinessObject', {
    'name': fields.String(attribute='_name', description='Der Name eines Business Object'),
    'id': fields.Integer(attribute='_id', description='Der Unique Identifier eines Business Object'),
    'creation_date': fields.DateTime(attribute='_creation_date', description='Das Erstellungsdatum '
                                                                            'eines Business Object'),

})

invitation = api.inherit('Invitation', bo, {
    'partyi_id': fields.Integer(attribute='_partyi_id', description='Die Einheit eines gewählten Produktes'),
    'target_user_id': fields.Integer(attribute='_target_user_id', description='Die Menge eines gewählten Produktes'),
    'source_user_id': fields.Integer(attribute='_source_user_id', description='Die Menge eines gewählten Produktes'),
    'is_accepted': fields.Integer(attribute='_is_accepted', description='Die Menge eines gewählten Produktes'),
})

item = api.inherit('Item', bo, {
})

list = api.inherit('List', bo, {
    'partyl_id': fields.Integer(attribute='_partyl_id', description='Die Einheit eines gewählten Produktes'),
})

list_entry = api.inherit('ListEntry', bo, {
    'item_id': fields.Integer(attribute='_item_id', description='Die Einheit eines gewählten Produktes'),
    'retailer_id': fields.Integer(attribute='_retailer_id', description='Die Einheit eines gewählten Produktes'),
    'user_id': fields.Integer(attribute='_user_id', description='Die Einheit eines gewählten Produktes'),
    'list_id': fields.Integer(attribute='_list_id', description='Die Einheit eines gewählten Produktes'),
    'amount': fields.Integer(attribute='_amount', description='Die Menge eines gewählten Produktes'),
    'unit': fields.Integer(attribute='_unit', description='Die Einheit eines gewählten Produktes'),
    'checked': fields.Integer(attribute='_checked', description='Sagt aus ob der Eintrag abgehakt wurde'),
})

party = api.inherit('Party', bo, {
})

standard_list_entry = api.inherit('StandardListEntry', bo, {
    'item_id': fields.Integer(attribute='_item_id', description='Die Einheit eines gewählten Produktes'),
    'retailer_id': fields.Integer(attribute='_retailer_id', description='Die Einheit eines gewählten Produktes'),
    'user_id': fields.Integer(attribute='_user_id', description='Die Einheit eines gewählten Produktes'),
    'party_id': fields.Integer(attribute='_party_id', description='Die Einheit eines gewählten Produktes'),
    'amount': fields.Integer(attribute='_amount', description='Die Menge eines gewählten Produktes'),
    'unit': fields.Integer(attribute='_unit', description='Die Einheit eines gewählten Produktes'),
})

user = api.inherit('User', bo, {
    'email': fields.String(attribute='_email', description='Die Einheit eines gewählten Produktes'),
    'google_id': fields.String(attribute='_google_id', description='Die Einheit eines gewählten Produktes'),
})

retailer = api.inherit('retailer', bo, {
})

"""Invitation related"""

@shopping.route("/invitation")
class InvitationListOperations(Resource):

    @shopping.marshal_with(invitation)
    @shopping.expect(invitation)
    def post(self):
        adm = ShoppingAdministration()
        proposal = Invitation.from_dict(api.payload)
        print("proposal", proposal)
        if proposal is not None:
            invi = adm.create_invitation(proposal.get_partyi_id(), proposal.get_target_user_id(),
                                         proposal.get_source_user_id())
            return invi, 200
        else:
            return "", 500

@shopping.route("/invitation/<int:id>")
@shopping.param("id", "Die ID der Invitation")
class InvitationOperations(Resource):

    @shopping.marshal_with(invitation)
    def get(self, id):
        """Auslesen von Invitaion Objekten welche die mit dieser ID verbunden sind."""
        adm = ShoppingAdministration()
        entry = adm.get_invitation_by_id(id)
        return entry

    @shopping.expect(invitation)
    def put(self, id):
        """Update des spezifizierten listentries. Es ist die id relevant welche per Link übergeben wird."""
        adm = ShoppingAdministration()
        invi = Invitation.from_dict(api.payload)

        if invi is not None:
            invi.set_id(id)
            adm.update_invitation(invi)
            return "", 200
        else:
            return "", 500

    def delete(self, id):
        """Löschen der spezifizierten party"""
        adm = ShoppingAdministration()
        p = adm.get_invitation_by_id(id)

        if p is not None:
            adm.delete_invitation(p)
            return "", 200
        else:
            return "", 500

@shopping.route("/pending-invitation-by-source-user/<int:id>")
@shopping.param("id", "Die ID des Source Users")
class PendingInvitationBySourceUser(Resource):
    @shopping.marshal_with(invitation)
    def get(self, id):
        """Auslesen von pending Invitation Objekten welche die mit dieser Source User ID verbunden sind."""
        adm = ShoppingAdministration()
        entry = adm.get_pen_invites_by_source_user(id)
        return entry

@shopping.route("/pending-invitation-by-target-user/<int:id>")
@shopping.param("id", "Die ID des Target Users")
class PendingInvitationByTargetUser(Resource):

    @shopping.marshal_with(invitation)
    def get(self, id):
        """Auslesen von pending Invitation Objekten welche die mit dieser Target User ID verbunden sind."""
        adm = ShoppingAdministration()
        entry = adm.get_pen_invites_by_target_user(id)
        return entry

@shopping.route("/accepted-invitation-by-source-user/<int:id>")
@shopping.param("id", "Die ID des Source Users")
class AcceptedInvitationBySourceUser(Resource):

    @shopping.marshal_with(invitation)
    def get(self, id):
        """Auslesen von pending Invitation Objekten welche die mit dieser Source User ID verbunden sind."""
        adm = ShoppingAdministration()
        entry = adm.get_accepted_invites_by_source_user_by_id(id)
        return entry

@shopping.route("/accepted-invitation-by-target-user/<int:id>")
@shopping.param("id", "Die ID des Target Users")
class AcceptedInvitationByTargetUser(Resource):

    @shopping.marshal_with(invitation)
    def get(self, id):
        """Auslesen von pending Invitation Objekten welche die mit dieser Target User ID verbunden sind."""
        adm = ShoppingAdministration()
        entry = adm.get_accepted_invites_by_target_user_by_id(id)
        return entry

@shopping.route("/pending-invitations-by-user-in-party/<int:id>")
@shopping.param("id", "Die ID der Party")
class PendingInvitationsByParty(Resource):

    @shopping.marshal_with(invitation)
    def get(self, id):
        """Auslesen von pending Invitation Objekten welche die mit dieser Party ID verbunden sind."""
        adm = ShoppingAdministration()
        entry = adm.get_all_pend_user_in_party(id)
        return entry


@shopping.route("/accepted-invitations-by-user-in-party/<int:id>")
@shopping.param("id", "Die ID der Party")
class AcceptedInvitationsByParty(Resource):

    @shopping.marshal_with(invitation)
    def get(self, id):
        """Auslesen von pending Invitation Objekten welche die mit dieser Party ID verbunden sind."""
        adm = ShoppingAdministration()
        entry = adm.get_all_accepted_user_in_party(id)
        return entry


"""Item related"""

@shopping.route("/item")
class ItemListOperations(Resource):
    @shopping.marshal_with(item)
    @shopping.expect(item)
    def post(self):
        """Anlegen eines neuen Items: Die vom Client vorgegebenen Daten werden dabei als Vorschlag aufgenommen."""
        adm = ShoppingAdministration()
        proposal = Item.from_dict(api.payload)

        if proposal is not None:
            print(proposal.get_name())
            result = adm.create_item(proposal.get_name())
            return result, 200
        else:
            return "", 500


@shopping.route("/item/<int:id>")
@shopping.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@shopping.param('id', 'Die ID des Account-Objekts')
class ItemOperations(Resource):

    @shopping.marshal_with(item)
    def get(self, id):
        """Auslesen eines spezifizierten Party Objekts aus der DB """
        adm = ShoppingAdministration()
        item = adm.get_item_by_id(id)
        return item

    @shopping.expect(item)
    def put(self, id):
        """Update des spezifizierten Items. Es ist die id relevant welche per Link übergeben wird."""
        adm = ShoppingAdministration()
        item = Item.from_dict(api.payload)

        if item is not None:
            item.set_id(id)
            adm.update_item(item)
            return "", 200
        else:
            return "", 500

    def delete(self, id):
        """Löschen des spezifizierten Item"""
        adm = ShoppingAdministration()
        items = adm.get_item_by_id(id)

        if items is not None:
            adm.delete_item(items)
            return "", 200
        else:
            return "", 500


"""List related"""

@shopping.route("/list")
class ListListOperations(Resource):

    @shopping.marshal_with(list)
    @shopping.expect(list)
    def post(self):
        adm = ShoppingAdministration()
        proposal = List.from_dict(api.payload)
        print("proposal", proposal)
        if proposal is not None:
            list = adm.create_list(proposal.get_name(), proposal.get_partyl_id())
            return list, 200
        else:
            return "", 500

@shopping.route("/list/<int:id>")
@shopping.param("id", "Die ID der Party")
class ListOperations(Resource):

    @shopping.marshal_with(list)
    def get(self, id):
        """Auslesen von pending Invitation Objekten welche die mit dieser Party ID verbunden sind."""
        adm = ShoppingAdministration()
        entry = adm.get_list_by_id(id)
        return entry

    @shopping.marshal_with(list)
    @shopping.expect(list)
    def put(self, id):
        """Update des spezifizierten listentries. Es ist die id relevant welche per Link übergeben wird."""
        adm = ShoppingAdministration()
        list = List.from_dict(api.payload)

        if list is not None:
            list.set_id(id)
            adm.update_list(list)
            return "", 200
        else:
            return "", 500

    def delete(self, id):
        """Löschen der spezifizierten party"""
        adm = ShoppingAdministration()
        p = adm.get_list_by_id(id)

        if p is not None:
            adm.delete_list(p)
            return "", 200
        else:
            return "", 500

@shopping.route("/list-by-party/<int:id>")
@shopping.param("id", "Die ID der Party")
class ListByPartyOperations(Resource):

    @shopping.marshal_with(list)
    def get(self, id):
        """Auslesen von pending Invitation Objekten welche die mit dieser Party ID verbunden sind."""
        adm = ShoppingAdministration()
        entry = adm.get_all_lists_by_partyl_id(id)
        return entry

"""ListEntry related"""

@shopping.route("/listentry-by-list/<int:id>")
@shopping.param("id", "Die ID der Shopping List ")
class ListEntryByListOperations(Resource):
    @shopping.marshal_with(list_entry)
    def get(self, id):
        """Auslesen von Listentry Objekten welche die mit dieser  List ID verbunden sind."""
        adm = ShoppingAdministration()
        entry = adm.get_listentry_by_list_id(id)
        return entry


@shopping.route("/listentry-by-user/<int:id>")
@shopping.param("id", "Die id des Users")
class ListEntryByUserOperations(Resource):
    @shopping.marshal_with(list_entry)
    def get(self, id):
        adm = ShoppingAdministration()
        entry = adm.get_listentry_by_user_id(id)
        return entry


@shopping.route("/listentry")
@shopping.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ListEntryListOperations(Resource):
    @shopping.marshal_with(list_entry)
    @shopping.expect(list_entry)
    def post(self):
        """Die vom Client gesendeten Daten werden als Vorschlag aufgefasst (siehe Thies),
        PROBLEM! Hier bekomme ich doch nicht die IDs zurück sondern die eingegebenen Strings?!
        Ich müsste ja erst die neu entstandenen item (+ amount, unit) in die DB füttern.
        Dann muss ich herausfinden ob der User existiert (und in der Gruppe ist).
        gleiches gilt für den Retailer. Erst dann kann ich meinen Listentry erstellen und in der DB speicher.
        """

        adm = ShoppingAdministration()
        proposal = ListEntry.from_dict(api.payload)
        print("proposal", proposal)
        if proposal is not None:
            lentry = adm.create_listentry(proposal.get_name(), proposal.get_item_id(), proposal.get_retailer_id(),
                                          proposal.get_user_id(), proposal.get_list_id(), proposal.get_amount(),
                                          proposal.get_unit(), proposal.get_checked())
            return lentry, 200
        else:
            return "", 500


@shopping.route("/listentry/<int:id>")
class ListEntryOperations(Resource):

    @shopping.marshal_with(list_entry)
    def get(self, id):
        adm = ShoppingAdministration()
        entry = adm.get_listentry_by_id(id)
        return entry

    @shopping.marshal_with(list_entry)
    def get(self, id):
        """Auslesen eines spezifizierten Party Objekts aus der DB """
        adm = ShoppingAdministration()
        lentry = adm.get_listentry_by_id(id)
        return lentry

    @shopping.expect(list_entry)
    def put(self, id):
        """Update des spezifizierten listentries. Es ist die id relevant welche per Link übergeben wird."""
        adm = ShoppingAdministration()
        lentry = ListEntry.from_dict(api.payload)


        if lentry is not None:
            lentry.set_id(id)
            adm.update_listentry(lentry)
            return "", 200
        else:
            return "", 500

    def delete(self, id):
        """Löschen des spezifizierten listentries. Es ist die id relevant welche per Link übergeben wird."""
        adm = ShoppingAdministration()
        lentry = adm.get_listentry_by_id(id)
        print(lentry)
        adm.delete_listentry(lentry)
        return "", 200


"""Party Related"""
@shopping.route("/party/<int:id>")
@shopping.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@shopping.param('id', 'Die ID des Account-Objekts')
class PartyOperations(Resource):
    @shopping.marshal_with(party)
    def get(self, id):
        """Auslesen eines spezifizierten Party Objekts aus der DB """
        adm = ShoppingAdministration()
        p = adm.get_party_by_id(id)
        return p

    @shopping.expect(party)
    def put(self, id):
        """Update der spezifizierten party. Es ist die id relevant welche per Link übergeben wird."""
        adm = ShoppingAdministration()
        p = Party.from_dict(api.payload)

        if p is not None:
            p.set_id(id)
            adm.update_party(p)
            return "", 200
        else:
            return "", 500

    def delete(self, id):
        """Löschen der spezifizierten party"""
        adm = ShoppingAdministration()
        p = adm.get_party_by_id(id)

        if p is not None:
            adm.delete_party(p)
            return "", 200
        else:
            return "", 500

@shopping.route("/party")
class PartyListOperations(Resource):
    @shopping.marshal_with(party)
    @shopping.expect(party)
    def post(self):
        """Anlegen einer neuen Party: Die vom Client vorgegebenen Daten werden dabei als Vorschlag aufgenommen."""
        adm = ShoppingAdministration()
        proposal = Party.from_dict(api.payload)

        if proposal is not None:
            print(proposal.get_name())
            result = adm.create_party(proposal.get_name())
            return result, 200
        else:
            return "", 500



"""Retailer related."""
@shopping.route("/retailer/<int:id>")
class RetailerOperations (Resource):
    @shopping.marshal_with(retailer)
    def get(self, id):
        """Auslesen des Spezifizierten Retailers aus der DB."""
        adm = ShoppingAdministration()
        ret = adm.get_retailer_by_id(id)

        if ret is not None:
            return ret
        else:
            return "", 500

    def put(self, id):
        """Updaten des Spezifizierten Retailers aus der DB."""
        adm = ShoppingAdministration()
        ret = Retailer.from_dict(api.payload)

        if ret is not None:
            ret.set_id(id)
            adm.update_retailer(ret)
            return "", 200
        else:
            return "", 500

    def delete(self, id):
        """Löschen des Spezifizierten Retailers aus der DB."""
        adm = ShoppingAdministration()
        ret = adm.get_retailer_by_id(id)

        if ret is not None:
            adm.delete_retailer(ret)
            return "", 200
        else:
            return "", 500

@shopping.route("/retailer")
class RetailerListOperations(Resource):

    @shopping.marshal_with(retailer)
    def get(self):
        """Auslesen des aller Retailer aus der DB."""
        adm = ShoppingAdministration()
        ret = adm.get_all_retailer()

        if ret is not None:
            return ret
        else:
            return "", 500

    @shopping.marshal_with(retailer)
    @shopping.expect(retailer)
    def post(self):
        adm = ShoppingAdministration()
        proposal = Retailer.from_dict(api.payload)

        if proposal is not None:
            result = adm.create_retailer(proposal.get_name())
            return result, 200
        else:
            return "", 500

"""StandardListEntry related"""


@shopping.route("/standardlistentry-by-party/<int:id>")
@shopping.param("id", "Die ID der Party ")
class StandardListEntryByPartyOperations(Resource):
    @shopping.marshal_with(standard_list_entry)
    def get(self, id):
        """Auslesen eines StandardListentry Objekts welches die mit dieser  Party ID verbunden sind."""
        adm = ShoppingAdministration()
        entry = adm.get_standard_list_entry_by_party_id(id)
        return entry


@shopping.route("/standardlistentry-by-user/<int:id>")
@shopping.param("id", "Die id des Users")
class StandardListEntryByUserOperations(Resource):
    @shopping.marshal_with(standard_list_entry)
    def get(self, id):
        adm = ShoppingAdministration()
        entry = adm.get_standard_listentry_by_user_id(id)

        return entry


@shopping.route("/standardlistentry")
class StandardListEntryListOperations(Resource):
    @shopping.marshal_with(standard_list_entry)
    @shopping.expect(standard_list_entry)
    def post(self):
        """Die vom Client gesendeten Daten werden als Vorschlag aufgefasst (siehe Thies)
        """
        print("anlegen eines Standardlistentries")
        adm = ShoppingAdministration()
        print(api.payload)
        proposal = StandardListEntry.from_dict(api.payload)
        if proposal is not None:
            slentry = adm.create_standard_list_entry(proposal.get_name(), proposal.get_item_id(),
                                                     proposal.get_retailer_id(), proposal.get_user_id(),
                                                     proposal.get_party_id(), proposal.get_amount(), proposal.get_unit())
            return slentry, 200
        else:
            return "", 500



@shopping.route("/standardlistentry/<int:id>")
class StandardListEntryOperations(Resource):

    @shopping.marshal_with(standard_list_entry)
    def get(self,id):
        adm = ShoppingAdministration()
        entry = adm.get_standard_list_entry_by_id(id)
        return entry

    @shopping.marshal_with(standard_list_entry)

    def get(self, id):
        """Auslesen des spezifizierten Users"""
        adm = ShoppingAdministration()
        u = adm.get_standard_list_entry_by_id(id)
        return u
    @shopping.expect(standard_list_entry)
    def put(self, id):
        """Update des spezifizierten listentries. Es ist die id relevant welche per Link übergeben wird."""
        adm = ShoppingAdministration()
        slentry = StandardListEntry.from_dict(api.payload)

        if slentry is not None:
            slentry.set_id(id)
            adm.update_standard_list_entry(slentry)
            return "", 200
        else:
            return "", 500

    def delete(self, id):
        """Update des spezifizierten listentries. Es ist die id relevant welche per Link übergeben wird."""
        adm = ShoppingAdministration()
        slentry = adm.get_standard_list_entry_by_id(id)

        if slentry is not None:
            slentry.set_id(id)
            adm.delete_standard_list_entry(slentry)
            return "", 200
        else:
            return "", 500

"""User related."""
@shopping.route("/user/<int:id>")
@shopping.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@shopping.param('id', 'Die ID des User-Objekts')
class UserOperations(Resource):
    @shopping.marshal_with(user)
    def get(self, id):
        """Auslesen des spezifizierten Users"""
        print("id:", id)
        adm = ShoppingAdministration()
        u = adm.get_user_by_id(id)
        print("objekt", u)
        return u

    def put(self, id):
        """Update des Spezifizierten Users."""
        adm = ShoppingAdministration()
        u = User.from_dict(api.payload)

        if u is not None:
            u.set_id(id)
            adm.update_user(u)
            return "", 200
        else:
            return "", 500

    def delete(self, id):
        """Löschen des Spezifizierten Retailers aus der DB."""
        adm = ShoppingAdministration()
        u = adm.get_user_by_id(id)

        if u is not None:
            adm.delete_user(u)
            return "", 200
        else:
            return "", 500


@shopping.route("/user-by-email/<string:email>")
class UserByEmailOperations(Resource):
    @shopping.marshal_with(user)
    def get(self, email):
        """Auslesen des durch die email spezifizierten Users."""
        adm = ShoppingAdministration()
        u = adm.get_user_by_email(email)
        return u


"""Um Flask in einer lokalen Entwicklungsumgebung zu starten"""
if __name__ == '__main__':
    app.run(debug=True)

