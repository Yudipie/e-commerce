// components/Modal.js
import { motion } from 'framer-motion';
import styles from './styles.module.css';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const Modal = ({ isOpen, onClose, product }) => {
  const router = useRouter();

  const handleSeeMoreClick = () => {
    const isLoggedIn = Cookies.get('loggedin');

    if (isLoggedIn) {
      router.push(`/details/${product._id}`);
    } else {
      router.push('/login');
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className={styles.modalBackdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className={styles.modalContent}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        onClick={(e) => e.stopPropagation()} // Prevent click from closing the modal
      >
        <img src={product.image} alt={product.name} className={styles.modalImage} />
        <h2 className={styles.modalName}>{product.category} {product.name}</h2>
        <p className={styles.modalPrice}>${product.price}</p>
        <div className={styles.modalFooter}>
          <button className={styles.seeMoreButton} onClick={handleSeeMoreClick}>
            See More
          </button>
        </div>
        <p className={styles.modalDescription}>{product.details}</p>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
