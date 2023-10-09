import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import HomeNavbar from "./HomeNavbar";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import axios from "axios";
import authApi from '../../api/authApi';


const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [success, setSuccess]= useState(null)
  const [error, SetError]= useState(null)

  const getProduct = async () => {
    const { data } = await axios.get(`http://localhost:5000/products/${id}`)
    if (data.message === "fetched products") {
      setProduct(data.data)
    }
  }
  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const addToCart = async()=>{
   const {data}=await authApi.post('/add-to-cart',{
    productId:product._id,
    quantity:quantity,
   })
   console.log(data)
   if (data.message ==='added to cart'){
    setSuccess (true)
    SetError(error)
   }else{
    SetError(data.message);
    setSuccess(null)
   }
  }
 
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <Container>

      <HomeNavbar />
      <hr  style={styles.hr} /> 
      
      <Row>
        <Col>
          <Card.Img style={styles.img} variant="top" src={"http://localhost:5000/" + product.image} />
        </Col>
       
        <Col>
          <Card style={styles.card}> 
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
              
              <div style={styles.btn}>
                <div>
                <button style={styles.button} onClick={decrementQuantity}>-</button>
                <span style={{marginRight:'10px'}}>{quantity}</span>
                <button style={styles.button} onClick={incrementQuantity}>+</button>
                </div>
                <p style={styles.price}> Ksh{product.sellingPrice*quantity}</p>
              </div>
              <button 
              onClick={addToCart}
              style={styles.itemsbutton}>Add to Cart</button>
              {
                success ? <>
                <p>Succesfully added to cart!</p>
                <p>Click <a href='/ '>here</a> to continue shopping</p>
                <p>Click <a href='/cart-details'>here</a> to view cart</p>
                </>
                :null
              }
              {
                error ? <p>{error}</p> :null
              }
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
const styles = {
 card:{
    padding: "5px",
    border: "1px solid #fff",
    borderRadius: "5px",
 }, 
 hr:{
  marginTop: "-1rem"
 },
 btn: {
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-end",
  borderRadius: "10px",
  justifyContent: "space-between", 
  padding: "10px",
},
 button: { 
  borderRadius: "7px", 
  background: "#fff",
  color: "#000",
  border: "1px solid #000",
  padding: "5px",
  width: "25px", 
  marginRight:'10px'
 },
price: {
  margin: 0, 
},
img:{
    width:'100%',
    height:'100%',
    borderRadius: "5px",

},

  itemsbutton: {
    width: "100%",
    padding: "5px",
    border: "1px solid #fff",
    borderRadius: "5px",
    background: "black",
    color: "#fff",
    
  },
 
  
};

export default ProductDetails;