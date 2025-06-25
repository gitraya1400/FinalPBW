// Global JavaScript for all pages

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Enhanced product data with better images
const products = [
    {
        id: 1,
        name: "Classic England White Shirt",
        price: 299000,
        category: "shirts",
        gender: "men",
        image: "baju england.jpg",
        badge: "new"
    },
    {
        id: 2,
        name: "Casual Denim Jacket",
        price: 459000,
        category: "casual",
        gender: "women",
        image: "denim jacket.jpg",
        badge: "sale"
    },
    {
        id: 3,
        name: "Formal Black Blazer",
        price: 699000,
        category: "formal",
        gender: "men",
        image: "blazer.jpg",
        badge: ""
    },
    {
        id: 4,
        name: "Trendy Crop Top",
        price: 199000,
        category: "casual",
        gender: "women",
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=300&fit=crop&crop=center",
        badge: "new"
    },
    {
        id: 5,
        name: "Business Shirt",
        price: 349000,
        category: "shirts",
        gender: "men",
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=300&fit=crop&crop=center",
        badge: ""
    },
    {
        id: 6,
        name: "Summer Blouse",
        price: 259000,
        category: "casual",
        gender: "women",
        image: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=300&h=300&fit=crop&crop=center",
        badge: "sale"
    },
    {
        id: 7,
        name: "Elegant Evening Dress",
        price: 799000,
        category: "formal",
        gender: "women",
        image: "https://images.unsplash.com/photo-1566479179817-c0b5b4b4b1e5?w=300&h=300&fit=crop&crop=center",
        badge: ""
    },
    {
        id: 8,
        name: "Casual Polo Shirt",
        price: 229000,
        category: "casual",
        gender: "men",
        image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=300&h=300&fit=crop&crop=center",
        badge: "new"
    },
    {
        id: 9,
        name: "Designer Hoodie",
        price: 399000,
        category: "casual",
        gender: "men",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop&crop=center",
        badge: "new"
    },
    {
        id: 10,
        name: "Silk Scarf",
        price: 159000,
        category: "formal",
        gender: "women",
        image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=300&h=300&fit=crop&crop=center",
        badge: ""
    }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Format price to Indonesian Rupiah
function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(price);
}

// Create product card HTML
function createProductCard(product) {
    const badgeHtml = product.badge ? `<div class="product-badge ${product.badge}">${product.badge}</div>` : '';
    
    return `
        <div class="product-card" data-category="${product.category}" data-gender="${product.gender}" data-id="${product.id}">
            ${badgeHtml}
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">${formatPrice(product.price)}</div>
                <div class="product-actions">
                    <button class="btn-add-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                    <button class="btn-quick-view" onclick="quickView(${product.id})">Quick View</button>
                </div>
            </div>
        </div>
    `;
}

// Load featured products on homepage
function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featured-products');
    if (featuredContainer) {
        const featuredProducts = products.slice(0, 4);
        featuredContainer.innerHTML = featuredProducts.map(createProductCard).join('');
    }
}

// Hero filter functionality
function initHeroFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            // Redirect to products page with filter
            if (filter !== 'all') {
                window.location.href = `products.html?gender=${filter}`;
            } else {
                window.location.href = 'products.html';
            }
        });
    });
}

// Category card functionality
function initCategoryCards() {
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            window.location.href = `products.html?category=${category}`;
        });
    });
}

// Newsletter form
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                showNotification('Thank you for subscribing to our newsletter!');
                this.reset();
            }
        });
    }
}

// Cart functionality
function toggleCart() {
    const cartDropdown = document.getElementById('cart-dropdown');
    if (cartDropdown) {
        cartDropdown.classList.toggle('show');
    }
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        showNotification('Product added to cart!');
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
        }
    }
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Update cart count
    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.classList.toggle('show', totalItems > 0);
    }
    
    // Update cart items
    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        } else {
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">${formatPrice(item.price)}</div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        </div>
                    </div>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            `).join('');
        }
    }
    
    // Update total
    if (cartTotal) {
        cartTotal.textContent = formatPrice(totalPrice);
    }
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    
    showNotification('Redirecting to checkout...');
    // Here you would redirect to checkout page
    // window.location.href = 'checkout.html';
}

// Quick view functionality
let currentQuickViewProduct = null;

function quickView(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        currentQuickViewProduct = product;
        
        document.getElementById('modal-product-image').src = product.image;
        document.getElementById('modal-product-name').textContent = product.name;
        document.getElementById('modal-product-category').textContent = product.category.toUpperCase();
        document.getElementById('modal-product-price').textContent = formatPrice(product.price);
        
        document.getElementById('quick-view-modal').style.display = 'block';
    }
}

function closeQuickView() {
    const modal = document.getElementById('quick-view-modal');
    if (modal) {
        modal.style.display = 'none';
        currentQuickViewProduct = null;
    }
}

function addToCartFromModal() {
    if (currentQuickViewProduct) {
        const size = document.getElementById('size-select').value;
        const quantity = parseInt(document.getElementById('quantity-input').value);
        
        const existingItem = cart.find(item => item.id === currentQuickViewProduct.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                ...currentQuickViewProduct,
                quantity: quantity,
                size: size
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        showNotification(`${quantity} item(s) added to cart!`);
        closeQuickView();
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #2d4a2b;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-family: 'League Gothic', sans-serif;
        font-weight: 500;
        letter-spacing: 1px;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
        style.remove();
    }, 3000);
}

// Close cart when clicking outside
document.addEventListener('click', function(e) {
    const cartDropdown = document.getElementById('cart-dropdown');
    const cartIcon = document.querySelector('.cart-icon');
    
    if (cartDropdown && cartDropdown.classList.contains('show')) {
        if (!cartDropdown.contains(e.target) && !cartIcon.contains(e.target)) {
            cartDropdown.classList.remove('show');
        }
    }
});

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const modal = document.getElementById('quick-view-modal');
    if (e.target === modal) {
        closeQuickView();
    }
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedProducts();
    initHeroFilters();
    initCategoryCards();
    initNewsletterForm();
    updateCartDisplay();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});