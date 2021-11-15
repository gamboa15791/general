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
                                        <input class="cantidades" value="`+currentCantsArray[i]+`" type="number" id="cant` + [i] + `" min="1" onchange="subtotal(); total(); totalMasEnvio()">
                                                                              
                                    </div>
                                   
                                    
                                </div>
                                <div class="col-3">
                                <ins><h4 class="mb-1"> Subtotal ($)</h3></ins> <span class="subtotal" id="subtotal` + [i] + `"></span> <br>
                                </div>
                                <div class="col-4">
                                <ins><h4 class="mb-1"></h3></ins> <span id="subtotalValor"></span> <br>
                                
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

   
    let total= 0;
    let subtotalArray = document.getElementsByClassName("subtotal")
         for (let i = 0; i < subtotalArray.length; i++) {
        
        total+= parseInt(subtotalArray[i].innerHTML);
        }
    
  document.getElementById("total").innerHTML=total;

}

function totalMasEnvio(){
let totalFinal = 0;
let porcentaje = parseInt(document.getElementById('porcentajeEnvio').innerHTML);
let totalActual = parseInt(document.getElementById('total').innerHTML);

totalFinal= totalActual + (totalActual*porcentaje/100) ;

document.getElementById('totalMasEnvio').innerHTML=totalFinal
}


function metodoPago(){

     if( document.getElementById("pagoConTdc").checked){
        let htmlTdcToAppend = "";

        htmlTdcToAppend =`

        <div name='TDC'>
          <dl >
          <dt> Tarjeta de Crédito  </dt>
            
          <form>
            <div class="form-group owner">
                <label for="owner">Nombre en la tarjeta</label> 
                <input type="text" class="form-control" id="owner"><span id="tickOwner"></span><br>
                <div class="invalid-feedback"> Campo requerido </div>
                <div class="valid-feedback">Correcto!</div>
            </div>
            <div class="form-group CVV">
                <label for="cvv">CVV</label>
                <input type="text" class="form-control" id="cvv"><span id="tickCvv"></span><br>
                <div class="invalid-feedback"> Campo requerido </div>
                <div class="valid-feedback">Correcto!</div>
            </div>
            <div class="form-group" id="card-number-field">
                <label for="cardNumber">Card Number</label>
                <input type="text" class="form-control" id="cardNumber"><span id="tickCardNumber"></span><br>
                <div class="invalid-feedback"> Campo requerido </div>
                <div class="valid-feedback">Correcto!</div>
            </div>
            <div class="form-group" id="expiration-date">
                <label>Expiration Date</label>
                <select>
                    <option value="01">January</option>
                    <option value="02">February </option>
                    <option value="03">March</option>
                    <option value="04">April</option>
                    <option value="05">May</option>
                    <option value="06">June</option>
                    <option value="07">July</option>
                    <option value="08">August</option>
                    <option value="09">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>
                <select>
                    <option value="21"> 2021</option>
                    <option value="22"> 2022</option>
                    <option value="23"> 2023</option>
                    <option value="24"> 2024</option>
                    <option value="25"> 2025</option>
                    <option value="26"> 2026</option>
                </select>
            </div>
            <div class="form-group" id="credit_cards">
                <img src="img/logovisa.png" id="visa" width="20">
                <img src="img/logomaster.png" id="mastercard" width="20">
                <img src="img/logoamex.png" id="amex" width="20">
            </div>
            `
            document.getElementById("pagarCon").innerHTML = htmlTdcToAppend;
            document.getElementById('metodoPago').innerHTML='Tarjeta de Crédito'    
    }
    else {
    let htmlTbToAppend = "";

    htmlTbToAppend =`

    </dl>
    </div> <br>
    <div name='Transferencia'>
      <dl >
      <dt>Transferencia bancaria</dt>
      <dd>Banco: <input type="text" name="texto" placeholder="" id="bankName"></dd><span id="tickBankName"></span><br>
      <div class="invalid-feedback"> Campo requerido </div>
      <div class="valid-feedback">Correcto!</div>
      <dd>No. de Cuenta:<input type="text" name="texto" placeholder="" id="acountNo"> </dd><span id="tickAcountNo"></span><br>
      <div class="invalid-feedback"> Campo requerido </div>
      <div class="valid-feedback">Correcto!</div>
      <dd>No. de Comprobante:<input type="number" name="numero" placeholder="" id="comprobante"> </dd><span id="tickComprobante"></span><br>
      <div class="invalid-feedback"> Campo requerido </div>
      <div class="valid-feedback">Correcto!</div>
      </dl>
    </div> <br>

    `
    document.getElementById("pagarCon").innerHTML = htmlTbToAppend
    document.getElementById('metodoPago').innerHTML='Transferencia Bancaria'

    }
}

function pagar(){

    

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
            totalMasEnvio();
            
        }
    });

      document.getElementById('guardar').addEventListener("click",function(){
       
      var owner=document.getElementById('owner'); 
      var check =document.getElementById('tickOwner');
      var marca="";   
      owner.classList.remove('is-invalid');
      owner.classList.remove('is-valid');
      tickOwner.classList.remove('mal');
      tickOwner.classList.remove('bien');

           if (owner.value===""){
                             
               owner.classList.add('is-invalid');
               tickOwner.classList.add('mal');
               marca=" X";
               
           } else{
               marca="&#10004;";
               owner.classList.add('is-valid');
               tickOwner.classList.add('bien');
           }
           document.getElementById('tickOwner').innerHTML=marca;
      });

      document.getElementById('guardar').addEventListener("click",function(){
       
        var cvv=document.getElementById('cvv'); 
        var check =document.getElementById('tickCvv');
        var marca="";   
        cvv.classList.remove('is-invalid');
        cvv.classList.remove('is-valid');
        tickCvv.classList.remove('mal');
        tickCvv.classList.remove('bien');
  
             if (cvv.value===""){
                               
                 cvv.classList.add('is-invalid');
                 tickCvv.classList.add('mal');
                 marca=" X";
                 
             } else{
                 marca="&#10004;";
                 cvv.classList.add('is-valid');
                 tickCvv.classList.add('bien');
             }
             document.getElementById('tickCvv').innerHTML=marca;
        });

        document.getElementById('guardar').addEventListener("click",function(){
       
            var cardNumber=document.getElementById('cardNumber'); 
            var check =document.getElementById('tickCardNumber');
            var marca="";   
            cardNumber.classList.remove('is-invalid');
            cardNumber.classList.remove('is-valid');
            tickCardNumber.classList.remove('mal');
            tickCardNumber.classList.remove('bien');
      
                 if (cardNumber.value===""){
                                   
                     cardNumber.classList.add('is-invalid');
                     tickCardNumber.classList.add('mal');
                     marca=" X";
                     
                 } else{
                     marca="&#10004;";
                     cardNumber.classList.add('is-valid');
                     tickCardNumber.classList.add('bien');
                 }
                 document.getElementById('tickCardNumber').innerHTML=marca;
             });

         document.getElementById('guardar').addEventListener("click",function(){
       
                var bankName=document.getElementById('bankName'); 
                var check =document.getElementById('tickBankName');
                var marca="";   
                bankName.classList.remove('is-invalid');
                bankName.classList.remove('is-valid');
                tickBankName.classList.remove('mal');
                tickBankName.classList.remove('bien');
          
                     if (bankName.value===""){
                                       
                         bankName.classList.add('is-invalid');
                         tickBankName.classList.add('mal');
                         marca=" X";
                         
                     } else{
                         marca="&#10004;";
                         bankName.classList.add('is-valid');
                         tickBankName.classList.add('bien');
                     }
                     document.getElementById('tickBankName').innerHTML=marca;
             });

        document.getElementById('guardar').addEventListener("click",function(){
       
                    var acountNo=document.getElementById('acountNo'); 
                    var check =document.getElementById('tickAcountNo');
                    var marca="";   
                    acountNo.classList.remove('is-invalid');
                    acountNo.classList.remove('is-valid');
                    tickAcountNo.classList.remove('mal');
                    tickAcountNo.classList.remove('bien');
              
                         if (acountNo.value===""){
                                           
                             acountNo.classList.add('is-invalid');
                             tickAcountNo.classList.add('mal');
                             marca=" X";
                             
                         } else{
                             marca="&#10004;";
                             acountNo.classList.add('is-valid');
                             tickAcountNo.classList.add('bien');
                         }
                         document.getElementById('tickAcountNo').innerHTML=marca;
             });

        document.getElementById('guardar').addEventListener("click",function(){
       
                        var comprobante=document.getElementById('comprobante'); 
                        var check =document.getElementById('tickComprobante');
                        var marca="";   
                        comprobante.classList.remove('is-invalid');
                        comprobante.classList.remove('is-valid');
                        tickComprobante.classList.remove('mal');
                        tickComprobante.classList.remove('bien');
                  
                             if (comprobante.value===""){
                                               
                                 comprobante.classList.add('is-invalid');
                                 tickComprobante.classList.add('mal');
                                 marca=" X";
                                 
                             } else{
                                 marca="&#10004;";
                                 comprobante.classList.add('is-valid');
                                 tickComprobante.classList.add('bien');
                             }
                             document.getElementById('tickComprobante').innerHTML=marca;
             });



});