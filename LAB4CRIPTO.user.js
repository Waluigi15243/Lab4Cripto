// ==UserScript==
// @name         LAB4CRIPTO
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js#sha256-xoJklEMhY9dP0n54rQEaE9VeRnBEHNSfyfHlKkr9KNk=
// @match        https://cripto.tiiny.site/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=udp.cl
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Función para identificar letras mayúsculas en una cadena de texto
    var key = "";
    function encontrarLetrasMayusculas() {
        const textoWeb = document.body.innerText;
        key = textoWeb.match(/[A-Z]/g).join('');
        console.log('La llave de descifrado es: ' + key);
    }
    // Función para contar palabras encriptadas
    const palabras = [];
    function cipheredWordsCount() {
        const codigoPagina = document.body.innerHTML;
        const palabrasEnComillasConIgual = codigoPagina.split('"');
        palabrasEnComillasConIgual.forEach(word => {
            if (word.endsWith("=") && word.length == 12) {
                palabras.push(word);
            }
        });

        if (palabrasEnComillasConIgual) {
            console.log(`Los mensajes cifrados son: ${palabras.length}`);
        } else {
            console.log('No se encontraron mensajes cifrados.');
        }
    }
    // Función para descifrar las palabras encontradas
    const descifrados = [];
    function descipherWords() {
        var cryptkey = CryptoJS.enc.Utf8.parse(key);
        palabras.forEach(word => {
            var decrypt = CryptoJS.TripleDES.decrypt(word, cryptkey, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7,
            });
            var temp = decrypt.toString(CryptoJS.enc.Utf8);
            descifrados.push(temp);
        });
        var num = 0;
        descifrados.forEach(result => {
            console.log(palabras[num] + " " + result + "\n");
            num += 1;
        });
    }
    // Función para agregar palabras en una página web
    function agregarPalabras() {
        var impresion = document.createElement('div');
        var temp2 = "";
        for (var i=0; i<descifrados.length; i++){
            temp2 += descifrados[i] + " <br> ";
        }
        impresion.innerHTML = temp2;
        document.body.appendChild(impresion);
    }

    // Escuchar cuando la página esté completamente cargada
    encontrarLetrasMayusculas();
    cipheredWordsCount();
    descipherWords();
    agregarPalabras();

})();