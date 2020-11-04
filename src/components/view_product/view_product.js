const { currencyFormat } = require('../../js/currencyFormat');

const showProduct = (product) => {

    let valueNombre = document.getElementById('valueNombre');
    let valuePrecio = document.getElementById('valuePrecio');
    let valueCategoria = document.getElementById('valueCategoria');
    let valueDescripcion = document.getElementById('valueDescripcion');
    let valueFoto = document.getElementById('valueFoto');
    valueFoto.style.maxHeight = `${window.innerHeight-150}px`;

    valueNombre.innerHTML = product.nombre;
    valuePrecio.innerHTML = `$${currencyFormat(product.precio)}`;
    valueCategoria.innerHTML = (product.categoria != null) ? product.categoria : "Sin Categoria";
    valueDescripcion.innerHTML = (product.descripcion != null) ? product.descripcion : "Sin Descripción";
    valueFoto.src = (product.foto != null) ? product.foto : "./assets/images/product.png";
};

exports.showProduct = showProduct;