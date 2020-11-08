const { currencyFormat } = require('../../js/currencyFormat');

const showProduct = (product) => {

    let valueNombre = document.getElementById('valueNombre');
    let valuePrecio = document.getElementById('valuePrecio');
    let valueCategoria = document.getElementById('valueCategoria');
    let valueFoto = document.getElementById('valueFoto');
    valueFoto.style.maxHeight = `${window.innerHeight-150}px`;

    valueNombre.innerHTML = product.nombre;
    valuePrecio.innerHTML = `$${currencyFormat(product.precio)}`;
    valueCategoria.innerHTML = (product.categoria != null) ? product.categoria : "Sin Categoria";
    valueFoto.src = (product.foto != null) ? product.foto : "./assets/images/product.png";
};

exports.showProduct = showProduct;