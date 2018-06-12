"use strict";

/**
 * Kunai Com Corrente
 * 
 * chain.js goes into the site, then it can load the scripts from the kunais's site folder;
 */

// Setting the field for the injection;
var hostName = window.location.hostname,
    myHostName = "programming.firstmatter.com.br/kunai-com-corrente/kunais",
    ajax = new XMLHttpRequest(),
    kunaisToThrow = [];

// Read the kunai.json file from the kunais/*hostName*/ folder... 
ajax.open("GET", "//" + myHostName + "/" + hostName + "/kunai.json", true);
ajax.send();
ajax.onreadystatechange = function () {
    if (ajax.readyState == 4 && ajax.status == 200) {
        let data = JSON.parse(ajax.responseText);

        for (let i = 0; i < data.files.length; i++) {
            kunaisToThrow.push(data.files[i]);
        }

        // Throw the Kunai;
        throwKunai(kunaisToThrow);
    } else if (ajax.status == 404) {
        console.error("Could not retrive the JSON file from this source: " + myHostName + "/" + hostName + "/kunai.json");
    }
}

// Insert the kunais into the HEAD element of the site, it works with an array of kunais or a single kunai;
function throwKunai(kunais) {
    if (Array.isArray(kunais)) {
        for (let i = 0; i < kunais.length; i++) {
            let thisKunai = document.createElement('script');
            thisKunai.setAttribute('src', '//' + myHostName + '/' + hostName + '/js/' + kunais[i] + '.js');
            document.head.appendChild(thisKunai);
        }
    } else {
        let thisKunai = document.createElement('script');
        thisKunai.setAttribute('src', '//' + myHostName + '/' + hostName + '/js/' + kunais + '.js');
        document.head.appendChild(thisKunai);
    }
}