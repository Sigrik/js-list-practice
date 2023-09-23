let cachedProducts = [];

const getProducts = async () => {
  if (cachedProducts.length > 0) {
    return cachedProducts;
  }
  const response = await fetch("https://fakestoreapi.com/products");
  const responseJSON = await response.json();
  cachedProducts = responseJSON;
  return responseJSON;
};

const productSort = {
  label: "Sortowanie",
  name: "sort",
  id: "sort",
  options: ["priceAsc", "priceDesc", "rating", "ratingCount", "default"],
};

const productFilterCategory = {
  label: "Category",
  name: "category-filter",
  id: "category",
  options: ["men's clothing", "jewelery", "electronics", "women's clothing"], // + All
};

const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");
let searchValue = null;

searchInput.addEventListener("input", (e) => {
  let inputValue = e.target.value;
  if (inputValue && inputValue.trim().length > 0) {
    inputValue = inputValue.trim().toLowerCase();
    searchValue = inputValue;
    renderTableSearch();
    return searchValue;
  } else {
    renderTableWithProducts();
  }
});

const renderTableSearch = async () => {
  let products = await getProducts();
  if (
    products.filter((product) => {
      return product.title.toLowerCase().includes(searchValue);
    }).length === 0
  ) {
    console.log("We're sorry, no products match the given query"); //style it later & use elsewhere
  } else {
    renderTable(
      products.filter((product) => {
        return product.title.toLowerCase().includes(searchValue);
      })
    );
  }
};

const rangeInput = document.querySelectorAll(".range-input input"),
  priceInput = document.querySelectorAll(".price-input input"),
  range = document.querySelector(".slider .progress");
let priceGap = 15;
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

const ratingToStars = (rating) => {
  rating = Math.round(rating * 2) / 2;
  let output = [];
  for (var i = rating; i >= 1; i--)
    output.push(
      '<img src = "./svg/star-full.svg" alt="Full Star" class="star rating-star-full" aria-hidden="true"></img>&nbsp;'
    );
  if (i == 0.5)
    output.push(
      '<img src = "./svg/star-half.svg" alt="Half Star" class="star rating-star-half" aria-hidden="true"></img>&nbsp;'
    );
  for (let i = 5 - rating; i >= 1; i--)
    output.push(
      '<img src = "./svg/star-empty.svg" alt="Empty Star" class="star rating-star-empty" aria-hidden="true"></img>&nbsp;'
    );
  return output.join("");
};

const renderTable = async (products) => {
  if (!products) {
    // show loader
    console.log("loader");
    return;
  }
  const productsContainer = document.querySelector(".products-container");
  productsContainer.innerHTML = "";
  products.forEach((product) => {
    const productContent = document.createElement("div");
    productContent.classList.add("product");
    const productTitle = document.createElement("div");
    productTitle.classList.add("product-title");
    productTitle.innerHTML = `${product.title}`;
    const productImage = document.createElement("div");
    productImage.classList.add("product-image");
    productImage.style.backgroundImage = `url(${product.image})`;
    const productPrice = document.createElement("div");
    productPrice.classList.add("product-price");
    productPrice.innerHTML = `${product.price} zł`;
    const productRating = document.createElement("div");
    productRating.classList.add("product-rating");
    productRating.innerHTML =
      ratingToStars(product.rating.rate) +
      `from ${product.rating.count} ratings`;
    productContent.appendChild(productImage);
    productContent.appendChild(productTitle);
    productContent.appendChild(productPrice);
    productContent.appendChild(productRating);
    productsContainer.appendChild(productContent);
  });
};

const renderTableWithProducts = async () => {
  const products = await getProducts();
  renderTable(products);
};

const renderTableWithFilteredProducts = async () => {
  const filteredProducts = await filterProducts();
  renderTable(filteredProducts);
};

renderTableWithProducts();

const filtersValues = {
  category: null,
  priceMin: null,
  priceMax: null,
};

const filterProducts = async () => {
  const products = await getProducts();
  return products
    .filter((product) => {
      if (filtersValues.category != null) {
        return product.category === filtersValues.category;
      }
      return product;
    })
    .filter((product) => {
      if (filtersValues.size != null) {
        return product.size === filtersValues.size;
      }
      return product; // add price filter after feat/price-slider is finished
    });
};

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

const filters = [productFilterCategory]; // add price filter after feat/price-slider is finished

filters.forEach((filter) => {
  renderFilterOptions(filter);
  const select = document.getElementById([filter.id]);
  select.onchange = (e) => {
    filtersValues[filter.id] = e.target.value;
    renderTableWithFilteredProducts();
  };
});
