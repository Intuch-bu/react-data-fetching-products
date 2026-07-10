import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);

  async function fetchProducts() {
    const response = await axios.get("http://localhost:4001/products");
    setProducts(response.data.data);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  async function deleteProduct(productId) {
    try {
      await axios.delete(`http://localhost:4001/products/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {products.map((product) => (
          <div className="product">
            <div className="product-preview">
              <img
                src={product.image}
                alt={product.name}
                width="350"
                height="350"
              />
            </div>

            <div className="product-detail">
              <h1>Product name: {product.name}</h1>
              <h2>Product price: {product.price} Baht</h2>
              <p>Product description: {product.description}</p>
            </div>
            <button
              className="delete-button"
              onClick={() => deleteProduct(product.id)}
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
