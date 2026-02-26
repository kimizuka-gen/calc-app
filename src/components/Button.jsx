import styles from './Button.module.css';

/**
 * 電卓のボタンコンポーネント
 * @param {Object} props
 * @param {string} props.value - ボタンの表示値
 * @param {Function} props.onClick - クリック時のハンドラー
 * @param {string} [props.type='default'] - ボタンのタイプ (default, operator, special, equals)
 * @param {string} [props.className] - 追加のCSSクラス
 * @param {boolean} [props.disabled=false] - 無効化フラグ
 */
function Button({ value, onClick, type = 'default', className = '', disabled = false }) {
  const handleClick = () => {
    if (!disabled) {
      onClick(value);
    }
  };
  
  const buttonClass = `${styles.button} ${styles[type]} ${className} ${disabled ? styles.disabled : ''}`.trim();
  
  return (
    <button
      className={buttonClass}
      onClick={handleClick}
      disabled={disabled}
      aria-label={value}
    >
      {value}
    </button>
  );
}

export default Button;
