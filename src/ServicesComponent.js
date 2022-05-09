import React, { useState, useEffect } from 'react';
// import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
// import * as contentful from 'contentful';
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import Spinner from 'react-bootstrap/Spinner';
import LayoutComponent from  './layout/LayoutComponent';



function ServicesComponent() {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    fetchServices();
  }, []);


  
  async function fetchServices() {
    try {
      let response = await fetch('/api/getdata?type=services');
      let data = await response.json();
      setItems(data);
      setLoading(false);
  
    } catch(err) {
      // catches errors both in fetch and response.json
      alert(err);
    }
  }

  const getContents = () => {
    const contentsArray = []
    items.forEach((item, index) => {
      console.log(item.fields.name);
        contentsArray.push(<Row style={{ marginTop: "20px", marginBottom: "20px" }}>
          <Col md={12}>
                {documentToReactComponents(item.fields.description, renderOptions)}
        </Col>
      </Row>)

    })

    return <div><div className="header-style">Services</div>{contentsArray}</div>;
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
       <LayoutComponent>
      {/* <Container  style={{backgroundColor:"white",marginTop:"20px",borderRadius:"10px"}}> */}
       {loading ? <Spinner animation="border" role="status" variant="danger">
          <span className="visually-hidden">Loading...</span>
        </Spinner> 
        :getContents() }
       
{/*       
    </Container> */}
    </LayoutComponent>
    </div>
  );
}

export default ServicesComponent;
