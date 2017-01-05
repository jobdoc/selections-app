var firebase = require('firebase')

var config = {
  apiKey: 'AIzaSyB6H6xujHgnFp7fW5zdGeRoQWFOwoRkr-s',
  authDomain: 'jobdoc-151914.firebaseapp.com',
  databaseURL: 'https://jobdoc-151914.firebaseio.com/',
  storageBucket: 'jobdoc-151914.appspot.com'
}

firebase.initializeApp(config)

var database = firebase.database()

module.exports.addProducts = function () {
  var faucets = require('../data/Faucets.json')
  var ovens = require('../data/Ovens.json')
  var microwaves = require('../data/Microwaves.json')

  var productRef = database.ref('products')

  var products = faucets.concat(ovens).concat(microwaves)
  products.forEach(product => {
    productRef.push(product)
  })
}

module.exports.addSelections = function () {
  var selections = require('../data/Selections.json')

  var selectionRef = database.ref('selections')

  selections.forEach(selection => {
    selectionRef.push(selection)
  })
}
