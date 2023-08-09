let itemList = [];
const itemColor = ["black", "white", "brown", "red"];
const itemType = ["t-shirt", "trousers", "jacket"];
const itemSize = ["L", "M", "S"];

for (i = 0; i < 100; ++i) {
  itemList["item" + i] =
    {
      color: itemColor[Math.floor(Math.random() * itemColor.length)],
      type: itemType[Math.floor(Math.random() * itemType.length)],
      size: itemSize[Math.floor(Math.random() * itemSize.length)],
      price: Math.floor(Math.random() * (200 - 25) + 25)
    };
}
