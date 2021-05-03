const loadProducts = async () => {
  const products = await fetch(
    "http://localhost:3001/api/getproductinfo"
  ).then((products) => products.json());
  
  
  products.forEach((element) => {
    console.log(element);
    const table = document.querySelector('.product_table')
    const productsTr = document.createElement('tr');

    
    //adding image td ..........

    const td_image = document.createElement("td");
    const img = document.createElement("img");
    img.src = `images/${element.product_images_path[0]}`;
    img.height = '200'
    img.width = '200'
    td_image.appendChild(img);
    productsTr.appendChild(td_image);

    // adding name td...

    const td_name = document.createElement('td');
    td_name.innerHTML=element.product_name;
    productsTr.appendChild(td_name);

    // adding brand name

    const td_brand = document.createElement('td');
    td_brand.innerHTML = element.product_brand;
    productsTr.appendChild(td_brand);

    // adding gender ......

    const td_gender = document.createElement('td');
    td_gender.innerHTML = element.product_available_for[0];
    productsTr.appendChild(td_gender);
    
    
    
    
    table.appendChild(productsTr)
    // const productProperty = items
    // console.log(element.productProperty);
    // console.log(typeof(items))
  });
};
