document.addEventListener('DOMContentLoaded', function() {
    var convertButton = document.getElementById('convert-button');
    var usdInput = document.getElementById('usd-input');
    var resultContainer = document.getElementById('result-container');
  
    convertButton.addEventListener('click', function() {
      var usdAmount = parseFloat(usdInput.value);
  
      if (!isNaN(usdAmount)) {
        fetch('./config.json')
          .then(function(response) {
            return response.json();
          })
          .then(function(data) {
            var apiKey = data.API_KEY;
  
            fetch('https://openexchangerates.org/api/latest.json?app_id=' + apiKey)
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
          })
          .catch(function(error) {
            console.log('Error:', error);
          });
      }
    });
  });
  