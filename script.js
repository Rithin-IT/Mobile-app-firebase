import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, ref, push, onValue,remove,set } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://mobile-app-5f7d7-default-rtdb.firebaseio.com/"
} 

const app = initializeApp(appSettings)
const database = getDatabase(app)
const ShoppingList = ref(database, "ShoppingList")


const inputel = document.getElementById("input_text")   
const buttonel = document.getElementById("btn")
const buttonnew = document.getElementById("newbtn")
const ShoppingListEl = document.getElementById("Shopping-List")



buttonel.addEventListener("click", function(){ 
    if(!inputel.value){
        alert("Please Fill the Form")
    }
    else{
        let inputval = inputel.value
    push(ShoppingList, inputval)
    clearInputFieldEl ()
    }  
})

onValue(ShoppingList,function(snapshot){

    if(snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val())

        clearShoppingListEl()
    
        for(let i=0; i<itemsArray.length; i++){
            let currentItem = itemsArray[i]
    
            let currentItemId = currentItem[0]
            let currentItemValue = currentItem[1]
            appendItemToShoppingListEl(currentItem)
            
        }
    }
    else{
        ShoppingListEl.innerHTML = "No items here yet"
    }
   
})

function clearShoppingListEl(){
    ShoppingListEl.innerHTML = ""
}

function clearInputFieldEl(){
    inputel.value = ""
}

function appendItemToShoppingListEl(itemValue){
    
    let itemId = itemValue[0]
    let name = itemValue[1]
    
    ShoppingListEl.innerHTML += `<li>${name}
    <button onclick='edit("${name}","${itemId}")' class="btn-edit"> <ion-icon name="create-outline"></ion-icon></button>
    <button onclick='Delete("${itemId}")' class="btn-delete" ><ion-icon name="trash-outline" ></ion-icon></button></li>
    `
}
window.appendItemToShoppingListEl = appendItemToShoppingListEl

function Delete(id){
    let data = ref(database,`ShoppingList/${id}`)
    remove(data)
}
window.Delete = Delete

let id = ""
function edit(x,y){
    inputel.value = x
    id = y
    document.getElementById("btn").style.display = "none"
    document.getElementById("newbtn").style.display = "block"
}
window.edit = edit

buttonnew.addEventListener("click", function(){
    // alert(id)
    let item = inputel.value
    set(ref(database,'ShoppingList/' + id),item)
      document.getElementById("btn").style.display = "block"
      document.getElementById("newbtn").style.display = "none"
      clearInputFieldEl()
    appendItemToShoppingListEl()
})