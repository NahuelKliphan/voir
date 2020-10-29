const view_product = require('./components/view_product/view_product');

window.onload = () => {
    goProductView();
}

function goProductView() {

    fetch('components/view_product/view_product.html').then(function (response) {
        return response.text();
    }).then(function (html) {
        document.getElementById('app').innerHTML = html;
        let product = {
            name: "el pepe"
        }
        view_product.showProduct(product)
    }).catch(function (err) {
        console.log(err);
    });
}

function goProductScan() {


    fetch('components/scan_product/scan_product.html').then(function (response) {
        return response.text();
    }).then(function (html) {
        document.getElementById('app').innerHTML = html;
        // view_product.constructor("el pepe")
    }).catch(function (err) {
        console.log(err);
    });

}
