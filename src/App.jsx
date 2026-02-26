import Calculator from './components/Calculator';
import styles from './App.module.css';

/**
 * アプリケーションのルートコンポーネント
 */
function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>電卓アプリ</h1>
        <p className={styles.subtitle}>整数四則演算対応</p>
      </header>
      
      <main className={styles.main}>
        <Calculator />
      </main>
      
      <footer className={styles.footer}>
        <p className={styles.footerText}>
          キーボード操作: 数字(0-9), 演算子(+,-,*,/), 括弧((,)), Enter(=), Esc(AC), Backspace(Del)
        </p>
      </footer>
    </div>
  );
}

export default App;
