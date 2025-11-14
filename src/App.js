import React, { useState, useEffect } from 'react';
import './App.css';

const initialProducts = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 1200 },
  { id: 2, name: 'T-Shirt', category: 'Clothing', price: 25 },
  { id: 3, name: 'The Great Gatsby', category: 'Books', price: 15 },
  { id: 4, name: 'Smartphone', category: 'Electronics', price: 800 },
  { id: 5, name: 'Jeans', category: 'Clothing', price: 50 },
  { id: 6, name: 'Sapiens', category: 'Books', price: 20 },
];

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="category-filter">
      {categories.map((category) => (
        <button
          key={category}
          className={selectedCategory === category ? 'active' : ''}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

const ProductList = ({ products, addToCart }) => {
  return (
    <div className="product-list-container">
      <h2>Product List</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h4>{product.name}</h4>
            <p>Category: {product.category}</p>
            <p>**\${product.price}**</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const ShoppingCart = ({ cart, removeFromCart }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-items">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                {item.name} (x{item.quantity}) - **\${(item.price * item.quantity).toFixed(2)}**
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <h3>Total: **\${total.toFixed(2)}**</h3>
        </>
      )}
    </div>
  );
};

const App = () => {
  const [products] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const allCategories = ['All', ...new Set(products.map(p => p.category))];

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === id);

      if (existingItem.quantity > 1) {
        return prevCart.map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        return prevCart.filter(item => item.id !== id);
      }
    });
  };

  return (
    <div className="app-container">
      <h1>Dynamic Product Filter & Cart</h1>
      <div className="main-content">
        <div className="product-section">
          <CategoryFilter
            categories={allCategories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <ProductList products={filteredProducts} addToCart={addToCart} />
        </div>
        <ShoppingCart cart={cart} removeFromCart={removeFromCart} />
      </div>
    </div>
  );
};

export default App;