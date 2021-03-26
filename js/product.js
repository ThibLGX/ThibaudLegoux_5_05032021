

function main() {

    // recupération de l'ours selectionné par son Id
    const urlParams = new URLSearchParams(window.location.search.substr(1));
    const myParam = urlParams.get('idproduct');
    const products = JSON.parse(sessionStorage.getItem("products"))
    const productTeddie = products.find(p => p._id === myParam);


    // recupération des listes de couleur pour chaque ours 
    let optionString = ""

    productTeddie.colors.forEach(
        function (color, i) {
            optionString += `<option value="${i}">${color}</option>`
        });


    // contenue dans la fiche produit de l'ours selectionné
    const positionElement = document.querySelector(".descriptionContainer")

    const sheet = ` 
        <div class="row d-flex justify-content-center mx-2">
            <div class="col-12 col-lg-8 bg-warning sheet">
                <div class=" mb-1 mb-lg-0 ">
                <img src="${productTeddie.imageUrl}" alt="" class="imageBear ">
                <div class="card-body">
                    <h3 class="card-title text-center">${productTeddie.name}</h3>
                    <p class="card-text">${productTeddie.description}</p>
                    <select class="form-select" id="colorOption" aria-label="Default select example">
                        ${optionString}
                    </select>
                    <p class="card-text">Prix : ${(productTeddie.price / 100).toFixed(2).replace(".", ",")}€</p>
                     <div class="col text-center">
                     <button id="btnPanier" type="submit" name="btnPanier" class="btn btn-primary">Ajouter au panier</button>
                    </div>
                </div>
                </div>
            </div>
        </div>
        `;
    positionElement.innerHTML = sheet;

    // ---------   gestion du panier ----------------
    let option = document.querySelector("#colorOption");


    // bouton pour ajouter au panier

    const btnPanier = document.querySelector("#btnPanier")

    // ecouter le bouton pour envoyer le panier
    btnPanier.addEventListener("click", (event) => {
        event.preventDefault();

        // -------------- recupération des paramètres du choix -----------------
        // récupération de la couleur grace à sa value associée
        const colorChoise = productTeddie.colors.find((color, i) => i == option.value);
        const nameProduct = productTeddie.name;
        const priceProduct = productTeddie.price / 100;


        // recupérer les informmations selectionné
        let detailProductSelect = {
            nameProduct: nameProduct,
            priceProduct: priceProduct,
            colorProduct: colorChoise,
            quantityProduct: 1
        };
        console.log(detailProductSelect)

        // --------------     stokage des produits selectionné  --------------------------
        // il faut transformer en .JSON pour stocker dans le localStorage
        let saveProduct = JSON.parse(localStorage.getItem("productTeddie"));
        console.log(localStorage.getItem("productTeddie"));

        // fonction du message de confirmation
        function messageConfirm() {
            if (window.confirm(`
            L'ours ${nameProduct} de couleur ${colorChoise} à été ajouté au panier
            Aller au panier OK ou continuer mes achats ANNULER`)) {
                window.location.href = "panier.html"
            }
            else {
                window.location.href = "../index.html"
            }
        }

        // mettre une condition si il y a déjà des produits dans le panier
        if (saveProduct) {
            saveProduct.push(detailProductSelect);
            localStorage.setItem("productTeddie", JSON.stringify(saveProduct));
            messageConfirm()
        }
        else {
            saveProduct = [];
            saveProduct.push(detailProductSelect);
            localStorage.setItem("productTeddie", JSON.stringify(saveProduct));
            messageConfirm()
        }

    });

};

window.onload = main