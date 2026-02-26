/**
 * 計算式を評価するパーサー
 * 演算子の優先順位と括弧をサポート
 */

/**
 * トークンタイプの定義
 */
const TOKEN_TYPE = {
  NUMBER: 'NUMBER',
  OPERATOR: 'OPERATOR',
  LPAREN: 'LPAREN',
  RPAREN: 'RPAREN',
  END: 'END'
};

/**
 * 式を字句解析してトークンのリストに変換
 * @param {string} expression - 計算式
 * @returns {Array} トークンの配列
 */
function tokenize(expression) {
  const tokens = [];
  let i = 0;
  const expr = expression.replace(/\s+/g, ''); // 空白を削除
  
  while (i < expr.length) {
    const char = expr[i];
    
    // 数字の場合
    if (/\d/.test(char)) {
      let num = '';
      while (i < expr.length && /\d/.test(expr[i])) {
        num += expr[i];
        i++;
      }
      tokens.push({ type: TOKEN_TYPE.NUMBER, value: parseInt(num, 10) });
      continue;
    }
    
    // 演算子の場合
    if (['+', '-', '×', '÷', '*', '/'].includes(char)) {
      // × を * に、÷ を / に正規化
      const operator = char === '×' || char === '*' ? '*' : 
                      char === '÷' || char === '/' ? '/' : char;
      tokens.push({ type: TOKEN_TYPE.OPERATOR, value: operator });
      i++;
      continue;
    }
    
    // 括弧の場合
    if (char === '(') {
      tokens.push({ type: TOKEN_TYPE.LPAREN, value: char });
      i++;
      continue;
    }
    
    if (char === ')') {
      tokens.push({ type: TOKEN_TYPE.RPAREN, value: char });
      i++;
      continue;
    }
    
    // 不正な文字
    throw new Error(`不正な文字: ${char}`);
  }
  
  tokens.push({ type: TOKEN_TYPE.END });
  return tokens;
}

/**
 * 再帰下降パーサー
 */
class Parser {
  constructor(tokens) {
    this.tokens = tokens;
    this.pos = 0;
  }
  
  /**
   * 現在のトークンを取得
   */
  currentToken() {
    return this.tokens[this.pos];
  }
  
  /**
   * 次のトークンに進む
   */
  advance() {
    this.pos++;
  }
  
  /**
   * 式全体をパース (最低優先度)
   * expression := term (('+' | '-') term)*
   */
  parseExpression() {
    let result = this.parseTerm();
    
    while (this.currentToken().type === TOKEN_TYPE.OPERATOR &&
           (this.currentToken().value === '+' || this.currentToken().value === '-')) {
      const operator = this.currentToken().value;
      this.advance();
      const right = this.parseTerm();
      
      if (operator === '+') {
        result = result + right;
      } else {
        result = result - right;
      }
    }
    
    return result;
  }
  
  /**
   * 項をパース (乗算・除算)
   * term := factor (('*' | '/') factor)*
   */
  parseTerm() {
    let result = this.parseFactor();
    
    while (this.currentToken().type === TOKEN_TYPE.OPERATOR &&
           (this.currentToken().value === '*' || this.currentToken().value === '/')) {
      const operator = this.currentToken().value;
      this.advance();
      const right = this.parseFactor();
      
      if (operator === '*') {
        result = result * right;
      } else {
        if (right === 0) {
          throw new Error('ゼロ除算エラー');
        }
        // 整数除算
        result = Math.floor(result / right);
      }
    }
    
    return result;
  }
  
  /**
   * 因子をパース (数値または括弧で囲まれた式)
   * factor := NUMBER | '(' expression ')'
   */
  parseFactor() {
    const token = this.currentToken();
    
    // 数値の場合
    if (token.type === TOKEN_TYPE.NUMBER) {
      this.advance();
      return token.value;
    }
    
    // 括弧の場合
    if (token.type === TOKEN_TYPE.LPAREN) {
      this.advance(); // '(' をスキップ
      const result = this.parseExpression();
      
      if (this.currentToken().type !== TOKEN_TYPE.RPAREN) {
        throw new Error('閉じ括弧が見つかりません');
      }
      this.advance(); // ')' をスキップ
      return result;
    }
    
    throw new Error('不正な式です');
  }
}

/**
 * 計算式を評価
 * @param {string} expression - 計算式
 * @returns {number} 計算結果
 * @throws {Error} 計算エラー
 */
export function evaluate(expression) {
  if (!expression || expression.trim() === '') {
    throw new Error('式が空です');
  }

  const tokens = tokenize(expression);
  const parser = new Parser(tokens);
  const result = parser.parseExpression();

  // パース後にトークンが残っている場合はエラー
  if (parser.currentToken().type !== TOKEN_TYPE.END) {
    throw new Error('不正な式です');
  }

  return result;
}

/**
 * 計算式を表示用にフォーマット
 * @param {string} expression - 計算式
 * @returns {string} フォーマット済みの式
 */
export function formatExpression(expression) {
  return expression
    .replace(/\*/g, '×')
    .replace(/\//g, '÷')
    .replace(/\s+/g, ' ')
    .trim();
}
