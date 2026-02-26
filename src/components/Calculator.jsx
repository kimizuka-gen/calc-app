import { useState, useEffect, useCallback } from 'react';
import Display from './Display';
import Button from './Button';
import History from './History';
import { evaluate, formatExpression } from '../utils/parser';
import { canAddInput, validateExpression, isWithinDigitLimit, getConfig } from '../utils/validator';
import styles from './Calculator.module.css';

/**
 * 電卓のメインコンポーネント
 */
function Calculator() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [lastResult, setLastResult] = useState(null);
  
  const config = getConfig();
  
  // localStorageから履歴を読み込む
  useEffect(() => {
    const savedHistory = localStorage.getItem('calc-history');
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        setHistory(parsed.slice(0, config.historyCount));
      } catch (e) {
        console.error('履歴の読み込みに失敗しました:', e);
      }
    }
  }, [config.historyCount]);
  
  // 履歴をlocalStorageに保存
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem('calc-history', JSON.stringify(history));
    }
  }, [history]);
  
  /**
   * 入力ハンドラー
   */
  const handleInput = useCallback((value) => {
    // エラー状態をクリア
    if (error) {
      setError(null);
    }
    
    // 結果が表示されている場合、数字以外の入力で結果を使って続行
    if (result !== null && lastResult !== null) {
      if (!canAddInput('', value)) {
        // 演算子の場合、前の結果を使って続行
        setExpression(lastResult.toString() + value);
        setResult(null);
        setLastResult(null);
        return;
      } else {
        // 数字の場合、新しい計算を開始
        setExpression(value);
        setResult(null);
        setLastResult(null);
        return;
      }
    }
    
    // 入力が許可されるかチェック
    if (!canAddInput(expression, value)) {
      return;
    }
    
    setExpression(prev => prev + value);
  }, [expression, result, lastResult, error]);
  
  /**
   * 計算実行ハンドラー
   */
  const handleCalculate = useCallback(() => {
    if (!expression) {
      return;
    }
    
    // 式の検証
    const validation = validateExpression(expression);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }
    
    try {
      const calculatedResult = evaluate(expression);
      
      // 桁数チェック
      if (!isWithinDigitLimit(calculatedResult, config.maxDigits)) {
        setError(`エラー: 数値が大きすぎます（最大${config.maxDigits}桁）`);
        setTimeout(() => {
          handleClear();
        }, 2000);
        return;
      }
      
      setResult(calculatedResult);
      setLastResult(calculatedResult);
      
      // 履歴に追加
      const formattedExpr = formatExpression(expression);
      const newHistory = [
        { expression: formattedExpr, result: calculatedResult },
        ...history
      ].slice(0, config.historyCount);
      setHistory(newHistory);
      
    } catch (err) {
      if (err.message.includes('ゼロ除算')) {
        setError('エラー: ゼロで割ることはできません');
        setTimeout(() => {
          handleClear();
        }, 2000);
      } else {
        setError('エラー: 不正な式です');
      }
    }
  }, [expression, history, config.maxDigits, config.historyCount, handleClear]);
  
  /**
   * 全クリアハンドラー
   */
  const handleClear = useCallback(() => {
    setExpression('');
    setResult(null);
    setError(null);
    setLastResult(null);
  }, []);
  
  /**
   * 1文字削除ハンドラー
   */
  const handleDelete = useCallback(() => {
    if (error) {
      setError(null);
    }
    if (result !== null) {
      setResult(null);
      setLastResult(null);
      return;
    }
    setExpression(prev => prev.slice(0, -1));
  }, [error, result]);
  
  /**
   * 履歴クリアハンドラー
   */
  const handleClearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem('calc-history');
  }, []);
  
  /**
   * キーボード入力ハンドラー
   */
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;
      
      // 数字
      if (/^\d$/.test(key)) {
        event.preventDefault();
        handleInput(key);
        return;
      }
      
      // 演算子
      const operatorMap = {
        '+': '+',
        '-': '-',
        '*': '×',
        '/': '÷'
      };
      
      if (operatorMap[key]) {
        event.preventDefault();
        handleInput(operatorMap[key]);
        return;
      }
      
      // 括弧
      if (key === '(' || key === ')') {
        event.preventDefault();
        handleInput(key);
        return;
      }
      
      // Enter (計算実行)
      if (key === 'Enter') {
        event.preventDefault();
        handleCalculate();
        return;
      }
      
      // Escape (全クリア)
      if (key === 'Escape') {
        event.preventDefault();
        handleClear();
        return;
      }
      
      // Backspace (1文字削除)
      if (key === 'Backspace') {
        event.preventDefault();
        handleDelete();
        return;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleInput, handleCalculate, handleClear, handleDelete]);
  
  return (
    <div className={styles.calculator}>
      <div className={styles.main}>
        <Display 
          expression={formatExpression(expression)}
          result={result}
          error={error}
        />
        
        <div className={styles.buttonGrid}>
          {/* 1行目: AC, Del, (, ) */}
          <Button value="AC" onClick={handleClear} type="special" />
          <Button value="Del" onClick={handleDelete} type="special" />
          <Button value="(" onClick={handleInput} type="operator" />
          <Button value=")" onClick={handleInput} type="operator" />
          
          {/* 2行目: 7, 8, 9, ÷ */}
          <Button value="7" onClick={handleInput} />
          <Button value="8" onClick={handleInput} />
          <Button value="9" onClick={handleInput} />
          <Button value="÷" onClick={handleInput} type="operator" />
          
          {/* 3行目: 4, 5, 6, × */}
          <Button value="4" onClick={handleInput} />
          <Button value="5" onClick={handleInput} />
          <Button value="6" onClick={handleInput} />
          <Button value="×" onClick={handleInput} type="operator" />
          
          {/* 4行目: 1, 2, 3, - */}
          <Button value="1" onClick={handleInput} />
          <Button value="2" onClick={handleInput} />
          <Button value="3" onClick={handleInput} />
          <Button value="-" onClick={handleInput} type="operator" />
          
          {/* 5行目: 0, =, + */}
          <Button value="0" onClick={handleInput} className={styles.zeroButton} />
          <Button value="=" onClick={handleCalculate} type="equals" />
          <Button value="+" onClick={handleInput} type="operator" />
        </div>
      </div>
      
      <History 
        history={history}
        onClearHistory={handleClearHistory}
      />
    </div>
  );
}

export default Calculator;
