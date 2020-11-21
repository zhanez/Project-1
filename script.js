//Beginning of what David is building
//javascript formatter will use USD currency with whole numbers
// Create our number formatter.
var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  // These options are needed to round to whole numbers
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
var purchasedStocks = [];
var test = JSON.parse(localStorage.getItem("purchasedstocks"));
console.log(test);
if (test !== null) {
  purchasedStocks = purchasedStocks.concat(test);
}
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
$("#btn1").on("click", price);
$("#btn2").on("click", buy);
//grab the table out of local storage

console.log(purchasedStocks[0].stockSymbol);
var stockTable = $("#table-header");
var stockTable = $("#purchased-stock-table");
//loop through the stocks and create a row for each
//currently only adds the stocks on page load
//later, this should push to the dom on button click
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

var myBracket;
$(function () {
  $("body").delegate(".button", "click", function (event) {
    $(".button").css("background-color", "white");
    $(this).css("background-color", "red");
    //make all other sibling buttons white
    $(this).parent().siblings().children().css("background-color", "white");
    // var myBracket = $(this).text();
    myBracket = parseFloat($(this).parent().parent().data("bracket"));
    console.log("myBracket1: ", myBracket);
    console.log("using parsefloat" + myBracket);
    //leaving room for future development to do a null check
    //and to remove color from prior selection
  });
});
$(function () {
  $("body").delegate(".sale-price", "keyup", function (event) {
    // var salePriceSplit = this.id.split("-"); // split the string at the hyphen
    // calcNetIncome(parseInt(salePriceSplit[1]), true); // after the split, the number is found in index 1
    console.log(myBracket);
    //multiply the input value times quantity
    var thisSalePrice = $(this).val();
    console.log("thisSalePrice", thisSalePrice);

    var thisQty = $(this).parent().siblings(".qty-i").text();
    console.log("thisQty", thisQty);

    var thisPurchasePrice = $(this).parent().siblings(".paid-i").text();
    console.log("thisPurchasePrice", thisPurchasePrice);

    var thisTaxPaid =
      (thisQty * thisSalePrice - thisQty * thisPurchasePrice) *
      parseFloat(myBracket);
    console.log("thisTaxPaid", thisTaxPaid);
    console.log("parsefloat myBracket", parseFloat(myBracket));

    var thisNetIncome =
      thisSalePrice * thisQty - thisPurchasePrice * thisQty - thisTaxPaid;

    console.log("thisNetIncome", thisNetIncome);

    console.log("thisTaxPaid: ", thisTaxPaid);
    $(this).parent().siblings(".tax-i").text(formatter.format(thisTaxPaid));
    console.log("myBracket: ", myBracket);
    console.log(thisNetIncome);
    console.log("this val", $(this).val());
    console.log("qty: ", $(this).parent().siblings(".qty-i").text());
    //Update the value of the net income in the row
    $(this).parent().siblings(".net-i").text(formatter.format(thisNetIncome));
  });
});
var indexTest = `"#ni-0"`;
console.log(indexTest);
function calcNetIncome(theIndex) {
  console.log(theIndex);
  // $(indexTest).text("aaaa");
  //put something into the appropriate row text
  // $(`"#ni-` + theIndex + `"`).text("test my text");
  // $("#ni-0").text("aaaa");
  // $("#ni-0").siblings().text("asqwer");
}
// $("#ni-0").text("aaaa");
// $("#ni- ")
// console.log(purchasedParsedStocks);
//save the table into an element variable
// var puchasedTableEl = $(
//   for(var i=0; i<purchasedStocks.length; i++){
//   "<table class=table><tr class=table-row><td>" +
//     purchasedStocks +
//     "</td></tr></table>"
//   }
// );
//append to the document
// $("#purchased-stock-table").append(puchasedTableEl);
var taxQueryURL = "https://taxee.io/api/v2/federal/2020";

myTestResponse = $.ajax({
  url: "https://taxee.io/api/v2/federal/2020",
  headers: {
    Authorization:
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBUElfS0VZX01BTkFHRVIiLCJodHRwOi8vdGF4ZWUuaW8vdXNlcl9pZCI6IjVmYWNhNGRiNTk0MGFlNjcxZGQwNDIzMiIsImh0dHA6Ly90YXhlZS5pby9zY29wZXMiOlsiYXBpIl0sImlhdCI6MTYwNTE0OTkxNX0.R0Czpcjn1O7E5vKecPOcDO8W6A5-KXF1I1U4xdxMhKA",
  },
  method: "GET",
}).then(function (response) {
  console.log(response.head_of_household.income_tax_brackets[0].marginal_rate);

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
//against Do not repeat methodology, but short on time.
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
