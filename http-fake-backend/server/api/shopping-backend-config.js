const SetupEndpoint = require('./setup/');

const prefix = "shopping"

module.exports = SetupEndpoint({
    name: 'shopping',
    urls: [{
        params: '/item',
        requests: [{
            method: 'GET',
            response: '/response-files/shopping/item.json'
        }]
    }]
});
