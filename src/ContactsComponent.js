import React, { useState } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import * as contentfulManagement from 'contentful-management';
import { useNavigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert'
import LayoutComponent  from './layout/LayoutComponent';

function ContactsComponent() {

  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  let [Name, setName] = useState('');
  let [EmailAddress, setEmailAddress] = useState('');
  let [PhoneNumber, setPhoneNumber] = useState('');
  let [Comments, setComments] = useState('');
  let [error, setError] = useState(false);
  let [success, setSuccess] = useState(false);
  const [show, setShow] = useState(true);

  
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();
    if (form.checkValidity() === true)
    {
      // saveItemv1(event);
      asyncPostCall();
    
    }
    

  };

  // const saveItemv1 = (event) => {
    
// async saveItemv1 =() => {
  const asyncPostCall = async () => {
    try {
      const response = await fetch('/api/contacts-post', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
         },
         body: JSON.stringify({
          name:Name,
          emailAddress:EmailAddress,
          phoneNumber:PhoneNumber,
          comments:Comments
          })
       });
       const data = await response.json();
        console.log(data);
        setSuccess(true);
        setComments('');
        setName('');
        setPhoneNumber('');
        setEmailAddress('');
        setValidated(false);
        setShow(true);

     } catch(error) {
         console.log(error)
         setError(true);
       } 
  }
  


// async function saveItemv1() {
//     const settings = {
//       method: 'POST',
//       headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//       },
//       body: {
//         name:Name,
//         emailAddress:EmailAddress,
//         phoneNumber:PhoneNumber,
//         comments:Comments
//       }

//     }

//     try {
//       const postResponse = await fetch('http://localhost:7071/api/contacts-post', settings);
//       const data = await postResponse.json();
//       console.log(data);
//   } catch (e) {
//       return e;
//   }  

//   }
  // const saveItem = (event) =>{

  //   const cmaClient = contentfulManagement.createClient({
  //     accessToken:  process.env.REACT_APP_CMKEY
  // });

  // cmaClient.getSpace('9gf6mhyw2bkx')
  //       .then((space) => space.getEnvironment('master'))
  //       .then((environment) => environment.createEntry('yesgeContactus', {
  //           fields: {
  //               name: {
  //                   'en-US': Name
        
  //               },
  //               emailAddress: {
  //                   'en-US': EmailAddress
        
  //               },
  //               phoneNumber: {
  //                 'en-US': PhoneNumber
      
  //             },
  //               comments: {
  //                   'en-US': Comments
        
  //               }
  //           }
  //       }))
  //       .then((entry) => {
  //           console.log(entry)
  //           // alert ("added item successfully");
  //           setSuccess(true);
     
  //           setComments('');
  //           setName('');
  //           setPhoneNumber('');
  //           setEmailAddress('');
  //           setValidated(false);
  //           setShow(true);
  //           entry.publish();
  //           // navigate("/");
  //       }
  //      )
  //       .catch(() => {
  //         setError(true);

  //       });


  // }

  const handleChange = (event) => {
    if (event.target.id === "name")
    {
    setName(event.target.value);
    }
    else if (event.target.id==="emailaddress"){
      setEmailAddress(event.target.value);
    }
    else if (event.target.id==="phonenumber"){
      setPhoneNumber(event.target.value);
    }
    else if (event.target.id==="comments"){
      setComments(event.target.value);
    }
  }
  return (
    <div>
     
      <LayoutComponent>
      <Row className="mt-3">
        <Col>
        <div className="header-style">Contact Us </div>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
        </Col>
      </Row> 
      <Form noValidate validated={validated} onSubmit={handleSubmit} id="contactForm" className="mb-5" 

      >
      <Row className="mb-3 mt-2">
        <Form.Group as={Col} md={8}  controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Name"
            value={Name}
            onChange={handleChange}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="8" controlId="emailaddress">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Email Address"
            value={EmailAddress}
            onChange={handleChange}
            />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="8" controlId="phonenumber">
          <Form.Label>Phone Number </Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Phone Number"
            value={PhoneNumber}
            onChange={handleChange}
            />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="8" controlId="comments">
          <Form.Label>Comments</Form.Label>
          <Form.Control 
            as ='textarea'
            required
            row="10"
            placeholder="Comments"
            value={Comments}
            onChange={handleChange}
            />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

     </Row>
     
    
      <Button type="submit">Submit</Button>

    </Form>

    {success && show? <Alert key="success" variant="success" dismissible  onClose={() =>{setShow(false);navigate("/");}}> Saved your comment/question successfully. we will get in touch with you soon </Alert> 
    :null
  }
   {error && show? <Alert key="danger" variant="danger" dismissible  onClose={() => setShow(false)}> Sorry something went wrong. please try again later </Alert> 
    :null
  }
   </LayoutComponent>
    </div>
  );
}

export default ContactsComponent;
