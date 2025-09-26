
const baseURL = "http://localhost:3000/cars";


async function fetchCars() {
    try {
        const res = await fetch(baseURL);
        if (!res.ok) throw new Error("Could not fetch cars");
        const data = await res.json();
        renderCars(data);
    } catch (error) {
        console.error("Error fetching cars:", error);
    }
}


function renderCars(cars) {
    const list = document.getElementById('car-list');
    list.innerHTML = ""; // clear old list

    cars.forEach(car => {
        const item = document.createElement('li');
        item.textContent = `${car.brand} ${car.model} (${car.year})`;
        item.className = "mb-2";
        list.appendChild(item);
    });
}


function showModal(message) {
    document.getElementById('modal-message').textContent = message;
    document.getElementById('modal').classList.add('active');
}


function closeModal() {
    document.getElementById('modal').classList.remove('active');
}


async function addCar(car) {
    try {
        const res = await fetch(baseURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(car)
        });
        if (!res.ok) throw new Error("Could not add car");
        fetchCars(); // refresh list
    } catch (error) {
        console.error("Error adding car:", error);
    }
}

// Handle form submission
document.getElementById('car-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const brand = document.getElementById('brand').value.trim();
    const model = document.getElementById('model').value.trim();
    const year = parseInt(document.getElementById('year').value, 10);

    if (brand && model && year >= 1900 && year <= 2100) {
        addCar({ brand, model, year });
        showModal("Car added successfully!");
        this.reset();
    } else {
        showModal("Please enter valid car details.");
    }
});

// Make closeModal available for the HTML button
window.closeModal = closeModal;

// Load cars immediately when page opens
fetchCars();
