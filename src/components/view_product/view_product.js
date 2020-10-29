const showProduct = (product) => {

    document.getElementById('divName').innerHTML = product.name;

    console.log(product.image)

    if(product.image != ""){
        document.getElementById('divImage').src = product.image;
    }

    

    

};

exports.showProduct = showProduct;