const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports = (api, opts) => {
    api.get('/library-manga/test', async (req, res) => {
        responseBody = JSON.stringify({ "test endpoint": "endpoint works!" })
        return responseBody;

    });
    api.get('/library-manga/all', async (req, res) => {
        let params = {
            TableName: "library-manga-db"
        };
        try {
            data = await documentClient.scan(params).promise();
            let mangas = data.Items;
            responseBody = JSON.stringify(mangas);
            console.log({ data })
        } catch (err) {
            res.status(503).send(`Unable to get manga: ${err}`);
        }
        return responseBody;

    });
}