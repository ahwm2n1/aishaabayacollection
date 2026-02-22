// Bottom Navigation Bar Component
document.addEventListener('DOMContentLoaded', function() {
    const bottomNavbarHTML = `
        <div class="bottom-navbar">
            <div class="bottom-nav-container">
                <!-- Home Button -->
                <a href="index.html" class="bottom-nav-item" id="nav-home">
                    <i class="fa-solid fa-house"></i>
                    <span>Home</span>
                </a>

                <!-- Shop Button -->
                <a href="products.html" class="bottom-nav-item" id="nav-shop">
                    <i class="fa-solid fa-store"></i>
                    <span>Shop</span>
                </a>

                <!-- Contact Us Button -->
                <a href="contact.html" class="bottom-nav-item" id="nav-contact">
                    <i class="fa-solid fa-envelope"></i>
                    <span>Contact</span>
                </a>

                <!-- Cart Button with Badge -->
                <a href="cart.html" class="bottom-nav-item" id="nav-cart">
                    <i class="fa-solid fa-bag-shopping"></i>
                    <span>Cart</span>
                    <span class="cart-badge" id="cart-count" style="display: none;">0</span>
                </a>
            </div>
        </div>
    `;

    // Add bottom navbar to page
    const bottomNavContainer = document.getElementById('bottom-navbar');
    if (bottomNavContainer) {
        bottomNavContainer.innerHTML = bottomNavbarHTML;
    } else {
        // If no container found, create one and append to body
        const div = document.createElement('div');
        div.id = 'bottom-navbar';
        div.innerHTML = bottomNavbarHTML;
        document.body.appendChild(div);
    }

    // Set active class based on current page
    function setActiveNavItem() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navItems = document.querySelectorAll('.bottom-nav-item');
        
        navItems.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href');
            if (href === currentPage) {
                item.classList.add('active');
            }
        });
    }

    // Update cart count (example function)
    function updateCartCount(count) {
        const cartBadge = document.getElementById('cart-count');
        if (cartBadge) {
            if (count > 0) {
                cartBadge.textContent = count;
                cartBadge.style.display = 'flex';
            } else {
                cartBadge.style.display = 'none';
            }
        }
    }

    // Initialize
    setActiveNavItem();
    
    // Example: Set cart count (replace with actual cart data)
    // updateCartCount(3); // Example with 3 items

    // Listen for page changes (if using single page app)
    window.addEventListener('popstate', setActiveNavItem);
});

// Export functions if using modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { updateCartCount };
}