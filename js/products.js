const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
const ORDER_BY_PROD_MAXCOST = "MAXCOST";
const ORDER_BY_PROD_MINCOST = "MINCOST";


var currentSortCriteria = undefined;
var minPrice = undefined;
var maxPrice = undefined;

var currentProductsArray = [];

let productSearchList = [];

function showProductList(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let product = array[i];

        if (((minPrice == undefined) || (minPrice != undefined && parseInt(product.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined && parseInt(product.cost) <= maxPrice))) {

            htmlContentToAppend += `
               <a href="product-info.html" class="list-group-item list-group-item-action">
                                            <div class="row">
                                    <div class="col-3">
                                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                                    </div>
                                <div class="col">
                                    <div class="d-flex w-100 justify-content-between">
                                        <h4 class="mb-1">`+ product.name + `</h4>
                                        <h4 class="mb-1">`+ product.currency + ' ' + product.cost + `</h4> 
                                        <small class="text-muted">` + product.soldCount + ` artículos vendidos</small>
                                    </div>
                                    <p class="mb-1">` + product.description + `</p>

                                </div>
                        </div>
                    </div>
                </a>

            `
        }
        document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME) {
        result = array.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_NAME) {
        result = array.sort(function (a, b) {
            if (a.name > b.name) { return -1; }
            if (a.name < b.name) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_COUNT) {
        result = array.sort(function (a, b) {
            let aSoldCount = parseInt(a.soldCount);
            let bSoldCount = parseInt(b.soldCount);

            if (aSoldCount > bSoldCount) { return -1; }
            if (aSoldCount < bSoldCount) { return 1; }
            return 0;
        });
    }

    else if (criteria === ORDER_BY_PROD_MAXCOST) {
        result = array.sort(function (a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);

            if (aCost > bCost) { return -1; }
            if (aCost < bCost) { return 1; }
            return 0;
        });
    }

    else if (criteria === ORDER_BY_PROD_MINCOST) {
        result = array.sort(function (a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);

            if (aCost < bCost) { return -1; }
            if (aCost > bCost) { return 1; }
            return 0;
        });
    }

    return result;
}

function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;

    if (productsArray != undefined) {
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    showProductList(currentProductsArray);
}

function showProductSearchList() {


    let textoEscrito = document.getElementById('searchProduct').value;

    let productSearchList = currentProductsArray.filter(function (product) {
        //filter devuelve un nuevo array conteniendo las coincidencias
        return ( (product.description.toLowerCase().indexOf(textoEscrito.toLowerCase())  > -1 || product.name.toLowerCase().indexOf(textoEscrito.toLowerCase())) > -1)   
         
    });


    showProductList(productSearchList);
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentProductsArray = resultObj.data;
            //Muestro los productos en filas
            showProductList(currentProductsArray);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCount").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("sortByMaxCost").addEventListener("click", function () {
        /*Obtengo el mínimo y máximo de los intervalos para filtrar por precio
        de productos.
        minPrice = document.getElementById("rangeFilterCountMin").value;
        maxPrice = document.getElementById("rangeFilterCountMax").value;*/

        sortAndShowProducts(ORDER_BY_PROD_MAXCOST);
    });

    document.getElementById("sortByMinCost").addEventListener("click", function () {

        sortAndShowProducts(ORDER_BY_PROD_MINCOST);
    });

    document.getElementById("rangeFilterPrice").addEventListener("click", function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minPrice = document.getElementById("rangeFilterPriceMin").value;
        maxPrice = document.getElementById("rangeFilterPriceMax").value;

        if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0) {
            minPrice = parseInt(minPrice);
        }
        else {
            minPrice = undefined;
        }

        if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0) {
            maxPrice = parseInt(maxPrice);
        }
        else {
            maxPrice = undefined;
        }

        showProductList(currentProductsArray);
    });

    document.getElementById("clearRangeFilterPrice").addEventListener("click", function () {
        document.getElementById("rangeFilterPriceMin").value = "";
        document.getElementById("rangeFilterPriceMax").value = "";
        document.getElementById('searchProduct').value = "";

        minPrice = undefined;
        maxPrice = undefined;

        getJSONData(PRODUCTS_URL).then(function (resultObj) {
            if (resultObj.status === "ok") {
                currentProductsArray = resultObj.data;
                //Muestro los productos en filas
                showProductList(currentProductsArray);
            }
        });
    });

    document.getElementById("searchProduct").addEventListener("keyup", function () {
        showProductSearchList();
    });


});