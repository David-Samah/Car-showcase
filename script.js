// Initial random car data
const cars = [
  { brand: "Toyota", model: "Corolla", year: 2022 },
  { brand: "Honda", model: "Civic", year: 2021 },
  { brand: "Ford", model: "Mustang", year: 2023 },
  { brand: "Mazda", model: "CX-5", year: 2020 },
  { brand: "BMW", model: "X5", year: 2024 }
];

// Render car list
function renderCars() {
  const list = document.getElementById('car-list');
  list.innerHTML = '';
  cars.forEach(car => {
    const item = document.createElement('li');
    item.textContent = `${car.brand} ${car.model} (${car.year})`;
    item.className = "mb-2";
    list.appendChild(item);
  });
}

// Modal functions
function showModal(message) {
  document.getElementById('modal-message').textContent = message;
  document.getElementById('modal').classList.add('active');
}

function closeModal() {
  document.getElementById('modal').classList.remove('active');
}

// Handle form submission
document.getElementById('car-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const brand = document.getElementById('brand').value.trim();
  const model = document.getElementById('model').value.trim();
  const year = parseInt(document.getElementById('year').value, 10);

  if (brand && model && year >= 1900 && year <= 2100) {
    cars.push({ brand, model, year });
    renderCars();
    showModal('Car added successfully!');
    this.reset();
  } else {
    showModal('Please enter valid car details.');
  }
});

// Initial render
renderCars();

// Expose closeModal to global scope for modal button
window.closeModal = closeModal;