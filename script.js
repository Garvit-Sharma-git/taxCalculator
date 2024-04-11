const form = document.getElementById('tax-form');
const modal = document.getElementById('modal');
const closeModalButton = document.getElementById('close-modal');
const taxableIncomeSpan = document.getElementById('taxable-income');
const taxRateSpan = document.getElementById('tax-rate');
const taxAmountSpan = document.getElementById('tax-amount');

// Function to display error message on hover
// function showError(element) {
//   element.addEventListener('mouseover', () => {
//     const errorIcon = element.nextElementSibling;
//     errorIcon.style.display = 'block';
//   });
//   element.addEventListener('mouseout', () => {
//     const errorIcon = element.nextElementSibling;
//     errorIcon.style.display = 'none';
//   });
// }

// Function to validate input fields and show errors
function validateForm() {
  let isValid = true;
  const inputs = form.querySelectorAll('input[type="text"]');

  inputs.forEach((input) => {
    const value = input.value.trim();
    const errorIcon = input.nextElementSibling;

    if (!value || isNaN(value)) {
      isValid = false;
      errorIcon.style.display = 'block';
      input.style.borderColor = 'red';
    } else {
      errorIcon.style.display = 'none';
      input.style.borderColor = '#ccc';
    }
  });

  if (!form.elements.age.value) {
    isValid = false;
    const errorIcon = form.elements.age.nextElementSibling;
    errorIcon.style.display = 'block';
  } else {
    const errorIcon = form.elements.age.nextElementSibling;
    errorIcon.style.display = 'none';
  }

  return isValid;
}

// Function to calculate tax
function calculateTax() {
  const grossIncome = parseFloat(document.getElementById('gross-income').value);
  const extraIncome = parseFloat(document.getElementById('extra-income').value) || 0;
  const deductions = parseFloat(document.getElementById('deductions').value) || 0;
  const age = document.getElementById('age').value;

  const taxableIncome = grossIncome + extraIncome - deductions;

  let taxRate;
  let taxAmount;

  if (taxableIncome <= 800000) {
    taxRate = 0;
  } else {
    const taxableAboveLimit = taxableIncome - 800000;
    if (age <40) {
      taxRate = 0.3;
      taxAmount = taxableAboveLimit * taxRate;
    } else if (age >= 40 && age <60) {
      taxRate = 0.4;
      taxAmount = taxableAboveLimit * taxRate;
    } else {
      taxRate = 0.1;
      taxAmount = taxableAboveLimit * taxRate;
    }
    
    
  }
  

  taxableIncomeSpan.textContent = taxableIncome.toFixed(2);
  taxRateSpan.textContent = `${taxRate * 100}%`;
  taxAmountSpan.textContent = taxAmount.toFixed(2);
}

// Event listeners
form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (validateForm()) {
    calculateTax();
    modal.classList.remove('hidden');
  }
});

closeModalButton.addEventListener('click', () => {
  modal.classList.add('hidden');
});

// Show error messages on hover by default for all input fields
const inputFields = form.querySelectorAll('input[type="text"]');
inputFields.forEach((field) => showError(field));
showError(form.elements.age);
