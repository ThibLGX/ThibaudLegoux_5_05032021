// récupération des produits du localStorage au paravant selectionné (et transformé en JS)

let dataConfirm = JSON.parse(localStorage.getItem("orderId")) ?? []
console.log(dataConfirm)

// selection du container de la card-list
const containerConfirm = document.querySelector("#confirmProduct");

function recapProducts() {
    // si le panier est vide
    if (dataConfirm.products === null || dataConfirm.products.length === 0) {
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
        for (t = 0; t < dataConfirm.products.length; t++) {
            tableauConfirm = tableauConfirm + `
                        <div class="proctudInPanier">
                            <div class="card-text nameAndColor text-center">L'ours <strong>${dataConfirm.products[t].name}</strong>
                             
                             </div>
                        </div>             
    `;
        }
        //   introduction de tableau avec "inner.HTML"
        if (t === dataConfirm.products.length) {
            containerConfirm.innerHTML = tableauConfirm;
        }
    }
}
//  #######   Addition des articles pour avoir la somme totale du panier
// variable des prix des articles présent dans le panier
function recapPrice() {
    let ArrayPrice = [];

    //boucle for pour recupérer tout les prix des articles
    for (let p = 0; p < dataConfirm.products.length; p++) {
        // console.log(saveProduct[p].priceProduct)
        ArrayPrice.push(dataConfirm.products[p].price)
    };

    // methode reduce pour additionner les prix des articles
    const addition = (accumulator, currentValue) => accumulator + currentValue;
    const totalPrice = ArrayPrice.reduce(addition, 0);

    // affichage  du total calculé
    const priceTotalHTML = `
<div class="totalCommande text-center">Total de votre commande : <strong>${(totalPrice / 100).toFixed(2).replace(".", ",")} €</strong></div>
`
    containerConfirm.insertAdjacentHTML("beforeend", priceTotalHTML);
}

function recapContact() {
    let cardConfirm = document.getElementById('confirmContact');

    let nameConfirm = document.createElement("p");
    nameConfirm.classList.add("card-text");
    nameConfirm.innerHTML = dataConfirm.contact.lastName + " " + dataConfirm.contact.firstName;
    cardConfirm.appendChild(nameConfirm);

    let mailConfirm = document.createElement("p");
    mailConfirm.classList.add("card-text");
    mailConfirm.innerHTML = dataConfirm.contact.email;
    cardConfirm.appendChild(mailConfirm);

    let adressConfirm = document.createElement("p");
    adressConfirm.classList.add("card-text");
    adressConfirm.innerHTML = dataConfirm.contact.address + " " + dataConfirm.contact.city;
    cardConfirm.appendChild(adressConfirm);
}

// injection du numéro de la commande de le récapitulatif
function numberCom() {
    let number = document.getElementById('comfirmNumber')

    let injectNumber = document.createElement('p');
    injectNumber.classList.add("card-text");
    injectNumber.innerHTML = dataConfirm.orderId;
    number.appendChild(injectNumber)
}

function main() {

    recapProducts();
    recapPrice();
    recapContact()
    numberCom()
}

window.onload = main