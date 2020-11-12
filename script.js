//Beginning of what David is building
var ticker = "aapl";
var queryURL =
  "https://cloud.iexapis.com/stable/stock/" +
  ticker +
  "/batch?types=quote,news&range=1m&last=10&token=pk_57959b017ffa47508ac2c7eff69d3b05";

$.ajax({
  url: queryURL,
  method: "GET",
}).then(function (response) {
  // var results = response.data;
  // console.log(results);
  console.log(response);
});

console.log("test");

//end of what David is building

//beginning of what Brian is building
//send year to taxee.io and get tax brackets back
var taxQueryURL = "https://taxee.io/api/v2/federal/2020";
$.ajax({
  url: taxQueryURL,
  method: "GET",
}).then(function (response) {
  //taxee.io/api/v2/federal/2020
  // var results = response.data;
  // console.log(results);
  https: console.log(response);
});

console.log("test");

//Start of what Martin is building
//local storage
