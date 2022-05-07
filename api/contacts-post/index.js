
var contentfulManagement = require('contentful-management');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
   let responseMessage={}
    let status=201;
    if (req && req.body)
    {
        status=200;
    //     responseMessage = {
    //     name:req.body.name,
    //     emailAddress:req.body.emailAddress,
    //     phoneNumber:req.body.phoneNumber,
    //     comment:req.body.comments,
    // }

    
    const cmaClient = contentfulManagement.createClient({
        accessToken: process.env["CMAPI_KEY"]
    });

    cmaClient.getSpace('9gf6mhyw2bkx')
    .then((space) => space.getEnvironment('master'))
    .then((environment) => environment.createEntry('yesgeContactus', {
        fields: {
            name: {
                'en-US': req.body.name
    
            },
            emailAddress: {
                'en-US': req.body.emailAddress
    
            },
            phoneNumber: {
              'en-US': req.body.phoneNumber
  
          },
            comments: {
                'en-US': req.body.comments
    
            }
        }
    }))
    .then((entry) => {
        console.log(entry)
        entry.publish();
       responseMessage = {
            result:"success"
          }
    }
   )
    .catch(() => {
    responseMessage = {
        result:"invalid or data values"
      }

    });
   
}
else
{
     responseMessage = {
      result:"invalid or data values"
    }
}
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage,
        status:status
    };

}