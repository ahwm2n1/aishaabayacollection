// ======================================
// COMPLETE CART SYSTEM WITH LOCALSTORAGE
// FIXED: Home page to cart page product display
// ======================================

const WHATSAPP_NUMBER = "923034676708";

// ======================================
// PRODUCT IMAGES FOR CART NAVIGATION - COMPLETE WITH ALL IDs 1-16
// ======================================
const productImages = {
    // IDs 1-4 (Premium Collection)
    1: { 
        main: "images/abaya-1.webp",
        thumbnails: [
            "images/abaya-1.webp",
            "images/abaya-1-hover.webp",
            "images/abaya-2.webp",
            "images/abaya-31.webp"
        ]
    },
    2: { 
        main: "images/abaya-2.webp",
        thumbnails: [
            "images/abaya-2.webp",
            "images/abaya-31.webp",
            "images/abaya-3.webp",
            "images/abaya-32.webp"
        ]
    },
    3: { 
        main: "images/abaya-3.webp",
        thumbnails: [
            "images/abaya-3.webp",
            "images/abaya-32.webp",
            "images/abaya-4.webp",
            "images/abaya-33.webp"
        ]
    },
    4: { 
        main: "images/abaya-4.webp",
        thumbnails: [
            "images/abaya-4.webp",
            "images/abaya-33.webp",
            "images/abaya-1.webp",
            "images/abaya-2.webp"
        ]
    },
    
    // IDs 5-8 (Front Open)
    5: { 
        main: "images/abaya-5.jpg",
        thumbnails: [
            "images/abaya-5.jpg",
            "images/abaya-34.webp",
            "images/abaya-5.webp",
            "images/abaya-35.webp"
        ]
    },
    6: { 
        main: "images/abaya-5.webp",
        thumbnails: [
            "images/abaya-5.webp",
            "images/abaya-35.webp",
            "images/abaya-6.jpg",
            "images/abaya-36.webp"
        ]
    },
    7: { 
        main: "images/abaya-6.jpg",
        thumbnails: [
            "images/abaya-6.jpg",
            "images/abaya-36.webp",
            "images/abaya-7.jpg",
            "images/abaya-37.webp"
        ]
    },
    8: { 
        main: "images/abaya-7.jpg",
        thumbnails: [
            "images/abaya-7.jpg",
            "images/abaya-37.webp",
            "images/abaya-8.webp",
            "images/abaya-38.webp"
        ]
    },
    
    // IDs 9-12 (Turkish)
    9: { 
        main: "images/abaya-8.webp",
        thumbnails: [
            "images/abaya-8.webp",
            "images/abaya-38.webp",
            "images/abaya-9.jpg",
            "images/abaya-39.webp"
        ]
    },
    10: { 
        main: "images/abaya-9.jpg",
        thumbnails: [
            "images/abaya-9.jpg",
            "images/abaya-39.webp",
            "images/abaya-10.jpg",
            "images/abaya-10-hover.jpg"
        ]
    },
    11: { 
        main: "images/abaya-10.jpg",
        thumbnails: [
            "images/abaya-10.jpg",
            "images/abaya-10-hover.jpg",
            "images/abaya-11.webp",
            "images/abaya-11-hover.webp"
        ]
    },
    12: { 
        main: "images/abaya-11.webp",
        thumbnails: [
            "images/abaya-11.webp",
            "images/abaya-11-hover.webp",
            "images/abaya-12.webp",
            "images/abaya-40.webp"
        ]
    },
    
    // IDs 13-16 (Embroidered)
    13: { 
        main: "images/abaya-12.webp",
        thumbnails: [
            "images/abaya-12.webp",
            "images/abaya-40.webp",
            "images/abaya-13.webp",
            "images/abaya-41.webp"
        ]
    },
    14: { 
        main: "images/abaya-13.webp",
        thumbnails: [
            "images/abaya-13.webp",
            "images/abaya-41.webp",
            "images/abaya-14.webp",
            "images/abaya-42.webp"
        ]
    },
    15: { 
        main: "images/abaya-14.webp",
        thumbnails: [
            "images/abaya-14.webp",
            "images/abaya-42.webp",
            "images/abaya-15.webp",
            "images/abaya-43.webp"
        ]
    },
    16: { 
        main: "images/abaya-15.webp",
        thumbnails: [
            "images/abaya-15.webp",
            "images/abaya-43.webp",
            "images/abaya-12.webp",
            "images/abaya-13.webp"
        ]
    }
};

// Related Products for Auto-scroll - Updated with correct IDs
const relatedProducts = [
    { id: 1, title: "Pearl Poise Plated Abaya", price: 4499, oldPrice: 5999, image: "images/abaya-1.webp" },
    { id: 2, title: "Hina Front Open Abaya", price: 3899, oldPrice: 5999, image: "images/abaya-2.webp" },
    { id: 3, title: "Grey Classic Abaya", price: 3999, oldPrice: 4999, image: "images/abaya-3.webp" },
    { id: 4, title: "Regal Noir Brown Abaya", price: 4499, oldPrice: 15000, image: "images/abaya-4.webp" },
    { id: 5, title: "Urban Green", price: 2035, oldPrice: 4070, image: "images/abaya-5.jpg" },
    { id: 6, title: "Front Open Classic", price: 2430, oldPrice: 4860, image: "images/abaya-5.webp" },
    { id: 7, title: "Elegant Front Open", price: 2625, oldPrice: 5250, image: "images/abaya-6.jpg" },
    { id: 8, title: "Modern Front Open", price: 2530, oldPrice: 5060, image: "images/abaya-7.jpg" }
];

// ======================================
// CORE CART FUNCTIONS
// ======================================

// Get cart from localStorage
function getCart() {
    const cart = JSON.parse(localStorage.getItem('abayaCart')) || [];
    console.log('Cart loaded:', cart); // Debug
    return cart;
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('abayaCart', JSON.stringify(cart));
    updateCartCount();
}

// Update cart count everywhere
function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    
    // Update cart count in navbar and header
    document.querySelectorAll('.cart-count, #cart-count, .cart-count-badge').forEach(el => {
        if (el) el.textContent = totalItems;
    });
}

// Format Price Function
function formatPrice(price) {
    // Handle string prices (remove Rs. and commas)
    if (typeof price === 'string') {
        price = parseInt(price.replace(/[^0-9]/g, '')) || 0;
    }
    return "Rs. " + price.toLocaleString() + ".00";
}

// Calculate Discount Percentage
function calculateDiscount(oldPrice, price) {
    // Handle string prices
    if (typeof oldPrice === 'string') {
        oldPrice = parseInt(oldPrice.replace(/[^0-9]/g, '')) || 0;
    }
    if (typeof price === 'string') {
        price = parseInt(price.replace(/[^0-9]/g, '')) || 0;
    }
    return Math.round(((oldPrice - price) / oldPrice) * 100) || 0;
}

// ======================================
// THUMBNAIL IMAGE FUNCTION
// ======================================
window.changeMainImage = function(productId, thumbnailSrc, event) {
    event.stopPropagation();
    
    const cartItem = event.target.closest('.cart-item');
    if (!cartItem) return;
    
    const mainImage = cartItem.querySelector('.cart-main-image img');
    mainImage.src = thumbnailSrc;
    
    // Update active thumbnail
    const thumbnails = cartItem.querySelectorAll('.cart-thumbnail');
    thumbnails.forEach(thumb => {
        thumb.classList.remove('active');
        if (thumb.querySelector('img').src === thumbnailSrc) {
            thumb.classList.add('active');
        }
    });
    
    // Add animation
    mainImage.style.transform = 'scale(1.05)';
    setTimeout(() => {
        mainImage.style.transform = 'scale(1)';
    }, 200);
};

// ======================================
// RENDER CART ITEMS
// ======================================
function renderCartItems() {
    const cartContainer = document.getElementById('cart-items');
    if (!cartContainer) return;
    
    const cart = getCart();
    console.log('Rendering cart:', cart); // Debug
    
    // Update cart count badge
    const cartBadge = document.getElementById('cart-count');
    if (cartBadge) cartBadge.textContent = cart.length;
    
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fa-solid fa-cart-shopping"></i>
                <p>Your cart is empty</p>
                <p class="empty-cart-sub">Add some beautiful abayas to your cart!</p>
                <a href="index.html" class="shop-now-btn">
                    <i class="fa-solid fa-bag-shopping"></i> Shop Now
                </a>
            </div>
        `;
        updateOrderSummary();
        
        // Hide clear cart button
        const clearCartBtn = document.getElementById('clear-cart');
        if (clearCartBtn) clearCartBtn.style.display = 'none';
        
        return;
    } else {
        // Show clear cart button
        const clearCartBtn = document.getElementById('clear-cart');
        if (clearCartBtn) clearCartBtn.style.display = 'flex';
    }
    
    cartContainer.innerHTML = '';
    
    cart.forEach((item, index) => {
        // Handle price - could be string or number
        let price = item.price;
        let oldPrice = item.oldPrice || price * 1.5; // Default old price if not available
        
        if (typeof price === 'string') {
            price = parseInt(price.replace(/[^0-9]/g, '')) || 0;
        }
        if (typeof oldPrice === 'string') {
            oldPrice = parseInt(oldPrice.replace(/[^0-9]/g, '')) || price * 1.5;
        }
        
        const itemTotal = price * (item.quantity || 1);
        const discount = calculateDiscount(oldPrice, price);
        
        // Get product images with fallback
        const productImgData = productImages[item.id] || {
            main: item.image || "images/abaya-1.webp",
            thumbnails: [
                item.image || "images/abaya-1.webp",
                item.image || "images/abaya-1.webp",
                item.image || "images/abaya-1.webp",
                item.image || "images/abaya-1.webp"
            ]
        };
        
        const mainImage = productImgData.main;
        const thumbnails = productImgData.thumbnails.slice(0, 3);
        
        // Generate thumbnail HTML
        const thumbnailsHTML = thumbnails.map((thumb, thumbIndex) => `
            <div class="cart-thumbnail ${thumbIndex === 0 ? 'active' : ''}" onclick="changeMainImage(${item.id}, '${thumb}', event)">
                <img src="${thumb}" alt="Thumbnail ${thumbIndex + 1}" loading="lazy">
            </div>
        `).join('');
        
        // Available sizes
        const availableSizes = item.availableSizes || ['S', 'M', 'L', 'XL', 'XXL'];
        
        // Generate size options
        const sizeOptions = availableSizes.map(size => 
            `<option value="${size}" ${size === item.size ? 'selected' : ''}>${size}</option>`
        ).join('');
        
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.dataset.id = item.id;
        cartItem.dataset.size = item.size || 'M';
        
        cartItem.innerHTML = `
            <div class="cart-product-images">
                <!-- Main Image -->
                <div class="cart-main-image">
                    <img src="${mainImage}" alt="${item.title}" onclick="zoomImage('${mainImage}')" loading="lazy">
                    <div class="zoom-icon">
                        <i class="fa-solid fa-magnifying-glass-plus"></i>
                    </div>
                </div>
                
                <!-- Thumbnails -->
                <div class="cart-thumbnails">
                    ${thumbnailsHTML}
                </div>
            </div>
            
            <div class="item-details">
                <a href="#" class="item-title">${item.title}</a>
                <div class="item-prices">
                    <span class="item-price">${formatPrice(price)}</span>
                    ${oldPrice ? `<span class="item-old-price">${formatPrice(oldPrice)}</span>` : ''}
                    ${discount > 0 ? `<span class="discount-badge">-${discount}%</span>` : ''}
                </div>
                <div class="item-size">
                    <span>Size:</span>
                    <select class="size-select" onchange="updateSize(${item.id}, '${item.size || 'M'}', this.value)">
                        ${sizeOptions}
                    </select>
                </div>
                <div class="item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, '${item.size || 'M'}', ${(item.quantity || 1) - 1})">
                        <i class="fa-solid fa-minus"></i>
                    </button>
                    <input type="number" class="quantity-input" value="${item.quantity || 1}" min="1" max="10" 
                           onchange="updateQuantity(${item.id}, '${item.size || 'M'}', parseInt(this.value))">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, '${item.size || 'M'}', ${(item.quantity || 1) + 1})">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
                <div class="item-total-mobile">
                    <span>Total:</span>
                    <span class="item-total-price">${formatPrice(itemTotal)}</span>
                </div>
                <button class="remove-item mobile-remove" onclick="removeFromCart(${item.id}, '${item.size || 'M'}')">
                    <i class="fa-solid fa-trash-can"></i> Remove
                </button>
            </div>
            
            <div class="item-actions">
                <div class="item-total">${formatPrice(itemTotal)}</div>
                ${oldPrice ? `<div class="item-save">Save: Rs. ${((oldPrice - price) * (item.quantity || 1)).toLocaleString()}</div>` : ''}
                <button class="remove-item" onclick="removeFromCart(${item.id}, '${item.size || 'M'}')">
                    <i class="fa-solid fa-trash-can"></i> Remove
                </button>
            </div>
        `;
        
        cartContainer.appendChild(cartItem);
    });
    
    updateOrderSummary();
}

// ======================================
// CART FUNCTIONS
// ======================================

// Remove from cart
window.removeFromCart = function(productId, size) {
    let cart = getCart();
    cart = cart.filter(item => !(item.id == productId && item.size === size));
    saveCart(cart);
    renderCartItems();
    showNotification('Item removed from cart!');
}

// Update quantity
window.updateQuantity = function(productId, size, newQuantity) {
    let cart = getCart();
    const itemIndex = cart.findIndex(item => item.id == productId && item.size === size);
    
    if (itemIndex > -1) {
        if (newQuantity < 1) {
            removeFromCart(productId, size);
            return;
        }
        if (newQuantity > 10) {
            showNotification('Maximum quantity is 10', 'warning');
            return;
        }
        
        cart[itemIndex].quantity = newQuantity;
        saveCart(cart);
        renderCartItems();
        showNotification('Cart updated!');
    }
}

// Update size
window.updateSize = function(productId, oldSize, newSize) {
    let cart = getCart();
    const itemIndex = cart.findIndex(item => item.id == productId && item.size === oldSize);
    
    if (itemIndex > -1) {
        // Check if same product with new size already exists
        const existingItem = cart.find(item => 
            item.id == productId && item.size === newSize
        );
        
        if (existingItem) {
            // Merge quantities
            existingItem.quantity = (existingItem.quantity || 1) + (cart[itemIndex].quantity || 1);
            cart.splice(itemIndex, 1);
        } else {
            // Update size
            cart[itemIndex].size = newSize;
        }
        
        saveCart(cart);
        renderCartItems();
        showNotification('Size updated!');
    }
}

// ======================================
// ORDER SUMMARY
// ======================================

function updateOrderSummary() {
    const cart = getCart();
    
    let subtotal = 0;
    let totalDiscount = 0;
    
    cart.forEach(item => {
        let price = item.price;
        let oldPrice = item.oldPrice || price * 1.5;
        
        if (typeof price === 'string') {
            price = parseInt(price.replace(/[^0-9]/g, '')) || 0;
        }
        if (typeof oldPrice === 'string') {
            oldPrice = parseInt(oldPrice.replace(/[^0-9]/g, '')) || price * 1.5;
        }
        
        subtotal += price * (item.quantity || 1);
        totalDiscount += (oldPrice - price) * (item.quantity || 1);
    });
    
    const shipping = subtotal > 5000 ? 0 : 200;
    const total = subtotal + shipping;
    
    // Update summary elements
    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping');
    const discountEl = document.getElementById('discount');
    const totalEl = document.getElementById('total');
    
    if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
    if (shippingEl) shippingEl.textContent = shipping === 0 ? 'Free' : formatPrice(shipping);
    if (discountEl) discountEl.textContent = totalDiscount > 0 ? `-${formatPrice(totalDiscount)}` : 'Rs. 0.00';
    if (totalEl) totalEl.textContent = formatPrice(total);
    
    // Update shipping progress
    updateShippingProgress(subtotal);
}

function updateShippingProgress(subtotal) {
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    
    if (!progressFill || !progressText) return;
    
    if (subtotal >= 5000) {
        progressFill.style.width = '100%';
        progressText.innerHTML = '<i class="fa-solid fa-circle-check"></i> You qualify for free shipping!';
        progressText.style.color = '#27ae60';
    } else {
        const remaining = 5000 - subtotal;
        const percentage = (subtotal / 5000) * 100;
        progressFill.style.width = percentage + '%';
        progressText.innerHTML = `Add Rs. ${remaining.toLocaleString()} more for free shipping`;
        progressText.style.color = '#666';
    }
}

// ======================================
// RELATED PRODUCTS (Auto-scroll)
// ======================================

function renderRelatedProducts() {
    const scrollContainer = document.getElementById('scroll-products');
    if (!scrollContainer) return;
    
    // Duplicate products for seamless scrolling
    const allProducts = [...relatedProducts, ...relatedProducts];
    
    scrollContainer.innerHTML = '';
    
    allProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('scroll-product');
        productElement.onclick = () => viewProduct(product.id);
        
        productElement.innerHTML = `
            <div class="scroll-product-img">
                <img src="${product.image}" alt="${product.title}" loading="lazy">
            </div>
            <div class="scroll-product-info">
                <div class="scroll-product-title">${product.title}</div>
                <div class="scroll-product-price">${formatPrice(product.price)}</div>
            </div>
        `;
        
        scrollContainer.appendChild(productElement);
    });
}

// View Product
window.viewProduct = function(productId) {
    window.location.href = `product-details.html?id=${productId}`;
}

// ======================================
// WHATSAPP ORDER
// ======================================

function placeOrderViaWhatsApp() {
    const cart = getCart();
    
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    // Format order message
    let message = "🛍️ *NEW ORDER DETAILS*\n\n";
    message += "═══════════════════════\n\n";
    
    cart.forEach((item, index) => {
        let price = item.price;
        let oldPrice = item.oldPrice || price * 1.5;
        
        if (typeof price === 'string') {
            price = parseInt(price.replace(/[^0-9]/g, '')) || 0;
        }
        if (typeof oldPrice === 'string') {
            oldPrice = parseInt(oldPrice.replace(/[^0-9]/g, '')) || price * 1.5;
        }
        
        const itemTotal = price * (item.quantity || 1);
        const discount = calculateDiscount(oldPrice, price);
        
        message += `*${index + 1}. ${item.title}*\n`;
        message += `   📏 Size: ${item.size || 'M'}\n`;
        message += `   🔢 Quantity: ${item.quantity || 1}\n`;
        message += `   💰 Price: Rs. ${price.toLocaleString()}\n`;
        message += `   💵 Total: Rs. ${itemTotal.toLocaleString()}\n`;
        message += `   🏷️ Discount: ${discount}% off\n`;
        message += `   ───────────────────\n\n`;
    });
    
    let subtotal = 0;
    cart.forEach(item => {
        let price = item.price;
        if (typeof price === 'string') {
            price = parseInt(price.replace(/[^0-9]/g, '')) || 0;
        }
        subtotal += price * (item.quantity || 1);
    });
    
    const shipping = subtotal > 5000 ? 0 : 200;
    let totalDiscount = 0;
    cart.forEach(item => {
        let price = item.price;
        let oldPrice = item.oldPrice || price * 1.5;
        
        if (typeof price === 'string') {
            price = parseInt(price.replace(/[^0-9]/g, '')) || 0;
        }
        if (typeof oldPrice === 'string') {
            oldPrice = parseInt(oldPrice.replace(/[^0-9]/g, '')) || price * 1.5;
        }
        
        totalDiscount += (oldPrice - price) * (item.quantity || 1);
    });
    
    const total = subtotal + shipping;
    
    message += "═══════════════════════\n";
    message += "📊 *ORDER SUMMARY*\n\n";
    message += `   Subtotal: Rs. ${subtotal.toLocaleString()}\n`;
    message += `   Shipping: ${shipping === 0 ? 'FREE' : 'Rs. ' + shipping.toLocaleString()}\n`;
    message += `   Discount: -Rs. ${totalDiscount.toLocaleString()}\n`;
    message += `   ═══════════════════\n`;
    message += `   *TOTAL: Rs. ${total.toLocaleString()}*\n\n`;
    
    message += "═══════════════════════\n";
    message += "👤 *CUSTOMER INFORMATION*\n\n";
    message += "Please provide:\n";
    message += "• Full Name\n";
    message += "• Complete Address\n";
    message += "• Phone Number\n\n";
    
    message += "═══════════════════════\n";
    message += "✨ Thank you for shopping with us!\n";
    message += "We'll confirm your order soon. 🤝";
    
    // Encode message and open WhatsApp
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
    
    showNotification('Redirecting to WhatsApp...');
}

// ======================================
// IMAGE ZOOM
// ======================================

function setupImageZoom() {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const closeBtn = document.querySelector('.close-modal');
    
    window.zoomImage = function(imageSrc) {
        if (modal) {
            modal.style.display = 'block';
            modalImg.src = imageSrc;
        }
    }
    
    if (closeBtn) {
        closeBtn.onclick = function() {
            modal.style.display = 'none';
        }
    }
    
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
}

// ======================================
// NOTIFICATION SYSTEM
// ======================================

function showNotification(message, type = 'success') {
    // Remove existing notification
    const existingNotif = document.querySelector('.cart-notification');
    if (existingNotif) existingNotif.remove();
    
    const notification = document.createElement('div');
    notification.className = `cart-notification ${type}`;
    notification.innerHTML = `
        <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 2000);
}

// ======================================
// CLEAR CART
// ======================================

window.clearCart = function() {
    if (confirm('Are you sure you want to clear your cart?')) {
        localStorage.removeItem('abayaCart');
        renderCartItems();
        updateCartCount();
        showNotification('Cart cleared!');
    }
}

// ======================================
// INITIALIZATION
// ======================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Cart page loaded');
    
    // Render cart items
    renderCartItems();
    
    // Render related products
    renderRelatedProducts();
    
    // Update cart count
    updateCartCount();
    
    // Setup image zoom
    setupImageZoom();
    
    // WhatsApp Order Button
    const whatsappBtn = document.getElementById('whatsapp-order');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', placeOrderViaWhatsApp);
    }
    
    // Clear Cart Button
    const clearCartBtn = document.getElementById('clear-cart');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', window.clearCart);
    }
    
    // Listen for cart updates from other tabs
    window.addEventListener('storage', function(e) {
        if (e.key === 'abayaCart') {
            console.log('Cart updated in another tab');
            renderCartItems();
            updateCartCount();
        }
    });
    
    // Add touch optimization for mobile
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
});

// Add extra CSS for mobile remove button
const style = document.createElement('style');
style.textContent = `
    .mobile-remove {
        display: none;
    }
    
    @media (max-width: 768px) {
        .mobile-remove {
            display: flex;
            width: 100%;
            justify-content: center;
            margin-top: 15px;
        }
        
        .item-actions .remove-item {
            display: none;
        }
    }
`;
document.head.appendChild(style);