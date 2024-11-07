// app/cart/page.jsx
'use client';
import React, { useEffect } from 'react';
import useCartStore from '../../store/cartStore';
import styles from './page.module.css';

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const loadCart = useCartStore((state) => state.loadCart);

  useEffect(() => {
    loadCart(); // Load the cart data from localStorage on component mount
  }, [loadCart]);

  // Calculate total price of the cars in the cart, hardcoded to 1 USD per car
  const totalPrice = cart.reduce((total, car) => total + 1 * car.quantity, 0);

  // Handle Stripe checkout
  const handleCheckout = async () => {
    try {
      const cartItems = cart.map((car) => ({
        name: car.name,
        price: 1,  // Hardcoded price for testing
        quantity: car.quantity,
      }));

      const res = await fetch('http://localhost:5000/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartItems }),
      });

      const data = await res.json();
      if (data.id) {
        // Redirect to Stripe checkout
        window.location.href = `https://checkout.stripe.com/pay/${data.id}`;
      }
    } catch (err) {
      console.error('Error during checkout:', err);
    }
  };

  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.heading}>Your Cart</h1>
      {cart.length === 0 ? (
        <p className={styles.emptyMessage}>Your cart is empty.</p>
      ) : (
        <>
          <div className={styles.cartItems}>
            {cart.map((car, index) => (
              <div key={index} className={styles.cartItem}>
                <img src={car.image} alt={car.name} className={styles.cartImage} />
                <div className={styles.cartDetails}>
                  <h2>{car.name}</h2>
                  <p>{car.category}</p>
                  <p>{car.details}</p>
                  <p>$1</p> {/* Display the hardcoded price */}
                </div>
                <button
                  className={styles.removeButton}
                  onClick={() => removeFromCart(index)}
                >
                  -
                </button>
              </div>
            ))}
          </div>
          <div className={styles.cartSummary}>
            <h2>Total: ${totalPrice.toFixed(2)}</h2>
            <button className={styles.checkoutButton} onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
