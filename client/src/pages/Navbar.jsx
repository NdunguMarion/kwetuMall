import React from "react"

const Navbar = () => {
    return (
        <div style={styles.navcont}>
            <ul style={styles.nav}>
                <li>
                    <a href="/first-api">FirstApi</a>
                </li>
            </ul>
        </div>
    )
}

const styles = {
    navcont: {
        // border: '1px solid #fff',
        width: '90vw'
    },
    nav: {
        display: 'flex',
        justifyContent: 'space-around',
        listStyleType: 'none',
        
    }
}
export default Navbar

