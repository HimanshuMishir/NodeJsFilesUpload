const loadProducts = async () => {
  const products = await fetch("/api/getproductinfo").then((products) =>
    products.json()
  );

  products.forEach((element, index) => {
    console.log(element);
    const table = document.querySelector(".product_table");
    const productsTr = document.createElement("tr");

    //adding image td ..........

    const td_image = document.createElement("td");
    const img = document.createElement("img");
    img.src = `images/${element.product_images_path[0]}`;
    img.height = "200";
    img.width = "200";
    td_image.appendChild(img);
    productsTr.appendChild(td_image);

    // adding name td...

    const td_name = document.createElement("td");
    td_name.innerHTML = element.product_name;
    productsTr.appendChild(td_name);

    // adding brand name

    const td_brand = document.createElement("td");
    td_brand.innerHTML = element.product_brand;
    productsTr.appendChild(td_brand);

    // adding price

    const price = document.createElement('td');
    const price_of_product = element.product_specific.product[0].price;
    console.log(price_of_product)
    price.innerHTML = `₹ ${price_of_product}`;
    productsTr.appendChild(price);

    //adding color

    const product_color = document.createElement('td');
    product_color.innerHTML = `${element.product_specific.product[0].color}`
    productsTr.appendChild(product_color)

    //adding sizes

    const product_size = document.createElement('td');
    const sizesString = element.product_specific.product_sizes.toString();
    product_size.innerHTML = sizesString;
    productsTr.appendChild(product_size);

    // adding gender ......

    const td_gender = document.createElement("td");
    td_gender.innerHTML = element.product_available_for[0];
    productsTr.appendChild(td_gender);

    //adding number of stocks

    const num_of_stocks = document.createElement('td');
    num_of_stocks.innerHTML = element.product_specific.product[0].stocks;
    productsTr.appendChild(num_of_stocks);

    //adding edit button for each

    const buttonTd = document.createElement('td')
    const editbutton = document.createElement('button');
    const inputButtonForProductId = document.createElement('input');
    inputButtonForProductId.type = 'hidden';
    inputButtonForProductId.value = element._id;
    editbutton.innerHTML = 'edit';
    editbutton.className = 'editButton';
    buttonTd.appendChild(editbutton);
    buttonTd.appendChild(inputButtonForProductId);
    productsTr.appendChild(buttonTd);

    table.appendChild(productsTr);
   
  });
};
