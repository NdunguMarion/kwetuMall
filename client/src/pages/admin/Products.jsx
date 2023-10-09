import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "../../components/ProductForm";
import Sidebar from "./Sidebar";
import Table from "react-bootstrap/Table";

const Products = () => {
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState("create");
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState({
    name: "",
    buyingPrice: "",
    sellingPrice: "",
    stock: "",
    image: "",
    categories: [],
    description: "",
  });

  const handleClose = () => {
    setShow(false);
    setStatus("create");
    setProductData({
      name: "",
      buyingPrice: "",
      sellingPrice: "",
      stock: "",
      image: "",
      categories: [],
      description: "",
    });
  };

  const handleShow = () => setShow(true);

  const createProduct = async (e) => {
    e.preventDefault();
    //formData -> used when sending text and files/images to the backend
    let formData = new FormData();
    formData.append("name", productData.name);
    formData.append("buyingPrice", productData.buyingPrice);
    formData.append("sellingPrice", productData.sellingPrice);
    formData.append("stock", productData.stock);
    formData.append("image", productData.image);
    formData.append("description", productData.description);
    // When adding an array to form data you can loop over it using for loop or use JSON.stringify
    formData.append("categories", JSON.stringify(productData.categories));

    const { data } = await axios.post(
      "http://localhost:5000/products/create",
      formData
    );
    console.log(data);
    getProducts();
    handleClose();
  };

  const getProducts = async () => {
    const { data } = await axios.get("http://localhost:5000/products");
    console.log(data);
    if (data.message === "fetched products") {
      setProducts(data.data);
    }
  };

  const editProduct = async (e) => {
    e.preventDefault();
    //formData -> used when sending text and files/images to the backend
    let formData = new FormData();
    formData.append("name", productData.name);
    formData.append("buyingPrice", productData.buyingPrice);
    formData.append("sellingPrice", productData.sellingPrice);
    formData.append("stock", productData.stock);
    formData.append("image", productData.image);
    formData.append("description", productData.description);
    // When adding an array to form data you can loop over it using for loop or use JSON.stringify
    formData.append("categories", JSON.stringify(productData.categories));
    console.log(productData.image)
    if (productData.image) {
      formData.append("image", productData.image);
    }

    const { data } = await axios.post(
      `http://localhost:5000/products/update/${productData._id}`,
      formData
    );
    console.log(data);

    if (data.message === "Updated product!") {
      let updatedProducts = products.map((product) => {
        if (product._id === productData._id) {
          return data.data;
        } else {
          return product;
        }
      });
      setProducts(updatedProducts);
      handleClose();
    }
  };

  const deleteProduct = async (id) => {
    const { data } = await axios.post(
      `http://localhost:5000/products/delete/${id}`
    );
    console.log(data);
    if (data.message === "Deleted products") {
      let filteredproducts = products.filter((product) => {
        return product._id !== id;
      });
      setProducts(filteredproducts);
    }
  };

  const handleEdit = async (id) => {
    const { data } = await axios.get(`http://localhost:5000/products/${id}`);
    console.log(data);
    if (data.message === "fetched products") {
      setProductData(data.data);
      setStatus("edit");
      handleShow();
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Sidebar />
      <div className="adminContainer">
        <h1>Products</h1>
        <button style={styles.button} onClick={handleShow}>
          Create Product
        </button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>SellingPrice</th>
              <th>Stock</th>
              <th>Categories</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product._id}>
                  <td>
                    <img
                      style={styles.img}
                      src={"http://localhost:5000/" + product.image}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.sellingPrice}</td>
                  <td>{product.stock}</td>
                  <td>{product.categories}</td>
                  <td>{product.description}</td>
                  <td>
                    <button
                      style={styles.button}
                      onClick={() => handleEdit(product._id)}
                    >
                      Edit{" "}
                    </button>
                    <button
                      style={styles.button}
                      onClick={() => deleteProduct(product._id)}
                    >
                      Delete{" "}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <ProductForm
          show={show}
          handleClose={handleClose}
          status={status}
          productData={productData}
          setProductData={setProductData}
          createProduct={createProduct}
          editProduct={editProduct}
        />
        {/* ///display all our products in a table
        name,price,stock,categories,description,action(edit,delete button) */}
      </div>
    </>
  );
};

const styles = {
  button: {
    paddingLeft: "5px",
    paddingRight: "5px",
    margin: "2px",
    border: "1px solid #fff",
    borderRadius: "5px",
    background: "black",
    color: "#fff",
  },
  img: {
    width: "20px",
    height: "20px",
  },
};

export default Products;
