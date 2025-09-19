// Booking price estimator and validation
const packageBasePrices = {
  standard: 20000,
  premium: 35000,
  luxury: 60000
};

function getNights(from, to) {
  const d1 = new Date(from);
  const d2 = new Date(to);
  const diff = (d2 - d1) / (1000 * 60 * 60 * 24);
  return diff > 0 ? diff : 0;
}

function getGuestsMultiplier(guests) {
  return guests > 2 ? 1.2 : 1;
}

function getPromoDiscount(code) {
  switch (code.trim().toUpperCase()) {
    case 'EARLYBIRD': return 0.9;
    case 'FAMILY': return 0.85;
    default: return 1;
  }
}

function validateForm(fields) {
  return fields.name && fields.email && fields.from && fields.to && fields.destination !== 'default' && fields.package !== 'default';
}

function estimatePrice() {
  const from = document.querySelector('input[name="date"]:nth-of-type(1)').value;
  const to = document.querySelector('input[name="date"]:nth-of-type(2)').value;
  const pkg = document.querySelector('select[name="package"]').value;
  const guests = parseInt(document.querySelector('input[name="guests"]')?.value || '1', 10);
  const promo = document.querySelector('input[name="promo"]')?.value || '';
  let nights = getNights(from, to);
  let base = packageBasePrices[pkg] || 0;
  let total = base * nights;
  total *= getGuestsMultiplier(guests);
  total *= getPromoDiscount(promo);
  return isNaN(total) ? 0 : Math.round(total);
}

function updateTotal() {
  const total = estimatePrice();
  let totalDiv = document.getElementById('total-estimate');
  if (!totalDiv) {
    totalDiv = document.createElement('div');
    totalDiv.id = 'total-estimate';
    document.querySelector('form').appendChild(totalDiv);
  }
  totalDiv.textContent = `Estimated Total: Rs ${total.toLocaleString()}`;
}

function checkFormValidity() {
  const fields = {
    name: document.querySelector('input[name="name"]').value,
    email: document.querySelector('input[name="email"]').value,
    from: document.querySelector('input[name="date"]:nth-of-type(1)').value,
    to: document.querySelector('input[name="date"]:nth-of-type(2)').value,
    destination: document.querySelector('select[name="destination"]').value,
    package: document.querySelector('select[name="package"]').value
  };
  const valid = validateForm(fields);
  document.querySelector('button[type="submit"]').disabled = !valid;
}

document.addEventListener('DOMContentLoaded', () => {
  // Add guests and promo fields if not present
  let guestsInput = document.querySelector('input[name="guests"]');
  if (!guestsInput) {
    guestsInput = document.createElement('input');
    guestsInput.type = 'number';
    guestsInput.name = 'guests';
    guestsInput.min = '1';
    guestsInput.value = '1';
    guestsInput.placeholder = 'Number of guests';
    document.querySelector('form').insertBefore(guestsInput, document.querySelector('label[for="Additional Notes"]'));
  }
  let promoInput = document.querySelector('input[name="promo"]');
  if (!promoInput) {
    promoInput = document.createElement('input');
    promoInput.type = 'text';
    promoInput.name = 'promo';
    promoInput.placeholder = 'Promo code (optional)';
    document.querySelector('form').insertBefore(promoInput, document.querySelector('label[for="Additional Notes"]'));
  }
  // Listen for changes
  document.querySelectorAll('input, select').forEach(el => {
    el.addEventListener('input', () => {
      updateTotal();
      checkFormValidity();
    });
    el.addEventListener('change', () => {
      updateTotal();
      checkFormValidity();
    });
  });
  updateTotal();
  checkFormValidity();
  document.querySelector('form').addEventListener('submit', e => {
    if (document.querySelector('button[type="submit"]').disabled) e.preventDefault();
  });
});
