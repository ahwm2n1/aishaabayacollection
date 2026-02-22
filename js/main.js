// ======================================
// MAIN.JS - COMPLETE HOME PAGE FUNCTIONALITY
// All Features: Hero Slider, Scrollable Categories, Hover Icons, Quick View, Cart, Wishlist
// UPDATED: Desktop hover image, mobile auto-change (3 sec), hero sizing, cart icons, responsive grid, filter sidebar
// ======================================

document.addEventListener('DOMContentLoaded', function() {
    initHeroSlider();
    initMobileMenu();
    initSearchToggle();
    initDropdowns();
    initScrollableCategories();
    initProductHoverIcons();
    initQuickView();
    initAddToCart();
    initWishlist();
    initCompare();
    initNewsletter();
    initBackToTop();
    initCartCount();
    initInstagramSlider();
    initSmoothScroll();
    initNotifications();
    initProductData();
    initFilterSidebar();
    initSortDropdown();
    initSearchSuggestions();
    initChatbot(); // Fixed chatbot initialization
    initRelatedProducts();
    initWishlistPage();
    initColorOptions();
    initSizeOptions();
    initPriceSlider();
    initFaqAccordion(); // Fixed FAQ initialization
    
    // New: Initialize mobile auto image change
    initMobileImageRotation();
});

// ======================================
// 1. HERO SLIDER (Swiper)
// ======================================
function initHeroSlider() {
    const heroSwiper = document.querySelector('.heroSwiper');
    if (!heroSwiper || typeof Swiper === 'undefined') return;

    new Swiper('.heroSwiper', {
        loop: true,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        speed: 1000,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        on: {
            init: function() {
                console.log('Hero slider initialized');
            }
        }
    });
}

// ======================================
// 2. MOBILE MENU
// ======================================
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');
    const dropdownItems = document.querySelectorAll('.dropdown');
    
    if (!mobileToggle || !mainNav) return;
    
    // Toggle mobile menu
    mobileToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        mainNav.classList.toggle('active');
        
        const icon = this.querySelector('i');
        if (mainNav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            document.body.style.overflow = 'hidden';
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = '';
        }
    });
    
    // Handle dropdowns in mobile
    dropdownItems.forEach(item => {
        const link = item.querySelector('a');
        
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                item.classList.toggle('active');
                
                // Close other dropdowns
                dropdownItems.forEach(other => {
                    if (other !== item && other.classList.contains('active')) {
                        other.classList.remove('active');
                    }
                });
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && 
            mainNav.classList.contains('active') && 
            !mainNav.contains(e.target) && 
            !mobileToggle.contains(e.target)) {
            
            mainNav.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = '';
        }
    });
    
    // Close menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = '';
        }
    });
}

// ======================================
// 3. SEARCH TOGGLE & SUGGESTIONS
// ======================================
function initSearchToggle() {
    const searchToggle = document.querySelector('.search-toggle');
    const searchBar = document.getElementById('searchBar');
    
    if (!searchToggle || !searchBar) return;
    
    searchToggle.addEventListener('click', function() {
        searchBar.classList.toggle('active');
        
        if (searchBar.classList.contains('active')) {
            const input = searchBar.querySelector('input');
            setTimeout(() => input.focus(), 300);
        }
    });
    
    // Close search when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchBar.contains(e.target) && 
            !searchToggle.contains(e.target) && 
            searchBar.classList.contains('active')) {
            searchBar.classList.remove('active');
            
            // Hide suggestions
            const suggestions = document.querySelector('.search-suggestions');
            if (suggestions) suggestions.classList.remove('active');
        }
    });
    
    // Handle search submit
    const searchInput = searchBar.querySelector('input');
    const searchBtn = searchBar.querySelector('button');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', function() {
            performSearch(searchInput.value);
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
        
        // Show suggestions on input
        searchInput.addEventListener('input', debounce(function() {
            const query = this.value.trim();
            if (query.length >= 2) {
                showSearchSuggestions(query);
            } else {
                const suggestions = document.querySelector('.search-suggestions');
                if (suggestions) suggestions.classList.remove('active');
            }
        }, 300));
    }
}

function initSearchSuggestions() {
    // Create suggestions container if not exists
    const searchBar = document.getElementById('searchBar');
    if (!searchBar) return;
    
    if (!document.querySelector('.search-suggestions')) {
        const suggestionsDiv = document.createElement('div');
        suggestionsDiv.className = 'search-suggestions';
        searchBar.appendChild(suggestionsDiv);
    }
}

function showSearchSuggestions(query) {
    const suggestionsContainer = document.querySelector('.search-suggestions');
    if (!suggestionsContainer) return;
    
    // Get products from localStorage or use sample data
    const products = JSON.parse(localStorage.getItem('abayaProducts')) || getSampleProducts();
    
    // Filter products based on query
    const filtered = products.filter(product => 
        product.title.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5); // Limit to 5 suggestions
    
    if (filtered.length === 0) {
        suggestionsContainer.classList.remove('active');
        return;
    }
    
    // Build suggestions HTML
    let html = '';
    filtered.forEach(product => {
        html += `
            <div class="suggestion-item" data-id="${product.id}">
                <div class="suggestion-image">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="suggestion-info">
                    <h4>${product.title}</h4>
                    <p>Rs.${product.newPrice.toLocaleString()}</p>
                </div>
            </div>
        `;
    });
    
    suggestionsContainer.innerHTML = html;
    suggestionsContainer.classList.add('active');
    
    // Add click handlers
    document.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', function() {
            const productId = this.dataset.id;
            const product = products.find(p => p.id == productId);
            if (product) {
                showQuickViewModal(product);
            }
            
            // Hide suggestions
            suggestionsContainer.classList.remove('active');
            document.getElementById('searchBar').querySelector('input').value = '';
        });
    });
    
    // Keyboard navigation
    let selectedIndex = -1;
    const items = document.querySelectorAll('.suggestion-item');
    
    document.getElementById('searchBar').querySelector('input').addEventListener('keydown', function(e) {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
            updateSelectedSuggestion(items, selectedIndex);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedIndex = Math.max(selectedIndex - 1, -1);
            updateSelectedSuggestion(items, selectedIndex);
        } else if (e.key === 'Enter' && selectedIndex >= 0) {
            e.preventDefault();
            items[selectedIndex].click();
        }
    });
}

function updateSelectedSuggestion(items, index) {
    items.forEach((item, i) => {
        if (i === index) {
            item.classList.add('selected');
        } else {
            item.classList.remove('selected');
        }
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function performSearch(query) {
    if (!query.trim()) {
        showNotification('Please enter a search term', 'error');
        return;
    }
    
    // Store search query and redirect
    localStorage.setItem('searchQuery', query);
    window.location.href = `products.html?search=${encodeURIComponent(query)}`;
}

// ======================================
// 4. DROPDOWNS (Desktop)
// ======================================
function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        let timeout;
        const menu = dropdown.querySelector('.dropdown-menu');
        
        dropdown.addEventListener('mouseenter', () => {
            clearTimeout(timeout);
            menu.style.opacity = '1';
            menu.style.visibility = 'visible';
            menu.style.transform = 'translateY(0)';
        });
        
        dropdown.addEventListener('mouseleave', () => {
            timeout = setTimeout(() => {
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
                menu.style.transform = 'translateY(10px)';
            }, 200);
        });
        
        // For touch devices
        dropdown.addEventListener('click', function(e) {
            if (window.innerWidth > 768 && e.target.closest('a')) {
                const link = e.target.closest('a');
                if (link.parentElement.classList.contains('dropdown')) {
                    e.preventDefault();
                }
            }
        });
    });
}

// ======================================
// 5. SCROLLABLE CATEGORIES (Drag/Swipe)
// ======================================
function initScrollableCategories() {
    const scrollContainer = document.querySelector('.categories-scroll-container');
    if (!scrollContainer) return;
    
    let isDown = false;
    let startX;
    let scrollLeft;
    
    scrollContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        scrollContainer.classList.add('active');
        startX = e.pageX - scrollContainer.offsetLeft;
        scrollLeft = scrollContainer.scrollLeft;
    });
    
    scrollContainer.addEventListener('mouseleave', () => {
        isDown = false;
        scrollContainer.classList.remove('active');
    });
    
    scrollContainer.addEventListener('mouseup', () => {
        isDown = false;
        scrollContainer.classList.remove('active');
    });
    
    scrollContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scrollContainer.offsetLeft;
        const walk = (x - startX) * 2;
        scrollContainer.scrollLeft = scrollLeft - walk;
    });
    
    // Touch events for mobile
    scrollContainer.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - scrollContainer.offsetLeft;
        scrollLeft = scrollContainer.scrollLeft;
    });
    
    scrollContainer.addEventListener('touchend', () => {
        isDown = false;
    });
    
    scrollContainer.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.touches[0].pageX - scrollContainer.offsetLeft;
        const walk = (x - startX) * 2;
        scrollContainer.scrollLeft = scrollLeft - walk;
    });
}

// ======================================
// 6. PRODUCT HOVER ICONS & INTERACTIONS
// ======================================
function initProductHoverIcons() {
    // Handle hover icons click
    const hoverIcons = document.querySelectorAll('.hover-icon');
    
    hoverIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const productCard = this.closest('.product-card');
            const action = this.classList.contains('quick-view') ? 'quickview' :
                          this.classList.contains('add-to-cart') ? 'addtocart' :
                          this.classList.contains('wishlist') ? 'wishlist' : 'compare';
            
            switch(action) {
                case 'quickview':
                    const productData = extractProductData(productCard);
                    showQuickViewModal(productData);
                    break;
                case 'addtocart':
                    addToCartFromCard(productCard);
                    break;
                case 'wishlist':
                    toggleWishlist(this, productCard);
                    break;
                case 'compare':
                    addToCompare(productCard);
                    break;
            }
        });
    });
    
    // Product hover image effect - Desktop handled by CSS
    // Mobile handled by initMobileImageRotation()
}

// ======================================
// NEW: Mobile Auto Image Rotation (every 3 seconds)
// ======================================
function initMobileImageRotation() {
    // Only run on mobile
    if (window.innerWidth > 768) return;
    
    console.log('Initializing mobile image rotation');
    
    // Clear any existing intervals
    if (window.mobileImageInterval) {
        clearInterval(window.mobileImageInterval);
    }
    
    // Set interval to rotate images every 3 seconds
    window.mobileImageInterval = setInterval(() => {
        rotateMobileImages();
    }, 3000);
    
    // Initial rotation
    setTimeout(() => rotateMobileImages(), 1000);
}

function rotateMobileImages() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const mainImage = card.querySelector('.main-image');
        const hoverImage = card.querySelector('.hover-image');
        
        if (!mainImage || !hoverImage) return;
        
        // Check if hover image source is valid (not empty)
        if (!hoverImage.src || hoverImage.src.includes('undefined') || hoverImage.src === '') {
            return;
        }
        
        // Toggle images
        if (mainImage.classList.contains('inactive')) {
            // Show main image
            mainImage.classList.remove('inactive');
            mainImage.style.opacity = '1';
            hoverImage.classList.remove('active');
            hoverImage.style.opacity = '0';
        } else {
            // Show hover image
            mainImage.classList.add('inactive');
            mainImage.style.opacity = '0';
            hoverImage.classList.add('active');
            hoverImage.style.opacity = '1';
        }
    });
}

// ======================================
// 7. QUICK VIEW MODAL
// ======================================
function initQuickView() {
    // Create modal container if not exists
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
                            <i class="fa-solid fa-bag-shopping"></i>
                            Add to Cart
                        </button>
                        
                        <button class="modal-wishlist" id="modalWishlist">
                            <i class="fa-regular fa-heart"></i>
                            Add to Wishlist
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
        productData.description || 'Premium quality abaya made from high-quality fabric. Perfect for everyday wear and special occasions.';
    
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
        productData.image.replace('.webp', '2.webp'),
        productData.image.replace('.webp', '3.webp')
    ].filter(src => src !== productData.image);
    
    if (thumbnails.length > 0) {
        const thumbnailsHtml = thumbnails.map((src, index) => 
            `<div class="modal-thumbnail ${index === 0 ? 'active' : ''}">
                <img src="${src}" alt="Thumbnail">
            </div>
        `).join('');
        document.getElementById('modalThumbnails').innerHTML = thumbnailsHtml;
        
        // Thumbnail click handlers
        document.querySelectorAll('.modal-thumbnail').forEach((thumb, index) => {
            thumb.addEventListener('click', function() {
                document.querySelectorAll('.modal-thumbnail').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                document.getElementById('modalMainImage').src = this.querySelector('img').src;
            });
        });
    }
    
    // Size selection
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Color selection
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
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
            id: productData.id || Date.now(),
            title: productData.title,
            price: productData.newPrice.replace(/[^0-9]/g, ''),
            image: productData.image,
            size: selectedSize.textContent,
            color: selectedColor.className.split(' ')[1],
            quantity: quantity
        };
        
        addToCart(cartItem);
        
        // Fly to cart animation
        const mainImage = document.getElementById('modalMainImage');
        flyToCartAnimation(mainImage);
        
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
        if (firstSize) firstSize.classList.add('active');
        if (firstColor) firstColor.classList.add('active');
    }, 100);
}

function flyToCartAnimation(element) {
    const cartIcon = document.querySelector('.cart-icon');
    if (!element || !cartIcon) return;
    
    const flyingImg = element.cloneNode();
    flyingImg.style.cssText = `
        position: fixed;
        width: 50px;
        height: 50px;
        border-radius: 10px;
        object-fit: cover;
        z-index: 10001;
        pointer-events: none;
        animation: flyToCart 0.8s ease-in forwards;
    `;
    
    const imgRect = element.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();
    
    flyingImg.style.left = imgRect.left + imgRect.width / 2 - 25 + 'px';
    flyingImg.style.top = imgRect.top + imgRect.height / 2 - 25 + 'px';
    
    const moveX = cartRect.left + cartRect.width / 2 - (imgRect.left + imgRect.width / 2);
    const moveY = cartRect.top + cartRect.height / 2 - (imgRect.top + imgRect.height / 2);
    
    flyingImg.style.setProperty('--move-x', moveX + 'px');
    flyingImg.style.setProperty('--move-y', moveY + 'px');
    
    document.body.appendChild(flyingImg);
    
    // Shake cart icon
    cartIcon.classList.add('shake');
    setTimeout(() => cartIcon.classList.remove('shake'), 300);
    
    setTimeout(() => flyingImg.remove(), 800);
}

function extractProductData(productCard) {
    const image = productCard.querySelector('.product-image img').src;
    const title = productCard.querySelector('.product-info h3').textContent;
    const oldPriceElem = productCard.querySelector('.old-price');
    const newPriceElem = productCard.querySelector('.new-price');
    const discountElem = productCard.querySelector('.discount-badge');
    const id = productCard.dataset.id || Date.now();
    
    return {
        id: id,
        image: image,
        title: title,
        oldPrice: oldPriceElem ? oldPriceElem.textContent : null,
        newPrice: newPriceElem ? newPriceElem.textContent : 'Rs. 0',
        discount: discountElem ? discountElem.textContent : null
    };
}

// ======================================
// 8. ADD TO CART FUNCTIONALITY
// ======================================
function initAddToCart() {
    // Already handled in hover icons
}

function addToCartFromCard(productCard) {
    const productData = extractProductData(productCard);
    
    // Show quick view modal for size/color selection
    showQuickViewModal(productData);
}

function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem('abayaCart')) || [];
    
    // Check if item exists (by id, size, and color)
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
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.classList.add('pulse');
        setTimeout(() => cartIcon.classList.remove('pulse'), 500);
    }
}

function updateCartCount() {
    const cartCounters = document.querySelectorAll('.cart-count');
    const cart = JSON.parse(localStorage.getItem('abayaCart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    
    cartCounters.forEach(counter => {
        counter.textContent = totalItems;
    });
}

// ======================================
// 9. WISHLIST FUNCTIONALITY
// ======================================
function initWishlist() {
    loadWishlistState();
}

function toggleWishlist(icon, productCard, productData) {
    if (!productData && productCard) {
        productData = extractProductData(productCard);
    }
    
    if (!productData) return;
    
    let wishlist = JSON.parse(localStorage.getItem('abayaWishlist')) || [];
    const exists = wishlist.some(item => item.id === productData.id);
    
    if (exists) {
        // Remove from wishlist
        wishlist = wishlist.filter(item => item.id !== productData.id);
        showNotification('Removed from wishlist', 'info');
    } else {
        // Add to wishlist
        wishlist.push({
            id: productData.id,
            title: productData.title,
            price: productData.newPrice,
            image: productData.image,
            oldPrice: productData.oldPrice,
            discount: productData.discount
        });
        
        // Heart burst animation
        if (icon) {
            createHeartBurst(icon);
        }
        
        showNotification('Added to wishlist');
    }
    
    localStorage.setItem('abayaWishlist', JSON.stringify(wishlist));
    
    // Update icon state
    if (icon) {
        const iconElement = icon.tagName === 'I' ? icon : icon.querySelector('i');
        if (iconElement) {
            if (!exists) {
                iconElement.classList.remove('fa-regular');
                iconElement.classList.add('fa-solid');
            } else {
                iconElement.classList.remove('fa-solid');
                iconElement.classList.add('fa-regular');
            }
        }
    }
    
    // Update wishlist page if open
    if (window.location.pathname.includes('wishlist')) {
        loadWishlistPage();
    }
}

function createHeartBurst(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('i');
        heart.className = 'fa-solid fa-heart';
        heart.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            color: var(--accent);
            pointer-events: none;
            z-index: 1000;
            font-size: 16px;
            transform: translate(-50%, -50%);
            animation: floatUp 0.8s ease forwards;
            --angle: ${(i * 45) * Math.PI / 180}rad;
        `;
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 800);
    }
}

function loadWishlistState() {
    const wishlist = JSON.parse(localStorage.getItem('abayaWishlist')) || [];
    
    document.querySelectorAll('.product-card').forEach(card => {
        const id = card.dataset.id;
        const heartIcon = card.querySelector('.wishlist i, .hover-icon.wishlist i');
        
        if (heartIcon && wishlist.some(item => item.id == id)) {
            heartIcon.classList.remove('fa-regular');
            heartIcon.classList.add('fa-solid');
        }
    });
}

// ======================================
// 10. WISHLIST PAGE
// ======================================
function initWishlistPage() {
    if (document.querySelector('.wishlist-grid')) {
        loadWishlistPage();
    }
}

function loadWishlistPage() {
    const container = document.querySelector('.wishlist-grid');
    if (!container) return;
    
    const wishlist = JSON.parse(localStorage.getItem('abayaWishlist')) || [];
    
    if (wishlist.length === 0) {
        container.innerHTML = `
            <div class="wishlist-empty">
                <i class="fa-regular fa-heart"></i>
                <h3>Your wishlist is empty</h3>
                <p>Save your favorite items here</p>
                <a href="index.html" class="shop-now-btn">Shop Now</a>
            </div>
        `;
        return;
    }
    
    let html = '';
    wishlist.forEach(item => {
        html += `
            <div class="wishlist-item" data-id="${item.id}">
                <button class="wishlist-remove" onclick="removeFromWishlist('${item.id}')">
                    <i class="fa-solid fa-times"></i>
                </button>
                <div class="product-card">
                    <div class="product-image">
                        <img src="${item.image}" alt="${item.title}">
                        ${item.discount ? `<span class="discount-badge">${item.discount}</span>` : ''}
                    </div>
                    <div class="product-info">
                        <h3>${item.title}</h3>
                        <div class="price-wrapper">
                            ${item.oldPrice ? `<span class="old-price">${item.oldPrice}</span>` : ''}
                            <span class="new-price">${item.price}</span>
                        </div>
                        <button class="mobile-add-to-cart" onclick="addToCartFromWishlist('${item.id}')">
                            <i class="fa-regular fa-bag-shopping"></i> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

window.removeFromWishlist = function(id) {
    let wishlist = JSON.parse(localStorage.getItem('abayaWishlist')) || [];
    wishlist = wishlist.filter(item => item.id != id);
    localStorage.setItem('abayaWishlist', JSON.stringify(wishlist));
    loadWishlistPage();
    showNotification('Removed from wishlist', 'info');
};

window.addToCartFromWishlist = function(id) {
    const wishlist = JSON.parse(localStorage.getItem('abayaWishlist')) || [];
    const item = wishlist.find(item => item.id == id);
    
    if (item) {
        const cartItem = {
            ...item,
            quantity: 1,
            size: 'M',
            color: 'Black'
        };
        addToCart(cartItem);
        showNotification('Added to cart!');
    }
};

// ======================================
// 11. COMPARE FUNCTIONALITY
// ======================================
function initCompare() {
    const compareBtns = document.querySelectorAll('.hover-icon.compare');
    
    compareBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            addToCompare(productCard);
        });
    });
}

function addToCompare(productCard) {
    const productData = extractProductData(productCard);
    
    let compareList = JSON.parse(localStorage.getItem('abayaCompare')) || [];
    
    if (compareList.length >= 4) {
        showNotification('You can compare up to 4 items', 'error');
        return;
    }
    
    if (!compareList.some(item => item.id === productData.id)) {
        compareList.push(productData);
        localStorage.setItem('abayaCompare', JSON.stringify(compareList));
        showNotification('Added to compare');
    } else {
        showNotification('Already in compare list', 'info');
    }
}

// ======================================
// 12. NEWSLETTER FORM
// ======================================
function initNewsletter() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleNewsletterSubmit(this);
        });
    }
}

function handleNewsletterSubmit(form) {
    const emailInput = form.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    const checkbox = form.querySelector('input[type="checkbox"]');
    
    if (!email) {
        showNotification('Please enter your email', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email', 'error');
        return;
    }
    
    if (checkbox && !checkbox.checked) {
        showNotification('Please agree to receive marketing emails', 'error');
        return;
    }
    
    // Save to localStorage
    let subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers')) || [];
    
    if (subscribers.includes(email)) {
        showNotification('You are already subscribed!', 'info');
        return;
    }
    
    subscribers.push(email);
    localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
    
    // Show success message
    showNotification('Thank you for subscribing! Check your inbox for 10% off.');
    form.reset();
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ======================================
// 13. FAQ ACCORDION - FIXED VERSION
// ======================================
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) {
        console.log('No FAQ items found');
        return;
    }
    
    console.log('Initializing FAQ accordion with', faqItems.length, 'items');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (!question) {
            console.log('FAQ question not found in item');
            return;
        }
        
        // Remove any existing event listeners
        question.removeEventListener('click', handleFaqClick);
        
        // Add new event listener
        question.addEventListener('click', handleFaqClick);
    });
}

function handleFaqClick(e) {
    e.preventDefault();
    
    const question = e.currentTarget;
    const currentItem = question.closest('.faq-item');
    
    if (!currentItem) return;
    
    console.log('FAQ clicked:', currentItem);
    
    // Get all FAQ items
    const allFaqItems = document.querySelectorAll('.faq-item');
    
    // Check if current item is already active
    const isActive = currentItem.classList.contains('active');
    
    // Close all items
    allFaqItems.forEach(item => {
        item.classList.remove('active');
        
        // Reset arrow rotation
        const arrow = item.querySelector('.faq-question i');
        if (arrow) {
            arrow.style.transform = 'rotate(0deg)';
        }
    });
    
    // If it wasn't active, open it
    if (!isActive) {
        currentItem.classList.add('active');
        
        // Rotate arrow
        const arrow = currentItem.querySelector('.faq-question i');
        if (arrow) {
            arrow.style.transform = 'rotate(180deg)';
        }
        
        // Smooth scroll to the item if needed
        setTimeout(() => {
            currentItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }
}

// ======================================
// 14. BACK TO TOP
// ======================================
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    if (!backToTop) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ======================================
// 15. CART COUNT ON LOAD
// ======================================
function initCartCount() {
    updateCartCount();
    
    // Listen for cart updates from other tabs
    window.addEventListener('storage', function(e) {
        if (e.key === 'abayaCart') {
            updateCartCount();
        }
    });
}

// ======================================
// 16. INSTAGRAM SLIDER
// ======================================
function initInstagramSlider() {
    const instagramSwiper = document.querySelector('.instagram-swiper');
    if (!instagramSwiper || typeof Swiper === 'undefined') return;
    
    new Swiper('.instagram-swiper', {
        slidesPerView: 2,
        spaceBetween: 15,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 5,
                spaceBetween: 25,
            },
        }
    });
}

// ======================================
// 17. RELATED PRODUCTS
// ======================================
function initRelatedProducts() {
    const relatedSection = document.getElementById('relatedProductsSection');
    const relatedContainer = document.getElementById('relatedProducts');
    
    if (!relatedSection || !relatedContainer) return;
    
    // Get current product category from URL or data
    const currentCategory = getCurrentProductCategory();
    
    // Get products
    const products = getSampleProducts();
    
    // Filter related products (same category, exclude current)
    const related = products
        .filter(p => p.category === currentCategory)
        .slice(0, 8);
    
    if (related.length === 0) {
        relatedSection.style.display = 'none';
        return;
    }
    
    // Build HTML
    let html = '';
    related.forEach(product => {
        html += `
            <div class="swiper-slide">
                <div class="product-card" data-id="${product.id}">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.title}" class="main-image">
                        <img src="${product.image.replace('.webp', '-hover.webp')}" alt="${product.title}" class="hover-image">
                        <span class="discount-badge">-${product.discount}%</span>
                        <div class="product-hover-icons">
                            <button class="hover-icon quick-view"><i class="fa-regular fa-eye"></i></button>
                            <button class="hover-icon add-to-cart"><i class="fa-solid fa-bag-shopping"></i></button>
                            <button class="hover-icon wishlist"><i class="fa-regular fa-heart"></i></button>
                        </div>
                    </div>
                    <div class="product-info">
                        <h3>${product.title}</h3>
                        <div class="price-wrapper">
                            <span class="old-price">Rs.${product.oldPrice.toLocaleString()}</span>
                            <span class="new-price">Rs.${product.newPrice.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    relatedContainer.innerHTML = html;
    relatedSection.style.display = 'block';
    
    // Initialize swiper
    if (typeof Swiper !== 'undefined') {
        new Swiper('.related-swiper', {
            slidesPerView: 2,
            spaceBetween: 15,
            loop: true,
            navigation: {
                nextEl: '.related-next',
                prevEl: '.related-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 25,
                },
            }
        });
    }
    
    // Reinitialize product interactions
    initProductHoverIcons();
    loadWishlistState();
    
    // Reinitialize mobile image rotation
    if (window.innerWidth <= 768) {
        initMobileImageRotation();
    }
}

function getCurrentProductCategory() {
    // Try to get from URL or data attribute
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    if (category) return category;
    
    // Default categories based on page
    if (window.location.pathname.includes('premium')) return 'premium';
    if (window.location.pathname.includes('front-open')) return 'front-open';
    if (window.location.pathname.includes('turkish')) return 'turkish';
    if (window.location.pathname.includes('embroidered')) return 'embroidered';
    
    return 'premium'; // Default
}

// ======================================
// 18. FILTER SIDEBAR - UPDATED
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
// 19. SORT DROPDOWN
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

// ======================================
// 20. SIZE AND COLOR OPTIONS
// ======================================
function initSizeOptions() {
    // Handled in quick view modal
}

function initColorOptions() {
    // Handled in quick view modal
}

// ======================================
// 21. CHATBOT - FIXED VERSION
// ======================================
function initChatbot() {
    console.log('Initializing chatbot...');
    
    const chatbotBtn = document.getElementById('chatbotBtn');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotMessages = document.getElementById('chatbotMessages');
    
    if (!chatbotBtn || !chatbotWindow) {
        console.log('Chatbot elements not found');
        return;
    }
    
    console.log('Chatbot elements found, adding event listeners');
    
    // Toggle chatbot
    chatbotBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Chatbot button clicked');
        chatbotWindow.classList.toggle('active');
        
        // Focus input when opened
        if (chatbotWindow.classList.contains('active') && chatbotInput) {
            setTimeout(() => chatbotInput.focus(), 300);
        }
    });
    
    // Close chatbot
    if (chatbotClose) {
        chatbotClose.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Chatbot close clicked');
            chatbotWindow.classList.remove('active');
        });
    }
    
    // Send message function
    const sendMessage = function() {
        if (!chatbotInput || !chatbotMessages) return;
        
        const message = chatbotInput.value.trim();
        if (!message) return;
        
        console.log('Sending message:', message);
        
        // Add user message
        addChatbotMessage(message, 'user');
        chatbotInput.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Auto reply
        setTimeout(() => {
            removeTypingIndicator();
            const reply = getChatbotReply(message);
            addChatbotMessage(reply, 'bot');
        }, 1000);
    };
    
    // Send button click
    if (chatbotSend) {
        chatbotSend.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            sendMessage();
        });
    }
    
    // Enter key press
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
            }
        });
    }
    
    // Close on click outside
    document.addEventListener('click', function(e) {
        if (chatbotWindow.classList.contains('active') && 
            !chatbotWindow.contains(e.target) && 
            !chatbotBtn.contains(e.target)) {
            chatbotWindow.classList.remove('active');
        }
    });
    
    // Add initial bot message if empty
    if (chatbotMessages && chatbotMessages.children.length === 0) {
        addChatbotMessage('👋 Assalamu Alaikum! How can I help you today?', 'bot');
    }
}

function addChatbotMessage(text, sender) {
    const messages = document.getElementById('chatbotMessages');
    if (!messages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.style.marginBottom = '15px';
    messageDiv.style.maxWidth = '80%';
    
    if (sender === 'user') {
        messageDiv.style.marginLeft = 'auto';
        messageDiv.style.textAlign = 'right';
        messageDiv.innerHTML = `<p style="background: var(--accent); color: white; padding: 10px 15px; border-radius: 15px; border-bottom-right-radius: 5px; display: inline-block;">${text}</p>`;
    } else {
        messageDiv.style.marginRight = 'auto';
        messageDiv.innerHTML = `<p style="backgro/und: var(--bg-light); padding: 10px 15px; border-radius: 15px; border-bottom-left-radius: 5px; display: inline-block;">${text}</p>`;
    }
    
    messages.appendChild(messageDiv);
    messages.scrollTop = messages.scrollHeight;
}

function showTypingIndicator() {
    const messages = document.getElementById('chatbotMessages');
    if (!messages) return;
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot typing';
    typingDiv.id = 'typingIndicator';
    typingDiv.style.marginBottom = '15px';
    typingDiv.innerHTML = '<p style="background: var(--bg-light); padding: 10px 15px; border-radius: 15px; border-bottom-left-radius: 5px; display: inline-block;">...</p>';
    
    messages.appendChild(typingDiv);
    messages.scrollTop = messages.scrollHeight;
}

function removeTypingIndicator() {
    const typing = document.getElementById('typingIndicator');
    if (typing) typing.remove();
}

function getChatbotReply(message) {
    message = message.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi') || message.includes('salam') || message.includes('slam')) {
        return 'Wa Alaikum Assalam! How can I assist you with our abaya collection today?';
    }
    if (message.includes('price') || message.includes('cost') || message.includes('rate')) {
        return 'Our abayas range from Rs. 2,000 to Rs. 15,000. Would you like to see our latest collection?';
    }
    if (message.includes('size') || message.includes('fit') || message.includes('measurement')) {
        return 'We offer sizes from Small to XXL. You can find detailed size charts on each product page.';
    }
    if (message.includes('shipping') || message.includes('delivery') || message.includes('deliver')) {
        return 'We offer free shipping on orders above Rs. 5,000. Delivery takes 3-5 business days.';
    }
    if (message.includes('return') || message.includes('refund') || message.includes('exchange')) {
        return 'We have a 14-day return policy for unworn items. Check our Returns page for details.';
    }
    if (message.includes('discount') || message.includes('offer') || message.includes('sale')) {
        return 'Subscribe to our newsletter for 10% off your first order! We also have seasonal sales.';
    }
    if (message.includes('payment') || message.includes('pay') || message.includes('cash')) {
        return 'We accept credit/debit cards, bank transfer, and cash on delivery.';
    }
    if (message.includes('contact') || message.includes('phone') || message.includes('call')) {
        return 'You can reach us at +92 300 1234567 or email info@aishaabayas.com';
    }
    if (message.includes('thank')) {
        return 'You\'re welcome! Is there anything else I can help you with?';
    }
    
    return 'Thank you for your message. Our team will get back to you soon. For immediate assistance, please call +92 300 1234567';
}

// ======================================
// 22. NOTIFICATION SYSTEM
// ======================================
function initNotifications() {
    // Add notification container if not exists
    if (!document.querySelector('.notification-container')) {
        const container = document.createElement('div');
        container.className = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 100000;
        `;
        document.body.appendChild(container);
    }
}

function showNotification(message, type = 'success') {
    const container = document.querySelector('.notification-container') || document.body;
    
    // Remove existing notification
    const existingNotif = document.querySelector('.notification');
    if (existingNotif) existingNotif.remove();
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icon = type === 'success' ? 'fa-circle-check' : 
                 type === 'error' ? 'fa-circle-exclamation' : 'fa-circle-info';
    
    notification.innerHTML = `
        <i class="fa-solid ${icon}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        background: var(--text-dark);
        color: white;
        padding: 15px 25px;
        border-radius: 50px;
        display: flex;
        align-items: center;
        gap: 12px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        border-left: 4px solid ${type === 'success' ? 'var(--accent)' : type === 'error' ? '#ff4444' : '#3498db'};
        margin-bottom: 10px;
        animation: slideIn 0.3s ease;
    `;
    
    container.appendChild(notification);
    
    // Auto remove
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ======================================
// 23. LOADING SPINNER
// ======================================
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

// ======================================
// 24. SMOOTH SCROLL FOR ANCHOR LINKS
// ======================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        const href = anchor.getAttribute('href');
        
        if (href === '#' || href === '') return;
        
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ======================================
// 25. PRODUCT DATA LOADING (Dynamic)
// ======================================
function initProductData() {
    // Product data
    const products = getSampleProducts();
    
    // Save to localStorage for later use
    localStorage.setItem('abayaProducts', JSON.stringify(products));
    
    // Load products dynamically if containers exist and are empty
    loadProductsToContainer('premiumProducts', products.filter(p => p.category === 'premium'));
    loadProductsToContainer('frontOpenProducts', products.filter(p => p.category === 'front-open'));
    loadProductsToContainer('turkishProducts', products.filter(p => p.category === 'turkish'));
    loadProductsToContainer('embroideredProducts', products.filter(p => p.category === 'embroidered'));
}

function getSampleProducts() {
    return [
        // Premium Collection
        { id: 1, title: "Pearl Poise Plated Abaya", image: "images/abaya-1.webp", oldPrice: 5999, newPrice: 4499, category: "premium", discount: 25 },
        { id: 2, title: "Hina Front Open Abaya", image: "images/abaya-2.webp", oldPrice: 5999, newPrice: 3899, category: "premium", discount: 35 },
        { id: 3, title: "Grey Classic Abaya", image: "images/abaya-3.webp", oldPrice: 4999, newPrice: 3999, category: "premium", discount: 20 },
        { id: 4, title: "Regal Noir Brown Abaya", image: "images/abaya-4.webp", oldPrice: 15000, newPrice: 4499, category: "premium", discount: 70 },
        
        // Front Open
        { id: 5, title: "Urban Green", image: "images/abaya-5.jpg", oldPrice: 4070, newPrice: 2035, category: "front-open", discount: 50 },
        { id: 6, title: "Front Open Classic", image: "images/abaya-5.webp", oldPrice: 4860, newPrice: 2430, category: "front-open", discount: 50 },
        { id: 7, title: "Elegant Front Open", image: "images/abaya-6.jpg", oldPrice: 5250, newPrice: 2625, category: "front-open", discount: 50 },
        { id: 8, title: "Modern Front Open", image: "images/abaya-7.jpg", oldPrice: 5060, newPrice: 2530, category: "front-open", discount: 50 },
        
        // Turkish
        { id: 9, title: "Turkish Rose", image: "images/abaya-8.webp", oldPrice: 5060, newPrice: 2530, category: "turkish", discount: 50 },
        { id: 10, title: "Turkish Sky", image: "images/abaya-9.jpg", oldPrice: 4860, newPrice: 2430, category: "turkish", discount: 50 },
        { id: 11, title: "Ottoman Gold", image: "images/abaya-10.jpg", oldPrice: 9300, newPrice: 4650, category: "turkish", discount: 50 },
        { id: 12, title: "Bosphorus Night", image: "images/abaya-11.webp", oldPrice: 4070, newPrice: 2035, category: "turkish", discount: 50 },
        
        // Embroidered
        { id: 13, title: "Floral Embroidered", image: "images/abaya-12.webp", oldPrice: 5060, newPrice: 2530, category: "embroidered", discount: 50 },
        { id: 14, title: "Golden Thread Work", image: "images/abaya-13.webp", oldPrice: 5250, newPrice: 2625, category: "embroidered", discount: 50 },
        { id: 15, title: "Pearl Embroidered", image: "images/abaya-14.webp", oldPrice: 4070, newPrice: 2035, category: "embroidered", discount: 50 },
        { id: 16, title: "Silver Lining", image: "images/abaya-15.webp", oldPrice: 4860, newPrice: 2430, category: "embroidered", discount: 50 }
    ];
}

function loadProductsToContainer(containerId, products) {
    const container = document.getElementById(containerId);
    if (!container || container.children.length > 0) return;
    
    container.innerHTML = '';
    
    products.forEach(product => {
        const discount = product.discount;
        
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.id = product.id;
        card.dataset.category = product.category;
        card.dataset.price = product.newPrice;
        card.dataset.discount = discount;
        
        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}" class="main-image" loading="lazy">
                <img src="${product.image.replace('.webp', '-hover.webp')}" alt="${product.title}" class="hover-image" loading="lazy">
                <span class="discount-badge">-${discount}%</span>
                <div class="product-hover-icons">
                    <button class="hover-icon quick-view" title="Quick View">
                        <i class="fa-regular fa-eye"></i>
                    </button>
                    <button class="hover-icon add-to-cart" title="Add to Cart">
                        <i class="fa-solid fa-bag-shopping"></i>
                    </button>
                    <button class="hover-icon wishlist" title="Add to Wishlist">
                        <i class="fa-regular fa-heart"></i>
                    </button>
                    <button class="hover-icon compare" title="Compare">
                        <i class="fa-regular fa-code-compare"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <h3>${product.title}</h3>
                <div class="price-wrapper">
                    <span class="old-price">Rs.${product.oldPrice.toLocaleString()}</span>
                    <span class="new-price">Rs.${product.newPrice.toLocaleString()}</span>
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
    
    // Reinitialize event listeners for new cards
    initProductHoverIcons();
    loadWishlistState();
    
    // Reinitialize mobile image rotation
    if (window.innerWidth <= 768) {
        initMobileImageRotation();
    }
}

// ======================================
// Handle window resize - reinitialize mobile rotation
// ======================================
window.addEventListener('resize', function() {
    // Clear existing interval
    if (window.mobileImageInterval) {
        clearInterval(window.mobileImageInterval);
    }
    
    // Reinitialize for mobile if needed
    if (window.innerWidth <= 768) {
        initMobileImageRotation();
    }
});

// ======================================
// EXPORT FUNCTIONS FOR GLOBAL USE
// ======================================
window.showNotification = showNotification;
window.addToCart = addToCart;
window.updateCartCount = updateCartCount;
window.showQuickViewModal = showQuickViewModal;
window.closeQuickViewModal = closeQuickViewModal;