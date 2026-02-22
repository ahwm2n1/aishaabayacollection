// Navbar Component
document.addEventListener('DOMContentLoaded', function() {
    const navbarHTML = `
        <nav class="navbar">
            <div class="container nav-flex">
                <div class="logo">
                    <img src="images/logo-removebg-preview.png" alt="Aisha Collector Logo">
                </div>

                <!-- Desktop Links -->
                <ul class="nav-links">
                    <li><a href="index.html">Home</a></li>
                    <li class="has-submenu">
                        <a href="products.html">Abayas <i class="fa-solid fa-plus"></i></a>
                        <ul class="submenu">
                            <li><a href="products.html">Premium Abayas New</a></li>
                            <li><a href="products.html">Basic Abayas</a></li>
                            <li><a href="products.html">Kids Abayas Hot</a></li>
                            <li><a href="products.html">Mommy & Me</a></li>
                        </ul>
                    </li>
                    <li><a href="about.html">About Us</a></li>
                    <li><a href="contact.html">Contact Us</a></li>
                </ul>

                <!-- Social Icons -->
                <div class="social-icon">
                    <a style="color: #E1306C;" href="#" class="wishlist-sidebar-trigger"><i class="fa-regular fa-heart"></i></a>
                    <a style="color: #000000;" href="cart.html"><i class="fa-solid fa-bag-shopping"></i></a>
                    <a style="color: #1877F2;" href="https://www.facebook.com"><i class="fa-brands fa-facebook-f"></i></a>
                    <a style="color: #E1306C;" href="https://www.instagram.com"><i class="fa-brands fa-instagram"></i></a>
                    <a style="color: #000000;" href="https://www.tiktok.com"><i class="fa-brands fa-tiktok"></i></a>
                </div>

                <!-- Mobile Menu Toggle -->
                <div class="nav-icons">
                    <i class="fa-solid fa-bars" id="menu-toggle"></i>
                </div>
            </div>

            <!-- Mobile Fullscreen Menu -->
            <div class="mobile-menu" id="mobile-menu">
                <div class="mobile-menu-top">
                    <div class="logo">YOUR BRAND</div>
                    <i class="fa-solid fa-xmark" id="menu-close"></i>
                </div>

                <hr>

                <!-- Search Bar -->
                <div class="mobile-search">
                    <input type="text" placeholder="Search our store">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </div>

                <div class="mobile-links">
                    <ul>
                        <li class="has-submenu-mobile">
                            <a href="products.html">Abayas <i class="fa-solid fa-plus"></i></a>
                            <ul class="submenu-mobile">
                                <li><a href="products.html">Premium Abayas New</a></li>
                                <li><a href="products.html">Basic Abayas</a></li>
                                <li><a href="products.html">Kids Abayas Hot</a></li>
                                <li><a href="products.html">Mommy & Me</a></li>
                            </ul>
                        </li>
                        <li><a href="about.html">About Us</a></li>
                        <li><a href="contact.html">Contact Us</a></li>
                    </ul>

                    <hr>

                    <div class="mobile-box">
                        <a style="color: #000000; text-decoration: none;" href="account.html">
                            <i class="fa-regular fa-user"></i> My Account
                        </a>
                    </div>
                    <div class="mobile-box">
                        <a style="color: #000000; text-decoration: none;" href="#" class="wishlist-sidebar-trigger">
                            <i class="fa-regular fa-heart"></i> Wishlist
                        </a>
                    </div>
                    <div class="mobile-box">
                        <a style="color: #000000; text-decoration: none;" href="cart.html">
                            <i class="fa-solid fa-bag-shopping"></i> Shopping Cart
                        </a>
                    </div>

                    <hr>

                    <div class="mobile-social">
                        <a style="color: #1877F2;" href="https://www.facebook.com"><i class="fa-brands fa-facebook-f"></i></a>
                        <a style="color: #E1306C;" href="https://www.instagram.com"><i class="fa-brands fa-instagram"></i></a>
                        <a style="color: #000000;" href="https://www.tiktok.com"><i class="fa-brands fa-tiktok"></i></a>
                    </div>
                </div>
            </div>
        </nav>
    `;

    document.getElementById('navbar').innerHTML = navbarHTML;

    // Mobile Menu Functionality
    const menuToggle = document.getElementById("menu-toggle");
    const menuClose = document.getElementById("menu-close");
    const mobileMenu = document.getElementById("mobile-menu");

    if (menuToggle && menuClose && mobileMenu) {
        menuToggle.addEventListener("click", () => {
            mobileMenu.classList.add("active");
        });

        menuClose.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
        });

        // Submenu toggle for mobile
        const submenuParents = document.querySelectorAll(".has-submenu-mobile > a");
        submenuParents.forEach(parent => {
            parent.addEventListener("click", (e) => {
                e.preventDefault();
                parent.parentElement.classList.toggle("active");
            });
        });
    }
    
    // Wishlist sidebar trigger
    const wishlistTriggers = document.querySelectorAll('.wishlist-sidebar-trigger');
    wishlistTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            if (typeof window.openWishlistSidebar === 'function') {
                window.openWishlistSidebar();
            }
        });
    });
    
    // Update wishlist count in navbar
    updateWishlistCount();
});

// Update wishlist count in navbar
function updateWishlistCount() {
    const wishlist = JSON.parse(localStorage.getItem('abayaWishlist')) || [];
    
    // Add count badge to wishlist icon
    const wishlistIcon = document.querySelector('.social-icon a.wishlist-sidebar-trigger i');
    if (wishlistIcon && wishlist.length > 0) {
        // Check if badge already exists
        let badge = wishlistIcon.parentElement.querySelector('.wishlist-count-badge');
        if (!badge) {
            badge = document.createElement('span');
            badge.className = 'wishlist-count-badge';
            badge.style.cssText = `
                position: absolute;
                top: -5px;
                right: -5px;
                background: #c9a27e;
                color: white;
                font-size: 10px;
                font-weight: 600;
                width: 16px;
                height: 16px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px solid white;
            `;
            wishlistIcon.parentElement.style.position = 'relative';
            wishlistIcon.parentElement.appendChild(badge);
        }
        badge.textContent = wishlist.length;
    }
}