/*APP ROOT*/
const app = document.getElementById("app");

/*HEADER*/
const header = document.createElement("header");
header.className = "header";

const logo = document.createElement("h1");
logo.textContent = "Store";

const searchInput = document.createElement("input");
searchInput.className = "search-box";
searchInput.placeholder = "Search products...";



header.append(logo, searchInput);
app.appendChild(header);

/*PRODUCT SECTION*/
const productsSection = document.createElement("section");
productsSection.className = "products";
app.appendChild(productsSection);

/*CART SECTION*/
const cartBox = document.createElement("div");
cartBox.className = "cart-box";
app.appendChild(cartBox);

/*DATA*/
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 2499,
    image: "https://m.media-amazon.com/images/I/61CGHv6kmWL._SL1500_.jpg"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 3999,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDuNds2aqtvtZi95-SA0iobHRiT7w8qJfu6g&s"
  },
  {
    id: 3,
    name: "Laptops",
    price: 50000,
    image: "https://m.media-amazon.com/images/I/71TPda7cwUL._SL1500_.jpg"
  },
  {
    id: 4,
    name: "Keyboards",
    price: 500,
    image: "https://images-cdn.ubuy.co.in/6937d434f15a63ade90e413f-snpurdiri-60-wired-gaming-keyboard-rgb.jpg"
  },
  {
    id: 5,
    name: "Mouse",
    price: 450,
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTW9BH4R6HXop_3I5h_5z2Sel_h8xCHwmC86IjRTdxPh0eYUZRCEqNyIUoVCy8aWYXVKhl7xX5Ng3iQTrc0kWDv_Jj7PUIPlph_caY5bsoAZgRE7EdA53999Q"
  }
];

let cart = [];

/*RENDER PRODUCTS*/
function renderProducts(list) {
  productsSection.innerHTML = "";

  list.forEach(product => {
    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = product.image;

    const title = document.createElement("h3");
    title.textContent = product.name;

    const price = document.createElement("p");
    price.textContent = `₹${product.price}`;

    const btn = document.createElement("button");
    btn.textContent = "Add to Cart";
    btn.onclick = () => addToCart(product);

    card.append(img, title, price, btn);
    productsSection.appendChild(card);
  });
}

/*ADD TO CART*/
function addToCart(product) {
  const item = cart.find(i => i.id === product.id);

  if (item) {
    item.qty = item.qty + 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCart();
}

/*CALCULATE TOTAL*/
function calculateTotal() {
  let totalItems = 0;
  let totalPrice = 0;

  cart.forEach(item => {
    totalItems = totalItems + item.qty;
    totalPrice = totalPrice + (item.price * item.qty);
  });

  return { totalItems, totalPrice };
}

/*UPDATE CART UI*/
function updateCart() {
  cartBox.innerHTML = "<h2>Your Cart</h2>";

  cart.forEach(item => {
    const row = document.createElement("div");
    row.className = "cart-item";

    if (item.price > 1000) {
  row.classList.add("expensive");   //  expensive
} else if (item.price < 1000) {
  row.classList.add("affordable");  //  affordable
}


    const img = document.createElement("img");
    img.src = item.image;

    const details = document.createElement("div");
    details.className = "cart-details";

    const name = document.createElement("div");
    name.textContent = item.name;

    const price = document.createElement("div");
    price.textContent = `₹${item.price}`;

    details.append(name, price);

    const controls = document.createElement("div");
    controls.className = "cart-controls";

    const minus = document.createElement("button");
    minus.textContent = "-";
    minus.className = "qty-btn";
    minus.onclick = () => changeQty(item.id, -1);

    const qty = document.createElement("span");
    qty.textContent = item.qty;

    const plus = document.createElement("button");
    plus.textContent = "+";
    plus.className = "qty-btn";
    plus.onclick = () => changeQty(item.id, 1);

    controls.append(minus, qty, plus);

    const subtotal = document.createElement("div");
    subtotal.className = "subtotal";
    subtotal.textContent = `₹${item.price * item.qty}`;

    row.append(img, details, controls, subtotal);
    cartBox.appendChild(row);
  });

  const totals = calculateTotal();

  const summary = document.createElement("h3");
  summary.textContent = `Items: ${totals.totalItems} | Total: ₹${totals.totalPrice}`;

  cartBox.appendChild(summary);
  cartBtn.textContent = `🛒 Cart (${totals.totalItems})`;
}

/*CHANGE QTY*/
function changeQty(id, change) {
  const item = cart.find(i => i.id === id);
  item.qty = item.qty + change;

  if (item.qty === 0) {
    cart = cart.filter(i => i.id !== id);
  }

  updateCart();
}


/*SEARCH FUNCTIONALITY*/
searchInput.oninput = function () {
    const searchValue = searchInput.value.toLowerCase();

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchValue)
    );

    renderProducts(filteredProducts);
};


/*INIT*/
renderProducts(products);
updateCart();
