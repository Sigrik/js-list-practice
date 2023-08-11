let products = [];
const productColor = ["black", "white", "brown", "red"];
const productType = ["t-shirt", "trousers", "jacket"];
const productSize = ["L", "M", "S"];

for (let i = 0; i < 100; ++i) {
  products.push({
      color: productColor[Math.floor(Math.random() * productColor.length)],
      type: productType[Math.floor(Math.random() * productType.length)],
      size: productSize[Math.floor(Math.random() * productSize.length)],
      price: Math.floor(Math.random() * (200 - 25) + 25)
    });
}

