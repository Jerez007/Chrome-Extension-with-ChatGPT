import config from './config.js';

document.addEventListener('DOMContentLoaded', function() {
  var convertButton = document.getElementById('convert-button');
  var usdInput = document.getElementById('usd-input');
  var resultContainer = document.getElementById('result-container');

  convertButton.addEventListener('click', function() {
    var usdAmount = parseFloat(usdInput.value);

    if (!isNaN(usdAmount)) {
      fetch('https://openexchangerates.org/api/latest.json?app_id=' + config.API_KEY)
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          var exchangeRate = data.rates.CAD;
          var cadAmount = usdAmount * exchangeRate;

          resultContainer.innerText = usdAmount.toFixed(2) + ' USD = ' + cadAmount.toFixed(2) + ' CAD';
        })
        .catch(function(error) {
          console.log('Error:', error);
        });
    }
  });
});
