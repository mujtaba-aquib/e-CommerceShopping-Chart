/*
 * File: script.js
 * Created: Monday, 4th January 2021 8:49:44 pm
 * Author: Aquib Mujtaba (aquib.pust13@gmail.com)
 * -----
 * Last Modified: Wednesday, 6th January 2021 12:06:25 am
 * Modified By: Aquib Mujtaba (aquib.pust13@gmail.com)
 * -----
 * Copyright (c) 2021 @quib_self
 */


// Define all elementswith in a variable that used in HTML page

let form = document.querySelector('#product_form');
let productList = document.querySelector('#product_list');
let dropChart = document.querySelector('#chart_list');
let clearButton = document.querySelector('#clr');


// Class Definition Section
class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}

class UI {
    static addProductToList(product) {
        let list = document.querySelector('#product_list');
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td><a href='#' class="delete">Add to Chart</a></td>`;

        list.appendChild(row);
    }


    static clearFilds() {
        document.querySelector('#product_input').value = "";
        document.querySelector('#price_input').value = "";
    }

    static addChartList(data) {
        let chartList = document.querySelector('#chart_list');
        let li = document.createElement('li');

        li.appendChild(document.createTextNode(data + " "));
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'X';

        li.appendChild(link);

        chartList.appendChild(li);
        UI.showAlert("Successfully Added to Chart..!", "Success");
    }

    static removeFromChart(target) {
        if (target.hasAttribute('href')) {
            target.parentElement.remove();
        }
    }


    // Method definition for alert message.
    static showAlert(message, className) {
        let div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));

        let container = document.querySelector('.container');
        let form = document.querySelector('#first_row');

        container.insertBefore(div, form);

        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 1400);
    }

}

class LocalStore {

    static getProduct() {
        let products;
        if (localStorage.getItem('products') === null) {
            products = [];
        } else {
            products = JSON.parse(localStorage.getItem('products'));
        }
        return products;
    }

    static addProductToSotrage(product) {
        let products = LocalStore.getProduct();

        products.push(product);
        localStorage.setItem('products', JSON.stringify(products))
    }

    static displayProduct() {

        let product = LocalStore.getProduct();

        product.forEach(data => {
            UI.addProductToList(data);
        });

    }

}

// Add event listner with functin call;
form.addEventListener('submit', addProduct);
document.addEventListener('DOMContentLoaded', LocalStore.displayProduct);
productList.addEventListener('click', addToChart);
dropChart.addEventListener('click', removeChartList);
clearButton.addEventListener('click', deleteAll);

//Function Definition Section
function addProduct(e) {
    let productName = document.querySelector('#product_input').value;
    let productPrice = document.querySelector('#price_input').value;

    if (productName === "" || productPrice === "") {
        UI.showAlert("Add a Product..! Fill both Name and Price.", "error");
    } else {
        let product = new Product(productName, productPrice);
        UI.addProductToList(product);
        LocalStore.addProductToSotrage(product);
        UI.clearFilds();
    }

    e.preventDefault();
}

function addToChart(e) {
    let chartList;
    if (e.target.hasAttribute('href')) {
    chartList = e.target.parentElement.previousElementSibling.previousElementSibling.textContent.trim();

        UI.addChartList(chartList);
    }
    e.preventDefault();
}

function removeChartList(e) {

    console.log("drop");
    UI.removeFromChart(e.target);
    UI.showAlert("A product removed from Chart..!", "error");
    
    e.preventDefault();
    
}

function deleteAll() {
    
    UI.showAlert("Delete Chart list..!", "error");   
    dropChart.innerHTML = "";
 
}
