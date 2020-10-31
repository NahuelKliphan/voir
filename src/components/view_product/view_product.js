const showProduct = (product) => {

    document.getElementById('valueNombre').innerHTML = product.nombre;
    document.getElementById('valuePrecio').innerHTML = "$" + product.precio;
    document.getElementById('valueCategoria').innerHTML = product.categoria;
    document.getElementById('valueDescripcion').innerHTML = product.descripcion;
    document.getElementById('valueFoto').src = product.foto;

};

exports.showProduct = showProduct;