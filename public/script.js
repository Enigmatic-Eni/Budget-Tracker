let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("user-amount");
const checkAmountButton = document.getElementById("check-amount");
const totalAmountButton = document.getElementById("total-amount-button");
const productTitle = document.getElementById("product-title");
const errorMessage = document.getElementById("budget-error");
const productTitleError = document.getElementById("product-title-error");
const productCostError = document.getElementById("product-cost-error");
const amount = document.getElementById("amount");
const expenditureValue = document.getElementById("expenditure-value");
const balanceValue = document.getElementById("balance-amount");
const list = document.getElementById("list");

let tempAmount = 0;

//Code to set Budget
totalAmountButton.addEventListener("click", () => {
    tempAmount = totalAmount.value;
    // when a negative or empty value is inputed
    if(tempAmount === "" || tempAmount  < 0){
errorMessage.classList.remove("hidden")
    }else{
        errorMessage.classList.add("hidden");
        // TO set the budget 
        amount.innerHTML = tempAmount;
        // Set Balance 
        balanceValue.innerHTML = tempAmount - expenditureValue.innerText;
// To clear the input field
        totalAmount.value = "";
    }
});

// Function to Disable Edit and Delete Button
const disableButtons = (bool) => {
    let editButtons = document.getElementsByClassName("edit");
    Array.from(editButtons).forEach((element) => {
        element.disabled = bool;
    });
};
// To modify List elements
const modifyElement = (element, edit = false) => {
    let parentDiv = element.parentElement;
    let currentBalance = balanceValue.innerText;
    let currentExpense = expenditureValue.innerText;
    let parentAmount = parentDiv.querySelector(".amount").innerText;
    if(edit){
        let parentText = parentDiv.querySelector(".product").innerText;
        productTitle.value = parentText;
        userAmount.value = parentAmount;
        disableButtons(true);
    }
    balanceValue.innerText = parseInt(currentBalance) + parseInt(parentAmount);
    expenditureValue.innerText = parseInt(currentExpense) - parseInt(parentAmount);
    parentDiv.remove();
}
// Function to create list
const listCreator = (expenseName, expenseValue) => {
    let sublistContent = document.createElement("div");
    sublistContent.classList.add("sublist-content", "flex-space");
    list.appendChild(sublistContent);
    sublistContent.innerHTML = `<p class = "product">${expenseName}</p> <p class = "amount">${expenseValue}</p>`;
    let editButton = document.createElement("button")
    editButton.classList.add("fa-regular", "fa-pen-to-square", "edit");
    editButton.style.fontSize = "24px";
    editButton.addEventListener("click", () => {
        modifyElement(editButton, true);
    });

    let deleteButton = document.createElement("button");
    deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
    deleteButton.style.fontSize = "24px";
    deleteButton.addEventListener("click", () => {
        modifyElement(deleteButton);
    });
    sublistContent.appendChild(editButton);
    sublistContent.appendChild(deleteButton);
    document.getElementById("list").appendChild(sublistContent);
};

// Add expenses
checkAmountButton.addEventListener("click", () => {
    if(!userAmount.value || !productTitle.value){
        productTitleError.classList.remove("hidden");
        return false;
    }
    disableButtons(false);

    let expenditure = parseInt(userAmount.value);

    let sum = parseInt(expenditureValue.innerText) + expenditure;
    expenditureValue.innerText = sum;

    const totalBalance = tempAmount - sum;
    balanceValue. innerText = totalBalance;

    listCreator(productTitle/value, userAmount.value);

    productTitle.value = "";
    userAmount.value = "";
})


console.log(tempAmount)