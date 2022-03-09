import Layout from '../components/common/layout/Layout';
import { useUI } from '../components/ui-context/UIContext';
import styles from '../styles/Home.module.scss'

const inliune = {
  color: 'var(--brand)'
};

const text = {
  color: 'var(--text1)',
  backgroundColor: 'var(--surface1)',
};

const Home = () => {
  const { openModal } = useUI();
  return (
    <div className={styles.container}>
      <section className={styles.main}>
        <p style={inliune}>This is brand color</p>
        <p style={text}>This is text 1 and background 1</p>
        <h3>Modal opening</h3>
        <button type="button" onClick={openModal}>Open modal demo</button>
      </section>
    </div>
  )
}

Home.Layout = Layout;

export default Home;
