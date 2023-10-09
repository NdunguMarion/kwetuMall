import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


const CategoryForm = ({ status, categoryData, setCategoryData, createCategory, editCategory ,show , handleClose }) => {

 
  return (

    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{status === 'create' ? 'Create category':'Edit category'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form onSubmit={status === 'create' ? createCategory : editCategory}>
            <Form.Group className="mb-3" >
              <Form.Label>Name</Form.Label>
              {/* <p>{categoryData.name}</p> */}
              <Form.Control
                type="text"
                placeholder="Category name"
                value={categoryData.name}
                onChange={(e) => setCategoryData({ ...categoryData, name: e.target.value })}
              />
            </Form.Group>

            <Button style={styles.button} variant="primary" type="submit">
              Submit
            </Button>
          </Form>

        </Modal.Body>
      </Modal>

    </>

  )
}
const styles = {
  button: {
      width: '100%',
      padding: '5px',
      // margin: '10px',
      border: '1px solid #fff',
      borderRadius: '5px',
      background: 'black',
      color: '#fff',
  },
}

export default CategoryForm