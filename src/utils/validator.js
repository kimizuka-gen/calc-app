/**
 * 入力検証ユーティリティ
 */

/**
 * 入力が数字かどうかをチェック
 * @param {string} char - チェックする文字
 * @returns {boolean}
 */
export function isDigit(char) {
  return /^\d$/.test(char);
}

/**
 * 入力が演算子かどうかをチェック
 * @param {string} char - チェックする文字
 * @returns {boolean}
 */
export function isOperator(char) {
  return ['+', '-', '×', '÷', '*', '/'].includes(char);
}

/**
 * 入力が括弧かどうかをチェック
 * @param {string} char - チェックする文字
 * @returns {boolean}
 */
export function isParenthesis(char) {
  return char === '(' || char === ')';
}

/**
 * 式が有効かどうかをチェック
 * @param {string} expression - チェックする式
 * @returns {Object} { valid: boolean, error: string }
 */
export function validateExpression(expression) {
  if (!expression || expression.trim() === '') {
    return { valid: false, error: '式が空です' };
  }
  
  const expr = expression.trim();
  
  // 括弧のバランスをチェック
  let parenCount = 0;
  for (const char of expr) {
    if (char === '(') parenCount++;
    if (char === ')') parenCount--;
    if (parenCount < 0) {
      return { valid: false, error: '括弧の対応が不正です' };
    }
  }
  if (parenCount !== 0) {
    return { valid: false, error: '括弧の対応が不正です' };
  }
  
  // 演算子が連続していないかチェック
  const normalized = expr.replace(/\s+/g, '')
    .replace(/×/g, '*')
    .replace(/÷/g, '/');
  
  for (let i = 0; i < normalized.length - 1; i++) {
    const curr = normalized[i];
    const next = normalized[i + 1];
    
    // 演算子が連続している場合（括弧を除く）
    if (isOperator(curr) && isOperator(next)) {
      return { valid: false, error: '演算子が連続しています' };
    }
    
    // 演算子で開始している場合（括弧の後を除く）
    if (i === 0 && isOperator(curr)) {
      return { valid: false, error: '式が演算子で始まっています' };
    }
  }
  
  // 演算子で終わっていないかチェック
  const lastChar = normalized[normalized.length - 1];
  if (isOperator(lastChar)) {
    return { valid: false, error: '式が演算子で終わっています' };
  }
  
  // 括弧の直後に閉じ括弧がある場合（空の括弧）
  if (normalized.includes('()')) {
    return { valid: false, error: '空の括弧があります' };
  }
  
  return { valid: true, error: null };
}

/**
 * 次の入力が許可されるかチェック
 * @param {string} currentExpression - 現在の式
 * @param {string} nextInput - 次の入力
 * @returns {boolean}
 */
export function canAddInput(currentExpression, nextInput) {
  if (!currentExpression) {
    // 空の式の場合、数字または開き括弧のみ許可
    return isDigit(nextInput) || nextInput === '(';
  }
  
  const expr = currentExpression.trim();
  const lastChar = expr[expr.length - 1];
  
  // 数字の場合
  if (isDigit(nextInput)) {
    return true; // 数字は常に追加可能
  }
  
  // 演算子の場合
  if (isOperator(nextInput)) {
    // 最後が数字または閉じ括弧の場合のみ追加可能
    return isDigit(lastChar) || lastChar === ')';
  }
  
  // 開き括弧の場合
  if (nextInput === '(') {
    // 最後が演算子または開き括弧の場合のみ追加可能
    return isOperator(lastChar) || lastChar === '(' || expr === '';
  }
  
  // 閉じ括弧の場合
  if (nextInput === ')') {
    // 括弧のバランスをチェック
    let openCount = 0;
    for (const char of expr) {
      if (char === '(') openCount++;
      if (char === ')') openCount--;
    }
    // 開き括弧が多く、最後が数字または閉じ括弧の場合のみ追加可能
    return openCount > 0 && (isDigit(lastChar) || lastChar === ')');
  }
  
  return false;
}

/**
 * 数値が桁数制限内かチェック
 * @param {number} value - チェックする数値
 * @param {number} maxDigits - 最大桁数
 * @returns {boolean}
 */
export function isWithinDigitLimit(value, maxDigits) {
  const digits = Math.abs(value).toString().length;
  return digits <= maxDigits;
}

/**
 * 環境変数から設定値を取得
 * @returns {Object} { maxDigits: number, historyCount: number }
 */
export function getConfig() {
  const maxDigits = parseInt(import.meta.env.VITE_MAX_DIGITS || '10', 10);
  const historyCount = parseInt(import.meta.env.VITE_HISTORY_COUNT || '5', 10);
  
  return {
    maxDigits: isNaN(maxDigits) ? 10 : maxDigits,
    historyCount: isNaN(historyCount) ? 5 : historyCount
  };
}
