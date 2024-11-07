// component/first
'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles.module.css';
import Modal from '../modal'; // Adjust the path as necessary
import Navbar from '../navbar'; // Adjust the path as necessary
import Image from 'next/image';

export default function First() {
  const [productList, setProductList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterActive, setFilterActive] = useState(false); // Track if a filter is active

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products/');
        setProductList(res.data);
        setFilteredProducts(res.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleCategorySelect = (brand) => {
    if (brand === 'All') {
      setFilteredProducts(productList); // Reset to show all products
      setFilterActive(false); // Deactivate filter
    } else {
      const filtered = productList.filter((prod) => prod.category === brand);
      setFilteredProducts(filtered);
      setFilterActive(true); // Activate filter
    }
  };

  const handleClearFilter = () => {
    setFilteredProducts(productList); // Reset to show all products
    setFilterActive(false); // Deactivate filter
  };

  const handleSearch = ({ company, model }) => {
    const filteredCars = productList.filter(car =>
      car.company.toLowerCase().includes(company.toLowerCase()) &&
      car.name.toLowerCase().includes(model.toLowerCase())
    );
    setFilteredProducts(filteredCars);
  };

  return (
    <div className={styles.main}>
      <Navbar onSearch={handleSearch} onCategorySelect={handleCategorySelect} />
      <h1 className={styles.heading}>Product List</h1>
      
      {filterActive && (
        <button
          onClick={handleClearFilter}
          className={styles.clearFilterBtn}
        >
          Clear Filter
        </button>
      )}
      
      <div className={styles.prod_cont}>
        {filteredProducts.map((prod) => (
          <div key={prod._id} className={styles.prod_item}>
            <div className={styles.prod_details} onClick={() => handleOpenModal(prod)}>
              <div className={styles.prod_img}>
                <Image width={100} height={100} src={prod.image} loading='lazy' className={styles.img} unoptimized/>
              </div>
              <div className={styles.prod_name}>{prod.category}</div>
              <div className={styles.prod_name}>{prod.name}</div>
              <div className={styles.prod_price}>${prod.price}</div>
              <div className={styles.details}>details</div>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          product={selectedProduct}
        />
      )}
    </div>
  );
}
  