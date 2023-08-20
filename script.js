const productSort = {
  label: "Sortowanie",
  name: "sort",
  id: "sort",
  options: ["asc", "desc", "default"],
};

const productFilterColor = {
  label: "Kolor",
  name: "color-filter",
  id: "color",
  options: ["Czarny", "Biały", "Brązowy", "Czerwony"], // + All
};

const productFilterType = {
  label: "Typ ubrania",
  name: "type-filter",
  id: "type",
  options: ["Koszulka", "Spodnie", "Kurtka"], // + All
};

const productFilterSize = {
  label: "Rozmiar",
  name: "size-filter",
  id: "size",
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

/*
function filterProducts() {
  return products.filter((product) => {
    return (
      product.color === filtersValues.color &&
      product.type === filtersValues.type &&
      product.size === filtersValues.size // add price filter after feat/price-slider is finished
    );
  });
}
*/

function filterProducts() {
  return products
    .filter((product) => {
      if (filtersValues.color != null) {
        console.log("debugIF");
        return product.color === filtersValues.color;
      } else {
        console.log("debugELSE");
        return product;
      }
    })
    .filter((product) => {
      if (filtersValues.type != null) {
        console.log("debugIF2");
        return product.type === filtersValues.type;
      } else {
        console.log("debugELSE2");
        return product;
      }
    })
    .filter((product) => {
      if (filtersValues.size != null) {
        console.log("debugIF3");
        return (
          product.size === filtersValues.size // add price filter after feat/price-slider is finished
        );
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
    filterOption.onclick = function onClickFilter() {
      const productsContainer = document.querySelector(".products-container");
      function clearProducts(productsContainer) {
        while (productsContainer.firstChild) {
          productsContainer.removeChild(productsContainer.firstChild);
        }
      }
      clearProducts(productsContainer);
      filtersValues[filterName.id] = filterOption.textContent;
      renderTable(filterProducts());
    };
    filterOption.text = option;
    filterSelect.add(filterOption);
  });
  filterContainer.appendChild(filterLabel);
  filterContainer.appendChild(filterSelect);
}

renderFilterOptions(productFilterColor);
renderFilterOptions(productFilterType);
renderFilterOptions(productFilterSize);
