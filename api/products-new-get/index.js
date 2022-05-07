
var contentful = require('contentful');
module.exports = function (context, req) {
    try {
        let contentfulClient = contentful.createClient({
            accessToken: process.env["CDAPI_KEY"],
            space: '9gf6mhyw2bkx'
        });
        let PLAYER_CONTENT_TYPE_ID = 'yesgeProducts';
        contentfulClient.getEntries({
            content_type: PLAYER_CONTENT_TYPE_ID,
            'metadata.tags.sys.id[in]': 'new,latest'
        })
            .then(function (entries) {
                // console.log (JSON.stringify(entries.items));

                context.res.status(200).json(entries.items);
                // context.res = {
                //     headers: { 'Content-Type': 'application/json' },
                //     body: {'results':entries.items,'name0':'Selvakumar' },
                //     status:200
                // }
                context.done();
            })
    }
    catch (error) {
        context.res.status(500).send(error);
    }
}