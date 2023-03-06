import Table from "react-bootstrap/Table";
import React, { useState, useEffect } from "react";
import axios from "axios";
export default function List() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/inventories")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setUpdatedProduct({ ...product });
  };

  const handleDelete = (id) => {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    // Prompt the user to confirm the delete operation
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    console.log(id);
    // If the user confirms the delete operation, remove the product from the state
    if (confirmDelete) {
      axios
        .delete(`http://localhost:3001/deleteinventory/${id}`)
        .then(() => {
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== id)
          );
          window.alert("Item deleted successfully!");
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleUpdate = () => {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    console.log("updatedProduct", updatedProduct); // Log the updatedProduct before sending to API
    axios
      .patch(
        `http://localhost:3001/updateinventories/${selectedProduct.user_id}`,
        updatedProduct,
        config
      )
      .then(() => {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.user_id === selectedProduct.user_id
              ? updatedProduct
              : product
          )
        );
        setSelectedProduct(null);
        setUpdatedProduct(null);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      {selectedProduct && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setSelectedProduct(null)}>
              &times;
            </span>
            <h2>Edit Item</h2>
            <form className="form-group">
              <label>
                Item Name:
                <input
                  type="text"
                  value={updatedProduct.item}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      item: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                Category:
                <input
                  type="text"
                  value={updatedProduct.category}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      category: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                Price:
                <input
                  type="number"
                  value={updatedProduct.price}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      price: e.target.value,
                    })
                  }
                />
              </label>
              <button type="button" onClick={handleUpdate}>
                Update
              </button>
            </form>
          </div>
        </div>
      )}
      <table>
        <thead>
          <tr className="background-grey ">
            <th>No.</th>
            <th>Item</th>
            <th>Category</th>
            <th>Price</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.item}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>
                <button className="" onClick={() => handleEdit(product)}>
                  Edit
                </button>
              </td>
              <td>
                <button
                  className=""
                  onClick={() => handleDelete(product.user_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
