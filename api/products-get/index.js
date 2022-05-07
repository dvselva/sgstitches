
var contentful = require('contentful');

module.exports = function (context, req) {
    try {
        let contentfulClient = contentful.createClient({
            accessToken: process.env["CDAPI_KEY"],
            space: '9gf6mhyw2bkx'
          });
          let PLAYER_CONTENT_TYPE_ID = 'yesgeProducts';
        
          contentfulClient.getEntries({
            content_type: PLAYER_CONTENT_TYPE_ID
          })
            .then(function (entries) {
            // console.log (JSON.stringify(entries.items));
            context.res.status(200).json(entries.items);
            context.done();
            })
        }
    catch (error) {
        context.res.status(500).send(error);
    }
}