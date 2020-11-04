const replaceAll = (string, search, replace) => {
    return string.split(search).join(replace);
}

const currencyFormat = (value) => {
    value = Number(value);
    if (!Number.isInteger(value)) {
        value = value.toFixed(2);
    }
    var aux = value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    var partes = aux.split(".");
    var ret = replaceAll(partes[0], ',', '.') + ",";
    if (partes[1] != undefined) {
        ret += partes[1];
    } else {
        ret += "00";
    }
    return ret;
}

exports.currencyFormat = currencyFormat;