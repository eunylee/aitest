const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('change', () => {
  if (themeToggle.checked) {
    body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    themeToggle.checked = true;
    body.classList.add('dark-mode');
  }
});

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
        :host {
          --ball-bg-color: var(--button-bg-color-light);
          --ball-text-color: var(--button-text-color-light);
        }
        body.dark-mode :host {
          --ball-bg-color: var(--button-bg-color-dark);
          --ball-text-color: var(--button-text-color-dark);
        }
        .ball {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: var(--ball-bg-color);
          color: var(--ball-text-color);
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
