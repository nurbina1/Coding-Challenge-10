// Function to generate a new product's HTML template dynamically
function createProductTemplate(name, price) {
    return `
        <div class="product-container">
            <h2 class="product-name">${name}</h2> <!-- Insert the dynamic product name -->
            <p class="product-price">$${price.toFixed(2)}</p> <!-- Insert the dynamic product price -->

            <!-- Dropdown for size selection -->
            <label for="size">Select Size:</label>
            <select class="size-selector">
                <option value="small">Small - In Stock</option>
                <option value="medium">Medium - In Stock</option>
                <option value="large">Large - Out of Stock</option>
                <option value="xl">Extra Large - In Stock</option>
            </select>

            <!-- Purchase button, initially disabled -->
            <button class="purchase-btn" disabled>Purchase</button>
        </div>
    `;
}

// Simulated product stock and pricing details for different sizes
const productDetails = {
    small: { price: 25.00, inStock: true },
    medium: { price: 30.00, inStock: true }, 
    large: { price: 35.00, inStock: false }, 
    xl: { price: 40.00, inStock: true }  
};

// Event listener for handling size changes and updating product details dynamically
document.getElementById('product-list').addEventListener('change', (event) => {
    // Check if the change event was triggered by the size dropdown (size-selector)
    if (event.target.classList.contains('size-selector')) {
        const productContainer = event.target.closest('.product-container');
        const selectedSize = event.target.value;
        const productPriceElement = productContainer.querySelector('.product-price'); 
        const purchaseButton = productContainer.querySelector('.purchase-btn'); 

        // Retrieve the product details for the selected size
        const product = productDetails[selectedSize];
        
        // Update the price display based on the selected size
        productPriceElement.textContent = `$${product.price.toFixed(2)}`;

        // Enable or disable the purchase button based on stock availability
        if (product.inStock) {
            purchaseButton.disabled = false;
            purchaseButton.textContent = "Purchase";
        } else {
            purchaseButton.disabled = true;
            purchaseButton.textContent = "Out of Stock";
        }
    }
});

// Event listener for handling purchases when the purchase button is clicked
document.getElementById('product-list').addEventListener('click', (event) => {
    // Check if the click event was triggered by the purchase button (purchase-btn)
    if (event.target.classList.contains('purchase-btn')) {
        const productContainer = event.target.closest('.product-container'); 
        const selectedSizeElement = productContainer.querySelector('.size-selector'); 
        const selectedSize = selectedSizeElement.value; 
        const productPriceElement = productContainer.querySelector('.product-price'); 

        // Display confirmation or error based on the availability of the selected size
        if (!event.target.disabled) {
            // If the product is in stock, show success message
            alert(`Success! You purchased the ${selectedSize} size for ${productPriceElement.textContent}.`);
        } else {
            // If the product is out of stock, show error message
            alert(`Sorry, the ${selectedSize} size is out of stock.`);
        }
    }
});

// Event listener to dynamically add new products to the page
document.getElementById('add-product-form').addEventListener('submit', (event) => {
    event.preventDefault(); 

    const newProductName = document.getElementById('new-product-name').value; 
    const newProductPrice = parseFloat(document.getElementById('new-product-price').value); 
    const productList = document.getElementById('product-list'); 

    // Create new product HTML using the template function
    const newProductHTML = createProductTemplate(newProductName, newProductPrice);

    // Insert the new product HTML into the product list
    productList.insertAdjacentHTML('beforeend', newProductHTML);

    // Reset the form fields after submission
    document.getElementById('new-product-name').value = '';
    document.getElementById('new-product-price').value = '';
});
