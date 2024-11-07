// component/navbar
'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css';
import Link from 'next/link';

const brands = ['Mercedes', 'Porsche', 'BMW', 'Ferrari'];

export default function Navbar({ onCategorySelect, onSearch }) {
  const [showBrands, setShowBrands] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [company, setCompany] = useState('');
  const [model, setModel] = useState('');
  const categoryRef = useRef(null);
  const router = useRouter();

  const handleCategoryClick = () => {
    setShowBrands(!showBrands);
  };

  const handleBrandSelect = (brand) => {
    onCategorySelect(brand);
    setShowBrands(false);
  };

  const handleClickOutside = (event) => {
    if (categoryRef.current && !categoryRef.current.contains(event.target)) {
      setShowBrands(false);
      setShowSearch(false);
    }
  };

  useEffect(() => {
    if (showBrands || showSearch) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showBrands, showSearch]);

  const handleCartClick = () => {
    router.push('/cart');
  };

  const handleSearchClick = () => {
    setShowSearch(!showSearch);
  };

  const handleSearchChange = () => {
    onSearch({ company, model });
  };

  return (
    <div className={styles.main}>
      <div className={styles.logo}></div>
      <div className={styles.buttons} ref={categoryRef}>
        <div className={styles.categories} onClick={handleCategoryClick}>Categories</div>
        {showBrands && (
          <div className={styles.brandList}>
            {brands.map((brand) => (
              <div
                key={brand}
                className={styles.brandItem}
                onClick={() => handleBrandSelect(brand)}
              >
                {brand}
              </div>
            ))}
          </div>
        )}
        <div className={styles.cart} onClick={handleCartClick}>Cart</div>
        <div className={styles.search} onClick={handleSearchClick}>Search</div>
        {showSearch && (
          <div className={styles.searchFields}>
            <input
              type="text"
              value={company}
              placeholder="Enter company"
              onChange={(e) => {
                setCompany(e.target.value);
                handleSearchChange();
              }}
              className={styles.inputField}
            />
            <input
              type="text"
              value={model}
              placeholder="Enter model"
              onChange={(e) => {
                setModel(e.target.value);
                handleSearchChange();
              }}
              className={styles.inputField}
            />
          </div>
        )}
      </div>
      <Link href={'/login'} className={styles.link}><div className={styles.login}>Login</div></Link>
    </div>
  );
}
