class LottoNumbers extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render(numbers = []) {
    const ballsHTML = numbers.map(number => `<div class="ball">${number}</div>`).join('');
    this.shadowRoot.innerHTML = `
      <style>
        .ball {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: #f1c40f;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.5em;
          font-weight: bold;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
      </style>
      ${ballsHTML}
    `;
  }
}

customElements.define('lotto-numbers', LottoNumbers);

document.getElementById('generate-btn').addEventListener('click', () => {
  const lottoNumbers = generateLottoNumbers();
  const lottoNumbersElement = document.querySelector('lotto-numbers');
  lottoNumbersElement.render(lottoNumbers);
});

function generateLottoNumbers() {
  const numbers = new Set();
  while (numbers.size < 6) {
    const randomNumber = Math.floor(Math.random() * 45) + 1;
    numbers.add(randomNumber);
  }
  return Array.from(numbers).sort((a, b) => a - b);
}
