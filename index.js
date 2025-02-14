import {menuArray} from "./data.js"

let totalPrice
let orderedItems = []
const itemList = document.getElementById("item-list")
const order = document.getElementById("order")
const orderList = document.getElementById("order-list")
const completeBtn = document.getElementById("complete-btn")
const modal = document.getElementById("modal")
const closeModal = document.getElementById("close-modal")
const cardForm = document.getElementById("card-form")

function getitemsHTML() {
   let resultHTML = menuArray.map(item => 
                `
                    <div id="item">
                        <div>
                            <h1>${item.emoji}</h1>
                        </div>
                        <div id="description">
                            <h3>${item.name}</h3>
                            <p>${item.ingredients.join(", ")}</p>
                            <p id="price"><span id="bold">$${item.price}</span></p>
                        </div>
                        <div>
                            <button id="${item.id}"><i id="${item.id}" class="fa-solid fa-plus"></i></button>
                        </div>
                    </div>
                    <div id="divider"></div>
                `
    )
   return resultHTML.join("")
}

function render() {
    itemList.innerHTML = getitemsHTML()
}

itemList.addEventListener("click", (e) => {
    if (e.target.id === "0") {
        orderedItems.push(0)
        renderOrder()
    }

    else if (e.target.id === "1") {
        orderedItems.push(1)
        renderOrder()
    }

    else if (e.target.id === "2") {
        orderedItems.push(2)
        renderOrder()
    }

    
})

order.addEventListener("click", (e) => {
    if (e.target.id === "0") {
        orderedItems.shift()
        renderOrder()
    }

    else if (e.target.id === "1") {
        const index = orderedItems.indexOf(1)
        orderedItems.splice(index, 1)
        renderOrder()
    }

    else if (e.target.id === "2") {
        orderedItems.pop()
        renderOrder()
    }

    
})

function getOrderHTML() {
    totalPrice = 0
    orderedItems.sort((a, b) => a - b)
    return orderedItems.map(currentId => {
        const currentItem = menuArray.find(item => item.id === currentId)
        totalPrice += currentItem.price
        return `
        <div id="order-item">
            <div id="title"><h3>${currentItem.name}</h3><span id="${currentItem.id}">remove</span></div><div><p>$${currentItem.price}</p></div>
        </div>
        `
    }).join("")
}

function renderOrder() {
    orderList.innerHTML = `
                            <h3>Your Order</h3>
                            ${getOrderHTML()}
                            <div id="divider"></div>
                            <div id="total">
                                <h3>Total price</h3><p id="bold">$${totalPrice}</p>
                            </div>
                        `
    if(orderedItems.length === 0) {
        order.classList.add("hidden")
    } else {
        order.classList.remove("hidden")
    }
}

completeBtn.addEventListener("click", function() {
    modal.style.display = "flex"
})

closeModal.addEventListener("click", function() {
    modal.style.display = "none"
})

cardForm.addEventListener('submit', function(e){
    e.preventDefault()
    modal.style.display = "none"
    order.innerHTML = `
        <div id="confirm">
            <h4>Thanks, James! Your order is on its way!</h4>
        </div>
    `
})

render()

