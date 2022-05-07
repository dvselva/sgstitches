import React from 'react';
// import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// import Image from 'react-bootstrap/Image'
// import Carousel from 'react-bootstrap/Carousel'

// import * as contentful from 'contentful';
import AboutComponent from './AboutComponent';
import ServicesComponent from './ServicesComponent';
import AllProductsComponent from './AllProductsComponent';
import LayoutComponent from './layout/LayoutComponent';
// import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
// import { documentToReactComponents } from "@contentful/rich-text-react-renderer";


function HomeComponent() {
  return (

    // <Container>
    <>
     <LayoutComponent>
      <Row>
        <Col md={8}>
          <Row  >
            <Col md={12}>
              <AboutComponent />
            </Col>
          </Row>
          <Row >
            <Col>
              <ServicesComponent />
            </Col>
          </Row>
        </Col>
        <Col md={4}>
          <AllProductsComponent mode="top" title="Latest work" />
        </Col>
      </Row>
      </LayoutComponent>
      </>

  

  );
}

export default HomeComponent;
