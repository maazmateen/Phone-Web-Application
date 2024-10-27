var Data = localStorage.getItem("cart");
let convert = JSON.parse(Data);
console.log(convert);

const div = document.querySelector(".container");

convert.map((iteration, index) => {
    iteration.quantity = 1;
    div.innerHTML += `
    <div class="card" id="card-${index}">
    <img src="${iteration.image}" alt="${iteration.brand}${iteration.model}" class="image">
        <h1>Model : ${iteration.brand} ${iteration.model}</h1>
        <h3>Price :$${iteration.price}</h3>
        <h3>Camera :${iteration.camera}</h3>
        <h3>Ram :${iteration.ram}</h3>
        <h3>Rom :${iteration.rom}</h3>
        
        <h3>Quantity : 
            <button onclick="decreement(${index})" class="increement">-</button>
            <span id="quantity-Value${index}">1</span>
            <button onclick="increement(${index})" class="decreement">+</button>
        </h3>
        <div class="deleted"><button onclick="deleted(${index})" class="delete">Delete</button></div>
    </div>
    `;
});

function updateTotalPrice() {
    const result = convert.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    document.querySelector(".Total-price").innerHTML = `
        <button class="Total">Total Price</button> 
        <span class="pricetag"><h2 class="amount">$${result}</h2></span>
    `;
}

function increement(i) {
    const span = document.querySelector(`#quantity-Value${i}`);
    let quantity = +span.innerHTML;
    span.innerHTML = quantity + 1;
    convert[i].quantity = quantity + 1;
    updateTotalPrice(); 
}

function decreement(i) {
    const span = document.querySelector(`#quantity-Value${i}`);
    let quantity = +span.innerHTML;
    if (quantity > 1) {
        span.innerHTML = quantity - 1;
        convert[i].quantity = quantity - 1;
        updateTotalPrice();
    } else {
        // console.log("errer");
        
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Quantity Can't Below 0",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
    }
}

function deleted(index) {
    convert.splice(index, 1);
    document.querySelector(`#card-${index}`).remove();
    updateTotalPrice();
    localStorage.setItem("cart", JSON.stringify(convert)); 
}

updateTotalPrice();
