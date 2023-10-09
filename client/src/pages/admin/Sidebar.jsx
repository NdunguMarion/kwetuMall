import React from "react"
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();
    return (
        <div style={styles.sidebar}>
            <h1 style={styles.h1}>Kwetu Mall Admin Panel</h1>
            <ul style={styles.buttonList}>
                <div>
                    <li>
                        <button style={styles.button}>Products</button>
                    </li>
                    <li>
                        <button style={styles.button}
                        onClick={()=> navigate('/admin/categories')}
                        >Categories</button>
                    </li>
                    <li>
                        <button style={styles.button}>Pickup points</button>
                    </li>
                    <li>
                        <button style={styles.button}>Users</button>
                    </li>
                    <li>
                        <button style={styles.button}>Admins</button>
                    </li>
                </div>
                <div  style={styles.list}>
                    <li>
                        <button style={styles.button}>My account</button>
                    </li>
                    <li>
                        <button style={styles.button}>Logout</button>
                    </li>
                </div>
            </ul>
        </div>
    );


}
const styles = {
    sidebar: {
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        width: '250px',
        height: '100%',
        background: '#000',
        color: 'white',
        padding: '20px',
        position: 'fixed',
        top: '0',
        left: '0',
        bottom: '0',
        fontSize:'10px'
    },
    h1: {
        color: '#fff',
        fontSize: '30px',
        textAlign: 'center',
    },
    buttonList: {
        display: 'block',
        justifyContent: 'space-around',
        listStyleType: "none",
        padding: '0',
    },
    button: {
        width: '200px',
        padding: '10px',
        margin: '10px 0',
        border: '1px solid #fff',
        borderRadius: '5px',
        background: 'black',
        color: '#fff',
    },
    list:{
        marginTop:'70px',
    }



}
export default Sidebar;

