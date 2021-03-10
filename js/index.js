function buildProducts(products) {
    let card = document.getElementById('cardContainer');
    for (let i = 0; i < products.length; i++) {
        const col = document.createElement("div");
        col.classList.add("col-12");
        col.classList.add("col-md-4");
        col.classList.add("mb-4");
        card.appendChild(col);

        let tedCard = document.createElement("div");
        tedCard.classList.add("card");
        tedCard.classList.add("mb-4");
        tedCard.classList.add("mb-lg-0");
        tedCard.classList.add("text-center");
        col.appendChild(tedCard);

        let imgCard = document.createElement("img");
        imgCard.setAttribute('src', products[i].imageUrl);
        tedCard.appendChild(imgCard);

        let titleCard = document.createElement("h4");
        titleCard.classList.add("card-title");
        titleCard.innerHTML = products[i].name;
        tedCard.appendChild(titleCard);

        let price = document.createElement("p");
        price.classList.add("euro");
        price.innerHTML = products[i].price / 100 + " € ";
        tedCard.appendChild(price);

        let select = document.createElement("input");
        select.classList.add("valid");
        select.setAttribute('type', 'button');
        select.setAttribute('value', 'plus de détails');
        select.setAttribute('onclick', "window.location.href='pages_html/produit.html';"
        );
        tedCard.appendChild(select);
    };
}

async function fetchProducts() {
    try {
        const request = await fetch('http://localhost:3000/api/teddies');
        const products = await request.json();
        buildProducts(products)
    } catch (error) {
        return null
    }
}

function main() {
    fetchProducts()
}

window.onload = main


