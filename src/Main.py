from flask import Flask

from ShoppingAdministration import ShoppingAdministration


app = Flask(__name__)

"""Die app.route gibt hier die Route des URLs an"""
@app.route('/hello')
def hello_world():
    return 'Hello, World!'


"""Hier wird eine id übergeben. Dies funktioniert indem in der URL nach der lokalen
 IP-Adresse eine id übergeben wird : http://127.0.0.1:5000/<id>"""
@app.route('/<id>')
def show_item_by_id(id):
    adm = ShoppingAdministration()
    item = adm.get_item_by_id(id).get_name()
    return item


"""Um Flask in einer lokalen Entwicklungsumgebung zu starten"""
if __name__ == '__main__':
    app.run(debug=True)

