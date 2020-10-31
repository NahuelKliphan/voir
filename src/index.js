const view_product = require('./components/view_product/view_product');
const scan_product = require('./components/scan_product/scan_product');

window.onload = () => {
    goProductScan();
}

const goProductView = (unProducto) => {

    fetch('components/view_product/view_product.html').then((response) => {
        return response.text();
    }).then((html) => {
        document.getElementById('app').innerHTML = html;
        view_product.showProduct(unProducto);
    }).catch((err) => {
        console.log(err);
    });
}

const goProductScan = () => {

    fetch('components/scan_product/scan_product.html').then((response) => {
        return response.text();
    }).then((html) => {
        document.getElementById('app').innerHTML = html;
        //scan_product.scanProduct();
    }).catch((err) => {
        console.log(err);
    });
}