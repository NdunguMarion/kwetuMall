import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { UserAvatarFilledAlt,ShoppingCart } from '@carbon/icons-react';
import { useNavigate } from "react-router-dom";


const HomeNavbar = () => {
  const navigate = useNavigate();
  return (
    <Navbar style={styles.navcont}>
      <Container>
        <Navbar.Brand href="/">KwetuMall</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse style={styles.nav}>
          <Navbar.Text >
             <UserAvatarFilledAlt onClick={()=>navigate('/login')} style={styles.navlink} size="24" />
             <ShoppingCart onClick={()=>navigate('/cart-details')}  style={styles.navlink} size="24" />
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const styles = {
  navcont: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    padding: "0", 
    margin: "0", 
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end", 
    justifyContent: "space-between",
    padding: "5px", 
  },
  navlink:{
    margin:'10px',
    textDecoration:'none'

  }
};

export default HomeNavbar;
