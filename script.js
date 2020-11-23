//javascript formatter will use USD currency with whole numbers
// Create our number formatter.
var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  // These options are needed to round to whole numbers
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

//create a purchased stocks array and pull anything saved from local storage
var purchasedStocks = [];
var locallyStoredStocks = JSON.parse(localStorage.getItem("purchasedstocks"));

if (locallyStoredStocks !== null) {
  purchasedStocks = purchasedStocks.concat(locallyStoredStocks);
}

//pull the ticker and latest price from the iexapis api
var price = function (event) {
  event.preventDefault();
  var stockFormEl = $("#colz1");
  var stockListEl = $("#colz2");
  var ticker = $("#ticker-input").val();
  var queryURL =
    "https://cloud.iexapis.com/stable/stock/" +
    ticker +
    "/batch?types=quote,news&range=1m&last=10&token=pk_57959b017ffa47508ac2c7eff69d3b05";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    //add the ticker and price to the page
    var tickerItemEl = $("<li>");
    var stockListItemEl = $("<li>");
    stockListItemEl.text(response.quote.latestPrice);
    tickerItemEl.text(response.quote.symbol);
    stockFormEl.empty();
    stockListEl.empty();
    stockFormEl.append(tickerItemEl);
    stockListEl.append(stockListItemEl);
  });
};

//push the stock, quantity and price into local storage
function buy(event) {
  event.preventDefault();
  var ticker = $("#ticker-input").val();
  var queryURL =
    "https://cloud.iexapis.com/stable/stock/" +
    ticker +
    "/batch?types=quote,news&range=1m&last=10&token=pk_57959b017ffa47508ac2c7eff69d3b05";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var purchasedStockObject = {
      stockSymbol: response.quote.symbol,
      stockPrice: response.quote.latestPrice,
      quantity: $("#quantity-input").val(),
    };
    purchasedStocks.push(purchasedStockObject);
    localStorage.setItem("purchasedstocks", JSON.stringify(purchasedStocks));
    addRowFromBuy();
  });
}

//create a button for getting price from the api info and for purchasing the stock
$("#btn1").on("click", price);
$("#btn2").on("click", buy);

//set variables equal to the elements in the DOM
var stockTable = $("#table-header");
var stockTable = $("#purchased-stock-table");

//loop through the stocks and create a row for each
for (var i = 0; i < purchasedStocks.length; i++) {
  var thisRow = $(
    "<tr class=tablerow><td>" +
      purchasedStocks[i].stockSymbol +
      `</td class=button-container><td class="qty-i">` +
      purchasedStocks[i].quantity +
      `</td><td class=paid-i>` +
      purchasedStocks[i].stockPrice +
      `</td >
      <td><input class="sale-price" 
      id="sp-` +
      i +
      `" placeholder=$0.00 size=2></td>
      <td class ="tax-i" placeholder="$0.00">N/A</td>
      <td class ="net-i" id="ni-` +
      i +
      `">N/A</td></tr>`
  );
  stockTable.append(thisRow);
}

//use event delegation to allow changing the appropriate button background color
var myBracket;
$(function () {
  $("body").delegate(".button", "click", function (event) {
    $(".button").css("background-color", "white");
    $(this).css("background-color", "#00ccff");
    //make all other sibling buttons white
    $(this).parent().siblings().children().css("background-color", "white");
    // var myBracket = $(this).text();
    myBracket = parseFloat($(this).parent().parent().data("bracket"));
  });
});

//use event delegation to set the appropriate tax paid and net income based on row
//use keyup to dynamically populate the price on each key stroke rather than using a button
$(function () {
  $("body").delegate(".sale-price", "keyup", function (event) {
    //create variables for the elements in the current row where sale price is being updated
    var thisSalePrice = $(this).val();
    var thisQty = $(this).parent().siblings(".qty-i").text();
    var thisPurchasePrice = $(this).parent().siblings(".paid-i").text();
    //calculate the taxes and net income formatting as currency
    var thisTaxPaid =
      (thisQty * thisSalePrice - thisQty * thisPurchasePrice) *
      parseFloat(myBracket);
    var thisNetIncome =
      thisSalePrice * thisQty - thisPurchasePrice * thisQty - thisTaxPaid;
    $(this).parent().siblings(".tax-i").text(formatter.format(thisTaxPaid));

    //Update the value of the net income in the row
    $(this).parent().siblings(".net-i").text(formatter.format(thisNetIncome));
  });
});

//call the taxee api to get current federal tax info
var taxQueryURL = "https://taxee.io/api/v2/federal/2020";

$.ajax({
  url: "https://taxee.io/api/v2/federal/2020",
  headers: {
    Authorization:
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBUElfS0VZX01BTkFHRVIiLCJodHRwOi8vdGF4ZWUuaW8vdXNlcl9pZCI6IjVmYWNhNGRiNTk0MGFlNjcxZGQwNDIzMiIsImh0dHA6Ly90YXhlZS5pby9zY29wZXMiOlsiYXBpIl0sImlhdCI6MTYwNTE0OTkxNX0.R0Czpcjn1O7E5vKecPOcDO8W6A5-KXF1I1U4xdxMhKA",
  },
  method: "GET",
}).then(function (response) {
  //redoing the logic to populate into elements instead of generating
  //elements dynamically with javascript
  $("#col2-row2-btn").text(
    formatter.format(response.single.income_tax_brackets[0].bracket)
  );
  $("#col3-row2-btn").text(
    formatter.format(response.married.income_tax_brackets[0].bracket)
  );
  $("#col2-row3-btn").text(
    formatter.format(response.single.income_tax_brackets[1].bracket)
  );
  $("#col3-row3-btn").text(
    formatter.format(response.married.income_tax_brackets[1].bracket)
  );
  $("#col2-row4-btn").text(
    formatter.format(response.single.income_tax_brackets[2].bracket)
  );
  $("#col3-row4-btn").text(
    formatter.format(response.married.income_tax_brackets[2].bracket)
  );
  $("#col2-row5-btn").text(
    formatter.format(response.single.income_tax_brackets[3].bracket)
  );
  $("#col3-row5-btn").text(
    formatter.format(response.married.income_tax_brackets[3].bracket)
  );
  $("#col2-row6-btn").text(
    formatter.format(response.single.income_tax_brackets[4].bracket)
  );
  $("#col3-row6-btn").text(
    formatter.format(response.married.income_tax_brackets[4].bracket)
  );
  $("#col2-row7-btn").text(
    formatter.format(response.single.income_tax_brackets[5].bracket)
  );
  $("#col3-row7-btn").text(
    formatter.format(response.married.income_tax_brackets[5].bracket)
  );
  $("#col2-row8-btn").text(
    formatter.format(response.single.income_tax_brackets[6].bracket)
  );
  $("#col3-row8-btn").text(
    formatter.format(response.married.income_tax_brackets[6].bracket)
  );
});

//Allows appending the last purchase directly from local storage
function addRowFromBuy() {
  var thisRow = $(
    "<tr class=tablerow><td>" +
      purchasedStocks[purchasedStocks.length - 1].stockSymbol +
      `</td class=button-container><td class="qty-i">` +
      purchasedStocks[purchasedStocks.length - 1].quantity +
      `</td><td class=paid-i>` +
      purchasedStocks[purchasedStocks.length - 1].stockPrice +
      `</td >
      <td><input class="sale-price" 
      id="sp-` +
      i +
      `" placeholder=$0.00 size=2></td>
      <td class ="tax-i" placeholder="$0.00">N/A</td>
      <td class ="net-i" id="ni-` +
      i +
      `">N/A</td></tr>`
  );
  stockTable.append(thisRow);
}
