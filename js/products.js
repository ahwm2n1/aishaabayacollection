// Products Data with your given products
const products = [
    { id: 1, title: "Turkish Rose", price: 2530.00, oldPrice: 5060.00, image1: "images/abaya-1.webp", image2: "images/abaya-2.webp" },
    { id: 2, title: "Turkish Sky", price: 2430.00, oldPrice: 4860.00, image1: "images/abaya-3.webp", image2: "images/abaya-4.webp" },
    { id: 3, title: "Urban Grey", price: 2035.00, oldPrice: 4070.00, image1: "images/abaya-5.webp", image2: "images/abaya-6.jpg" },
    { id: 4, title: "Elegance Shadow", price: 2625.00, oldPrice: 5250.00, image1: "images/abaya-7.jpg", image2: "images/abaya-8.webp" },
    { id: 5, title: "Urban Green", price: 2035.00, oldPrice: 4070.00, image1: "images/abaya-9.jpg", image2: "images/abaya-10.jpg" },
    { id: 6, title: "Claire", price: 2530.00, oldPrice: 5060.00, image1: "images/abaya-11.webp", image2: "images/abaya-12.webp" },
    { id: 7, title: "Nylah", price: 4650.00, oldPrice: 9300.00, image1: "images/abaya-13.webp", image2: "images/abaya-14.webp" },
    { id: 8, title: "Aariza Maroon", price: 4650.00, oldPrice: 9300.00, image1: "images/abaya-15.webp", image2: "images/abaya-16.webp" },
    { id: 9, title: "Black Charm", price: 2835.00, oldPrice: 5670.00, image1: "images/abaya-17.webp", image2: "images/abaya-18.webp" },
    { id: 10, title: "Elegance Blue", price: 2125.00, oldPrice: 4250.00, image1: "images/abaya-19.webp", image2: "images/abaya-20.webp" },
    { id: 11, title: "Urban Brown", price: 2035.00, oldPrice: 4070.00, image1: "images/abaya-21.webp", image2: "images/abaya-22.webp" },
    { id: 12, title: "Misty Green", price: 4490.00, oldPrice: 8980.00, image1: "images/abaya-23.webp", image2: "images/abaya-24.webp" },
    { id: 13, title: "Vania Black", price: 3000.00, oldPrice: 6000.00, image1: "images/abaya-25.webp", image2: "images/abaya-26.webp" },
    { id: 14, title: "Green Mist", price: 3000.00, oldPrice: 6000.00, image1: "images/abaya-27.webp", image2: "images/abaya-28.webp" },
    { id: 15, title: "Urban Purple", price: 2035.00, oldPrice: 4070.00, image1: "images/abaya-29.webp", image2: "images/abaya-30.webp" },
    { id: 16, title: "Mubashira", price: 3750.00, oldPrice: 7500.00, image1: "images/abaya-31.webp", image2: "images/abaya-32.webp" },
    { id: 17, title: "Grace Teal", price: 2800.00, oldPrice: 5600.00, image1: "images/abaya-33.webp", image2: "images/abaya-34.webp" },
    { id: 18, title: "Elegance Maroon", price: 2125.00, oldPrice: 4250.00, image1: "images/abaya-35.webp", image2: "images/abaya-36.webp" },
    { id: 19, title: "Deewan e Khas", price: 4650.00, oldPrice: 9300.00, image1: "images/abaya-37.webp", image2: "images/abaya-38.webp" },
    { id: 20, title: "Starlit Black", price: 2335.00, oldPrice: 4670.00, image1: "images/abaya-39.webp", image2: "images/abaya-40.webp" },
    { id: 21, title: "Alisha", price: 5670.00, oldPrice: 11340.00, image1: "images/abaya-41.webp", image2: "images/abaya-42.webp" },
    { id: 22, title: "Aariza Brown", price: 4650.00, oldPrice: 9300.00, image1: "images/abaya-43.webp", image2: "images/abaya-44.webp" },
    { id: 23, title: "Elegance Sapphire", price: 2625.00, oldPrice: 5250.00, image1: "images/abaya-45.webp", image2: "images/abaya-46.webp" },
    { id: 24, title: "Diamond Sea", price: 4250.00, oldPrice: 8500.00, image1: "images/abaya-47.webp", image2: "images/abaya-48.webp" },
    { id: 25, title: "Misbah", price: 5490.00, oldPrice: 10980.00, image1: "images/abaya-49.webp", image2: "images/abaya-50.webp" },
    { id: 26, title: "Urban Blue", price: 2035.00, oldPrice: 4070.00, image1: "images/abaya-51.webp", image2: "images/abaya-52.webp" },
    { id: 27, title: "Zaaminah", price: 4650.00, oldPrice: 9300.00, image1: "images/abaya-53.webp", image2: "images/abaya-54.webp" },
    { id: 28, title: "Maroon Wonder", price: 3300.00, oldPrice: 6600.00, image1: "images/abaya-55.webp", image2: "images/abaya-56.webp" },
    { id: 29, title: "Elegance Beige", price: 2125.00, oldPrice: 4250.00, image1: "images/abaya-59.webp", image2: "images/abaya-49.webp" },
    { id: 30, title: "Meesha", price: 4650.00, oldPrice: 9300.00, image1: "images/abaya-57.webp", image2: "images/abaya-58.webp" },
    { id: 31, title: "Marjan", price: 6040.00, oldPrice: 12080.00, image1: "images/abaya-14.webp", image2: "images/abaya-17.webp" }
];

document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById("products");
    const cartCounter = document.getElementById("cart");
    
    // Load cart count from localStorage
    function loadCartCount() {
        const cart = JSON.parse(localStorage.getItem('abayaCart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCounter) cartCounter.innerText = totalItems;
    }
    
    loadCartCount();

    // Helper Functions
    function calculateDiscount(oldPrice, price) {
        return Math.round(((oldPrice - price) / oldPrice) * 100);
    }

    function formatPrice(price) {
        return "Rs." + price.toLocaleString() + ".00";
    }

    function calculateSave(oldPrice, price) {
        return "Save Rs." + (oldPrice - price).toLocaleString();
    }

    // Image Navigation Function
    window.switchImage = function(productId, direction) {
        const product = products.find(p => p.id === productId);
        const card = document.querySelector(`[data-product-id="${productId}"]`);
        const mainImg = card.querySelector('.main-img');
        const hoverImg = card.querySelector('.hover-img');
        const indicators = card.querySelectorAll('.indicator');
        
        let currentSrc = mainImg.src;
        let isMainImage = currentSrc.includes(product.image1);
        
        if (direction === 'next' || direction === 'prev') {
            if (isMainImage) {
                mainImg.src = product.image2;
                hoverImg.src = product.image1;
                indicators[0].classList.remove('active');
                indicators[1].classList.add('active');
            } else {
                mainImg.src = product.image1;
                hoverImg.src = product.image2;
                indicators[1].classList.remove('active');
                indicators[0].classList.add('active');
            }
        }
        
        mainImg.style.opacity = '1';
        hoverImg.style.opacity = '0';
        setTimeout(() => {
            mainImg.style.opacity = '1';
        }, 50);
    }

    // Render Products
    function renderProducts() {
        if (!container) return;
        
        container.innerHTML = "";
        
        products.forEach(product => {
            const discount = calculateDiscount(product.oldPrice, product.price);
            const saveAmount = calculateSave(product.oldPrice, product.price);
            
            const card = document.createElement("div");
            card.classList.add("card");
            card.setAttribute("data-product-id", product.id);
            
            // Size options
            const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
            const sizeOptions = sizes.map(size => 
                `<option value="${size}" ${size === 'M' ? 'selected' : ''}>${size}</option>`
            ).join('');
            
            card.innerHTML = `
                <div class="card-img">
                    <img src="${product.image1}" alt="${product.title}" class="main-img">
                    <img src="${product.image2}" alt="${product.title} - Alternate" class="hover-img">
                    
                    <!-- Size Selector -->
                    <div class="size-selector">
                        <select id="size-${product.id}" class="size-dropdown" onclick="event.stopPropagation()">
                            ${sizeOptions}
                        </select>
                    </div>
                    
                    <!-- Image Navigation Buttons -->
                    <div class="img-nav">
                        <button class="img-nav-btn" onclick="switchImage(${product.id}, 'prev')">
                            <i class="fa-solid fa-angles-left"></i>
                        </button>
                        <button class="img-nav-btn" onclick="switchImage(${product.id}, 'next')">
                            <i class="fa-solid fa-angles-right"></i>
                        </button>
                    </div>
                    
                    <!-- Image Indicators -->
                    <div class="img-indicators">
                        <span class="indicator active"></span>
                        <span class="indicator"></span>
                    </div>
                    
                    <div class="discount">-${discount}%</div>
                    
                    <div class="overlay">
                        <button onclick="showQuickViewFromCard(this)"><i class="fa fa-eye"></i></button>
                        <button onclick="showQuickViewFromCard(this)"><i class="fa fa-shopping-cart"></i></button>
                        <button onclick="addWishlist(${product.id})"><i class="fa fa-heart"></i></button>
                        <button onclick="compare(${product.id})"><i class="fa fa-exchange"></i></button>
                    </div>
                </div>
                
                <div class="card-body">
                    <div class="title">${product.title}</div>
                    <div class="price">
                        <div class="old-price">${formatPrice(product.oldPrice)}</div>
                        <div class="new-price">${formatPrice(product.price)}</div>
                        <div class="save-price">${saveAmount}</div>
                    </div>
                </div>
            `;
            
            container.appendChild(card);
        });
    }

    // Global Functions
    window.addWishlist = function(id) {
        const product = products.find(p => p.id === id);
        showNotification("Added to wishlist: " + product.title);
    }

    window.compare = function(id) {
        const product = products.find(p => p.id === id);
        showNotification("Added to compare: " + product.title);
    }

    // Initial Render
    renderProducts();
    
    // Initialize Quick View Modal
    initQuickViewModal();
});

// ========== QUICK VIEW MODAL FUNCTIONS ==========

// Create modal container
function initQuickViewModal() {
    if (!document.querySelector('.quick-view-modal')) {
        createQuickViewModal();
    }
}

function createQuickViewModal() {
    const modal = document.createElement('div');
    modal.className = 'quick-view-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close"><i class="fa-solid fa-times"></i></button>
            <div class="modal-grid">
                <div class="modal-gallery">
                    <div class="modal-main-image">
                        <img src="" alt="" id="modalMainImage">
                    </div>
                    <div class="modal-thumbnails" id="modalThumbnails"></div>
                </div>
                <div class="modal-details">
                    <h2 id="modalTitle"></h2>
                    <div class="modal-price" id="modalPrice"></div>
                    <div class="modal-discount" id="modalDiscount"></div>
                    <p class="modal-description" id="modalDescription"></p>
                    
                    <div class="modal-options">
                        <h4>Size</h4>
                        <div class="size-options" id="modalSizes"></div>
                        
                        <h4>Color</h4>
                        <div class="color-options" id="modalColors"></div>
                        
                        <h4>Quantity</h4>
                        <div class="quantity-selector">
                            <button class="qty-btn minus">−</button>
                            <input type="number" value="1" min="1" max="10" id="modalQuantity" readonly>
                            <button class="qty-btn plus">+</button>
                        </div>
                        
                        <button class="add-to-cart-modal" id="modalAddToCart">
                            <i class="fa-solid fa-bag-shopping"></i> Add to Cart
                        </button>
                        
                        <button class="modal-wishlist" id="modalWishlist">
                            <i class="fa-regular fa-heart"></i> Add to Wishlist
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    closeBtn.addEventListener('click', closeQuickViewModal);
    overlay.addEventListener('click', closeQuickViewModal);
    
    // Quantity buttons
    const minusBtn = modal.querySelector('.minus');
    const plusBtn = modal.querySelector('.plus');
    const qtyInput = modal.querySelector('#modalQuantity');
    
    minusBtn.addEventListener('click', () => {
        let val = parseInt(qtyInput.value);
        if (val > 1) qtyInput.value = val - 1;
    });
    
    plusBtn.addEventListener('click', () => {
        let val = parseInt(qtyInput.value);
        if (val < 10) qtyInput.value = val + 1;
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeQuickViewModal();
        }
    });
}

function closeQuickViewModal() {
    const modal = document.querySelector('.quick-view-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Extract product data from card
function extractProductData(productCard) {
    const image = productCard.querySelector('.main-img').src;
    const title = productCard.querySelector('.title').textContent;
    const oldPriceElem = productCard.querySelector('.old-price');
    const newPriceElem = productCard.querySelector('.new-price');
    const discountElem = productCard.querySelector('.discount');
    const id = productCard.dataset.productId || Date.now();
    
    // Get product object from products array
    const product = products.find(p => p.id == id);
    
    return {
        id: id,
        image: image,
        image2: product ? product.image2 : image, // Second image for thumbnails
        title: title,
        oldPrice: oldPriceElem ? oldPriceElem.textContent : null,
        newPrice: newPriceElem ? newPriceElem.textContent : 'Rs. 0',
        discount: discountElem ? discountElem.textContent : null
    };
}

// Show quick view from card button (works for both eye and cart buttons)
window.showQuickViewFromCard = function(button) {
    const productCard = button.closest('.card');
    if (productCard) {
        const productData = extractProductData(productCard);
        showQuickViewModal(productData);
    }
}

// Show quick view modal
function showQuickViewModal(productData) {
    const modal = document.querySelector('.quick-view-modal');
    if (!modal) {
        createQuickViewModal();
        setTimeout(() => showQuickViewModal(productData), 100);
        return;
    }
    
    // Set product data
    document.getElementById('modalMainImage').src = productData.image;
    document.getElementById('modalTitle').textContent = productData.title;
    
    // Set price
    const priceHtml = `
        ${productData.oldPrice ? `<span class="old-price">${productData.oldPrice}</span>` : ''}
        <span class="new-price">${productData.newPrice}</span>
    `;
    document.getElementById('modalPrice').innerHTML = priceHtml;
    
    // Set discount
    const discountElem = document.getElementById('modalDiscount');
    if (productData.discount) {
        discountElem.textContent = productData.discount;
        discountElem.style.display = 'inline-block';
    } else {
        discountElem.style.display = 'none';
    }
    
    // Set description
    document.getElementById('modalDescription').textContent = 
        'Premium quality abaya made from high-quality fabric. Perfect for everyday wear and special occasions.';
    
    // Generate size options
    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
    const sizesHtml = sizes.map(size => 
        `<button class="size-btn">${size}</button>`
    ).join('');
    document.getElementById('modalSizes').innerHTML = sizesHtml;
    
    // Generate color options
    const colors = ['Black', 'Brown', 'Grey', 'Green', 'Blue'];
    const colorsHtml = colors.map(color => 
        `<button class="color-btn ${color.toLowerCase()}" title="${color}"></button>`
    ).join('');
    document.getElementById('modalColors').innerHTML = colorsHtml;
    
    // Generate thumbnails
    const thumbnails = [
        productData.image,
        productData.image2
    ];
    
    if (thumbnails.length > 0) {
        const thumbnailsHtml = thumbnails.map((src, index) => 
            `<div class="modal-thumbnail ${index === 0 ? 'active' : ''}" onclick="changeModalImage('${src}', this)">
                <img src="${src}" alt="Thumbnail">
            </div>
        `).join('');
        document.getElementById('modalThumbnails').innerHTML = thumbnailsHtml;
    }
    
    // Size selection
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.size-btn').forEach(b => {
                b.classList.remove('active');
                b.style.background = '';
                b.style.color = '';
            });
            this.classList.add('active');
            this.style.background = '#c9a27e';
            this.style.color = 'white';
        });
    });
    
    // Color selection
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.color-btn').forEach(b => {
                b.classList.remove('active');
                b.style.borderColor = 'transparent';
            });
            this.classList.add('active');
            this.style.borderColor = '#c9a27e';
        });
    });
    
    // Add to cart from modal
    const addToCartBtn = document.getElementById('modalAddToCart');
    addToCartBtn.onclick = () => {
        const selectedSize = document.querySelector('.size-btn.active');
        const selectedColor = document.querySelector('.color-btn.active');
        const quantity = parseInt(document.getElementById('modalQuantity').value);
        
        if (!selectedSize) {
            showNotification('Please select a size', 'error');
            return;
        }
        
        if (!selectedColor) {
            showNotification('Please select a color', 'error');
            return;
        }
        
        const cartItem = {
            id: productData.id,
            title: productData.title,
            price: productData.newPrice.replace(/[^0-9]/g, ''),
            image: productData.image,
            size: selectedSize.textContent,
            color: selectedColor.className.split(' ')[1],
            quantity: quantity
        };
        
        addToCartFromModal(cartItem);
        showNotification(`${productData.title} added to cart!`);
        setTimeout(closeQuickViewModal, 500);
    };
    
    // Wishlist from modal
    const wishlistBtn = document.getElementById('modalWishlist');
    wishlistBtn.onclick = () => {
        toggleWishlist(null, null, productData);
    };
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Set first size and color as active
    setTimeout(() => {
        const firstSize = document.querySelector('.size-btn');
        const firstColor = document.querySelector('.color-btn');
        if (firstSize) {
            firstSize.classList.add('active');
            firstSize.style.background = '#c9a27e';
            firstSize.style.color = 'white';
        }
        if (firstColor) {
            firstColor.classList.add('active');
            firstColor.style.borderColor = '#c9a27e';
        }
    }, 100);
}

// Change modal main image when thumbnail clicked
window.changeModalImage = function(src, element) {
    document.getElementById('modalMainImage').src = src;
    
    // Update active state
    document.querySelectorAll('.modal-thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });
    element.classList.add('active');
};

function addToCartFromModal(item) {
    let cart = JSON.parse(localStorage.getItem('abayaCart')) || [];
    
    const existingItemIndex = cart.findIndex(i => 
        i.id === item.id && i.size === item.size && i.color === item.color
    );
    
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += item.quantity || 1;
    } else {
        cart.push(item);
    }
    
    localStorage.setItem('abayaCart', JSON.stringify(cart));
    updateCartCount();
    
    // Animate cart icon
    const cartIcon = document.querySelector('.cart-count');
    if (cartIcon) {
        cartIcon.style.transform = 'scale(1.1)';
        setTimeout(() => cartIcon.style.transform = 'scale(1)', 200);
    }
}

function updateCartCount() {
    const cartCounters = document.querySelectorAll('#cart');
    const cart = JSON.parse(localStorage.getItem('abayaCart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    
    cartCounters.forEach(counter => {
        if (counter) counter.innerText = totalItems;
    });
}

function toggleWishlist(icon, productCard, productData) {
    if (!productData && productCard) {
        productData = extractProductData(productCard);
    }
    
    if (!productData) return;
    
    let wishlist = JSON.parse(localStorage.getItem('abayaWishlist')) || [];
    const exists = wishlist.some(item => item.id === productData.id);
    
    if (exists) {
        wishlist = wishlist.filter(item => item.id !== productData.id);
        showNotification('Removed from wishlist', 'info');
    } else {
        wishlist.push({
            id: productData.id,
            title: productData.title,
            price: productData.newPrice,
            image: productData.image,
            oldPrice: productData.oldPrice,
            discount: productData.discount
        });
        showNotification('Added to wishlist');
    }
    
    localStorage.setItem('abayaWishlist', JSON.stringify(wishlist));
}

function showNotification(message, type = 'success') {
    // Remove existing notification
    const existingNotif = document.querySelector('.notification');
    if (existingNotif) existingNotif.remove();
    
    // Create notification container if not exists
    let container = document.querySelector('.notification-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'notification-container';
        document.body.appendChild(container);
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icon = type === 'success' ? 'fa-circle-check' : 
                 type === 'error' ? 'fa-circle-exclamation' : 'fa-circle-info';
    
    notification.innerHTML = `
        <i class="fa-solid ${icon}"></i>
        <span>${message}</span>
    `;
    
    container.appendChild(notification);
    
    // Auto remove
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ======================================
// FILTER SIDEBAR - UPDATED
// ======================================
function initFilterSidebar() {
    const filterToggle = document.getElementById('filterToggle');
    const filterSidebar = document.getElementById('filterSidebar');
    const filterClose = document.getElementById('filterClose');
    const filterOverlay = document.getElementById('filterOverlay');
    const applyFilters = document.getElementById('applyFilters');
    
    if (!filterToggle || !filterSidebar) return;
    
    // Create overlay if not exists
    let overlay = filterOverlay || document.querySelector('.filter-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'filter-overlay';
        overlay.id = 'filterOverlay';
        document.body.appendChild(overlay);
    }
    
    filterToggle.addEventListener('click', () => {
        filterSidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    const closeFilter = () => {
        filterSidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    if (filterClose) {
        filterClose.addEventListener('click', closeFilter);
    }
    
    overlay.addEventListener('click', closeFilter);
    
    if (applyFilters) {
        applyFilters.addEventListener('click', () => {
            showLoadingSpinner();
            
            // Simulate AJAX filtering
            setTimeout(() => {
                hideLoadingSpinner();
                closeFilter();
                showNotification('Filters applied successfully!');
                
                // Apply filters to products
                applyProductFilters();
            }, 800);
        });
    }
    
    // Size filter checkboxes
    initFilterCheckboxes('sizeFilters');
    initFilterCheckboxes('colorFilters');
    initFilterCheckboxes('brandFilters');
}

function initFilterCheckboxes(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            // Live update could be implemented here
        });
    });
}

function initPriceSlider() {
    const slider = document.getElementById('priceSlider');
    const priceValue = document.getElementById('priceValue');
    
    if (!slider || !priceValue) return;
    
    slider.addEventListener('input', function() {
        priceValue.textContent = this.value;
    });
}

function applyProductFilters() {
    // Get all active filters
    const maxPrice = parseInt(document.getElementById('priceSlider')?.value || 15000);
    const selectedSizes = getSelectedCheckboxValues('sizeFilters');
    const selectedColors = getSelectedCheckboxValues('colorFilters');
    const selectedBrands = getSelectedCheckboxValues('brandFilters');
    
    // Filter products
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        const price = parseInt(product.dataset.price || 0);
        let show = price <= maxPrice;
        
        // Apply other filters if needed
        // This would require product data attributes
        
        product.style.display = show ? 'block' : 'none';
    });
}

function getSelectedCheckboxValues(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return [];
    
    const values = [];
    container.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => {
        values.push(cb.value);
    });
    return values;
}

// ======================================
// SORT DROPDOWN
// ======================================
function initSortDropdown() {
    const sortSelect = document.getElementById('sortSelect');
    if (!sortSelect) return;
    
    sortSelect.addEventListener('change', function() {
        showLoadingSpinner();
        
        // Simulate sorting
        setTimeout(() => {
            hideLoadingSpinner();
            sortProducts(this.value);
            showNotification('Products sorted!');
        }, 500);
    });
}

function sortProducts(sortBy) {
    const productsGrid = document.querySelector('.products-grid');
    if (!productsGrid) return;
    
    const products = Array.from(productsGrid.children);
    
    switch(sortBy) {
        case 'price-low':
            products.sort((a, b) => {
                const priceA = parseInt(a.dataset.price || 0);
                const priceB = parseInt(b.dataset.price || 0);
                return priceA - priceB;
            });
            break;
        case 'price-high':
            products.sort((a, b) => {
                const priceA = parseInt(a.dataset.price || 0);
                const priceB = parseInt(b.dataset.price || 0);
                return priceB - priceA;
            });
            break;
        case 'newest':
            // Assuming data-date attribute exists
            products.sort((a, b) => {
                const dateA = a.dataset.date || '0';
                const dateB = b.dataset.date || '0';
                return dateB.localeCompare(dateA);
            });
            break;
        case 'popular':
            // Assuming data-popularity attribute exists
            products.sort((a, b) => {
                const popA = parseInt(a.dataset.popularity || 0);
                const popB = parseInt(b.dataset.popularity || 0);
                return popB - popA;
            });
            break;
    }
    
    // Reorder DOM
    products.forEach(product => productsGrid.appendChild(product));
}

// Loading spinner functions
function showLoadingSpinner() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        spinner.classList.add('show');
    }
}

function hideLoadingSpinner() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        spinner.classList.remove('show');
    }
}