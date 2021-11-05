export function barcodeGen(n) {
    var add = 1, max = 12 - add;   // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.   

    if ( n > max ) {
            return barcodeGen(max) + barcodeGen(n - max);
    }

    max        = Math.pow(10, n+add);
    var min    = max/10; // Math.pow(10, n) basically
    var number = Math.floor( Math.random() * (max - min + 1) ) + min;

    return ("" + number).substring(add); 
}

export const urlPath = `http://192.168.100.116:3500`
//export const urlPath = `http://localhost:3500`
//export const urlPath = `https://a728-70-123-6-94.ngrok.io`
