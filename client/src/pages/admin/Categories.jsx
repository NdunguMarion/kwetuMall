import CategoryForm from "../../components/CategoryForm";
import axios from "axios";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Sidebar from "./Sidebar";

const Categories = () => {
  const [status, setStatus] = useState("create");
  const [categories, setCategories] = useState([]);
  const [categoryData, setCategoryData] = useState({ name: "" });
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setStatus("create");
    setCategoryData({ name: "" });
  };
  const handleShow = () => setShow(true);

  const getCategories = async () => {
    const { data } = await axios.get("http://localhost:5000/categories/");
    console.log(data.data);
    setCategories(data.data);
  };
  const createCategory = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      "http://localhost:5000/categories/create",
      categoryData
    );
    console.log(data);
    if (data.message === "succesfully created category!") {
      setCategories([...categories, data.data]);
      setCategoryData({ name: "" });
      //close the modal
      handleClose();
    }
  };

  const getOneCategory = async (id) => {
    setStatus("edit");
    const { data } = await axios.get("http://localhost:5000/categories/" + id);
    console.log(data);
    setCategoryData(data.data);
  };
  const editCategory = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      `http://localhost:5000/categories/update/${categoryData._id}`,
      categoryData
    );
    console.log(data);
    if (data.message === "succesfully updated category!") {
      const newCategories = categories.map((category) => {
        if (category._id === categoryData._id) {
          return data.data;
        } else {
          return category;
        }
      });
      setCategories(newCategories);
      setCategoryData({ name: "" });
      handleClose();
    }
  };
  const deleteCategory = async (id) => {
    const { data } = await axios.post(
      `http://localhost:5000/categories/delete/${id}`
    );
    console.log(data);
    if (data.message === "succesfully deleted category!") {
      const filteredCategories = categories.filter((category) => {
        return category._id !== id;
      });
      setCategories(filteredCategories);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <Sidebar />
      <div className="adminContainer">
        <h1>Categories</h1>
        <button
          style={styles.createButton}
          onClick={() => {
            setStatus("create");
            handleShow();
          }}
        >
          Create Category
        </button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th> Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => {
              return (
                <tr key={category._id}>
                  <td>{category._id}</td>
                  <td>{category.name}</td>
                  <td>
                    <button
                      style={styles.button}
                      onClick={() => {
                        getOneCategory(category._id);
                        handleShow();
                      }}
                    >
                      Edit{" "}
                    </button>
                    <button
                      style={styles.button}
                      onClick={() => deleteCategory(category._id)}
                    >
                      Delete{" "}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        <CategoryForm
          status={status}
          categoryData={categoryData}
          setCategoryData={setCategoryData}
          createCategory={createCategory}
          editCategory={editCategory}
          show={show}
          handleClose={handleClose}
        />
      </div>
    </div>
  );
};
const styles = {
  createButton: {
    paddingLeft: "5px",
    paddingRight: "5px",
    margin: "2px",
    border: "1px solid #fff",
    borderRadius: "5px",
    background: "black",
    color: "#fff",
    width: "200px",
  },
  button: {
    // padding: '5px',
    paddingLeft: "5px",
    paddingRight: "5px",
    margin: "2px",
    border: "1px solid #fff",
    borderRadius: "5px",
    background: "black",
    color: "#fff",
  },
};

export default Categories;
