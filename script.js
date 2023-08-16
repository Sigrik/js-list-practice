const productSort = {
  label: "Sortowanie",
  name: "sort",
  id: "sort",
  options: ["asc", "desc", "default"],
};

const productFilterColor = {
  label: "Kolor",
  name: "color-filter",
  id: "color-filter",
  options: ["Czarny", "Biały", "Brązowy", "Czerwony"], // + All
};

const productFilterType = {
  label: "Typ ubrania",
  name: "type-filter",
  id: "type-filter",
  options: ["Koszulka", "Spodnie", "Kurtka"], // + All
};

const productFilterSize = {
  label: "Rozmiar",
  name: "size-filter",
  id: "size-filter",
  options: ["L", "M", "S"], // + All
};

const products = generateProducts();
//const products = filterProducts("color", "other");
renderTable(products);

function generateProducts() {
  const products = [];
  for (let i = 0; i < 100; ++i) {
    products.push({
      color: productFilterColor.options[Math.floor(Math.random() * productFilterColor.options.length)],
      type: productFilterType.options[Math.floor(Math.random() * productFilterType.options.length)],
      size: productFilterSize.options[Math.floor(Math.random() * productFilterSize.options.length)],
      price: Math.floor(Math.random() * (200 - 25) + 25),
    });
  }
  return products;
}

function renderTable(products) {
  const productsContainer = document.querySelector(".products-container");
  products.forEach((product) => {
    const productContent = document.createElement("div");
    const productText = document.createTextNode(
      `${product.color} ${product.type} ${product.size} ${product.price} zł`
    );
    productContent.appendChild(productText);
    productsContainer.appendChild(productContent);
  });
}

const filtersValues = {
  color: null,
  type: null,
  size: null,
  price: null,
};

function filterProducts(productAttribute, attributeValue) {
  const products = generateProducts();
  const attribute = productAttribute;
  const value = attributeValue;
  return products.filter((product) => {
    switch ((attribute, value)) {
      case ("color", "black"):
        return product.color === "Czarny";
        break;
      case ("color", "white"):
        return product.color === "Biały";
        break;
      case ("color", "other"):
        return product.color !== "Czarny" && product.color !== "Biały";
        break;
      case ("color", "all"):
        return product.color;
        break;
      case ("type", "t-shirt"):
        return product.type === "Koszulka";
        break;
      case ("type", "trousers"):
        return product.type === "Spodnie";
        break;
      case ("type", "jacket"):
        return product.type === "Kurtka";
        break;
      case ("size", "L"):
        return product.type === "L";
        break;
      case ("size", "M"):
        return product.type === "M";
        break;
      case ("size", "S"):
        return product.type === "S";
        break;
    }
  });
}

function renderFilterOptions(filterName) {
  const filterContainer = document.querySelector(".filter-container");
  const filterSelect = document.createElement("select");
  const filterLabel = document.createElement("label");
  filterSelect.setAttribute("name", `${filterName.name}`);
  filterSelect.setAttribute("id", `${filterName.id}`);
  filterLabel.setAttribute("for", `${filterName.name}`);
  filterLabel.innerHTML = filterName.label;
  filterName.options.forEach((option) => {
    const filterOption = document.createElement("option");
    filterOption.text = option;
    filterSelect.add(filterOption);
  });
  filterContainer.appendChild(filterLabel);
  filterContainer.appendChild(filterSelect);
}

renderFilterOptions(productFilterColor);
renderFilterOptions(productFilterType);
renderFilterOptions(productFilterSize);
