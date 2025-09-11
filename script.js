// categories
const activeLink = (activeId)=>{
  const allLink = document.querySelectorAll("#categories a, #all-trees-btn")
  allLink.forEach(link=>link.classList.remove("active"))

  const activeLink = document.getElementById(activeId)
  if(activeLink){
    activeLink.classList.add("active")
  }

}


const allTree = ()=>{
  showSpinner()
  fetch("https://openapi.programming-hero.com/api/plants")
  .then(res=>res.json())
  .then(data=>{
    displayAllTree(data.plants.slice(0,6))
    activeLink("all-trees-btn");
    hideSpinner()
  })
}


const displayAllTree=(plants)=>{
    const container = document.getElementById("plants");
  container.innerHTML = "";
  plants.forEach(plant=>{
    const div = document.createElement("div");
    div.className = "card bg-base-100 shadow-sm p-3 flex flex-col justify-between h-full";
    div.innerHTML = `
                    <img
                        src="${plant.image}" class="h-[160px] w-full object-cover rounded-md"
                      />
                      <div class="flex flex-col flex-grow justify-between mt-2">
                      
                      <h2 class="font-bold text-lg mt-2 cursor-pointer hover:underline" onclick="plantsDetails('${plant.id}')">${plant.name}</h2>
                      <p class="text-[14px] text-gray-600">${plant.description}</p>
                      
                      <div class="flex justify-between items-center mt-2 mb-2">
                        <p class="bg-[#DCFCE7] text-[#15803D] rounded-3xl px-2 py-1 taxt-sm">${plant.category}</p>
                        <p class="font-semibold">৳${plant.price}</p>
                      </div>

                      <div class="card-actions">
                        <button class="btn w-full bg-[#15803D] text-white rounded-3xl hover:bg-green-700" onclick="addToCart('${plant.id}','${plant.name}',${plant.price})">Add to Cart</button>
                      </div>

                    
                      </div>

    `
    container.appendChild(div)
  })

}

const loadCategories = ()=>{
  fetch("https://openapi.programming-hero.com/api/categories")
  .then(res=>res.json())
  .then(data=>displayCategories(data.categories))
}
const displayCategories=(categories)=>{
  const categoriesContainer = document.getElementById("categories");
  categoriesContainer.innerHTML = "";
  categories.forEach(category=>{
    const a=document.createElement("a");
    a.className = " py-2 rounded-md px-4 block hover:text-[#15803D] "
    a.textContent=category.category_name;
    a.href = "#";
    a.id= `cat-${category.id}`
    a.addEventListener("click",()=>{
      loadPlantsByCategories(category.id)
      activeLink(`cat-${category.id}`)
    });
   categoriesContainer.appendChild(a);
  })
}

// spinner:
const showSpinner=()=>{
   document.getElementById("spinner").classList.remove("hidden")
   document.getElementById("plants").classList.add("hidden")
}
const hideSpinner =()=>{
     document.getElementById("spinner").classList.add("hidden")
   document.getElementById("plants").classList.remove("hidden")


}
// load plant:
const loadPlantsByCategories=(id)=>{
  showSpinner()
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
  .then(res=>res.json())
  .then(data=>{
    hideSpinner()
    displayPlants(data.plants)
  })

}
const displayPlants=(plants)=>{
  const container = document.getElementById("plants");
  container.innerHTML = "";
  plants.forEach(plant=>{
    const div = document.createElement("div");
    div.className = "card bg-base-100 shadow-sm p-3 flex flex-col justify-between h-fit";
    div.innerHTML = `
                    <img
                        src="${plant.image}" class="h-[160px] w-full object-cover rounded-md"
                      />
                    <divclass="flex flex-col flex-grow justify-between mt-2">
                      <h2 class="font-bold text-lg mt-2 cursor-pointer hover:underline" onclick="plantsDetails('${plant.id}')">${plant.name}</h2>
                      <p class="text-[14px] text-gray-600">
                        ${plant.description}
                      </p>

                      <div class="flex justify-between items-center mt-2 mb-2">
                        <p class="bg-[#DCFCE7] text-[#15803D] rounded-3xl px-2 py-1 text-sm">${plant.category}</p>
                        <p class="font-semibold">৳${plant.price}</p>
                      </div>

                      <div class="card-actions">
                        <button class="btn w-full bg-[#15803D] text-white rounded-3xl hover:bg-green-700" onclick="addToCart('${plant.id}','${plant.name}',${plant.price})">Add to Cart</button>
                      </div>
                      
                    </divclass=>

    `
    container.appendChild(div)
  })

}

// Add cart
let cart = [];
let totalPrice = 0;


const addToCart=(id,name,price)=>{
  const confirmMsg = confirm(`"${name}" added to cart. Do you want to continue?`);
  if(confirmMsg){
  cart.push({id,name,price});
  totalPrice += price
  displayCart();

  }
}

// remove cart:
const removeCart=(index)=>{
  totalPrice -= cart[index].price;
  cart.splice(index,1);
  displayCart();

}

const displayCart=()=>{
  const cartContainer = document.getElementById("cart");
  cartContainer.innerHTML = "";
  cart.forEach((item,index)=>{
    const div = document.createElement("div");
    div.className = "flex justify-between items-center bg-[#F0FDF4] p-3 rounded-lg";
    div.innerHTML = `
                    <div>
                      <p class="font-semibold">${item.name}</p>
                      <p class="text-gray-400">${item.price}৳ </p>
                    </div>
                    <div>
                      <i class="fa-solid fa-xmark cursor-pointer" onclick="removeCart(${index})"></i>
                    </div>


    `
    cartContainer.appendChild(div);
  });

  document.getElementById("total-price").innerText = `৳${totalPrice}`;
}

// modal
const plantsDetails=(id)=>{
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
  .then(res=>res.json())
  .then(data=>displayDetails(data.plants))

}
const displayDetails = (plant)=>{
    const detailsContainer= document.getElementById("details-container")
  detailsContainer.innerHTML=`
  <div class="card bg-base-100 shadow-sm p-3 flex flex-col justify-between h-full">
   
                     <h2 class="font-bold text-[20px] mb-2">${plant.name}</h2>
                      <img
                        src="${plant.image}" class="h-[200px]"
                      />
                    <div>
                        <p class="md:text-base mt-2"><span class="font-bold">Category: </span> ${plant.category}</p>
                        <p class="mt-1"><span class="font-bold">Price: </span> ৳${plant.price}</p>

                      <p class="text-[16px] mt-1">
                       <span class="font-bold">Description: </span> ${plant.description}
                      </p>
                      <div class="flex justify-between items-center mt-3 mb-4">
                      </div>
                    </div>


  </div>
`
document.getElementById("word_modal").showModal();

}

window.addEventListener("DOMContentLoaded",()=>{
  loadCategories()
  allTree()
})


loadCategories();



