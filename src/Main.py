from flask import Flask
from flask_restx import Resource, Api, fields
from flask_cors import CORS

from ShoppingAdministration import ShoppingAdministration


app = Flask(__name__)

api = Api(app, version='0.1 pre-alpha', title='SSLS API',
    description='Demo-API für das Shared-Shopping-List-System')

CORS(app, resources=r'/shopping/*')

bo = api.model('BusinessObject', {
    'name': fields.String(attribute='_name', description='Der Name eines Business Object'),
    'id': fields.Integer(attribute='_id', description='Der Unique Identifier eines Business Object'),
    'creation_date': fields.DateTime(attribute='_creation_date', description='Das Erstellungsdatum '
                                                                            'eines Business Object'),

})

item = api.inherit('Item', bo, {
    'unit': fields.Integer(attribute='_unit', description='Die Einheit eines gewählten Produktes'),
    'amount': fields.Integer(attribute='_amount', description='Die Menge eines gewählten Produktes'),
})

@api.route('/Item')
class Item(Resource):

    @api.marshal_with(item)
    def get(self):
        adm = ShoppingAdministration()
        item = adm.get_all_items()
        return item


"""Um Flask in einer lokalen Entwicklungsumgebung zu starten"""
if __name__ == '__main__':
    app.run(debug=True)

