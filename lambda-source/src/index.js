/* 
 * --LIBRARY MANGA LAMBDA HANDLER --
 *
 * TRIGGERS: 
 *  - APIGateway /products [ANY]
 */

'use strict';

const api = require('lambda-api')();
api.register(require('./endpoints'))

exports.handler = async (event, context) => {
    console.log({ event });
    return await api.run(event, context);
};