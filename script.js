const products = generateProducts();
renderTable(products);

function generateProducts() {
  const products = [];
  const productColor = ["Black", "White", "Brown", "Red"];
  const productType = ["T-shirt", "Trousers", "Jacket"];
  const productSize = ["L", "M", "S"];
  for (let i = 0; i < 100; ++i) {
    products.push({
      color: productColor[Math.floor(Math.random() * productColor.length)],
      type: productType[Math.floor(Math.random() * productType.length)],
      size: productSize[Math.floor(Math.random() * productSize.length)],
      price: Math.floor(Math.random() * (200 - 25) + 25),
    });
  }
  return products;
}

function renderTable(products) {
  const productsContainer = document.querySelector(".products-container");
  products.forEach((product) => {
    console.log(product);
    const productContent = document.createElement("div");
    const productText = document.createTextNode(
      `${product.color} ${product.type} ${product.size} ${product.price}`
    );
    productContent.appendChild(productText);
    productsContainer.appendChild(productContent);
  });
}
