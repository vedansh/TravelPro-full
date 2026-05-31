import { useReveal } from '../hooks/useReveal';
import styles from './Featured.module.css';

export default function Featured() {
  const ref = useReveal();

  return (
    <div className={styles.wrap} id="featured" ref={ref}>
      <div className={styles.card}>
        <img
          className={styles.img}
          src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=85"
          alt="Paris, France"
          loading="lazy"
        />
        <div className={styles.overlay} />
        <div className={styles.body}>
          <div className={styles.tag}>Editor's Pick</div>
          <h2 className={styles.title}>
            Paris in<br /><em>One Perfect Day</em>
          </h2>
          <p className={styles.desc}>
            From a warm croissant in Saint-Germain to a golden sunset over Sacré-Cœur — the definitive 24-hour Paris guide.
          </p>
          <div className={styles.btns}>
            <a href="#" className={styles.solid}>View Itinerary →</a>
            <a href="#" className={styles.ghost}>Save for Later</a>
          </div>
        </div>
      </div>
    </div>
  );
}
