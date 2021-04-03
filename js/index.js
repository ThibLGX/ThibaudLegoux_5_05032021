// #################     Création de section des cartes pour chaque ours  ##################
function buildProducts(products) {
    // récupération des caractéristiques des produits dans des tableaux "array"
    const arrayProduct = []

    // injection grace au id "cardContainer" du index.html
    let card = document.getElementById('cardContainer');

    function buildHTMLCard() {
        // boucle "for" pour récupérer chaque ours 
        for (let i = 0; i < products.length; i++) {
            // envois dans le tableau "arrayProduct"
            arrayProduct.push(products[i])

            // création div génrale container
            const col = document.createElement("div");
            col.classList.add("col-12");
            col.classList.add("col-md-4");
            col.classList.add("mb-4");
            card.appendChild(col);

            // création div "card"
            let tedCard = document.createElement("div");
            tedCard.classList.add("card");
            tedCard.classList.add("mb-4");
            tedCard.classList.add("mb-lg-0");
            tedCard.classList.add("text-center");
            col.appendChild(tedCard);

            // création section image des cartes
            let imgCard = document.createElement("img");
            imgCard.setAttribute('src', products[i].imageUrl);
            tedCard.appendChild(imgCard);

            // section titre des cartes
            let titleCard = document.createElement("h4");
            titleCard.classList.add("card-title");
            titleCard.innerHTML = products[i].name;
            tedCard.appendChild(titleCard);

            // section prix des cartes
            let price = document.createElement("p");
            price.classList.add("euro");
            price.innerHTML = (products[i].price / 100).toFixed(2).replace(".", ",") + "€";
            tedCard.appendChild(price);

            // lien vers la description des produits
            let select = document.createElement("a");
            select.classList.add("valid");
            select.innerHTML = "Descriptif du produit";
            select.setAttribute('href', 'pages_html/produit.html?idproduct=' + products[i]._id);
            tedCard.appendChild(select);
        };
    }
    function stokageSession() {
        // traduction de JSON en JS du stokage par sessionStorage
        sessionStorage.setItem("products", JSON.stringify(arrayProduct))
    }
    buildHTMLCard()
    stokageSession()
}


// récupération de la requete API par fetch et traduction de JSON en JavaScript pour récupérer les données
async function fetchProducts() {
    try {
        const request = await fetch('http://localhost:3000/api/teddies');
        const products = await request.json();
        buildProducts(products)
    }
    catch (error) {
        return null
    }
}

function main() {
    // lancement de la fonction "fectProduct" à la suite de la fonction "main"
    fetchProducts()
}
// lancement de la fonction "main" au chargement de la page
window.onload = main


