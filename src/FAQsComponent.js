import React, { useState, useEffect } from 'react';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
// import * as contentful from 'contentful';
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import Accordion from 'react-bootstrap/Accordion'
import LayoutComponent from  './layout/LayoutComponent';
import Spinner from 'react-bootstrap/Spinner';



function FAQsComponent() {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    fetchFAQs();
  }, []);


  async function fetchFAQs() {
    try {
      let response = await fetch('/api/getdata?type=faqs');
      let data = await response.json();
      setItems(data);
      setLoading(false);
  
    } catch(err) {
      // catches errors both in fetch and response.json
      alert(err);
    }
  }
 
  /*
  const fetchFAQs = async () => {

    let contentfulClient = contentful.createClient({
      accessToken:  process.env.REACT_APP_CDKEY,
      space: '9gf6mhyw2bkx'
    });
    let PLAYER_CONTENT_TYPE_ID = 'yesgeFaqs';

    contentfulClient.getEntries({
      content_type: PLAYER_CONTENT_TYPE_ID
    })
      .then(function (entries) {
        setItems(entries.items);
      })
  }
*/
  const getContents = () => {
    const contentsArray = []
    items.forEach((item, index) => {
      console.log(item.fields.question);
        contentsArray.push(
          
          <Accordion.Item eventKey={index}>
            <Accordion.Header>{item.fields.question}</Accordion.Header>
            <Accordion.Body>
            {documentToReactComponents(item.fields.answer, renderOptions)}
            </Accordion.Body>
          </Accordion.Item>

        )
    

    })

    return <div><div className="header-style">Frequently Asked Questions</div> <Accordion>{contentsArray}</Accordion></div>;
  }
  const renderOptions = {
    renderNode: {
      [INLINES.EMBEDDED_ENTRY]: (node, children) => {
          // target the contentType of the EMBEDDED_ENTRY to display as you need
      if (node.data.target.sys.contentType.sys.id === "codeBlock") {
        return (
          <pre>
            <code>{node.data.target.fields.code}</code>
          </pre>
        );
      }

      if (node.data.target.sys.contentType.sys.id === "videoEmbed") {
        return (
          <iframe
            src={node.data.target.fields.embedUrl}
            height="100%"
            width="100%"
            frameBorder="0"
            scrolling="no"
            title={node.data.target.fields.title}
            allowFullScreen={true}
          />
        );
      }
      },

      [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
        // render the EMBEDDED_ASSET as you need

        return (
          <div className="image-wrapper float-start pe-4 ">
         <Image fluid rounded
            src={`https://${node.data.target.fields.file.url}`}
            height={node.data.target.fields.file.details.image.height}
            width={node.data.target.fields.file.details.image.width}
            alt={node.data.target.fields.description} />
        </div>
      
        );
      }
    }
  }
  return (
    <div>
      {/* <Container  style={{backgroundColor:"white",marginTop:"20px",borderRadius:"10px",paddingBottom:"20px"}}> */}
<LayoutComponent>
{loading ? <Spinner animation="border" role="status" variant="danger">
          <span className="visually-hidden">Loading...</span>
        </Spinner> :
      getContents()
  }
      </LayoutComponent>
    {/* </Container> */}
    </div>
  );
}

export default FAQsComponent;
