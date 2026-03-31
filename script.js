// 🛍 Product Data
const products = [
  {
    name: "Smartphone",
    price: 15000,
    image: "images/mobile.png",
    category: "electronics",
  },
  {
    name: "Laptop",
    price: 55000,
    image: "images/laptop.png",
    category: "electronics",
  },
  {
    name: "Headphones",
    price: 2000,
    image: "images/headphone.png",
    category: "electronics",
  },
  {
    name: "Smart Watch",
    price: 3000,
    image: "images/smartwatch.png",
    category: "electronics",
  },
  {
    name: "Camera",
    price: 40000,
    image: "images/camera.png",
    category: "electronics",
  },
  {
    name: "Bluetooth Speaker",
    price: 1800,
    image: "images/speaker.png",
    category: "electronics",
  },

  {
    name: "T-Shirt",
    price: 700,
    image: "images/T-shirt.png",
    category: "fashion",
  },
  {
    name: "Jeans",
    price: 1500,
    image: "images/jeans.png",
    category: "fashion",
  },
  {
    name: "Jacket",
    price: 2500,
    image: "images/jacket.png",
    category: "fashion",
  },
  {
    name: "Sneakers",
    price: 3000,
    image: "images/sneakers.png",
    category: "fashion",
  },
  {
    name: "Sunglasses",
    price: 900,
    image: "images/sunglasses.png",
    category: "fashion",
  },

  {
    name: "Backpack",
    price: 1200,
    image: "images/backpack.png",
    category: "accessories",
  },
  {
    name: "Wallet",
    price: 1500,
    image: "images/wallet.png",
    category: "accessories",
  },
  {
    name: "Belt",
    price: 400,
    image: "images/belt.png",
    category: "accessories",
  },
  { name: "Cap", price: 300, image: "images/cap.png", category: "accessories" },

  {
    name: "Table Lamp",
    price: 800,
    image: "images/tablelamp.png",
    category: "home",
  },
  {
    name: "Wall Clock",
    price: 600,
    image: "images/wallclock.png",
    category: "home",
  },
  { name: "Chair", price: 2500, image: "images/chair.png", category: "home" },
  {
    name: "Bedsheet",
    price: 1200,
    image: "images/bedsheet.png",
    category: "home",
  },

  {
    name: "Gaming Mouse",
    price: 800,
    image: "images/gaming-mouse.png",
    category: "electronics",
  },
  {
    name: "Keyboard",
    price: 1200,
    image: "images/keyboard.png",
    category: "electronics",
  },
  {
    name: "Power Bank",
    price: 1500,
    image: "images/powerbank.png",
    category: "electronics",
  },

  { name: "Books", price: 500, image: "images/books.png", category: "home" },
  {
    name: "Water Bottle",
    price: 500,
    image: "images/bottle.png",
    category: "home",
  },
];

// 🛒 CART + ❤️ WISHLIST
let cart = [];
let wishlist = [];

// 📦 ELEMENTS
const container = document.getElementById("product-list");
const searchInput = document.getElementById("search");

// 🔥 DISPLAY PRODUCTS
function displayProducts(list) {
  if (!container) return;

  container.innerHTML = "";

  list.forEach((p) => {
    const div = document.createElement("div");
    div.className = "product";

    div.innerHTML = `
      <img src="${p.image}">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick="addToCart('${p.name}')">Add to Cart</button>
      <button onclick="addToWishlist('${p.name}')">❤️</button>
      <button onclick="placeOrder('${p.name}', ${p.price})">Buy Now</button>
    `;

    container.appendChild(div);
  });
}

// 🔥 INITIAL LOAD
displayProducts(products);

// 🔍 SEARCH
if (searchInput) {
  searchInput.addEventListener("keyup", () => {
    const value = searchInput.value.toLowerCase();
    const filtered = products.filter((p) =>
      p.name.toLowerCase().includes(value),
    );
    displayProducts(filtered);
  });
}

// 🎯 FILTER
function filterProducts(category) {
  if (category === "all") {
    displayProducts(products);
  } else {
    const filtered = products.filter((p) => p.category === category);
    displayProducts(filtered);
  }
}

// ➕ ADD TO CART
function addToCart(productName) {
  const product = products.find((p) => p.name === productName);
  cart.push(product);

  document.getElementById("cart-count").innerText = cart.length;
  displayCart();
}

// 🛒 DISPLAY CART
function displayCart() {
  let cartContainer = document.getElementById("cart-items");
  if (!cartContainer) return;

  cartContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    cartContainer.innerHTML += `
      <div>
        ${item.name} - ₹${item.price}
        <button onclick="removeFromCart(${index})">❌</button>
      </div>
    `;
  });

  document.getElementById("total").innerText = total;
}

// ❌ REMOVE FROM CART
function removeFromCart(index) {
  cart.splice(index, 1);
  document.getElementById("cart-count").innerText = cart.length;
  displayCart();
}

// ❤️ ADD TO WISHLIST
function addToWishlist(productName) {
  const product = products.find((p) => p.name === productName);

  if (!wishlist.includes(product)) {
    wishlist.push(product);
  }

  displayWishlist();
}

// ❤️ DISPLAY WISHLIST
function displayWishlist() {
  let wishlistContainer = document.getElementById("wishlist-items");
  if (!wishlistContainer) return;

  wishlistContainer.innerHTML = "";

  wishlist.forEach((item, index) => {
    wishlistContainer.innerHTML += `
      <div>
        ❤️ ${item.name} - ₹${item.price}
        <button onclick="removeFromWishlist(${index})">❌</button>
      </div>
    `;
  });
}

// ❌ REMOVE FROM WISHLIST
function removeFromWishlist(index) {
  wishlist.splice(index, 1);
  displayWishlist();
}

// 🛒 BUY NOW → ONLY STORE LATEST ORDER (FIXED)
function placeOrder(name, price) {
  const order = { name, price };

  // 🔥 Replace old orders (important fix)
  localStorage.setItem("orders", JSON.stringify([order]));

  alert("Order placed successfully!");
  window.location.href = "orders.html";
}

// 🌙 DARK MODE
function toggleDarkMode() {
  document.body.classList.toggle("dark");

  const btn = document.getElementById("dark-toggle");
  btn.innerText = document.body.classList.contains("dark") ? "☀️" : "🌙";
}
