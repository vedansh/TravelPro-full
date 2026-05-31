import { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.css';

export default function Hero({ onSearch }) {
  const bgRef = useRef(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const el = bgRef.current;
    if (!el) return;
    const id = requestAnimationFrame(() => el.classList.add(styles.loaded));
    return () => cancelAnimationFrame(id);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query.trim());
    document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.hero}>
      <div className={styles.bg} ref={bgRef} />
      <div className={styles.overlay} />

      <div className={styles.content}>
        <div className={styles.eyebrow}>
          <span className={styles.line} />
          Curated Travel Experiences
          <span className={styles.line} />
        </div>
        <h1 className={styles.title}>
          Discover Your<br /><em>Next Adventure</em>
        </h1>
        <p className={styles.sub}>
          Hand-picked destinations, beautifully planned — from hidden gems to iconic escapes, crafted for every kind of traveler.
        </p>
        <form className={styles.search} onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search a destination…"
            aria-label="Search destinations"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button type="submit">Explore →</button>
        </form>
      </div>

      <div className={styles.stats}>
        {[['240+', 'Destinations'], ['1–2', 'Day Itineraries'], ['50k+', 'Happy Travelers']].map(
          ([num, label]) => (
            <div key={label} className={styles.stat}>
              <span className={styles.statNum}>{num}</span>
              <span className={styles.statLabel}>{label}</span>
            </div>
          )
        )}
      </div>

      <div className={styles.scrollHint}>
        <span>Scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
