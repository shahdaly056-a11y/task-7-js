const prices = {
    espresso: 45,
    latte: 65,
    croissant: 40
};

const orderForm = document.getElementById("orderForm");

 const orders = document.getElementById("orders");

const products = document.getElementById("product");

orderForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const product = document.getElementById("product").value;
    const quantity = Number(document.getElementById("quantity").value);

    let hasError = false;

    document.getElementById("nameError").textContent = "";
    document.getElementById("phoneError").textContent = "";
    document.getElementById("productError").textContent = "";
    document.getElementById("quantityError").textContent = "";

    if (name.length < 3) {
        document.getElementById("nameError").textContent =
            "Name must be at least 3 characters";

        hasError = true;
    }

    if(name === ''){
            document.getElementById("nameError").textContent =
            "Name is required";

    }

    const phoneRegex = /^01\d{9}$/;

    if (!phoneRegex.test(phone)) {
        document.getElementById("phoneError").textContent =
            "Phone must be 11 digits and start with 01";

        hasError = true;
    }

    if (product === "") {
        document.getElementById("productError").textContent =
            "Please choose a product";

        hasError = true;
    }

    if (
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > 10
    ) {
        document.getElementById("quantityError").textContent =
            "Quantity must be from 1 to 10";

        hasError = true;
    }

    if (hasError) {
        return;
    }

    const price = prices[product];

    let total = price * quantity;

    let discount = 0;

    if (quantity >= 3) {
        discount = total * 0.10;
    }

    total = total - discount;

    let delivery = "Paid delivery";

    if (total > 200) {
        delivery = "Free delivery";
    }

    const productName = {
        espresso: "Espresso",
        latte: "Latte",
        croissant: "Croissant"
    };

    const order = document.createElement("div");

    order.className = "order";

    order.innerHTML = `
        <h2>Order Details</h2>

        <p>Name: ${name}</p>

        <p>Phone: ${phone}</p>

        <p>Product: ${productName[product]} × ${quantity}</p>

        <p>Price: ${price} EGP</p>

        <p>Discount: ${discount.toFixed(2)} EGP</p>

        <p>Total: ${total.toFixed(2)} EGP</p>

        <p>${delivery}</p>
    `;

    orders.appendChild(order);

    orderForm.reset();

});