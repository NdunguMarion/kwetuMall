import { useState, useEffect } from "react";
import HomeNavbar from "./HomeNavbar";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from 'react-bootstrap/Container';
import { ArrowRight } from '@carbon/icons-react';
import { useNavigate } from "react-router-dom";

import axios from 'axios';


const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const { data } = await axios.get('http://localhost:5000/products');
    console.log(data)
    if (data.message === 'fetched products') {
      setProducts(data.data)
    }
  }
  useEffect(() => {
    getProducts()
  }, []);

  return (
    <Container>
      <HomeNavbar />
      <hr style={styles.hr}/>
      <img
        src="./topImage.png"
        alt="Background"
        style={styles.backgroundImage}
      />
      <button style={styles.imagebutton} >items on sale < ArrowRight /></button>
      <Row xs={1} md={4} className="g-4">

        {products.map((product) => (
          <Col key={product._id}>
            <Card style={styles.card} >
              <Card.Img style={styles.img} variant="top" src={"http://localhost:5000/" + product.image} />
              <Card.Body >
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                  {product.description}
                </Card.Text>
                <div style={styles.text}>
                  <p style={styles.p}>Ksh {product.sellingPrice}</p>
                  <button onClick={() => navigate(`/product/${product._id}`)} style={styles.button}>View</button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
const styles = {
  imagebutton: {
    background: "#000",
    color: '#fff',
    opacity: '50%',
    marginTop: '-100px',
    marginBottom: '50px',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: "10px 50px",
    border:"none",

  },
  hr:{
   marginTop:"-1em"
  },
  card: {
    padding: '0px',
    marginLeft: '7px',
    border:"none"
  },
  p:{
    marginTop:"20px",
    fontWeight: "bold"
  },
  text:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    // border:"1px solid #000"
  },
  button: {
   padding:"0 40px",
    margin: "6px",
    borderRadius: "40px",
    background: "#fff",
    color: "#000",
    border:"2px solid #000",
   
  },
  img: {
    // width: "315px",
    height: "250px",
    // border: "1px solid #000",

  },

  backgroundImage: {
    borderRadius: '10px',
    marginBottom: '30px',
    width: '100%'
  },


};
export default Home;