const products = filterProducts("color", "white");
renderTable(products);

function generateProducts() {
  const products = [];
  const productColor = ["Black", "White", "Brown", "Red"];
  const productType = ["Koszulka", "Spodnie", "Kurtka"];
  const productSize = ["L", "M", "S"];
  for (let i = 0; i < 100; ++i) {
    products.push({
      color: productColor[Math.floor(Math.random() * productColor.length)],
      type: productType[Math.floor(Math.random() * productType.length)],
      size: productSize[Math.floor(Math.random() * productSize.length)],
      price: Math.floor(Math.random() * (200 - 25) + 25),
    });
  }
  return products
}

function renderTable(products) {
  const productsContainer = document.querySelector(".products-container");
  products.forEach((product) => {
    console.log(product);
    const productContent = document.createElement("div");
    const productText = document.createTextNode(
      `${product.color} ${product.type} ${product.size} ${product.price} zł`
    );
    productContent.appendChild(productText);
    productsContainer.appendChild(productContent);
  });
}

function filterProducts(productAttribute, attributeValue) {
  const products = generateProducts();
  const attribute = productAttribute;
  const value = attributeValue;
  return products.filter((product) => {
    switch (attribute, value) {
      case "color", "black":
        return product.color === "Black";
        break;
      case "color", "white":
        return product.color === "White";
        break;
      case "color", "other":
        return product.color !== "Black" || "White"; // not working as intended, needs fixing
        break;
      case "color", "all":
        return product.color;
        break;
      case "type", "t-shirt":
        return product.type === "Koszulka";
        break;
      case "type", "trousers":
        return product.type === "Spodnie";
        break;
      case "type", "jacket":
        return product.type === "Kurtka";
        break;
      case "size", "L":
        return product.type === "L";
        break;
      case "size", "M":
        return product.type === "M";
        break;
      case "size", "S":
        return product.type === "S";
        break;
    }
  });
}