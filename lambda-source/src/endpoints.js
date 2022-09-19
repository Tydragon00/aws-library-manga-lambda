const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();
const tableName = "library-manga-db"

module.exports = (api, opts) => {
    api.get('/library-manga/test', async (req, res) => {
        responseBody = JSON.stringify({ "test endpoint": "endpoint works!" })
        return responseBody;

    });
    api.get('/library-manga/all', async (req, res) => {
        let params = {
            TableName: tableName
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
    api.post('/library-manga/add', async (req, res) => {
        let item = req.body;
        console.log("TEST!")
        console.log(item);
        let params = {
            TableName: tableName,
            Item: item
        };
        try {
            let data = await documentClient.put(params).promise();
            return (JSON.stringify(data));

        } catch (err) {
            console.log({ err })
            res.status(503).send(`Unable to create item`)
        }
    });
}