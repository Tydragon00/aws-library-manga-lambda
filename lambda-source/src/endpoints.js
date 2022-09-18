const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports = (api, opts) => {
    api.get('/library-manga/test', async (req, res) => {
        responseBody = JSON.stringify({ "test endpoint": "endpoint works!" })
        return responseBody;

    });
}