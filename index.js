'use strict';

var cake = {
  name: "German Chocolate Cake",
  ingredients: ["eggs", "flour", "oil", "chocolate", "sugar", "butter"],
  topping: "coconut frosting",
  bakeTemp: "425 degrees",
  bakeTime: "45 minutes",
  customer: "Tommy",
  decorate: function(updateFunction) {
    var status = "Decorating with " + this.topping + ". Ready to eat soon!"
    updateFunction(status)
    setTimeout( () => {
      updateFunction(serve.apply(this, ["Happy Eating!", this.customer]))
    }, 2000)
  }
}

var pie = {
  name: "Apple Pie",
  ingredients: ["apples", "flour", "eggs", "butter", "sugar"],
  topping: "streusel",
  bakeTemp: "350 degrees",
  bakeTime: "75 minutes",
  customer: "Tammy"
}
pie.decorate = cake.decorate.bind(pie)

function makeCake() {
  var updateCakeStatus = updateStatus.bind(document.getElementById("cake"))
  var mixCake = mix.bind(cake)
  mixCake(updateCakeStatus)
}

function makePie() {
  var updatePieStatus = updateStatus.bind(document.getElementById("pie"))
  pie.decorate = cake.decorate.bind(pie)
  var mixPie = mix.bind(pie)
  mixPie(updatePieStatus)
}

function updateStatus(statusText) {
  this.getElementsByClassName("status")[0].innerText = statusText
}

function bake(updateFunction) {
  var status = "Baking at " + this.bakeTemp + " for " + this.bakeTime
  var coolThis = cool.bind(this)
  setTimeout( () => {
    coolThis(updateFunction)
  }, 2000)
}

function mix(updateFunction) {
  var status = "Mixing " + this.ingredients.join(", ")
  var bakeThis = bake.bind(this)
  setTimeout( () => {
    bakeThis(updateFunction)
  }, 2000)
  updateFunction(status)
}

function cool(updateFunction) {
  var status = "It has to cool! Hands off!"
  setTimeout( () => {
    this.decorate(updateFunction)
  }, 2000)
}

function makeDessert() {
  //add code here to decide which make... function to call
  //based on which link was clicked
  if (this === document.getElementsByClassName("js-make")[0]) {
    makeCake()
  }
  if (this === document.getElementsByClassName("js-make")[1]) {
    makePie()
  }
}

function serve(message, customer) {
  //you shouldn't need to alter this function
  return(customer + ", your " + this.name + " is ready to eat! " + message)
}

document.addEventListener("DOMContentLoaded", function(event) {
  //you shouldn't need to alter this function
  var cookLinks = document.getElementsByClassName("js-make")
  for(var i=0; i<cookLinks.length; i++) {
    cookLinks[i].addEventListener("click", makeDessert)
  }
});
