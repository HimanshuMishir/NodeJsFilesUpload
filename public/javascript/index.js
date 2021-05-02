const loadProducts = async ()=>{

    const products = await fetch('http://localhost:3001/api/getproductinfo').then(products=> products.json())
    console.log(products)

};