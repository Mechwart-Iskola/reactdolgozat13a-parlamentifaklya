import React, { useState, useEffect } from 'react';
import ProductCard from "./ProductCard";
import "./App.css";
import { Product, ProductList } from "./types/ProductType";
import { getComments } from "./services/ApiService";

function App() {
    const [apiRes, setApiRes] = useState<ProductList | undefined>(undefined);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

    useEffect(() => {
        getComments()
            .then(res => {
                if (res) {
                    console.log("API Response:", res);
                    setApiRes(res);
                    setFilteredProducts([]);
                } else {
                    console.error("Received undefined response from API");
                }
            })
            .catch(err => console.error("Error fetching comments:", err));
    }, []);

    useEffect(() => {
        if (apiRes) {
            if (searchTerm.trim() === '') {
                setFilteredProducts([]);
            } else {
                const results = apiRes.products.filter(product =>
                    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.category.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setFilteredProducts(results);
            }
        }
    }, [searchTerm, apiRes]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
      <div className='product-card'>
        <h1>Product Information</h1>
        <div className='search-section'>
            <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleInputChange}
            />
            <div className='results-section'>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))
                ) : (
                    searchTerm ? (
                        <p className='error'>No products found matching your search criteria.</p>
                    ) : null
                )}
            </div>
        </div>
      </div>
    );
}

export default App;