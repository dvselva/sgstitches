
var contentful = require('contentful');

let contentfulClient = contentful.createClient({
  accessToken: process.env["CDAPI_KEY"],
  space: '9gf6mhyw2bkx'
});
let PLAYER_CONTENT_TYPE_ID = 'yesgeProducts';
const call = contentfulClient.getEntries({content_type: PLAYER_CONTENT_TYPE_ID})

module.exports = async function (context, req) {
  let data;  
  try {
      
        // let contentfulClient = contentful.createClient({
        //     accessToken: process.env["CDAPI_KEY"],
        //     space: '9gf6mhyw2bkx'
        //   });
        //   let PLAYER_CONTENT_TYPE_ID = 'yesgeProducts';
          
          data = await call;

          // contentfulClient.getEntries({
          //   content_type: PLAYER_CONTENT_TYPE_ID
          // })
          //   .then(function (entries) {
          //   context.res.status(200).json(entries.items);
          //   context.done();
          //  })

        }
    catch (error) {
      context.log.error('ERROR', err);
      throw err;
        // context.res.status(500).send(error);
       
    }
    context.res.status(200).json(data.items);
}