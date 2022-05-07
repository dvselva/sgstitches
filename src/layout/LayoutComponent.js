import React from 'react';
import Container from 'react-bootstrap/Container';



const LayoutComponent =({children}) =>{
    return(
        <>
        <Container style={{ backgroundColor: "white", marginTop: "20px", borderRadius: "10px", paddingBottom: "25px" }}>
        <main>{children}</main>
        </Container>
        </>
    )
}

export default LayoutComponent;