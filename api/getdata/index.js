var contentful = require('contentful');
module.exports = function (context, req) {
    try {

        var port = process.env["CDAPI_KEY"];
        console.log ("port" + port)
        let contentfulClient = contentful.createClient({
            accessToken: process.env["CDAPI_KEY"],
            space: '9gf6mhyw2bkx'
        });
        let PLAYER_CONTENT_TYPE_ID = "";
        if (req.query.type === 'about') {
            PLAYER_CONTENT_TYPE_ID = 'yesgeAbout';
        }
        else if (req.query.type === 'services') {
            PLAYER_CONTENT_TYPE_ID = 'yesgeServices';
        }
        else if (req.query.type === 'faqs') {
            PLAYER_CONTENT_TYPE_ID = 'yesgeFaqs';
        }

        if (PLAYER_CONTENT_TYPE_ID) {
            contentfulClient.getEntries({
                content_type: PLAYER_CONTENT_TYPE_ID
            })
                .then(function (entries) {
                    context.res.status(200).json(entries.items);
                    context.done();
                })
        }

        else {
            context.res.status(500).send("no request parameter");
        }
    }
    catch (error) {
        context.res.status(500).send(error);
    }


}



// module.exports = async function (context, req) {
//     context.log('JavaScript HTTP trigger function processed a request.');

//     const name = (req.query.name || (req.body && req.body.name));
//     const responseMessage = name
//         ? "Hello, " + name + ". This HTTP triggered function executed successfully."
//         : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

//     context.res = {
//         // status: 200, /* Defaults to 200 */
//         body: responseMessage
//     };
// }