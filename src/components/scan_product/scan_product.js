const { ipcRenderer } = require('electron');
var aProduct = {};

const scanProduct = () => {

    loadScreen(true);
    let codigo = document.getElementById("inputCodigoSearch").value;

    let query = `select id as id,
    codigo as codigo, 
    nombre as nombre, 
    trunc(precio_venta,2) as precio,
    descripcion as descripcion, 
    (select nombre from categorias cat where cat.id = p.id_categoria) as categoria, 
    foto as foto
    from productos p 
    where p.codigo = '${codigo}';`;

    ipcRenderer.send('base', query);
    ipcRenderer.once("response", (event, response) => {
        if (response[0] == 'ok') {
            aProduct = response[1][0];
            if (aProduct) {
                document.getElementById("inputCodigoSearch").value = "";
                document.getElementById("btnPowerOff").classList.add("hidden");
                document.getElementById("btnBackHome").classList.remove("hidden");
                goProductView(aProduct);
            }
        } else {
            console.log(response[1]);
        }
        loadScreen(false);
    });

}

const searchProduct = () => {

    let codigo = document.getElementById("inputCodigoSearch").value;
    if (codigo.length == 13) {
        scanProduct();
    }
}

exports.scanProduct = scanProduct;
exports.searchProduct = searchProduct;
exports.aProduct = aProduct;