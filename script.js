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

const rangeInput = document.querySelectorAll(".range-input input"),
  priceInput = document.querySelectorAll(".price-input input"),
  range = document.querySelector(".slider .progress");
let priceGap = 1000;
priceInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minPrice = parseInt(priceInput[0].value),
      maxPrice = parseInt(priceInput[1].value);

    if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {
      if (e.target.className === "input-min") {
        rangeInput[0].value = minPrice;
        range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
      } else {
        rangeInput[1].value = maxPrice;
        range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
      }
    }
  });
});

rangeInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minVal = parseInt(rangeInput[0].value),
      maxVal = parseInt(rangeInput[1].value);
    if (maxVal - minVal < priceGap) {
      if (e.target.className === "range-min") {
        rangeInput[0].value = maxVal - priceGap;
      } else {
        rangeInput[1].value = minVal + priceGap;
      }
    } else {
      priceInput[0].value = minVal;
      priceInput[1].value = maxVal;
      range.style.left = (minVal / rangeInput[0].max) * 100 + "%";
      range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
    }
  });
});

const products = generateProducts();
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
  productsContainer.innerHTML = "";
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

function filterProducts() {
  return products
    .filter((product) => {
      if (filtersValues.color != null) {
        return product.color === filtersValues.color;
      }
      return product;
    })
    .filter((product) => {
      if (filtersValues.type != null) {
        return product.type === filtersValues.type;
      }
      return product;
    })
    .filter((product) => {
      if (filtersValues.size != null) {
        return product.size === filtersValues.size;
      }
      return product;
      // add price filter after feat/price-slider is finished
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

const filters = [productFilterColor, productFilterType, productFilterSize]; // add price filter after feat/price-slider is finished

filters.forEach((filter) => {
  renderFilterOptions(filter);
  const select = document.getElementById([filter.id]);
  console.log(select);
  select.onchange = (e) => {
    filtersValues[filter.id] = e.target.value;
    console.log(filtersValues.color);
    renderTable(filterProducts());
  };
});
