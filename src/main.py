from flask import send_from_directory, Flask
from flask_restx import Resource, Api, fields
from flask_cors import CORS

from server.bo.ListEntry import ListEntry
from server.bo.Party import Party
from server.bo.Retailer import Retailer
from server.bo.StandardListEntry import StandardListEntry
from server.bo.User import User
from server.bo.Invitation import Invitation
from server.bo.Item import Item
from server.bo.List import List

from server.ShoppingAdministration import ShoppingAdministration

from SecurityDecorator import secured

app = Flask(__name__)


@app.route('/edit')
def editor_index():
    return send_from_directory('static/editor', 'index.html')


@app.route('/rep')
def report_index():
    return send_from_directory('static/report', 'index.html')


CORS(app, resources=r'/shopping/*')

api = Api(app, version='1.0 Beta', title='SSLS API',
    description='Demo-API für das Shared-Shopping-List-System')

shopping = api.namespace('shopping', description='Funktionen des SSLS')

bo = api.model('BusinessObject', {
    'name': fields.String(attribute='_name', description='Der Name eines Business Object'),
    'id': fields.Integer(attribute='_id', description='Der Unique Identifier eines Business Object'),
    'creation_date': fields.DateTime(attribute='_creation_date', description='Das Erstellungsdatum '
                                                                            'eines Business Object'),

})

invitation = api.inherit('Invitation', bo, {
    'partyi_id': fields.Integer(attribute='_partyi_id', description='Party der invitation'),
    'target_user_id': fields.Integer(attribute='_target_user_id', description='Der Target user der Invitation'),
    'source_user_id': fields.Integer(attribute='_source_user_id', description='Der Source user der Invitation'),
    'is_accepted': fields.Integer(attribute='_is_accepted', description='Ob die Invitation akzeptiert ist'),
})

item = api.inherit('Item', bo, {
})

list = api.inherit('List', bo, {
    'partyl_id': fields.Integer(attribute='_partyl_id', description='Die Party zu welcher die Liste gehört'),
})

list_entry = api.inherit('ListEntry', bo, {
    'item_id': fields.Integer(attribute='_item_id', description='Das Item, welches in dem Listentry hinterlegt ist'),
    'retailer_id': fields.Integer(attribute='_retailer_id', description='Der Retailer, welcher in dem Listentry'
                                                                        ' hinterlegt ist'),
    'user_id': fields.Integer(attribute='_user_id', description='Der User, welcher in dem Listentry hinterlegt ist'),
    'list_id': fields.Integer(attribute='_list_id', description='Der Liste, in welcher der Listentry hinterlegt ist'),
    'amount': fields.Float(attribute='_amount', description='Die Menge eines gewählten Produktes'),
    'unit': fields.Integer(attribute='_unit', description='Die Einheit eines gewählten Produktes'),
    'checked': fields.Integer(attribute='_checked', description='Sagt aus ob der Eintrag abgehakt wurde'),
})

party = api.inherit('Party', bo, {
})

standard_list_entry = api.inherit('StandardListEntry', bo, {
    'item_id': fields.Integer(attribute='_item_id', description='Das Item, welches in dem StandardListEntry'
                                                                ' hinterlegt ist'),
    'retailer_id': fields.Integer(attribute='_retailer_id', description='Der Retailer, welcher in dem StandardListEntry'
                                                                        ' hinterlegt ist'),
    'user_id': fields.Integer(attribute='_user_id', description='Der User, welcher in dem StandardListEntry hinterlegt '
                                                                'ist'),
    'party_id': fields.Integer(attribute='_party_id', description='Der Party, in welcher der StandardListEntry'
                                                                  ' hinterlegt ist'),
    'amount': fields.Float(attribute='_amount', description='Die Menge eines gewählten Produktes'),
    'unit': fields.Integer(attribute='_unit', description='Die Einheit eines gewählten Produktes'),
})

user = api.inherit('User', bo, {
    'email': fields.String(attribute='_email', description='Die Email eines Nutzers'),
    'google_id': fields.String(attribute='_google_id', description='Die google_id eines Nutzers'),
})

retailer = api.inherit('retailer', bo, {
})

"""Invitation related"""

@shopping.route("/invitation")
class InvitationListOperations(Resource):

    @shopping.marshal_with(invitation)
    @shopping.expect(invitation)
    @secured
    def post(self):
        """Erstellen eines Invitation Objekts"""
        adm = ShoppingAdministration()
        proposal = Invitation.from_dict(api.payload)
        print("proposal", proposal)
        if proposal is not None:
            invi = adm.create_invitation(proposal.get_partyi_id(), proposal.get_target_user_id(),
                                         proposal.get_source_user_id(), proposal.get_is_accepted())
            return invi, 200
        else:
            return "", 500

@shopping.route("/invitation/<int:id>")
@shopping.param("id", "Die ID der Invitation")
class InvitationOperations(Resource):

    @shopping.marshal_with(invitation)
    @secured
    def get(self, id):
        """Auslesen von Invitation Objekten welche die mit dieser ID verbunden sind."""
        adm = ShoppingAdministration()
        entry = adm.get_invitation_by_id(id)
        return entry

    @shopping.expect(invitation)
    @secured
    def put(self, id):
        """Update der spezifizierten Invitation. Es ist die id relevant, welche per Link übergeben wird."""
        adm = ShoppingAdministration()
        invi = Invitation.from_dict(api.payload)

        if invi is not None:
            invi.set_id(id)
            adm.update_invitation(invi)
            return "", 200
        else:
            return "", 500

    @secured
    def delete(self, id):
        """Löschen der spezifizierten Invitation"""
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
    @secured
    def get(self, id):
        """Auslesen von pending Invitation Objekten welche die mit dieser Source User ID verbunden sind."""
        adm = ShoppingAdministration()
        entry = adm.get_pen_invites_by_source_user(id)
        return entry

@shopping.route("/pending-invitation-by-target-user/<int:id>")
@shopping.param("id", "Die ID des Target Users")
class PendingInvitationByTargetUser(Resource):

    @shopping.marshal_with(invitation)
    @secured
    def get(self, id):
        """Auslesen von pending Invitation Objekten welche die mit dieser Target User ID verbunden sind."""
        adm = ShoppingAdministration()
        entry = adm.get_pen_invites_by_target_user(id)
        return entry

@shopping.route("/accepted-invitation-by-source-user/<int:id>")
@shopping.param("id", "Die ID des Source Users")
class AcceptedInvitationBySourceUser(Resource):

    @shopping.marshal_with(invitation)
    @secured
    def get(self, id):
        """Auslesen von accepted Invitation Objekten welche die mit dieser Source User ID verbunden sind."""
        adm = ShoppingAdministration()
        entry = adm.get_accepted_invites_by_source_user_by_id(id)
        return entry

@shopping.route("/accepted-invitation-by-target-user/<int:id>")
@shopping.param("id", "Die ID des Target Users")
class AcceptedInvitationByTargetUser(Resource):

    @shopping.marshal_with(invitation)
    @secured
    def get(self, id):
        """Auslesen von accepted Invitation Objekten welche die mit dieser Target User ID verbunden sind."""
        adm = ShoppingAdministration()
        entry = adm.get_accepted_invites_by_target_user_by_id(id)
        return entry

@shopping.route("/pending-invitations-by-user-in-party/<int:id>")
@shopping.param("id", "Die ID der Party")
class PendingInvitationsByParty(Resource):

    @shopping.marshal_with(invitation)
    @secured
    def get(self, id):
        """Auslesen von pending Invitation Objekten welche die mit dieser Party ID verbunden sind."""
        adm = ShoppingAdministration()
        entry = adm.get_all_pend_user_in_party(id)
        return entry


@shopping.route("/accepted-invitations-by-user-in-party/<int:id>")
@shopping.param("id", "Die ID der Party")
class AcceptedInvitationsByParty(Resource):

    @shopping.marshal_with(invitation)
    @secured
    def get(self, id):
        """Auslesen von accepted Invitation Objekten welche die mit dieser Party ID verbunden sind."""
        adm = ShoppingAdministration()
        entry = adm.get_all_accepted_user_in_party(id)
        return entry


"""Item related"""

@shopping.route("/item")
class ItemListOperations(Resource):
    @shopping.marshal_with(item)
    @shopping.expect(item)
    @secured
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

    @shopping.marshal_with(item)
    def get(self):
        """Auslesen aller ItemBos aus der DB."""
        adm = ShoppingAdministration()
        item = adm.get_all_items()

        if item is not None:
            return item
        else:
            return "", 500


@shopping.route("/item/<int:id>")
@shopping.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@shopping.param('id', 'Die ID des Account-Objekts')
class ItemOperations(Resource):

    @shopping.marshal_with(item)
    @secured
    def get(self, id):
        """Auslesen eines spezifizierten Item Objekts aus der DB """
        adm = ShoppingAdministration()
        item = adm.get_item_by_id(id)
        return item


    @shopping.expect(Item)
    @secured
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

    @secured
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
    @secured
    def post(self):
        """Anlegen einer neuen List: Die vom Client vorgegebenen Daten werden dabei als Vorschlag aufgenommen."""
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
    @secured
    def get(self, id):
        """Auslesen von List Objekten, welche die mit dieser Party ID verbunden sind."""
        adm = ShoppingAdministration()
        entry = adm.get_list_by_id(id)
        return entry

    @shopping.marshal_with(list)
    @shopping.expect(list)
    @secured
    def put(self, id):
        """Update der spezifizierten List. Es ist die id relevant welche per Link übergeben wird."""
        adm = ShoppingAdministration()
        list = List.from_dict(api.payload)

        if list is not None:
            list.set_id(id)
            adm.update_list(list)
            return "", 200
        else:
            return "", 500

    @secured
    def delete(self, id):
        """Löschen der spezifizierten List"""
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
    @secured
    def get(self, id):
        """Auslesen von List Objekten welche die mit dieser Party ID verbunden sind."""
        adm = ShoppingAdministration()
        entry = adm.get_all_lists_by_partyl_id(id)
        return entry

"""ListEntry related"""

@shopping.route("/listentry-by-list/<int:id>")
@shopping.param("id", "Die ID der Shopping List ")
class ListEntryByListOperations(Resource):
    @shopping.marshal_with(list_entry)
    @secured
    def get(self, id):
        """Auslesen von Listentry Objekten welche die mit dieser List ID verbunden sind."""
        adm = ShoppingAdministration()
        entry = adm.get_listentry_by_list_id(id)
        return entry


@shopping.route("/listentry-by-user/<int:id>")
@shopping.param("id", "Die id des Users")
class ListEntryByUserOperations(Resource):
    @shopping.marshal_with(list_entry)
    @secured
    def get(self, id):
        """Auslesen von Listentry Objekten welche die mit diesem User verbunden sind."""
        adm = ShoppingAdministration()
        entry = adm.get_listentry_by_user_id(id)
        return entry


@shopping.route("/listentry")
@shopping.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ListEntryListOperations(Resource):
    @shopping.marshal_with(list_entry)
    @shopping.expect(list_entry)
    @secured
    def post(self):
        """Anlegen eines neuen Listentry: Die vom Client vorgegebenen Daten werden dabei als Vorschlag aufgenommen."""
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
    @secured

    def get(self, id):
        """Auslesen von Listentry Objekten welche die mit dieser Id verbunden sind."""
        adm = ShoppingAdministration()
        entry = adm.get_listentry_by_id(id)
        return entry

    @shopping.expect(list_entry)
    @secured
    def put(self, id):
        """Update des spezifizierten listentries. Es ist die id relevant welche per Link übergeben wird."""
        adm = ShoppingAdministration()
        print("payload:", api.payload)
        lentry = ListEntry.from_dict(api.payload)
        print("Lentry welcher zu updaten ist: ", lentry)


        if lentry is not None:
            lentry.set_id(id)
            adm.update_listentry(lentry)
            return "", 200
        else:
            return "", 500

    @secured
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
    @secured
    def get(self, id):
        """Auslesen eines spezifizierten Party Objekts aus der DB """
        adm = ShoppingAdministration()
        p = adm.get_party_by_id(id)
        return p

    @shopping.expect(party)
    @secured
    def put(self, id):
        """Update einer spezifizierten Party. Es ist die id relevant welche per Link übergeben wird."""
        adm = ShoppingAdministration()
        p = Party.from_dict(api.payload)

        if p is not None:
            p.set_id(id)
            adm.update_party(p)
            return "", 200
        else:
            return "", 500

    @secured
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
    @secured
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
    @secured
    def get(self, id):
        """Auslesen des Spezifizierten Retailers aus der DB."""
        adm = ShoppingAdministration()
        ret = adm.get_retailer_by_id(id)

        if ret is not None:
            return ret
        else:
            return "", 500

    @shopping.marshal_with(retailer)
    @secured
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

    @secured
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
    @secured
    def get(self):
        """Auslesen aller Retailer aus der DB."""
        adm = ShoppingAdministration()
        ret = adm.get_all_retailer()

        if ret is not None:
            return ret
        else:
            return "", 500

    @shopping.marshal_with(retailer)
    @shopping.expect(retailer)
    @secured
    def post(self):
        """Anlegen eines neuen Retailer: Die vom Client vorgegebenen Daten werden dabei als Vorschlag aufgenommen."""
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
    @secured
    def get(self, id):
        """Auslesen der StandardListentry Objekte, welche mit dieser Party ID verbunden sind."""
        adm = ShoppingAdministration()
        entry = adm.get_standard_list_entry_by_party_id(id)
        return entry


@shopping.route("/standardlistentry-by-user/<int:id>")
@shopping.param("id", "Die id des Users")
class StandardListEntryByUserOperations(Resource):
    @shopping.marshal_with(standard_list_entry)
    @secured
    def get(self, id):
        """Auslesen der StandardListentry Objekte, welche mit diesem User verbunden sind."""
        adm = ShoppingAdministration()
        entry = adm.get_standard_listentry_by_user_id(id)

        return entry


@shopping.route("/standardlistentry")
class StandardListEntryListOperations(Resource):
    @shopping.marshal_with(standard_list_entry)
    @shopping.expect(standard_list_entry)
    @secured
    def post(self):
        """Anlegen einer neuen StandardListEntry: Die vom Client gesendeten Daten werden als Vorschlag aufgefasst"""
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
    @secured
    def get(self,id):
        """Auslesen der StandardListentry Objekte, welche mit dieser Id verbunden ist."""
        adm = ShoppingAdministration()
        entry = adm.get_standard_list_entry_by_id(id)
        return entry


    @shopping.expect(standard_list_entry)
    @shopping.marshal_with(standard_list_entry)
    @secured
    def put(self, id):
        """Update des spezifizierten StandardListentry. Es ist die id relevant welche per Link übergeben wird."""
        adm = ShoppingAdministration()
        slentry = StandardListEntry.from_dict(api.payload)

        if slentry is not None:
            slentry.set_id(id)
            adm.update_standard_list_entry(slentry)
            return "", 200
        else:
            return "", 500

    @secured
    def delete(self, id):
        """Löschen des spezifizierten StandardListentry. Es ist die id relevant welche per Link übergeben wird."""
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
    @secured
    def get(self, id):
        """Auslesen des spezifizierten Users"""
        print("id:", id)
        adm = ShoppingAdministration()
        u = adm.get_user_by_id(id)
        print("objekt", u)
        return u

    @shopping.marshal_with(user)
    @secured
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

    @secured
    def delete(self, id):
        """Löschen des Spezifizierten Users aus der DB."""
        adm = ShoppingAdministration()
        u = adm.get_user_by_id(id)

        if u is not None:
            adm.delete_user(u)
            return "", 200
        else:
            return "", 500

@shopping.route("/user-by-google-id/<string:googleid>")
class UserByGoogleIdOperations(Resource):

    @shopping.marshal_with(user)
    @secured
    def get(self, googleid):
        print("google id:", googleid)
        """Auslesen dess durch die google-id spezifizierten Users"""
        adm = ShoppingAdministration()
        u = adm.get_user_by_google_id(googleid)
        if u is not None:
            return u, 200
        else:
            return None, 500


@shopping.route("/user-by-email/<string:email>")
class UserByEmailOperations(Resource):
    @shopping.marshal_with(user)
    @secured
    def get(self, email):
        """Auslesen des durch die email spezifizierten Users."""
        adm = ShoppingAdministration()
        u = adm.get_user_by_email(email)
        return u

"""Report related."""

@shopping.route("/checked-listentries/<int:userid>")
class ReportOperations(Resource):

    @shopping.marshal_with(list_entry)
    def get(self, userid):
        """Auslesen aller Listentries, welche abgehackt sind und der FK user_id == userid,
         um den Report Client zu befüllen"""
        adm = ShoppingAdministration()
        listentries = adm.get_checked_by_user_id(userid)
        if listentries is not None:
            return listentries, 200
        else:
            return None, 500


"""Um Flask in einer lokalen Entwicklungsumgebung zu starten"""
if __name__ == '__main__':
    app.run(debug=True)

