//Beginning of what David is building

var price = function(event){
  event.preventDefault();

  var stockFormEl = $('#stock-form');
  var stockListEl = $('#stock-list');

  var ticker = $("#ticker-input").val();
  var queryURL =
  "https://cloud.iexapis.com/stable/stock/" +
  ticker +
  "/batch?types=quote,news&range=1m&last=10&token=pk_57959b017ffa47508ac2c7eff69d3b05";

  $.ajax({
    url: queryURL,
    method: "GET",
  })
    .then(function (response) {
      console.log(response.quote.latestPrice);

      var stockListItemEl = $('<li>');
      stockListItemEl.text(response.quote.latestPrice)
      stockListEl.append(stockListItemEl);
    });
}

$("#btn1").on("click", price);  

// var stockFormEl = $('#stock-form');
// var stockListEl = $('#stock-list');

// function handleStockSubmit(event) {
//   event.preventDefault();

//   var stockListItemEl = $('<li>');
//   stockListItemEl.text(response.quote.latestPrice)

//   stockListEl.append(stockListItemEl);

//   $('input[name="ticker-input"]').val('');
// }

// end of what David is building

//beginning of what Brian is building
//send year to taxee.io and get tax brackets back
// curl 'https://taxee.io/api/v2/federal/2020' -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBUElfS0VZX01BTkFHRVIiLCJodHRwOi8vdGF4ZWUuaW8vdXNlcl9pZCI6IjVmYWNhNGRiNTk0MGFlNjcxZGQwNDIzMiIsImh0dHA6Ly90YXhlZS5pby9zY29wZXMiOlsiYXBpIl0sImlhdCI6MTYwNTE0OTkxNX0.R0Czpcjn1O7E5vKecPOcDO8W6A5-KXF1I1U4xdxMhKA'

var taxQueryURL = "https://taxee.io/api/v2/federal/2020";
// $.ajax({
//   url: taxQueryURL,
//   method: "GET",
// }).then(function (response) {
//   //taxee.io/api/v2/federal/2020
//   // var results = response.data;
//   // console.log(results);
//   https: console.log(response);
// });

var zeroSingle = document.getElementById("0-single");

//this is where we'll get the individual's income tax info and call taxee for their rates
var filingStatus = document.getElementById("filing-status").value;
var taxBracket = document.getElementById("tax-bracket").value;
var combinedStatusAndBracket =
  "response." +
  filingStatus +
  ".income_tax_brackets[" +
  taxBracket +
  "]" +
  ".marginal_rate";

myTestResponse = $.ajax({
  url: "https://taxee.io/api/v2/federal/2020",
  headers: {
    Authorization:
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBUElfS0VZX01BTkFHRVIiLCJodHRwOi8vdGF4ZWUuaW8vdXNlcl9pZCI6IjVmYWNhNGRiNTk0MGFlNjcxZGQwNDIzMiIsImh0dHA6Ly90YXhlZS5pby9zY29wZXMiOlsiYXBpIl0sImlhdCI6MTYwNTE0OTkxNX0.R0Czpcjn1O7E5vKecPOcDO8W6A5-KXF1I1U4xdxMhKA",
  },
  method: "GET",
}).then(function (response) {
  // JSON.stringify(response.single.income_tax_brackets[0].marginal_rate);
  // console.log(response);
  console.log(response.head_of_household.income_tax_brackets[0].marginal_rate);
  console.log(combinedStatusAndBracket);
  // console.log(
  //   JSON.parse(
  //     "response." +
  //       filingStatus +
  //       ".income_tax_brackets[" +
  //       taxBracket +
  //       "]" +
  //       ".marginal_rate"
  //   )
  // );
  zeroSingle.prepend(
    response.head_of_household.income_tax_brackets[0].marginal_rate
  );
});

// console.log(filingStatus, taxBracket);
// myTestResponse = $.ajax({
//   url: "https://taxee.io/api/v2/federal/2020",
//   headers: {
//     Authorization:
//       "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBUElfS0VZX01BTkFHRVIiLCJodHRwOi8vdGF4ZWUuaW8vdXNlcl9pZCI6IjVmYWNhNGRiNTk0MGFlNjcxZGQwNDIzMiIsImh0dHA6Ly90YXhlZS5pby9zY29wZXMiOlsiYXBpIl0sImlhdCI6MTYwNTE0OTkxNX0.R0Czpcjn1O7E5vKecPOcDO8W6A5-KXF1I1U4xdxMhKA",
//   },
//   method: "GET",
// }).then(function (response) {
//   // JSON.stringify(response.single.income_tax_brackets[0].marginal_rate);
//   // console.log(response);
//   console.log(response.head_of_household.income_tax_brackets[0].marginal_rate);
//   zeroSingle.prepend(
//     response.head_of_household.income_tax_brackets[0].marginal_rate
//   );
// });

//Start of what Martin is building
//get the element info and start populating data!
