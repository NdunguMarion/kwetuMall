# notes
## creating a node and express project
1. reating afolder,you can use ``mkdir nameofFolder``
2. cd into that folder
3. add command 'npm init' this creates the package.json file for you
4. install necessary packages
```
npm instal express
npm install nodemon
npm install mongoose
npm install body-parser
npm install cors
```
- nodemon enables us to see changes without having t restart the server

5. Go to package .json file .remove the following code in scripts
```
"test": "echo \"Error: no test specified\" && exit 1"

```
- replace it with the followin code
```
 "start":"nodemon index.js"
 ```
 just above the script add
 "type":"module"
6. to run the project run the following command in your terminal
```
npm start
``
## activities
## activity 1
-create an endpoint in your index.js file
-send an array of users,the array will contain objects that have the user FirstName,LastName,EmailAddress,PhoneNumber & password
-consume the api you've created on your frontend on APP.jsx and map over the data

### Assignment 1
-on your frontend install react router dom
-create a folder in src call it pages
-create a file called FirstApi.jsx in this folder
-Move code on App.jsx to the component FirstApi
-On App.jsx add aroute/first-api that will take you to this component


password=123456789
username=ndungumarion

## assignment2
-find out why delete uses post not get

## assignment 3
-create a file under pages under admin folder
-name the folder sidebar.jsx
-implement the design set on the Sidebar.jsx
-you can add a route on app.jsx to view the sidebar

##3assignment 4
-under componenent folder create a file ,call it Modal.jsx
-add the react bootstrap live demo modal in the file
import it in categories .jsx

###useeffect
allows you to perform side effects in your components
is a crucial tool for managing side effects and handling asynchronous operations
 The empty dependency array [] means the effect runs only once after the initial render. If you specify dependencies in the array, the effect will re-run whenever those dependencies change.
 import React, { useEffect, useState } from 'react';

example;

function ExampleComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // This function will run after the component has rendered.
    // You can use it for data fetching or other side effects.
    fetchData()
      .then((result) => {
        setData(result);
      });

    // Return a cleanup function if needed (e.g., for event listeners)
    return () => {
      // Clean up resources here
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div>
      {/* Render your component content here */}
    </div>
  );
}


<!-- 
... is used as a spread operator
eg
let person={
    firstName='john'
}
console .log(person)
result will be 'john'

let person={...person,lastname='mwangi'}
console.log(person)

result will be 'john' 'mwangi' -->

 const editProduct= async(e)=>{
    e.preventDefault();
     const{data}=await axios.post(`http://localhost:5000/products/update/${productData._id}`, productData);
     console.log(data)
     if (data.message==='Updated pickup point!'){
         let updatedProducts=products.map((product)=>{
             if (product._id === productData._id){
                 return data.data
             }else{
                 return product
             }
         });
         setProducts(updatedProducts);
         handleClose();
     }
 }
 const deleteProduct = async (id) => {
     const { data } = await axios.post(`http://localhost:5000/products/delete/${id}`);
     console.log(data);
     if (data.message === 'Deleted products!') {
        let filteredproducts =products.filter((product) => {
             return product._id !== id
         }) 
         setProducts(filteredproducts); 
     }
 }


const handleEdit = async(id)=>{
    setStatus('edit')
    const{data}=await axios.get(`http://localhost:5000/products/${id}`);
    console.log(data)
    if (data.message==='Fetched products!'){
        setProductData(data.data);
        handleShow();
    }
}

choose a simple assignment to practice with
-shoe selling website
figma

make the submit form is responsive and modal to dissapper when subkit button is clicked
add numerous products in the product component


////bcrypt used for hashing passwords
////jsonwebtoken generetes a token from some data

create a folder impport in home
use react bootstrap
grid cards

check on the find syntax .find

are packages installed in client or server??
