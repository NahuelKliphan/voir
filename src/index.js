const { ipcRenderer } = require('electron');
const view_product = require('./components/view_product/view_product');

window.onload = () => {
    goProductView();
}

function goProductView() {

    fetch('components/view_product/view_product.html').then((response) => {
        return response.text();
    }).then((html) => {
        document.getElementById('app').innerHTML = html;
        let product = {
            name: "el pepe",
            image: ""
        }
        view_product.showProduct(product)
    }).catch((err) => {
        console.log(err);
    });
}

function goProductScan() {


    let query = "select * from productos limit 1";

    ipcRenderer.send('base', query);

    ipcRenderer.once("response", (event, response) => {

        console.log("vuelve")

        if(response[0] == 'ok'){

            console.log(response[1]);

        }else{

            console.log(response[1]);

        }

    });

}
