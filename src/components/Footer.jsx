import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <a href="#" className={styles.logo}>TravelPro</a>
      <ul className={styles.links}>
        {['Destinations', 'Itineraries', 'About', 'Privacy'].map(l => (
          <li key={l}><a href="#">{l}</a></li>
        ))}
      </ul>
      <span className={styles.copy}>© 2026 TravelPro. All rights reserved.</span>
    </footer>
  );
}
