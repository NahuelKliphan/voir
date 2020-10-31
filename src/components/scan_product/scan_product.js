const { ipcRenderer } = require('electron');
var unProducto = {};

const scanProduct = () => {

    //let codigo = document.getElementById("inputCodigoSearch").value;

    let codigo = "7795513052396";

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
            unProducto = response[1][0];
            if (unProducto) {
                goProductView(unProducto);
            }
        } else {
            console.log(response[1]);
        }
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
exports.unProducto = unProducto;