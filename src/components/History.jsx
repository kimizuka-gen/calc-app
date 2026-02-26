import styles from './History.module.css';

/**
 * 計算履歴表示コンポーネント
 * @param {Object} props
 * @param {Array} props.history - 計算履歴の配列 [{expression: string, result: number}]
 * @param {Function} [props.onClearHistory] - 履歴クリア時のハンドラー
 */
function History({ history, onClearHistory }) {
  if (!history || history.length === 0) {
    return (
      <div className={styles.history}>
        <div className={styles.header}>
          <h3 className={styles.title}>計算履歴</h3>
        </div>
        <div className={styles.empty}>履歴はありません</div>
      </div>
    );
  }
  
  return (
    <div className={styles.history}>
      <div className={styles.header}>
        <h3 className={styles.title}>計算履歴</h3>
        {onClearHistory && (
          <button 
            className={styles.clearButton}
            onClick={onClearHistory}
            aria-label="履歴をクリア"
          >
            クリア
          </button>
        )}
      </div>
      <ul className={styles.list} role="list">
        {history.map((item, index) => (
          <li key={`${item.expression}-${item.result}`} className={styles.item}>
            <span className={styles.expression}>{item.expression}</span>
            <span className={styles.equals}>=</span>
            <span className={styles.result}>{item.result}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;
