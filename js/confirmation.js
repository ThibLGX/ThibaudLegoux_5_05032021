// récupération des produits du localStorage au paravant selectionné (et transformé en JS)
let saveProduct = JSON.parse(localStorage.getItem("productTeddie")) ?? []

// récupération du formulaire du localStorage  (et transformé en JS)
let saveFormulaire = JSON.parse(localStorage.getItem("formulaire")) ?? []

// selection du container de la card-list
const containerConfirm = document.querySelector("#confirmProduct");

function recapProducts() {
    // si le panier est vide
    if (saveProduct === null || saveProduct.length === 0) {
        const panierVide = `
                    <div class="card-body panierCardVide text-center">
                    <div>Votre panier est toujours vide</br><i class="far fa-sad-tear"></i> <i class="far fa-sad-tear"></i> <i class="far fa-sad-tear"></i></div>
                    </div>
                    `;
        containerConfirm.innerHTML = panierVide;
    }

    // si le panier n'est PAS vide
    else {
        let tableauConfirm = [];

        // boucle "for" pour récupérer chaque produit ajouté dans la tableau
        for (t = 0; t < saveProduct.length; t++) {
            tableauConfirm = tableauConfirm + `
                        <div class="proctudInPanier">
                            <div class="card-text nameAndColor text-center">L'ours <strong>${saveProduct[t].nameProduct}</strong> de couleur <strong>${saveProduct[t].colorProduct}</strong></div>
                        </div>             
    `;
        }
        //   introduction de tableau avec "inner.HTML"
        if (t === saveProduct.length) {
            containerConfirm.innerHTML = tableauConfirm;
        }
    }
}
//  #######   Addition des articles pour avoir la somme totale du panier
// variable des prix des articles présent dans le panier
function recapPrice() {
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
<div class="totalCommande text-center">Total de votre commande : <strong>${totalPrice.toFixed(2).replace(".", ",")} €</strong></div>
`
    containerConfirm.insertAdjacentHTML("beforeend", priceTotalHTML);
}

function recapContact() {
    let cardConfirm = document.getElementById('confirmContact');

    let nameConfirm = document.createElement("p");
    nameConfirm.classList.add("card-text");
    nameConfirm.innerHTML = saveFormulaire.name + " " + saveFormulaire.forname;
    cardConfirm.appendChild(nameConfirm);

    let mailConfirm = document.createElement("p");
    mailConfirm.classList.add("card-text");
    mailConfirm.innerHTML = saveFormulaire.email;
    cardConfirm.appendChild(mailConfirm);

    let adressConfirm = document.createElement("p");
    adressConfirm.classList.add("card-text");
    adressConfirm.innerHTML = saveFormulaire.adress + " " + saveFormulaire.code + " " + saveFormulaire.city;
    cardConfirm.appendChild(adressConfirm);
}

function main() {
    recapProducts();
    recapPrice();
    recapContact()
}
console.log(main)
window.onload = main