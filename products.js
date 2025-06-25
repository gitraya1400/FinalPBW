// Products page specific JavaScript

let currentPage = 1;
const productsPerPage = 8;
let filteredProducts = [...products];

// Initialize products page
function initProductsPage() {
    loadProducts();
    initFilters();
    initSort();
    initLoadMore();
    applyUrlFilters();
}

// Load products with pagination
function loadProducts(append = false) {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;
    
    const startIndex = append ? (currentPage - 1) * productsPerPage : 0;
    const endIndex = currentPage * productsPerPage;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);
    
    if (productsToShow.length === 0 && !append) {
        productsGrid.innerHTML = `
            <div class="no-products">
                <h3>No products found</h3>
                <p>Try adjusting your filters or search criteria</p>
            </div>
        `;
        return;
    }
    
    const productsHtml = productsToShow.map(createProductCard).join('');
    
    if (append) {
        productsGrid.innerHTML += productsHtml;
    } else {
        productsGrid.innerHTML = productsHtml;
    }
    
    // Update load more button
    updateLoadMoreButton();
}

// Initialize filter functionality
function initFilters() {
    const categoryFilters = document.querySelectorAll('[data-category]');
    const genderFilters = document.querySelectorAll('[data-gender]');
    
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Update active state
            categoryFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            // Apply filter
            applyFilters();
        });
    });
    
    genderFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Update active state
            genderFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            // Apply filter
            applyFilters();
        });
    });
}

// Apply filters
function applyFilters() {
    const activeCategory = document.querySelector('[data-category].active')?.dataset.category || 'all';
    const activeGender = document.querySelector('[data-gender].active')?.dataset.gender || 'all';
    
    filteredProducts = products.filter(product => {
        const categoryMatch = activeCategory === 'all' || product.category === activeCategory;
        const genderMatch = activeGender === 'all' || product.gender === activeGender;
        return categoryMatch && genderMatch;
    });
    
    // Reset pagination
    currentPage = 1;
    loadProducts();
}

// Initialize sort functionality
function initSort() {
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            sortProducts(this.value);
        });
    }
}

// Sort products
function sortProducts(sortBy) {
    switch (sortBy) {
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            filteredProducts.sort((a, b) => b.id - a.id);
            break;
        default:
            break;
    }
    
    // Reset pagination and reload
    currentPage = 1;
    loadProducts();
}

// Initialize load more functionality
function initLoadMore() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            currentPage++;
            loadProducts(true);
        });
    }
}

// Update load more button visibility
function updateLoadMoreButton() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
        const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
        if (currentPage >= totalPages) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }
}

// Apply filters from URL parameters
function applyUrlFilters() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const gender = urlParams.get('gender');
    
    if (category) {
        const categoryBtn = document.querySelector(`[data-category="${category}"]`);
        if (categoryBtn) {
            document.querySelectorAll('[data-category]').forEach(btn => btn.classList.remove('active'));
            categoryBtn.classList.add('active');
        }
    }
    
    if (gender) {
        const genderBtn = document.querySelector(`[data-gender="${gender}"]`);
        if (genderBtn) {
            document.querySelectorAll('[data-gender]').forEach(btn => btn.classList.remove('active'));
            genderBtn.classList.add('active');
        }
    }
    
    if (category || gender) {
        applyFilters();
    }
}

// Search functionality
function initSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            if (searchTerm === '') {
                filteredProducts = [...products];
            } else {
                filteredProducts = products.filter(product => 
                    product.name.toLowerCase().includes(searchTerm) ||
                    product.category.toLowerCase().includes(searchTerm)
                );
            }
            
            currentPage = 1;
            loadProducts();
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('products-grid')) {
        initProductsPage();
        initSearch();
    }
});

// Product card hover effects
document.addEventListener('mouseover', function(e) {
    if (e.target.closest('.product-card')) {
        const card = e.target.closest('.product-card');
        card.style.transform = 'translateY(-10px)';
    }
});

document.addEventListener('mouseout', function(e) {
    if (e.target.closest('.product-card')) {
        const card = e.target.closest('.product-card');
        card.style.transform = 'translateY(0)';
    }
});