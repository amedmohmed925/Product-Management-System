let  title = document.getElementById("title")
let  price = document.getElementById("price")
let  taxes = document.getElementById("taxes")
let  ads = document.getElementById("ads")
let  discount = document.getElementById("discount")
let  total = document.getElementById("total")
let  count = document.getElementById("count")
let  category = document.getElementById("category")
let  create = document.getElementById("create")
let error = document.getElementById("error")
let mood= 'create';
let index;
 function closeError() {
    error.style.display =" none"
 }
// get total
console.log(ads)
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value ) - +discount.value
        total.innerHTML = result
        total.style.backgroundColor ="green"

    } else {
        total.style.backgroundColor ="red"
        total.innerHTML = ''

    }
}

// creat product
let dataPro;

if (localStorage.dataPro != null) {
    dataPro = JSON.parse(localStorage.dataPro)
} else {
    dataPro = []
}
create.onclick = function () {
   
        let newProduct = {
            title:title.value.toLowerCase(),
            price:price.value,
            taxes:taxes.value,
            ads:ads.value,
            total:total.innerHTML,
            discount:discount.value,
            count:count.value,
            category:category.value.toLowerCase(),
        }
        // count
        if (title.value != '' && price.value != '' && category.value != '') {
            if (mood === 'create'){
            if (newProduct.count > 1) {
                for (let i = 0; i < newProduct.count; i++) {
                    dataPro.push( newProduct)

                }
            }   else {
                dataPro.push( newProduct)

            }

        } else{
            dataPro[index] = newProduct
            create.innerHTML="Create"
            count.style.display="block"
            
        } 
        
        clearDta()
        } else{
            error.style.display='block'

        }
              
        console.log(dataPro)
        
        localStorage.setItem('dataPro',JSON.stringify(dataPro))
        
        readData()
        getTotal()

}
// clear data
function clearDta() {
            title.value = ''
            price.value = ''
            taxes.value = ''
            ads.value = ''
            total.innerHTML = ''
            discount.value = ''
            count.value = ''
            category.value = ''
}
// readData

function readData() {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `
        <tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}$</td>
                        <td>${dataPro[i].category}</td>
                       <td><button onClick="updatePro(${i})">Update</button></td> 
                       <td><button onClick="deleteData( ${i} )">Delete</button></td> 

                    </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table
    let deleteAllptn = document.getElementById("deleteAll")
    if (dataPro.length > 0) {
        deleteAllptn.innerHTML=`<button onClick="deleteAll()">Delete All( ${dataPro.length})</button>`
    } else {
        deleteAllptn.innerHTML=''
    }
}
readData()

// delete

function deleteData(i) {
    dataPro.splice(i,1)
    localStorage.setItem('dataPro',JSON.stringify(dataPro))
    readData()
}
function deleteAll() {
    localStorage.clear()
    dataPro.splice(0)
    readData()
}

// update
function updatePro(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    count.style.display="none"
    getTotal()
    create.innerHTML = "Update"
    mood = 'update'
    index = [i]
    scroll({
        top:0, 
        behavior: "smooth"
    })
}
// search
let searchMood = 'title'
function getSearchMoode(id) {
   let search = document.getElementById("search")
    if (id == 'searchTitle') {
        searchMood = 'title'
    } else {
        searchMood = 'category'
    }
    search.focus()
    search.placeholder = `Search By ${searchMood}`
    console.log(searchMood)
    search.value = ""
    readData()
}
function searchData(value) {
    if (searchMood == 'title') {

                    let table = '';
                for (let i = 0; i < dataPro.length; i++) {
                    if (dataPro[i].title.includes(value.toLowerCase())) {
                        console.log(i)
                            table += `
                                <tr>
                                        <td>${i}</td>
                                        <td>${dataPro[i].title}</td>
                                        <td>${dataPro[i].price}</td>
                                        <td>${dataPro[i].taxes}</td>
                                        <td>${dataPro[i].ads}</td>
                                        <td>${dataPro[i].discount}</td>
                                        <td>${dataPro[i].total}$</td>
                                        <td>${dataPro[i].category}</td>
                                        <td><button onClick="updatePro(${i})">Update</button></td> 
                                        <td><button onClick="deleteData( ${i} )">Delete</button></td>
                                </tr>
                                    `
                                    
            }}
            document.getElementById('tbody').innerHTML = table

    } else {
        let table = '';

            for (let i = 0; i < dataPro.length; i++) {
                if (dataPro[i].category.includes(value)) {
                    console.log(i)
                        table += `
                            <tr>
                                    <td>${i}</td>
                                    <td>${dataPro[i].title}</td>
                                    <td>${dataPro[i].price}</td>
                                    <td>${dataPro[i].taxes}</td>
                                    <td>${dataPro[i].ads}</td>
                                    <td>${dataPro[i].discount}</td>
                                    <td>${dataPro[i].total}$</td>
                                    <td>${dataPro[i].category}</td>
                                    <td><button onClick="updatePro(${i})">Update</button></td> 
                                    <td><button onClick="deleteData( ${i} )">Delete</button></td>
                            </tr>
                                `
                                
    }}
    document.getElementById('tbody').innerHTML = table

    }
}
// clean data