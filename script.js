// =====================================================
// WHATSAPP NUMBER - Apna number yahan daalo
// Format: Country code ke saath, bina + ke
// Pakistan: 923001234567  |  India: 919876543210
// =====================================================
const WHATSAPP_NUMBER = "919876543210";
// =====================================================

const DEFAULT_PRODUCTS = [
  {
    id: "1",
    name: "Classic White T-Shirt",
    description: "Premium cotton t-shirt with a comfortable fit. Perfect for casual wear.",
    price: 299,
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    category: "T-Shirt",
  },
  {
    id: "2",
    name: "Graphic Print T-Shirt",
    description: "Stylish graphic t-shirt with unique design. 100% cotton, breathable fabric.",
    price: 349,
    imageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop",
    category: "T-Shirt",
  },
  {
    id: "3",
    name: "Formal Cotton Shirt",
    description: "Elegant formal shirt made from premium cotton. Suitable for office and events.",
    price: 599,
    imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop",
    category: "Shirt",
  },
  {
    id: "4",
    name: "Casual Check Shirt",
    description: "Trendy check pattern casual shirt. Versatile and comfortable for daily use.",
    price: 499,
    imageUrl: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop",
    category: "Shirt",
  },
  {
    id: "5",
    name: "Slim Fit Jeans",
    description: "Modern slim fit jeans with stretch fabric. Comfortable and stylish.",
    price: 799,
    imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
    category: "Jeans",
  },
  {
    id: "6",
    name: "Regular Fit Denim",
    description: "Classic regular fit denim jeans. Durable and perfect for all occasions.",
    price: 699,
    imageUrl: "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=400&h=400&fit=crop",
    category: "Jeans",
  },
];

let activeCategory = "All";
let searchQuery = "";

function getProducts() {
  const stored = localStorage.getItem("sdh_products");
  if (stored) return JSON.parse(stored);
  localStorage.setItem("sdh_products", JSON.stringify(DEFAULT_PRODUCTS));
  return DEFAULT_PRODUCTS;
}

function renderProducts() {
  const products = getProducts();
  const grid = document.getElementById("products-grid");

  const filtered = products.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch =
      searchQuery === "" ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-products" style="grid-column:1/-1">
        <p>Koi product nahi mila</p>
        <p style="font-size:0.85rem;margin-top:4px">Category ya search badal kar try karein</p>
      </div>`;
    return;
  }

  grid.innerHTML = filtered.map((p) => `
    <div class="product-card">
      <div class="card-img-wrap">
        <img src="${p.imageUrl}" alt="${p.name}"
          onerror="this.src='https://placehold.co/400x400/e8d5f5/6b21a8?text=No+Image'" />
        <span class="cat-badge">${p.category}</span>
      </div>
      <div class="card-body">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <div class="card-price">Rs. ${p.price.toLocaleString()}</div>
        <button class="order-btn" onclick="orderNow('${p.id}')">
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.845L.057 23.5l5.797-1.521A11.933 11.933 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.88 0-3.636-.513-5.148-1.407l-.369-.218-3.441.903.918-3.352-.241-.386A9.934 9.934 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>
          Order Now
        </button>
      </div>
    </div>
  `).join("");
}

function orderNow(productId) {
  const products = getProducts();
  const p = products.find((x) => x.id === productId);
  if (!p) return;
  const message = encodeURIComponent(
    `Assalam-o-Alaikum! Mujhe yeh product order karna hai:\n\n` +
    `*${p.name}*\n` +
    `Price: Rs. ${p.price}\n` +
    `Category: ${p.category}\n\n` +
    `Description: ${p.description}`
  );
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
}

// Category buttons
document.querySelectorAll(".cat-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".cat-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    activeCategory = btn.dataset.cat;
    renderProducts();
  });
});

// Search
document.getElementById("search-input").addEventListener("input", (e) => {
  searchQuery = e.target.value;
  renderProducts();
});

// Init
renderProducts();
