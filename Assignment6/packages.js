// Data-driven packages table with pricing logic
const packages = [
  { id: 1, destination: 'Georgia', durationDays: 5, basePrice: 26700, season: 'peak' },
  { id: 2, destination: 'Paris', durationDays: 5, basePrice: 86000, season: 'off' },
  { id: 3, destination: 'Vietnam', durationDays: 5, basePrice: 45000, season: 'regular' }
];

function getSeasonalMultiplier(season) {
  switch (season) {
    case 'peak': return 1.2;
    case 'off': return 0.85;
    case 'regular':
    default: return 1;
  }
}

function isWeekendSurcharge() {
  // Example: add 10% if today is Friday/Saturday
  const today = new Date().getDay();
  return today === 5 || today === 6 ? 1.1 : 1;
}

function calculateFinalPrice(pkg) {
  let price = pkg.basePrice * getSeasonalMultiplier(pkg.season);
  price *= isWeekendSurcharge();
  return Math.round(price);
}

function renderPackagesTable() {
  const table = document.createElement('table');
  table.innerHTML = `
    <tr>
      <th>Destination</th>
      <th>Duration</th>
      <th>Base Price</th>
      <th>Final Price</th>
    </tr>
  `;
  packages.forEach(pkg => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${pkg.destination}</td>
      <td>${pkg.durationDays - 1} Nights / ${pkg.durationDays} Days</td>
      <td>Rs ${pkg.basePrice.toLocaleString()}</td>
      <td>Rs ${calculateFinalPrice(pkg).toLocaleString()}</td>
    `;
    table.appendChild(row);
  });
  const main = document.querySelector('main.container');
  main.innerHTML = '';
  main.appendChild(table);
}

document.addEventListener('DOMContentLoaded', renderPackagesTable);