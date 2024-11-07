// /app/details/[id]/page.js
'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './page.module.css';
import useCartStore from '../../../store/cartStore';

export default function Page({ params }) {
  const [car, setCar] = useState(null);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${params.id}`)
      .then((res) => {
        setCar(res.data);
      })
      .catch((error) => {
        console.error("Error fetching car data:", error);
      });
  }, [params.id]);

  const formatPrice = (price) => {
    return `$${price.toLocaleString('en-US')}`;
  };

  const handleAddToCart = () => {
    addToCart(car);
    alert(`${car.name} has been added to your cart!`);
  };

  return (
    <div className={styles.container}>
      {car && (
        <>
          <h1 className={styles.heading}>{car.category} {car.name}</h1>
          <img src={car.image} alt={car.name} className={styles.image} />
          <div className={styles.price}>{formatPrice(car.price)}</div>
          <div className={styles.details}>{car.details}</div>
          <div className={styles.buttonContainer}>
            <button className={styles.button} onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}
