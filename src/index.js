import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import AboutComponent from './AboutComponent';
import ServicesComponent from './ServicesComponent';
import NavbarComponent from './NavbarComponent';
import ContactsComponent from './ContactsComponent';
import FAQsComponent from './FAQsComponent';
import AllProductsComponent from './AllProductsComponent';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="about" element={<AboutComponent />} />
        <Route path="services" element={<ServicesComponent />} />
        <Route path="contactus" element={<ContactsComponent />} />
        <Route path="allsamples" element={<AllProductsComponent mode="all"  title="All Samples"/>} />
        <Route path="faqs" element={<FAQsComponent />} />
      </Routes>
      {/* <NavbarComponent /> */}

    </BrowserRouter>,


  </React.StrictMode>
);
