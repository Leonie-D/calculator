const affichage = document.getElementById('resultat');
const btnOnOff = document.querySelector('.on-off');
const btnNumbers = document.querySelectorAll('.number');
// connaître l'état de la calculatrice
let status = (btnOnOff.innerHTML === 'OFF');
// retenir le calcul en cours
let current = 0;
let resultat = 0;
let operation = 'N';
let newNb = true;
// retenir en mémoire de la calculatrice
let memoire = 0;

// allumer ou éteindre la calculatrice
btnOnOff.addEventListener('click', function(){
    if (btnOnOff.innerHTML === 'ON') {
        // adapter l'interrupteur
        btnOnOff.innerHTML = 'OFF';
        // initialiser l'écran
        affichage.innerHTML = 0;
    } else {
        // adapter l'interrupteur
        btnOnOff.innerHTML = 'ON';
        // éteindre l'écran
        affichage.innerHTML = '';
        // réinitialiser toutes les variables
        current = 0;
        resultat = 0;
        memoire = 0;
        operation = 'N';
        newNb = false;
    };
    // variable pour connaître l'état allumée ou éteinte
    status = !status;
});

// utiliser les touches 'nombres'
for (let btnNumber of btnNumbers) {
    btnNumber.addEventListener('click', function() {
        // si nouveau nombre, réinitialiser l'affichage
        if (newNb) {
            affichage.innerHTML = '';
            newNb = !newNb;
        };

        // si nouvelle opération, oublier le résultat précédent
        if (operation === 'T') {
            current = 0;
            resultat = 0;
            operation = 'N';
        };

        // si caculatrice allumée
        // nombre de caractères limités à 25 (à adapter pour le responsive...)
        if (status && (affichage.innerHTML.length + btnNumber.innerHTML.length) < 25) {
            let ajout = btnNumber.innerHTML;

            // ne pas écrire un deuxième point si le nombre en contient déjà un
            if (btnNumber.innerHTML === '.' && affichage.innerHTML.split('.').length > 1) { 
                ajout = '';
            };

            // ne pas autoriser de zéros inutiles à gauche
            if (affichage.innerHTML === '0' && btnNumber.innerHTML !== '.') { 
                if(btnNumber.innerHTML === '00') {
                    ajout = '0';
                };
                affichage.innerHTML = ajout;
                ajout = '';
            };

            affichage.innerHTML += ajout;         
        };
    });
};

// utiliser les parenthèses
const btnParentheseO = document.getElementById('parentheseO');
btnParentheseO.addEventListener('click', function(){
    if (newNb) {
        if (affichage.innerHTML === '0') {
            affichage.innerHTML = btnParentheseO.innerHTML;
        } else {
            affichage.innerHTML += btnParentheseO.innerHTML;
        };
        newNb = false;
    };
});

const btnParentheseF = document.getElementById('parentheseF');
btnParentheseF.addEventListener('click', function(){
    // regarder si deja parenthèse fermante 
    // sinon le mettre dans la fonction ci-dessus
});

function calculer() {
    switch(operation) {
        case 'N' :
            current = parseFloat(affichage.innerHTML);
            break;
        case 'A' :
            resultat = current + parseFloat(affichage.innerHTML);
            current = resultat;
            break;
        case 'S' :
            resultat = current - parseFloat(affichage.innerHTML);
            current = resultat;
            break;
        case 'M' :
            resultat = current * parseFloat(affichage.innerHTML);
            current = resultat;
            break;  
        case 'D' :
            resultat = current / parseFloat(affichage.innerHTML);
            current = resultat;
            break; 
        case 'Mo' :
            resultat = current % parseFloat(affichage.innerHTML);
            current = resultat;
            break; 
    };
    if(isNaN(resultat)) {
        affichage.innerHTML = 'ERROR';
    } else {
        affichage.innerHTML = String(resultat); // attention à la longueur
    };
};

// utiliser la touche +
const btnSomme = document.getElementById('addition');
btnSomme.addEventListener('click', function() {
    calculer();
    affichage.innerHTML = btnSomme.innerHTML;
    // mise à jour de la variable opération
    operation = 'A';
    newNb = true;
});

// utiliser la touche -
const btnSoustraction = document.getElementById('soustraction');
btnSoustraction.addEventListener('click', function() {
    if (newNb && operation !== 'T') { // il s'agit de saisir un nombre négatif
        affichage.innerHTML = '-';
        newNb = !newNb;
    } else { // il s'agit d'une soustraction
        calculer();
        affichage.innerHTML = btnSoustraction.innerHTML;
        // mise à jour de la variable opération
        operation = 'S';
        newNb = true;
    };
});

// utiliser la touche x
const btnMultiplication = document.getElementById('multiplication');
btnMultiplication.addEventListener('click', function() {
    calculer();
    affichage.innerHTML = btnMultiplication.innerHTML;
    // mise à jour de la variable opération
    operation = 'M';
    newNb = true;
});

// utiliser la touche /
const btnDivision = document.getElementById('division');
btnDivision.addEventListener('click', function() {
    calculer();
    affichage.innerHTML = btnDivision.innerHTML;
    // mise à jour de la variable opération
    operation = 'D';
    newNb = true;
});

// utiliser la touche modulo
const btnModulo = document.getElementById('modulo');
btnModulo.addEventListener('click', function() {
    calculer();
    affichage.innerHTML = btnModulo.innerHTML;
    // mise à jour de la variable opération
    operation = 'Mo';
    newNb = true;
});

// utiliser la touche racine
const btnRacine = document.getElementById('racine');
btnRacine.addEventListener('click', function() {
    resultat = Math.sqrt(parseFloat(affichage.innerHTML));

    if(isNaN(resultat)) {
        affichage.innerHTML = 'ERROR';
    } else {
        current = resultat;
        affichage.innerHTML = String(resultat); // attention à la longueur
    };

    // mise à jour de la variable opération
    operation = 'R'; // utile ?
    newNb = true;
});

// utiliser la touche %
const btnPourcentage = document.getElementById('pourcentage');
btnPourcentage.addEventListener('click', function() {
    switch(operation) {
        case 'A' :
            resultat = current * (1 + parseFloat(affichage.innerHTML)/100);
            current = resultat;
            break;
        case 'S' :
            resultat = current * (1 - parseFloat(affichage.innerHTML)/100);
            current = resultat;
            break;
        default : 
            affichage.innerHTML = 'ERROR';
    };

    if(isNaN(resultat)) {
        affichage.innerHTML = 'ERROR';
    } else {
        affichage.innerHTML = String(resultat); // attention à la longueur
    };

    // mise à jour de la variable opération
    operation = 'P';
    newNb = true;
});

// utiliser la touche =
const btnTotal = document.getElementById('total');
btnTotal.addEventListener('click', function() {
    calculer();
    // mise à jour de la variable opération
    operation = 'T';
    newNb = true;
});

// utiliser la touche CE
// efface pas à pas le nombre en cours
const btnCancelError = document.getElementById('CE');
btnCancelError.addEventListener('click', function() {
    // attention à vérifier tous les cas particuliers
    const longueurAffichage = affichage.innerHTML.length;
    if (affichage.innerHTML !== '0') {
        if (longueurAffichage === 1 || affichage.innerHTML === 'ERROR') {
            affichage.innerHTML = '0';
        } else {
            affichage.innerHTML = affichage.innerHTML.substr(0, longueurAffichage - 1);
        };
    };
});

// utiliser la touche CA
// efface totalement le nombre en cours
const btnCancelAll = document.getElementById('CA');
btnCancelAll.addEventListener('click', function() {
    affichage.innerHTML = '0';
});


// utiliser la touche C
// annule toute l'opération en cours
const btnCancel = document.getElementById('C');
btnCancel.addEventListener('click', function() {
    affichage.innerHTML = '0';
    current = 0;
    resultat = 0;
    operation = 'N';
    newNb = true;
    // et la mémoire ?
});

// utiliser la mémoire
const btnMC = document.getElementById('MC');
btnMC.addEventListener('click', function(){
    memoire = 0;
    // faut-il écrire un nouveau nombre ?
    // faut-il effacer l'affichage ?
});

const btnMP = document.getElementById('MP');
btnMP.addEventListener('click', function(){
    if (affichage.innerHTML !== 'ERROR') {
        memoire += parseFloat(affichage.innerHTML);
        newNb = true;
    };
});

const btnMM = document.getElementById('MM');
btnMM.addEventListener('click', function(){
    if (affichage.innerHTML !== 'ERROR') {
        memoire -= parseFloat(affichage.innerHTML);
        newNb = true;
    };
});

const btnMR = document.getElementById('MR');
btnMR.addEventListener('click', function(){
    affichage.innerHTML = memoire;
    newNb = true;
});