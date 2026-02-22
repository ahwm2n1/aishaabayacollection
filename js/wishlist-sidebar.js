// Wishlist Sidebar Component
document.addEventListener('DOMContentLoaded', function() {
    initWishlistSidebar();
    loadWishlistSidebar();
});

function initWishlistSidebar() {
    // Create wishlist sidebar if not exists
    if (!document.querySelector('.wishlist-sidebar')) {
        createWishlistSidebar();
    }
    
    // Add click event to wishlist icons
    const wishlistIcons = document.querySelectorAll('.social-icon a[href="wishlist.html"] i, .mobile-box a[href="wishlist.html"] i');
    
    wishlistIcons.forEach(icon => {
        const parentLink = icon.closest('a');
        if (parentLink) {
            parentLink.addEventListener('click', function(e) {
                e.preventDefault();
                openWishlistSidebar();
            });
        }
    });
    
    // Also add to any heart icons in product cards
    document.addEventListener('click', function(e) {
        if (e.target.closest('.wishlist') || e.target.closest('.fa-heart')) {
            // Don't open sidebar here, just update wishlist
            // Sidebar will auto-update via storage event
        }
    });
    
    // Listen for wishlist updates
    window.addEventListener('storage', function(e) {
        if (e.key === 'abayaWishlist') {
            loadWishlistSidebar();
        }
    });
}

function createWishlistSidebar() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'wishlist-overlay';
    overlay.id = 'wishlistOverlay';
    document.body.appendChild(overlay);
    
    // Create sidebar
    const sidebar = document.createElement('div');
    sidebar.className = 'wishlist-sidebar';
    sidebar.id = 'wishlistSidebar';
    sidebar.innerHTML = `
        <div class="wishlist-header">
            <h3>
                <i class="fa-regular fa-heart"></i>
                My Wishlist
                <span id="wishlistCount">0</span>
            </h3>
            <button class="wishlist-close" id="wishlistClose">
                <i class="fa-solid fa-times"></i>
            </button>
        </div>
        
        <div class="wishlist-items" id="wishlistItems">
            <!-- Wishlist items will be loaded here -->
        </div>
        
        <div class="wishlist-footer">
            <div class="wishlist-total">
                <span>Total Items:</span>
                <span id="wishlistTotalItems">0</span>
            </div>
            <a href="wishlist.html" class="wishlist-view-all">
                View Full Wishlist
            </a>
        </div>
    `;
    
    document.body.appendChild(sidebar);
    
    // Add event listeners
    const closeBtn = document.getElementById('wishlistClose');
    const overlayEl = document.getElementById('wishlistOverlay');
    
    closeBtn.addEventListener('click', closeWishlistSidebar);
    overlayEl.addEventListener('click', closeWishlistSidebar);
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeWishlistSidebar();
        }
    });
}

// Open wishlist sidebar
window.openWishlistSidebar = function() {
    const sidebar = document.getElementById('wishlistSidebar');
    const overlay = document.getElementById('wishlistOverlay');
    
    if (sidebar && overlay) {
        loadWishlistSidebar(); // Refresh data
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Close wishlist sidebar
window.closeWishlistSidebar = function() {
    const sidebar = document.getElementById('wishlistSidebar');
    const overlay = document.getElementById('wishlistOverlay');
    
    if (sidebar && overlay) {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Load wishlist items into sidebar
function loadWishlistSidebar() {
    const wishlist = JSON.parse(localStorage.getItem('abayaWishlist')) || [];
    const itemsContainer = document.getElementById('wishlistItems');
    const countSpan = document.getElementById('wishlistCount');
    const totalSpan = document.getElementById('wishlistTotalItems');
    
    if (!itemsContainer) return;
    
    // Update counts
    if (countSpan) countSpan.textContent = wishlist.length;
    if (totalSpan) totalSpan.textContent = wishlist.length;
    
    if (wishlist.length === 0) {
        itemsContainer.innerHTML = `
            <div class="wishlist-empty">
                <i class="fa-regular fa-heart"></i>
                <h4>Your wishlist is empty</h4>
                <p>Save your favorite items here</p>
                <a href="index.html" class="shop-now-btn" onclick="closeWishlistSidebar()">Shop Now</a>
            </div>
        `;
        return;
    }
    
    // Calculate total value (optional)
    let totalValue = 0;
    
    let html = '';
    wishlist.forEach((item, index) => {
        // Extract numeric price
        const price = parseInt(item.price.replace(/[^0-9]/g, '')) || 0;
        totalValue += price;
        
        const oldPrice = item.oldPrice ? item.oldPrice : '';
        
        html += `
            <div class="wishlist-item" data-id="${item.id}" data-index="${index}">
                <div class="wishlist-item-image">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="wishlist-item-info">
                    <h4 class="wishlist-item-title">${item.title}</h4>
                    <div class="wishlist-item-price">
                        ${item.price}
                        ${oldPrice ? `<span class="wishlist-item-old-price">${oldPrice}</span>` : ''}
                    </div>
                    <div class="wishlist-item-actions">
                        <button class="wishlist-add-to-cart" onclick="addToCartFromWishlistSidebar('${item.id}')">
                            <i class="fa-solid fa-bag-shopping"></i> Add to Cart
                        </button>
                    </div>
                </div>
                <button class="wishlist-remove-item" onclick="removeFromWishlistSidebar('${item.id}')">
                    <i class="fa-solid fa-times"></i>
                </button>
            </div>
        `;
    });
    
    itemsContainer.innerHTML = html;
}

// Add to cart from wishlist sidebar
window.addToCartFromWishlistSidebar = function(id) {
    const wishlist = JSON.parse(localStorage.getItem('abayaWishlist')) || [];
    const item = wishlist.find(item => item.id == id);
    
    if (item) {
        // Check if addToCart function exists (from main.js or products.js)
        if (typeof addToCart === 'function') {
            const cartItem = {
                id: item.id,
                title: item.title,
                price: item.price.replace(/[^0-9]/g, ''),
                image: item.image,
                size: 'M',
                color: 'Black',
                quantity: 1
            };
            addToCart(cartItem);
        } else {
            // Fallback if addToCart doesn't exist
            let cart = JSON.parse(localStorage.getItem('abayaCart')) || [];
            cart.push({
                id: item.id,
                title: item.title,
                price: item.price.replace(/[^0-9]/g, ''),
                image: item.image,
                size: 'M',
                color: 'Black',
                quantity: 1
            });
            localStorage.setItem('abayaCart', JSON.stringify(cart));
            
            // Update cart count if function exists
            if (typeof updateCartCount === 'function') {
                updateCartCount();
            }
        }
        
        showWishlistNotification(`${item.title} added to cart!`);
    }
}

// Remove from wishlist sidebar
window.removeFromWishlistSidebar = function(id) {
    let wishlist = JSON.parse(localStorage.getItem('abayaWishlist')) || [];
    const item = wishlist.find(item => item.id == id);
    
    wishlist = wishlist.filter(item => item.id != id);
    localStorage.setItem('abayaWishlist', JSON.stringify(wishlist));
    
    // Reload sidebar
    loadWishlistSidebar();
    
    // Update heart icons on page
    updateWishlistIcons();
    
    showWishlistNotification('Removed from wishlist', 'info');
    
    // Trigger storage event for other tabs
    window.dispatchEvent(new Event('storage'));
}

// Update wishlist icons on page
function updateWishlistIcons() {
    const wishlist = JSON.parse(localStorage.getItem('abayaWishlist')) || [];
    
    document.querySelectorAll('.wishlist i, .hover-icon.wishlist i, .fa-heart').forEach(icon => {
        const productCard = icon.closest('.product-card, .card');
        if (productCard) {
            const id = productCard.dataset.id || productCard.dataset.productId;
            if (id && wishlist.some(item => item.id == id)) {
                icon.classList.remove('fa-regular');
                icon.classList.add('fa-solid');
            } else {
                icon.classList.remove('fa-solid');
                icon.classList.add('fa-regular');
            }
        }
    });
}

// Show notification
function showWishlistNotification(message, type = 'success') {
    // Remove existing notification
    const existingNotif = document.querySelector('.wishlist-notification');
    if (existingNotif) existingNotif.remove();
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'wishlist-notification';
    
    const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-info';
    
    notification.innerHTML = `
        <i class="fa-solid ${icon}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Export functions for global use
window.openWishlistSidebar = openWishlistSidebar;
window.closeWishlistSidebar = closeWishlistSidebar;