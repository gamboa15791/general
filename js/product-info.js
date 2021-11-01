let productInfo = [];

let relatedProductsArray = [];

let productsArray = []

let comment = [];

function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}
/*function showSlice(array) {
    let htmlSlides="";

    let i = 0 ;

    array.forEach(elemento=> {          

        if (i==0){
            htmlSlides+= "<div class='carousel-item active'>  <img class='dblock w-25'  src=" +elemento+" alt='"+elemento+ "' width=25 height=100> </div>";
            } else{
                htmlSlides+= "<div class='carousel-item '>  <img class='dblock w-25'  src=" +elemento+" alt='"+elemento+ "' width=25 height=100> </div>";
        }
        i++;
     });

 document.getElementById("slide").innerHTML = htmlSlides;
}*/

function showProductComments(array) {
    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        

        htmlContentToAppend += `
        <div class="row">
            <div class="col-3">
           
            </div>
             <div class="col">
             
                <div class="d-flex w-100 justify-content-between">
                <h3 class="mb-1"> <i class="fas fa-user"></i> `+ array[i].user +`</h3>  <div class="puntosComentario">`+califico(array[i].score) +`</div> <br> `

        /*let estrellas = "";
        let num= array[i].score;
        for (let i=1; i<=5; i++){
    
            if (i<=num ){
                estrellas += '<i class="fas fa-star "></i>';
                
            }else {
                estrellas +='<i class="far fa-star "></i>';
            }
    
    
        }*/

        //<h4 class="mb-1"> `+ califico(array[i].score) + `</h4>
        //cuando tengo un htmlContentToAppend representa una ventana htmal (formato) dentro del script
        //en el que puedo escribir el html. 
        //para insertar algun dato extraido del script, debo hacerlo entre "+"
        // para dividirlo uso la comilla simple

        htmlContentToAppend += ` 
                </div>
                <h5 class="mb-1">`+ array[i].dateTime + `</h5> 

                 <p class="mb-1">` + array[i].description + `</p>

             </div>
</div>
</div>
 `
    }
    document.getElementById("product-list-comment").innerHTML = htmlContentToAppend;
}

function califico(num) {

    //  let cantStars = array[i].score;

    //  let num = parseInt(document.getElementById('calificacion').value);

    let estrellas = "";
    for (let i = 1; i <= 5; i++) {

        if (i <= num) {
            estrellas += '<i class="fas fa-star"></i>';
        }
               else{
            
                estrellas += '<i class="far fa-star "></i>';
            }
        


    }
    //document.getElementById('calificacion').return= estrellas;
    return estrellas;
}

function comentar() {
    let usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario == null) {
      alert('Para realizar un comentario debe primero ingresar')
        location.href= 'login.html';
    }
else{
    let nuevoComentario={};
    let valorComentario= parseInt(document.getElementById('valor').innerHTML);
    let comentarioNuevo= document.getElementById('comentarioNuevo').value;
    let usuario = JSON.parse(localStorage.getItem('usuario'));
    let today = new Date().toISOString().slice(0, 10)
   
    nuevoComentario.user=usuario.nombre;
    nuevoComentario.score=valorComentario;
    nuevoComentario.dateTime= today;
    nuevoComentario.description=comentarioNuevo;

    comment.unshift(nuevoComentario);


}
//console.log(comment);
//console.log(nuevoComentario);
    showProductComments(comment);
        
}


function showRelatedProducts(array){
    let htmlRelatedToAppend = "";

    for (let i = 0; i < array.length; i++) {
   
        let indexProduct= array[i]
        

        htmlRelatedToAppend += `
<div class="row">
                                    <div class="col-3">
                                        <img src="` + productsArray[indexProduct].imgSrc + `" alt="` + productsArray[indexProduct].description + `" class="img-thumbnail">
                                    </div>
                                <div class="col">
                                    <div class="d-flex w-100 justify-content-between">
                                        <h4 class="mb-1">`+ productsArray[indexProduct].name + `</h4>
                                        <h4 class="mb-1">`+ productsArray[indexProduct].currency + ' ' + productsArray
                                        [indexProduct].cost + `</h4> 
                                        <small class="text-muted">` + productsArray[indexProduct].soldCount + ` artículos vendidos</small>
                                    </div>
                                    <p class="mb-1">` + productsArray[indexProduct].description + `</p>

                                </div>
                        </div>
                    </div>

                    `
            

    }
    document.getElementById("relatedProducts").innerHTML = htmlRelatedToAppend;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productInfo = resultObj.data;
            relatedProductsArray = productInfo.relatedProducts



            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productSoldCountHTML = document.getElementById("productSoldCount");
            // let productCriteriaHTML = document.getElementById("productCriteria");

            productNameHTML.innerHTML = productInfo.name;
            productDescriptionHTML.innerHTML = productInfo.description;
            productSoldCountHTML.innerHTML = productInfo.soldCount;
            //productCriteriaHTML.innerHTML = category.productCriteria;

            //Muestro las imagenes en forma de galería
            showImagesGallery(productInfo.images);
            

        }

        getJSONData(PRODUCTS_URL).then(function (resultObj) {
            if (resultObj.status === "ok") {
                productsArray = resultObj.data;
                //Muestro los productos en filas
                showRelatedProducts(relatedProductsArray)
                }
        });

    });

   

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comment = resultObj.data;

            showProductComments(comment)
            
        }


    });

    document.getElementById("comentar").addEventListener("click", function () {
        
        document.getElementById("comentarioNuevo").value = "";
        document.getElementById("valor").innerHTML = "";
        document.getElementById("radio1").checked = false;
        document.getElementById("radio2").checked = false;
        document.getElementById("radio3").checked = false;
        document.getElementById("radio4").checked = false;
        document.getElementById("radio5").checked = false;
       
    });


});