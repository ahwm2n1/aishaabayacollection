// Footer Component
document.addEventListener('DOMContentLoaded', function() {
    const footerHTML = `
        <div class="footer-main">
            <!-- Features Section -->
            <section class="features">
                <div class="features-container">
                    <div class="feature-box">
                        <i class="fa-solid fa-truck-fast"></i>
                        <div>
                            <h4>Free Shipping</h4>
                            <p>On orders over 3500.</p>
                        </div>
                    </div>

                    <div class="feature-box">
                        <i class="fa-solid fa-arrows-rotate"></i>
                        <div>
                            <h4>Replacement</h4>
                            <p>We offer 7 days replacement</p>
                        </div>
                    </div>

                    <div class="feature-box">
                        <i class="fa-regular fa-credit-card"></i>
                        <div>
                            <h4>Secure Checkout</h4>
                            <p>100% Payment Secure.</p>
                        </div>
                    </div>

                    <div class="feature-box">
                        <i class="fa-solid fa-headset"></i>
                        <div>
                            <h4>24/7 Online Support</h4>
                            <p>Here to help — whenever you need us.</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Footer Section -->
            <footer class="footer">
                <div class="footer-container">
                    <!-- About -->
                    <div class="footer-col">
                        <h3>About Us.</h3>
                        <p>
                            Hijab By Dania – Explore elegant abaya collections that combine timeless 
                            modesty with modern fashion. Designed for the graceful woman, bringing 
                            confidence to every look.
                        </p>

                        <div class="social-icons">
                            <a href="#"><i class="ri-facebook-fill"></i></a>
                            <a href="#"><i class="ri-instagram-line"></i></a>
                            <a href="#"><i class="ri-tiktok-fill"></i></a>
                        </div>
                    </div>

                    <!-- Policies -->
                    <div class="footer-col">
                        <h3>Policies</h3>
                        <ul>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Refund Policy</a></li>
                            <li><a href="#">Shipping Policy</a></li>
                            <li><a href="#">Terms of Service</a></li>
                            <li><a href="#">Contact Information</a></li>
                        </ul>
                    </div>

                    <!-- Information -->
                    <div class="footer-col">
                        <h3>Information</h3>
                        <ul>
                            <li><a href="#">About us</a></li>
                            <li><a href="#">Contact</a></li>
                            <li><a href="#">FAQs</a></li>
                            <li><a href="#">Size Chart</a></li>
                        </ul>
                    </div>

                    <!-- Outlet Locations -->
                    <div class="footer-col">
                        <h3><i class="ri-store-2-line"></i> Outlet Locations:</h3>
                        <strong>Sheikh G Outlet</strong><br>
                        Brand Road, Gulgasht, Multan
                    </div>
                </div>
            </footer>
        </div>
    `;

    document.getElementById('footer').innerHTML = footerHTML;
});