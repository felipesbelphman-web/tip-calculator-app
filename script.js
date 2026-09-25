const billInput = document.querySelector("#bill");
const peopleInput = document.querySelector("#people");
const tipButtons = document.querySelectorAll("[data-tip]")
const tipAmountOutput = document.querySelector("#tip-amount");
const totalAmountOutput = document.querySelector("#total-amount");
const customTipInput = document.querySelector("#custom-tip");
const resetButton = document.querySelector("#reset");

let selectedTip = 0;
function updateCalculation() {
    const bill = Number(billInput.value);
    const people = Number(peopleInput.value);

    if (people < 1 || !Number.isInteger(people)) {
        tipAmountOutput.textContent = "$0.00";
        totalAmountOutput.textContent = "$0.00";
        return;
    }

    const billPerPerson = bill / people;
    const tipPerPerson = (bill * selectedTip / 100) / people;
    const totalPerson = billPerPerson + tipPerPerson;
    tipAmountOutput.textContent = `$${tipPerPerson.toFixed(2)}`;
    totalAmountOutput.textContent = `$${totalPerson.toFixed(2)}`;
    console.log(tipPerPerson);
    console.log(billPerPerson);
    console.log(totalPerson);
}

customTipInput.addEventListener("input", () => {
    selectedTip = Number(customTipInput.value);

    tipButtons.forEach((button) => {
        button.classList.remove("is-selected");
    });

    updateCalculation();
});

billInput.addEventListener("input", updateCalculation);
peopleInput.addEventListener("input", updateCalculation);
tipButtons.forEach((button) => {
    button.addEventListener("click", () => {
        selectedTip = Number(button.dataset.tip);
        customTipInput.value = ""

        tipButtons.forEach((tipButton) => {
            tipButton.classList.remove("is-selected");
        });

        button.classList.add("is-selected");
        updateCalculation();
    });
});

resetButton.addEventListener("click", () => {
    billInput.value = "";
    peopleInput.value = "";
    selectedTip = 0;
    tipButtons.forEach((tipButton) => {
        tipButton.classList.remove("is-selected");
    });
    tipAmountOutput.textContent = "$0.00";
    totalAmountOutput.textContent = "$0.00";
});