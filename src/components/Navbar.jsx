import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <a href="#" className={styles.logo}>TravelPro</a>
      <ul className={styles.links}>
        <li><a href="#destinations">Destinations</a></li>
        <li><a href="#how">How It Works</a></li>
        <li><a href="#featured">Featured</a></li>
        <li><a href="#newsletter" className={styles.pill}>Get Inspired</a></li>
      </ul>
    </nav>
  );
}
