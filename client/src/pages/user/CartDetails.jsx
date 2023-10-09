import { useEffect, useState } from "react";
import HomeNavbar from "./HomeNavbar";
import { TrashCan } from '@carbon/icons-react';
import Container from "react-bootstrap/Container";
import authApi from '../../api/authApi'
import CheckoutForm from '../../components/CheckoutForm'


const CartDetails = () => {
    const [products, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
 

    const getTotal = (items)=>{
        const totalPrice = items.reduce((total, item) => {
            return total + item.product.sellingPrice * item.quantity;
        }, 0);

        setTotalPrice(totalPrice);
    }

    const getCartItems = async () => {
        const { data } = await authApi.get('/get-cart-items')
        console.log(data)
        setProducts(data.data)
        getTotal(data.data)
        
    }

    const deleteItem= async (id) => {
        const { data } = await authApi.post('/cart-details/delete/' + id);
        console.log(data);
        if (data.message ==='Deleted Item') {
            console.log('data');
            let filteredCartItems=products.filter((item) => {
                return item.product._id !== id;
            });
            setProducts(filteredCartItems);
            getTotal(filteredCartItems)
        }
    };

    useEffect(() => {
        getCartItems();
    }, [])

    return (
        <div >
            <HomeNavbar />
            <Container>
                <hr style={styles.hr} />
                <div>{
                    products.map((item) => {
                        return (
                            <div key={item.product._id} style={styles.content}>
                                <img style={styles.img} src={"http://localhost:5000/" + item.product.image} alt="image" />
                                <div style={styles.productDetails}>
                                    <p>{item.product.name}</p>
                                    <p>{item.quantity}</p>
                                    <p>{item.product.sellingPrice}</p>
                                    <TrashCan onClick={() => deleteItem (item.product._id)} size="24" />
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div style={styles.details}>
                    <p style={styles.total}>Total: Ksh {totalPrice}
                    </p>

                    <CheckoutForm />
                </div>
            </Container>
        </div>
    )
};

const styles = { 
    hr: {
        marginTop: "-16px"
    },
    img: {
        minWidth: "100px",
        width: "100px",
        height: "100px"
    },
    content: {
        border: " 1px solid #000",
        borderRadius: "5px",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        marginTop: "20px",
        // margin: "20px"
    },
    productDetails: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        margin: "20px",
        width: "100%"

    },
    details: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "30px",
    },
    total: {
        margin: "20px"
    },
}

export default CartDetails;