import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";
import CategoryEditSuccessPopup from "./CategoryEditSuccessPopup";
import CategoryEditFailPopup from "./CategoryEditFailPopup";
import apiURL from "../services/api";

const EditCategoryModal = ({ show, handleClose, categoryData }) => {
  const [formData, setFormData] = useState({
    adminCategory: categoryData.adminCategory,
    items: categoryData.items,
    description: categoryData.description,
    image: null,
  });

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("image", formData.image);
    data.append("adminCategory", formData.adminCategory);
    data.append("items", formData.items);
    data.append("description", formData.description);

    try {
      const response = await axios.put(
        `${apiURL}/menu/${categoryData._id}`,
        data
      );

      console.log("Response Data:", response.data);

      setSuccessMessage("Category edited successfully");
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Edit operation failed. Please try again.");
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="adminCategory">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                name="adminCategory"
                value={formData.adminCategory}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="items">
              <Form.Label>Some Items Name</Form.Label>
              <Form.Control
                type="text"
                name="items"
                value={formData.items}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                required
              />
            </Form.Group>

            <Form.Group controlId="imageUpload">
              <Form.Label>Change Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button type="submit" className="btn btn-dark mt-2">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Display success popup */}
      {successMessage && (
        <CategoryEditSuccessPopup
          categoryName={formData.adminCategory}
          onClose={() => setSuccessMessage(null)}
        />
      )}

      {/* Display fail popup */}
      {errorMessage && (
        <CategoryEditFailPopup onClose={() => setErrorMessage(null)} />
      )}
    </>
  );
};

export default EditCategoryModal;
