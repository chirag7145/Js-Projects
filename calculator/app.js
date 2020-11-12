document.getElementById('loan-form').addEventListener('submit',function (e) {
    console.log("Calculate ");
    document.getElementById('results').style.display = 'none';
    document.getElementById('loader').style.display = 'block';

    setTimeout(calculateResults, 2000);


    e.preventDefault();
});

function calculateResults() {
    console.log("Calculating ...");

    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value)/100/12;
    const calculatedPayments = parseFloat(years.value)*12;

    const x = Math.pow(1+calculatedInterest,calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    if(isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly*calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly*calculatedPayments)-principal).toFixed(2);
        document.getElementById('results').style.display = 'block';
        document.getElementById('loader').style.display = 'none';
    }
    else {
        setTimeout(showError("Please check your nos."), 3000);
    }

    // console.log(principal);
    // console.log(calculatedInterest);
    // console.log(calculatedPayments);
    // console.log(x);
    // console.log(monthly);
    // console.log(monthly*calculatedPayments);
    // console.log((monthly*calculatedPayments)-principal);

}


function showError(error) {

    document.getElementById('results').style.display = 'none';
    document.getElementById('loader').style.display = 'none';
    const errorDiv = document.createElement('div');

    errorDiv.className = "alert alert-danger";

    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    errorDiv.appendChild(document.createTextNode(error));

    card.insertBefore(errorDiv,heading);

    setTimeout(clearForm, 3000);
}

function clearForm() {
    document.querySelector('.alert').remove();
}

// Adding more colors to this ...

const colorList = document.querySelector('ul');
const body = document.querySelector('body');

loadEvents();

function loadEvents() {
    document.addEventListener('DOMContentLoaded',getColor);
    colorList.addEventListener('mouseover',changeClass);
    colorList.addEventListener('mouseout',changeClass);
    colorList.addEventListener('click',changeColor);
}

function getColor() {

    let color;

    if(localStorage.getItem('color') === null) {
        color = '';
    }
    else {
        color = JSON.parse(localStorage.getItem('color'));
        fillCircle(body.className.substr(3));
        body.className = `bg-${color}`;
        emptyCircle(color);
    }

}

function changeClass(e) {

    if(e.target.classList.contains('fas') && e.type === 'mouseover') {
        e.target.className = 'far fa-circle';
    }
    if(e.target.classList.contains('far') && e.type === 'mouseout') {

        if(body.className.substr(3) !== e.target.parentNode.className.substr(5)) {
            e.target.className = 'fas fa-circle';
        }
    }

    e.preventDefault();
}

function changeColor(e) {
  
    if(e.target.classList.contains('fa-circle')) {
        fillCircle(body.className.substr(3));
        const bgColor = e.target.parentNode.className.substr(5);
        localStorage.setItem('color',JSON.stringify(bgColor));
        body.className = `bg-${bgColor}`;
        e.target.className = 'far fa-circle';
    }
    e.preventDefault();
}

function fillCircle(color) {
    const tag = document.querySelector(`a.text-${color}`);
    tag.firstChild.className = 'fas fa-circle';
}

function emptyCircle(color) {
    const tag = document.querySelector(`a.text-${color}`);
    tag.firstChild.className = 'far fa-circle';
}
