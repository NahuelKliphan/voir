const showProduct = (product) => {

    document.getElementById('valueId').value = product.id;
    document.getElementById('valueCodigo').value = product.codigo;
    document.getElementById('valueNombre').value = product.nombre;
    document.getElementById('valuePrecio').value = product.precio;
    document.getElementById('valueCategoria').value = product.categoria;
    document.getElementById('valueDescripcion').value = product.descripcion;
    document.getElementById('valueFoto').src = product.foto;

};

exports.showProduct = showProduct;