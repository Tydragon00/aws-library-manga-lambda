exports.handler = async function (event, context) {
    let jsonResponse = { "hello": "world" }
    const response = {
        statusCode: 200,
        body: JSON.stringify(jsonResponse),
    };
    return response;
}