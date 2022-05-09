import React, { useState, useEffect } from 'react';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
// import Carousel from 'react-bootstrap/Carousel'
import LayoutComponent from './layout/LayoutComponent';

// import * as contentful from 'contentful';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
// import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
// import { documentToReactComponents } from "@contentful/rich-text-react-renderer";


function AllProductsComponent(props) {

  const [items, setItems] = useState([]);
  const [newitems, setnewItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [srcImageUrl, setsrcImageUrl] = useState("");
  const [name, setName] = useState("");



  useEffect(() => {
    fetchProducts();
    fetchNewProducts();
  }, []);

  const handleClose = () => setShow(false);

  const handleShow = (src,name) => {
    if (src) {
      setsrcImageUrl(src);
      setName(name);
    }
    setShow(true);

  }

  const splitItems = () => {
    var perChunk = Math.ceil(items.length / 3)
    var result = items.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / perChunk)

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []
      }

      resultArray[chunkIndex].push(item)

      return resultArray
    }, [])

    console.log(result);
    return result;
  }



  async function fetchProducts() {
    try {
      let response = await fetch('/api/products-get');
      let data = await response.json();
      setItems(data);
      setLoading(false);

    } catch (err) {
      // catches errors both in fetch and response.json
      alert(err);
    }
  }


  async function fetchNewProducts() {
    try {
      let response = await fetch('/api/products-new-get');
      let data = await response.json();
      setnewItems(data);
      setLoading(false);
    } catch (err) {
      // catches errors both in fetch and response.json
      alert(err);
    }
  }


  const getContents = () => {

    const resultsArray = splitItems(items);

    const columns1Array = [];
    const columns2Array = [];
    const columns3Array = [];

    resultsArray.forEach((entries, outerindex) => {

      let columnsArray = [];
      entries.forEach((entry, index) => {

        let imageUrl = "https://placeholder.pics/svg/300";

        try {
          if (entry.fields.image && entry.fields.image.length > 0) {
            imageUrl = entry.fields.image[0].fields.file.url;
          }
        }
        catch {
          console.log("error");
        }
        columnsArray.push(<div className="row mt-3">
          <a href={() => false} onClick={() => handleShow(imageUrl,entry.fields.name)}  >
            <div className="col-md-12" >
              <div className="card" >
                <img src={imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title" style={{ textDecoration: "none", textUnderline: "none" }}>{entry.fields.name}</h5>
                </div>
              </div>
            </div>
          </a>
        </div>
        )
      })

      if (outerindex === 0) {
        columns1Array.push(columnsArray);
      }
      else if (outerindex === 1) {
        columns2Array.push(columnsArray);
      }
      else {
        columns3Array.push(columnsArray)
      }

    })

    return <div><div className="header-style">{props.title}</div> <div className="row">
      <div className="col-md-4">
        {columns1Array}
      </div>
      <div className="col-md-4">
        {columns2Array}
      </div>
      <div className="col-md-4">
        {columns3Array}
      </div>
    </div>
    </div>;
  }

  const getTopContents = () => {
    const contentsArray = [];
    newitems.forEach((item, index) => {

      console.log(item.fields.name);
      // let rawRichTextField = item.fields.description;
      // console.log(documentToHtmlString(rawRichTextField));
      let imageUrl = "https://placeholder.pics/svg/300";
      try {
        if (item.fields.image && item.fields.image.length > 0) {
          imageUrl = item.fields.image[0].fields.file.url;
        }
      }
      catch {
        console.log("error");
      }

      contentsArray.push(
        <a href={() => false} onClick={() => handleShow(imageUrl,item.fields.name)}>
          <div className="col-md-12 mt-3" >
            <div class="card" >
              <img src={imageUrl} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{item.fields.name}</h5>
              </div>
            </div>
          </div>
        </a>
      )

    });

    return <div> <div className="header-style">{props.title}</div>{contentsArray}</div>;

  }
  return (
    <>
      <LayoutComponent>
        {!loading && props.mode === 'all' ? getContents()


          :
          !loading && props.mode === 'top' ? getTopContents()
            :
            <div>
              <Spinner animation="border" role="status" variant="danger">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>}


            <Modal show={show}  dialogClassName="modal-80w" onHide={handleClose}  backdrop="static">
<Modal.Header closeButton>
  <Modal.Title>{name}</Modal.Title>
</Modal.Header>
<Modal.Body>
  <Image src={srcImageUrl} fluid />
</Modal.Body>
<Modal.Footer>
  <Button variant="secondary" onClick={handleClose}>
    Close
  </Button>
  {/* <Button variant="primary" onClick={handleClose}>
    Save Changes
  </Button> */}
</Modal.Footer>
</Modal>

      </LayoutComponent>



    </>
  );
}

export default AllProductsComponent;
