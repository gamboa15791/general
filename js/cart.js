let cartProducts= {}
let currentCantsArray = []


function showCartProducts(array){

    let htmlCartProductsToAppend = "";

    for (let i = 0; i < array.length; i++) {
          
        let cartProduct= array[i]
        
        

        htmlCartProductsToAppend += `
                                    <div class="row">
                                    <div class="col-2">
                                        <img src="` + cartProduct.src + `" alt="` + cartProduct.name + `" class="img-thumbnail">
                                    </div>
                                <div class="col">
                                    <div class="d-flex w-200 justify-content-between">
                                        <h4 class="mb-1">`+ cartProduct.name + `</h4>
                                        <h5 class="mb-2">`+ cartProduct.currency + ' '+  `</h5> <h4 class="mb-1" id="cost` + [i] + `" >` + cartProduct.unitCost + `</h4>
                                        <input class="cantidades" value="`+currentCantsArray[i]+`" type="number" id="cant` + [i] + `" min="1" onchange="subtotal(); total()">
                                                                              
                                    </div>
                                   
                                    
                                </div>
                                <div class="col-3">
                                <ins><h4 class="mb-1"> Subtotal ($)</h3></ins> <span class="subtotal" id="subtotal` + [i] + `"></span> <br>
                                </div>
                                <div class="col-4">
                                <ins><h4 class="mb-1"> Subtotal ($)</h3></ins> <span id="subtotalValor"></span> <br>
                                
                                </div>
                               
                                

                        </div>
                    

                    `
                    

    }
    document.getElementById("cartProducts").innerHTML = htmlCartProductsToAppend;
    
}

function subtotal(){

    let cantArray = document.getElementsByClassName("cantidades")

    for (let i = 0; i < cantArray.length; i++) {
     
        let cants= cantArray[i].value

        let costs= cartProducts.articles[i].unitCost

        let subtotal = costs * cants;
        
    /*let cost =document.getElementById("cost"+i).value;
    let cant =document.getElementById("cant"+i).value;
    */

    document.getElementById("subtotal"+i).innerHTML=subtotal;
    
    }

}

function cantInicial(array) {

    for (let i = 0; i < array.length; i++) {
        
        currentCantsArray.push(array[i].count)

    }
}

/*function uptadeCants() {

let arraycantidades = document.getElementsByClassName("cantidades");

    for (let i = 0; i < arraycantidades.length; i++) {
        
        currentCantsArray[i] =  arraycantidades[i].value;


        
    }

}*/


function total(){

  let total= 0
  let subtotalArray = document.getElementsByClassName("subtotal")
  for (let i = 0; i < subtotalArray.length; i++) {
        
    total+= parseInt(subtotalArray[i].innerHTML)
  }

  document.getElementById("total").innerHTML=total;

}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cartProducts = resultObj.data;
            //Muestro los productos en filas
            cantInicial(cartProducts.articles);
            showCartProducts(cartProducts.articles);
            subtotal();
            total();
        }
    });

    


});