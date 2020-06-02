/**
* Config file for a https://github.com/micromata/http-fake-backend to
* mock the PythonBankBeispiel backend.
*
* Just place in ./server/api folder.
*/

const SetupEndpoint = require('./setup/');

const prefix = "shopping"

module.exports = SetupEndpoint({
    name: 'shopping',
    urls: [
        {
        params: '/invitation',
        requests: [{
            method: 'GET',
            response: '/response-files/shopping/invitation.json'
        }]
    }, {
        params: '/item',
        requests: [{
            method: 'GET',
            response: '/response-files/shopping/item.json'
        }]
    }, {
        params: '/list',
        requests: [{
            method: 'GET',
            response: '/response-files/shopping/list.json'
        }]
    }, {
        params: '/listentry',
        requests: [{
            method: 'GET',
            response: '/response-files/shopping/listentry.json'
        }]
    }, {
        params: '/party',
        requests: [{
            method: 'GET',
            response: '/response-files/shopping/party.json'
        }]
    }, {
        params: '/retailer',
        requests: [{
            method: 'GET',
            response: '/response-files/shopping/retailer.json'
        }]
    }, {
        params: '/standardlistentry',
        requests: [{
            method: 'GET',
            response: '/response-files/shopping/standardlistentry.json'
        }]
    }, {
        params: '/user',
        requests: [{
            method: 'GET',
            response: '/response-files/shopping/user.json'
        }]
    }]
});
