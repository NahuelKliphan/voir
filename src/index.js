const view_product = require('./components/view_product/view_product');
const scan_product = require('./components/scan_product/scan_product');
const { ipcRenderer } = require('electron');

var timeWaitView = 10000;
var instanceSetTimeOut;

window.onload = () => {
    getSettings();
    goProductScan();
}

const goProductView = (aProduct) => {

    fetch('components/view_product/view_product.html').then((response) => {
        return response.text();
    }).then((html) => {
        document.getElementById('app').innerHTML = html;
        view_product.showProduct(aProduct);
        document.getElementById('inputCodigoSearch').focus();
        clearTimeout(instanceSetTimeOut);
        instanceSetTimeOut = setTimeout(() => {
            goProductScan();
        }, timeWaitView)

    }).catch((err) => {
        console.log(err);
    });
}

const goProductScan = () => {

    fetch('components/scan_product/scan_product.html').then((response) => {
        return response.text();
    }).then((html) => {
        document.getElementById('app').innerHTML = html;
        clearTimeout(instanceSetTimeOut);
        document.getElementById('inputCodigoSearch').focus();
        document.getElementById("btnPowerOff").classList.remove("hidden");
        document.getElementById("btnBackHome").classList.add("hidden");
    }).catch((err) => {
        console.log(err);
    });
}

const loadScreen = (load) => {
    let loader = document.getElementById("loader");
    let app = document.getElementById("app");
    if (load) {
        loader.style.display = "block";
        app.style.display = "none";
    } else {
        loader.style.display = "none";
        app.style.display = "block";
    }
    setTimeout(() => {
        loader.style.display = "none";
        app.style.display = "block";
    }, 10000)
}

const getSettings = () => {

    let query = `select valor as valor
    from variables v 
    where v.nombre = 'Cantidad de segundos para ver producto';`;
    ipcRenderer.send('base', query);
    ipcRenderer.once("response", (event, response) => {
        if (response[0] == 'ok') {
            timeWaitView = Number(response[1][0].valor) * 1000;
        } else {
            console.log(response[1]);
        }
    });
}

const exitApp = () => {
    ipcRenderer.send('exit');
}
