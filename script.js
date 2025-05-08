
// const navbar = document.querySelector("nav");
// window.addEventListener("scroll", ()=>
//     navbar.classList.toggle("sticky", window.scrollY > 0)
// );

const menu = document.querySelector(".menu");
// const toggleMenu = () => menu.classList.toggle("active");

// document.querySelector(".menu-btn").addEventListener("click", toggleMenu)
// document.querySelector(".close-btn").addEventListener("click", toggleMenu)

// document
// .querySelectorAll(".menu a")
// .forEach((link)=> link.addEventListener("click", toggleMenu));

// Wait for DOM to be fully loaded
// Wait for DOM to be fully loaded before executing

// CarRenderer.js - Module Pattern
const CarRenderer = (() => {
    // Configuration
    const config = {
        containerSelector: '.collection-container',
    };

    // DOM Cache
    let domCache = {};

    // Initialize
    const init = (carData) => {
        cacheDOM();
        renderCars(carData);
        bindEvents();
    };

    // Cache DOM elements
    const cacheDOM = () => {
        domCache = {
            container: document.querySelector(config.containerSelector)
        };
    };

    // Create car element (using template literals)
    const createCarElement = (car) => {
        return `
            <div class="collection-car-item" data-car-id="${car.id}">
                <img src="img/cars/${car.imgName}.png" 
                     alt="${car.name}" 
                     loading="lazy"
                     >
                <div class="car-info">
                    <div class="car-price">
                        <h5>${car.price}</h5>
                        <h6>/Day</h6>
                    </div>
                    <div class="car-location">
                        <i class="fa-solid fa-location-dot"></i>
                        <h6>${car.location}</h6>
                    </div>
                </div>
                <h2>${car.name}</h2>
                <button class="btn-2 btn-car" aria-label="Book ${car.name}">
                    <p>Book Now</p>
                    <i class="fa-solid fa-phone"></i>
                </button>
            </div>
        `;
    };

    // Render all cars (using requestAnimationFrame)
    const renderCars = (cars) => {
        if (!domCache.container) return;
        
        const fragment = document.createDocumentFragment();
        const parser = new DOMParser();
        
        cars.forEach(car => {
            const htmlString = createCarElement(car);
            const doc = parser.parseFromString(htmlString, 'text/html');
            if (doc.body.firstChild) {
                fragment.appendChild(doc.body.firstChild);
            }
        });
        
        // Efficient DOM update
        requestAnimationFrame(() => {
            domCache.container.innerHTML = '';
            domCache.container.appendChild(fragment);
        });
    };

    // Event delegation for better performance
    const bindEvents = () => {
        domCache.container?.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn-car');
            if (btn) {
                const carElement = btn.closest('.collection-car-item');
                const carId = carElement?.dataset.carId;
                if (carId) handleBookClick(carId);
            }
        });
    };

    // Booking handler
    const handleBookClick = (carId) => {
        console.log(`Booking car ${carId}`);
        // API integration would go here
    };

    // Public API
    return { init };
})();

// Usage when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const cars = [
        {
            "name": "Mercedes-AMG GTR",
            "price": "$80.00",
            "location": "California",
            "imgName": "car-1"
        },
        {
            "name": "BMW 428i - F32",
            "price": "$60.00",
            "location": "Los Angeles",
            "imgName": "car-2"
        },
        {
            "name": "Toyota 86 - Coupe",
            "price": "$40.00",
            "location": "Los Angeles",
            "imgName": "car-3"
        },
        {
            "name": "2018 Lexus LS",
            "price": "$40.00",
            "location": "Los Angeles",
            "imgName": "car-4"
        },
        {
            "name": "Rolls Royace Dawn",
            "price": "$40.00",
            "location": "Los Angeles",
            "imgName": "car-5"
        },
        {
            "name": "Lamborghini Venemo",
            "price": "$40.00",
            "location": "Los Angeles",
            "imgName": "car-6"
        },
        // ... other cars
    ];
    
    CarRenderer.init(cars);
});