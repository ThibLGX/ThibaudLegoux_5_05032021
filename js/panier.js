// récupération des produits du localStorage au paravant selectionné (et transformé en JS)
let saveProduct = JSON.parse(localStorage.getItem("productTeddie")) ?? []

// ##########    Affichage des produits dans la page HTML  ########
function injectionHTMLPanir() {
    // selection du container de la card-list
    const containerPanier = document.querySelector("#containerPanier");

    // condition de l'état du Panier
    // si le panier est VIDE
    if (saveProduct === null || saveProduct.length === 0) {
        const panierVide = `
                    <div class="card-body panierCardVide text-center">
                    <div>Votre panier est vide</br><i class="far fa-sad-tear"></i></div>
                    </div>
                      `;
        containerPanier.innerHTML = panierVide;
    }

    // si le panier n'est PAS vide
    else {
        let tableauPanier = [];

        // boucle "for" pour récupérer chaque produit ajouté dans la tableau
        for (t = 0; t < saveProduct.length; t++) {
            tableauPanier = tableauPanier + `
                        <div class="proctudInPanier">
                            <div class="card-text nameAndColor">L'ours <strong>${saveProduct[t].nameProduct}</strong> de couleur <strong>${saveProduct[t].colorProduct}</strong></div>
                            <div class="card-text priceAndSupp">PRIX : <strong>${(saveProduct[t].priceProduct).toFixed(2).replace(".", ",")}</strong> € <i class="fas fa-trash-alt trash"></i></div>
                        </div>             
                        `;
        }
        //   introduction de tableau avec "inner.HTML"
        if (t === saveProduct.length) {
            containerPanier.innerHTML = tableauPanier;
        }
    }
}


// BOUTON supprimer un article du panier
function trashOneProduct() {
    // enumération des boutons présent dans la liste
    let btnTrash = document.querySelectorAll(".trash");

    // boucle for pour visiter l'ensemble des articles potentiellement supprimable 
    for (let x = 0; x < btnTrash.length; x++) {

        btnTrash[x].addEventListener("click", (event) => {
            //élimine les comportements par defaut
            event.preventDefault();
            function corbeille() {
                saveProduct.splice(x, 1)
                localStorage.setItem("productTeddie", JSON.stringify(saveProduct))
                window.location.href = "panier.html"
            }
            corbeille()
        })
    }
}


//  #######   Addition des articles pour avoir la somme totale du panier
function additionPrice() {
    // variable des prix des articles présent dans le panier
    let ArrayPrice = [];

    //boucle for pour recupérer tout les prix des articles
    for (let p = 0; p < saveProduct.length; p++) {
        // console.log(saveProduct[p].priceProduct)
        ArrayPrice.push(saveProduct[p].priceProduct)
    };

    // methode reduce pour additionner les prix des articles
    const addition = (accumulator, currentValue) => accumulator + currentValue;
    const totalPrice = ArrayPrice.reduce(addition, 0);

    // affichage  du total calculé
    const priceTotalHTML = `
<div class="totalPrice text-center">Prix total du panier : <strong>${totalPrice.toFixed(2).replace(".", ",")} €</strong></div>
`
    containerPanier.insertAdjacentHTML("beforeend", priceTotalHTML);
}

///// -   ---- -------   vider le panier      --------------------
async function trashAllPanier() {
    const trashAll = document.querySelector(".sommeOfPanier");

    const btnSup =
        `
    <button id="viderPanier" type="submit" name="ViderPanier" class="btn btn-danger">Vider votre panier</button>
`;
    // insert du bouton dans le HTML
    trashAll.innerHTML = btnSup;

    // selectionner le bouton pour vider
    const btnVider = document.querySelector("#viderPanier");

    // ecoute du bouton pour vider le panier
    btnVider.addEventListener("click", (event) => {
        event.preventDefault();
        if (window.confirm(`
            etes-vous sûr de vouloir vider le panier ?`)) {
            // vidange du local storage avec "removeItem"
            localStorage.removeItem("productTeddie");
            window.location.href = "panier.html"
        }
        else {
            window.location.href = "panier.html";
        }
    })
}



//  ##############################  FORMULAIRE  ##########################################
function formulaire() {
    //************** Ecoute du bouton de validation du formulaire ******
    // selection du bouton
    const btnFormulaire = document.querySelector("#validForm")
    // ecoute du bouton
    btnFormulaire.addEventListener("click", (event) => {
        event.preventDefault();

        // ---------- récupération des données du formulaire dans le local storage -------

        // création du formulaire 
        const formulaire = {
            name: document.querySelector("#nameForm").value,
            forname: document.querySelector("#fornameForm").value,
            email: document.querySelector("#emailForm").value,
            adress: document.querySelector("#adressForm").value,
            code: document.querySelector("#codeForm").value,
            city: document.querySelector("#cityForm").value
        }
        // validation du formulaire
        // validation du nom
        function controlName() {
            const validName = formulaire.name
            if (/^[A-Z a-z Ü-ü \'\-\ ]{3,20}$/.test(validName)) {
                return true;
            }
            else {
                alert("format du nom invalide")
                return false;
            }
        }
        // validation du prénom
        function controlForname() {
            const validForname = formulaire.forname
            if (/^[A-Z a-z Ü-ü\'\-\  ]{3,20}$/.test(validForname)) {
                return true;
            }
            else {
                alert("format du prénom invalide")
                return false;
            }
        }
        // validation de l'email
        function controlEmail() {
            const validEmail = formulaire.email
            if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(validEmail)) {
                return true;
            }
            else {
                alert("format de l'email invalide")
                return false;
            }
        }
        // validation de l'adresse
        function controlAdress() {
            const validAdress = formulaire.adress
            if (/^[A-Z a-z 0-9 Ü-ü \'\-\  \s]{6,30}$/.test(validAdress)) {
                return true;
            }
            else {
                alert("format de l'adresse invalide")
                return false;
            }
        }
        // validation du code postal
        function controlCode() {
            const validCode = formulaire.code
            if (/^[0-9]{5}$/.test(validCode)) {
                return true;
            }
            else {
                alert("format du code postal invalide")
                return false;
            }
        }
        // validation de la ville
        function controlCity() {
            const validCity = formulaire.city
            if (/^[A-Z a-z Ü-ü\'\-\ ]{3,30}$/.test(validCity)) {
                return true;
            }
            else {
                alert("format de la ville invalide")
                return false;
            }
        }
        function condition() {
            // condition pour envoyer le nom dans le local storage
            if (controlName() && controlForname() && controlEmail() && controlCode() && controlCity() && controlAdress()) {
                // traduction en JSON pour rentrer dans la key
                localStorage.setItem("formulaire", JSON.stringify(formulaire))
                window.location.href = "confirmation.html"
            }
            else {
                alert("formulaire invalide")
            }
        }
        condition()
        // OBJET de données à envoyer au server pour la commande (panier et formulaire)
        const dosSend = {
            saveProduct,
            formulaire
        }
    })
}
function main() {
    injectionHTMLPanir();
    trashOneProduct();
    additionPrice();
    trashAllPanier();
    formulaire()
}
console.log(main)
window.onload = main