import { steps } from '../data';
import { useReveal } from '../hooks/useReveal';
import styles from './HowItWorks.module.css';

function StepItem({ step, delay }) {
  const ref = useReveal(delay);
  return (
    <div className={styles.step} ref={ref}>
      <div className={styles.icon}>{step.icon}</div>
      <div className={styles.num}>{step.num}</div>
      <h3 className={styles.stepTitle}>{step.title}</h3>
      <p className={styles.desc}>{step.desc}</p>
    </div>
  );
}

export default function HowItWorks() {
  const headerRef = useReveal();

  return (
    <section className={styles.section} id="how">
      <div className={styles.header} ref={headerRef}>
        <span className={styles.tag}>The Process</span>
        <h2 className={styles.title}>How <em>TravelPro</em> Works</h2>
      </div>
      <div className={styles.steps}>
        {steps.map((step, i) => (
          <StepItem key={step.num} step={step} delay={i * 100} />
        ))}
      </div>
    </section>
  );
}
