// ===============================
// VINTAGE CLOTHING DATA
// ===============================

let vintageItems = [

    {
        name: "Classic Denim Jacket",
        category: "Jacket",
        era: "1980s",
        size: "M",
        price: 75,
        image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600",
        available: true
    },

    {
        name: "Floral Summer Dress",
        category: "Dress",
        era: "1970s",
        size: "S",
        price: 90,
        image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600",
        available: false
    },

    {
        name: "Leather Biker Jacket",
        category: "Jacket",
        era: "1990s",
        size: "L",
        price: 150,
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600",
        available: true
    },

    {
        name: "Retro Cotton Shirt",
        category: "Shirt",
        era: "1960s",
        size: "XL",
        price: 55,
        image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600",
        available: true
    }

];


// ===============================
// DOM ELEMENTS
// ===============================

const grid = document.getElementById("lookbookGrid");

const searchInput = document.getElementById("searchInput");

const searchBtn = document.getElementById("searchBtn");

const categoryFilter = document.getElementById("categoryFilter");

const eraFilter = document.getElementById("eraFilter");

const sizeFilter = document.getElementById("sizeFilter");

const resetBtn = document.getElementById("resetBtn");

const loadingState = document.getElementById("loadingState");

const emptyState = document.getElementById("emptyState");


// ===============================
// ANALYTICS
// ===============================

function analytics(){

    console.log(
        "[Analytics] User interacted with Vintage Clothing Boutique Lookbook"
    );

}


// ===============================
// XSS SANITIZER
// ===============================

function sanitize(text){

    return text
        .replace(/</g,"&lt;")
        .replace(/>/g,"&gt;");

}


// ===============================
// FORMAT DATE
// ===============================

function formatDate(){

    const today = new Date();

    return today.toLocaleDateString("en-IN",{

        day:"numeric",

        month:"short",

        year:"numeric"

    });

}


// ===============================
// RENDER ITEMS
// ===============================

function renderItems(items){

    grid.innerHTML = "";

    items.forEach(item=>{

        grid.innerHTML += `

        <article class="card">

            <img src="${item.image}"
            alt="${item.name}">

            <div class="card-content">

                <h3>${item.name}</h3>

                <p class="category">${item.category}</p>

                <p><strong>Era:</strong> ${item.era}</p>

                <p><strong>Size:</strong> ${item.size}</p>

                <p class="price">$${item.price}</p>

                <span class="badge ${item.available ? "available":"sold"}">

                ${item.available ? "Available":"Sold"}

                </span>

            </div>

        </article>

        `;

    });

}


// ===============================
// INITIAL LOAD
// ===============================

renderItems(vintageItems);
// ===============================
// SEARCH & FILTER FUNCTION
// ===============================

function filterItems() {

    loadingState.style.display = "block";

    grid.style.display = "none";

    emptyState.style.display = "none";

    setTimeout(() => {

        const searchValue = searchInput.value.toLowerCase().trim();

        const categoryValue = categoryFilter.value;

        const eraValue = eraFilter.value;

        const sizeValue = sizeFilter.value;

        const filteredItems = vintageItems.filter(item => {

            const matchSearch =
                item.name.toLowerCase().includes(searchValue) ||
                item.category.toLowerCase().includes(searchValue);

            const matchCategory =
                categoryValue === "" ||
                item.category === categoryValue;

            const matchEra =
                eraValue === "" ||
                item.era === eraValue;

            const matchSize =
                sizeValue === "" ||
                item.size === sizeValue;

            return (
                matchSearch &&
                matchCategory &&
                matchEra &&
                matchSize
            );

        });

        loadingState.style.display = "none";

        if (filteredItems.length === 0) {

            grid.style.display = "none";

            emptyState.style.display = "block";

        } else {

            grid.style.display = "grid";

            emptyState.style.display = "none";

            renderItems(filteredItems);

        }

        analytics();

    }, 1000);

}


// ===============================
// SEARCH BUTTON
// ===============================

searchBtn.addEventListener("click", filterItems);


// ===============================
// SEARCH USING ENTER KEY
// ===============================

searchInput.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        filterItems();

    }

});


// ===============================
// FILTER EVENTS
// ===============================

categoryFilter.addEventListener("change", filterItems);

eraFilter.addEventListener("change", filterItems);

sizeFilter.addEventListener("change", filterItems);


// ===============================
// RESET FILTERS
// ===============================

resetBtn.addEventListener("click", () => {

    searchInput.value = "";

    categoryFilter.value = "";

    eraFilter.value = "";

    sizeFilter.value = "";

    emptyState.style.display = "none";

    grid.style.display = "grid";

    renderItems(vintageItems);

    analytics();

});
// ===============================
// ADD ITEM FORM
// ===============================

const itemForm = document.getElementById("itemForm");

itemForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const itemName = document.getElementById("itemName");
    const itemCategory = document.getElementById("itemCategory");
    const itemEra = document.getElementById("itemEra");
    const itemSize = document.getElementById("itemSize");
    const itemPrice = document.getElementById("itemPrice");
    const imageUrl = document.getElementById("imageUrl");
    const description = document.getElementById("description");

    const fields = [
        itemName,
        itemCategory,
        itemEra,
        itemSize,
        itemPrice,
        imageUrl,
        description
    ];

    let valid = true;

    fields.forEach(field => {

        field.classList.remove("error");

        if (field.value.trim() === "") {

            field.classList.add("error");

            valid = false;

        }

    });

    if (!valid) {

        alert("Please fill all required fields.");

        return;

    }

    const newItem = {

        name: sanitize(itemName.value),

        category: sanitize(itemCategory.value),

        era: sanitize(itemEra.value),

        size: sanitize(itemSize.value),

        price: sanitize(itemPrice.value),

        image: sanitize(imageUrl.value),

        description: sanitize(description.value),

        available: true

    };

    vintageItems.push(newItem);

    renderItems(vintageItems);

    analytics();

    alert("Vintage item added successfully!");

    itemForm.reset();

});
// ===============================
// BACK TO TOP BUTTON
// ===============================

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        topBtn.style.display = "block";

    } else {

        topBtn.style.display = "none";

    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


// ===============================
// BROWSE COLLECTION BUTTON
// ===============================

const browseBtn = document.getElementById("browseBtn");

browseBtn.addEventListener("click", () => {

    document.querySelector(".lookbook").scrollIntoView({

        behavior: "smooth"

    });

    analytics();

});


// ===============================
// REMOVE ERROR BORDER
// ===============================

const allInputs = document.querySelectorAll(

    "#itemForm input, #itemForm select, #itemForm textarea"

);

allInputs.forEach(input => {

    input.addEventListener("input", () => {

        input.classList.remove("error");

    });

});


// ===============================
// KEYBOARD SHORTCUT
// Press "/" to focus search box
// ===============================

document.addEventListener("keydown", function (e) {

    if (

        e.key === "/" &&

        document.activeElement.tagName !== "INPUT" &&

        document.activeElement.tagName !== "TEXTAREA"

    ) {

        e.preventDefault();

        searchInput.focus();

    }

});


// ===============================
// WINDOW LOAD
// ===============================

window.addEventListener("load", () => {

    loadingState.style.display = "none";

    emptyState.style.display = "none";

    renderItems(vintageItems);

    console.log("Vintage Boutique Lookbook Loaded Successfully");

});


// ===============================
// PAGE VISIT ANALYTICS
// ===============================

window.addEventListener("DOMContentLoaded", () => {

    console.log(

        "[Analytics] Vintage Clothing Boutique Lookbook Loaded"

    );

});


// ===============================
// CONSOLE MESSAGE
// ===============================

console.log("Project Ready ✔");