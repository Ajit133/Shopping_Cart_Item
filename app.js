// get Delete button
let removeCartItemButtons = document.getElementsByClassName('btn-danger')

for(let i = 0; i < removeCartItemButtons.length; i++){
    let button = removeCartItemButtons[i]
    button.addEventListener('click',removeCartItem)
    
}
function removeCartItem(e){
    let buttonClicked = e.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

// get value input and calculation of Number
function updateCartTotal(){
        // let cartItemContainer = document.getElementsByClassName('cart-items')[0]
        // let cartRows = cartItemContainer.getElementsByClassName('cart-row')
        let cartItemContainer = document.querySelector('.cart-items')
        let cartRows = cartItemContainer.querySelectorAll('.cart-row')
        let total = 0
        
        for(let i = 0; i < cartRows.length; i++){
            let cartRow = cartRows[i]
            let priceElement = cartRow.querySelector('.cart-price')
            let quantityElement = cartRow.querySelector('.cart-quantity-input')
            let price = priceElement.innerText.replace('$','')
            let quantity = quantityElement.value
            total = total + (price*quantity)   
        }
        total = Math.round(total * 100) / 100
        document.querySelector('.cart-total-price').innerText ='$'+ total
}

// Quantity Input Dynamic
var quantityInputs = document.querySelectorAll('.cart-quantity-input')
for(let i = 0; i < quantityInputs.length; i++){
    let input = quantityInputs[i]
    input.addEventListener('change',quantityChanged)
}

function quantityChanged(event){
    let input = event.target
    
    if ( isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateCartTotal()
}

// Click Item and add to the Cart list
let addToCartButtons = document.querySelectorAll('.shop-item-button')
// console.log(addToCartButtons)
for(let i = 0; i<addToCartButtons.length; i++){
    let button = addToCartButtons[i]
    button.addEventListener('click',addToCartClicked)
}
function addToCartClicked(event){
    let button = event.target
    let shopItem = button.parentElement.parentElement
    let title = shopItem.querySelector('.shop-item-title').innerText
    let price = shopItem.querySelector('.shop-item-price').innerText
    let imageSrc = shopItem.querySelector('.shop-item-image').src
    addItemToCart(title, price,imageSrc)
    updateCartTotal()
}
// passess title,pirce and ImageSrc 
function addItemToCart(title,price,imageSrc){
  let cartRow = document.createElement('div')
//   cartRow.innerText="Hello "
  cartRow.className = 'cart-row';
  let cartItems = document.querySelector('.cart-items');
  let cartItemNames = cartItems.querySelectorAll('.cart-item-title')
  for (let i = 0; i<cartItemNames.length; i++){
    if(cartItemNames[i].innerText == title){
        alert('This item is already added to the cart')
        return
    }

  }


  cartRow.innerHTML = `
  <div class="cart-item cart-column">
  <img class="cart-item-image" src=${imageSrc} width="100" height="100">
  <span class="cart-item-title">${title}</span>
  </div>
  <span class="cart-price cart-column">${price}</span>
  <div class="cart-quantity cart-column">
  <input class="cart-quantity-input" type="number" value="1">
  <button class="btn btn-danger" type="button">REMOVE</button>
  </div>
  `
  cartItems.appendChild(cartRow)
//   new element not working so get the element and call the function 
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItem)
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChanged)
}

// Get the Purchase Button and Write some function
document.getElementsByClassName('btn-purchase')[0].addEventListener('click',purchaseClicked)
function purchaseClicked(){
    alert('Thank You for your purchase')
    let cartItems = document.getElementsByClassName('cart-items')[0]
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}