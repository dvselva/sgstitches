import React, { useState, useEffect } from 'react';
// import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import Image from 'react-bootstrap/Image'
// import * as contentful from 'contentful';
// import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
// import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import Spinner from 'react-bootstrap/Spinner';
import LayoutComponent from  './layout/LayoutComponent';
import parse from 'html-react-parser';


function AboutComponentSP() {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchAbout();
  }, []);



  async function fetchAbout() {
    try {
      let response = await fetch(`https://pnpsp.azurewebsites.net/api/spget?type=about`);
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
      console.log(item.Title);
      contentsArray.push(<Row style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Col md={12}>
          {parse(item.Description)}
        </Col>
      </Row>)

    })

    //  return <div><div className="header-style">About Us</div>{contentsArray}</div>;
    return contentsArray;
  }


  return (

    <div>

      {/* <Container style={{ backgroundColor: "white", marginTop: "20px", borderRadius: "10px", paddingBottom: "25px" }}> */}

       <LayoutComponent>
       
        {loading ? <Spinner animation="border" role="status" variant="danger">
          <span className="visually-hidden">Loading...</span>
        </Spinner> :
       
          <Row className="mt-3"> 
            <Col>
           
              <div className="header-style">About Us </div>
            </Col></Row> } {getContents()}

            </LayoutComponent>

      {/* </Container> */}

    </div>
  );
}

export default AboutComponentSP;
