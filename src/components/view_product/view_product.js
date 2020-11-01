const showProduct = (product) => {

    let valueNombre = document.getElementById('valueNombre');
    let valuePrecio = document.getElementById('valuePrecio');
    let valueCategoria = document.getElementById('valueCategoria');
    let valueDescripcion = document.getElementById('valueDescripcion');
    let valueFoto = document.getElementById('valueFoto');

    valueNombre.innerHTML = product.nombre;
    valuePrecio.innerHTML = "$" + product.precio;
    valueCategoria.innerHTML = (product.categoria != null) ? product.categoria : "Sin Categoria";
    valueDescripcion.innerHTML = (product.descripcion != null) ? product.descripcion : "Sin Descripcion";
    valueFoto.src = (product.foto != null) ? product.foto : "./assets/images/product.png";
};

exports.showProduct = showProduct;