exports.handler = async function (event, context) {
    let jsonResponse = { "test": "hello world test logging" }
    console.log(jsonResponse)
    const response = {
        statusCode: 200,
        body: JSON.stringify(jsonResponse),
    };
    return response;
}