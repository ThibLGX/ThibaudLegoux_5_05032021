function main() {
    // ###################      recupération de l'ours selectionné par son Id   #########
    const urlParams = new URLSearchParams(window.location.search.substr(1));
    // récupération de l'id selectionner
    const myParam = urlParams.get('idproduct');
    // traduction de JSON en JS des produits de l'API
    const products = JSON.parse(sessionStorage.getItem("products"))
    // récupération des données du produit grace à l'Id
    const productTeddie = products.find(p => p._id === myParam);

    // ##############   recupération des listes de couleur pour chaque ours ###############
    // création d'un string vide pour y insérer ce que l'on va récupérer
    let optionString = ""

    //  bloucle "forEach" pour recupérer le string associé de la value couleur
    productTeddie.colors.forEach(
        function (color, i) {
            optionString += `<option value="${i}">${color}</option>`
        });
    console.log(optionString)
    // ################### création de la fiche produit pour l'article selectionné #################
    // injection de la fiche produit de l'ours selectionné dans la div choisi
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


    // #######################  gestion du panier ########################
    function panierBtn() {
        // selection de la div pour l'injection du choix de la couleur
        let option = document.querySelector("#colorOption");

        // selection du bouton pour ajouter au panier
        const btnPanier = document.querySelector("#btnPanier")

        // *************  ECOUTER le bouton pour envoyer le panier  ***********
        btnPanier.addEventListener("click", (event) => {
            event.preventDefault();

            // -------------- recupération des paramètres du choix -----------------
            // récupération de la couleur grace à sa value associée
            const colorChoise = productTeddie.colors.find((color, i) => i == option.value);
            // récupération du nom
            const nameProduct = productTeddie.name;
            // récupération du prix
            const priceProduct = productTeddie.price / 100;

            //recup id
            const idProduct = productTeddie._id

            // recupérer les informmations selectionné
            let detailProductSelect = {
                nameProduct: nameProduct,
                priceProduct: priceProduct,
                colorProduct: colorChoise,
                quantityProduct: 1,
                idProduct: idProduct
            };

            // --------------     stokage des produits selectionné  --------------------------
            // il faut transformer en .JSON pour stocker dans le localStorage
            let saveProduct = JSON.parse(localStorage.getItem("productTeddie"));

            // fonction de mise en stockage local
            function AdTeddieStockage() {
                saveProduct.push(detailProductSelect);
                localStorage.setItem("productTeddie", JSON.stringify(saveProduct));
            }

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

            // CONDITION si il y a déjà des produits dans le panier
            if (saveProduct) {
                AdTeddieStockage();
                messageConfirm()
            }
            // CONDITION si il n'y a PAS déjà des produits dans le panier
            else {
                saveProduct = [];
                AdTeddieStockage();
                messageConfirm()
            }
        });
    }
    panierBtn()
};

window.onload = main