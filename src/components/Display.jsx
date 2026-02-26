import styles from './Display.module.css';

/**
 * 電卓の表示エリアコンポーネント
 * @param {Object} props
 * @param {string} props.expression - 現在の計算式
 * @param {string} [props.result] - 計算結果（あれば表示）
 * @param {string} [props.error] - エラーメッセージ（あれば表示）
 */
function Display({ expression, result, error }) {
  return (
    <div className={styles.display}>
      {error ? (
        <div className={styles.error} role="alert">
          {error}
        </div>
      ) : (
        <>
          <div className={styles.expression} aria-label="計算式">
            {expression || '0'}
          </div>
          {result !== undefined && result !== null && (
            <div className={styles.result} aria-label="計算結果">
              = {result}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Display;
