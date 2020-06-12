from flask import Flask
from flask_restx import Resource, Api, fields
from flask_cors import CORS

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
    'is_accepted': fields.Boolean(attribute='_is_accepted', description='Die Menge eines gewählten Produktes'),
})

item = api.inherit('Item', bo, {
    'unit': fields.Integer(attribute='_unit', description='Die Einheit eines gewählten Produktes'),
    'amount': fields.Integer(attribute='_amount', description='Die Menge eines gewählten Produktes'),
})

list = api.inherit('List', bo, {
    'partyl_id': fields.Integer(attribute='_partyl_id', description='Die Einheit eines gewählten Produktes'),
})

list_entry = api.inherit('ListEntry', bo, {
    'item_id': fields.Integer(attribute='_item_id', description='Die Einheit eines gewählten Produktes'),
    'retailer_id': fields.Integer(attribute='_retailer_id', description='Die Einheit eines gewählten Produktes'),
    'user_id': fields.Integer(attribute='_user_id', description='Die Einheit eines gewählten Produktes'),
    'list_id': fields.Integer(attribute='_list_id', description='Die Einheit eines gewählten Produktes'),
})

party = api.inherit('Party', bo, {
})

standard_list_entry = api.inherit('StandardListEntry', bo, {
    'item_id': fields.Integer(attribute='_item_id', description='Die Einheit eines gewählten Produktes'),
    'retailer_id': fields.Integer(attribute='_retailer_id', description='Die Einheit eines gewählten Produktes'),
    'user_id': fields.Integer(attribute='_user_id', description='Die Einheit eines gewählten Produktes'),
    'list_id': fields.Integer(attribute='_list_id', description='Die Einheit eines gewählten Produktes'),
})

user = api.inherit('User', bo, {
    'email': fields.String(attribute='_email', description='Die Einheit eines gewählten Produktes'),
    'google_id': fields.Integer(attribute='_google_id', description='Die Einheit eines gewählten Produktes'),
})

@shopping.route('/item')
class Item(Resource):

    @shopping.marshal_list_with(item)
    def get(self):
        adm = ShoppingAdministration()
        item = adm.get_all_items()
        return item

@shopping.route('/user')
class User(Resource):

    @shopping.marshal_list_with(user)
    def get(self):
        adm = ShoppingAdministration()
        users = adm.get_all_users()
        return users


"""Um Flask in einer lokalen Entwicklungsumgebung zu starten"""
if __name__ == '__main__':
    app.run(debug=True)

