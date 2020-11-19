//Beginning of what David is building

var price = function (event) {
  event.preventDefault();

  var stockFormEl = $("#davids-company");
  var stockListEl = $("#davids-stock");

  

  var ticker = $("#ticker-input").val();
  var queryURL =
    "https://cloud.iexapis.com/stable/stock/" +
    ticker +
    "/batch?types=quote,news&range=1m&last=10&token=pk_57959b017ffa47508ac2c7eff69d3b05";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response.quote.latestPrice);

    var tickerItemEl = $("<li>");
    var stockListItemEl = $("<li>");
    var deleteButton = $('<button class="deleteItem">Remove</button>');

    stockListItemEl.text(response.quote.latestPrice);
    tickerItemEl.text(response.quote.symbol);

    stockFormEl.append(tickerItemEl);
    stockListEl.append(stockListItemEl);
  });
};

function removeItem(event) {
  var btnClicked = $(event.target);
  btnClicked.parent("li").remove();
}

$(".deleteItem").on("click", removeItem);
$("#btn1").on("click", price);

//end of what David is building

var taxQueryURL = "https://taxee.io/api/v2/federal/2020";

// var zeroSingle = document.getElementById("0-single");

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
  console.log(response.head_of_household.income_tax_brackets[0].marginal_rate);
  console.log(combinedStatusAndBracket);

  //define the table divs as variable
  var taxRateTableEl = $("#tax-rate-table");

  //add the table header
  var tableHeaderEl = $(
    "<th></th><th>Single</th><th>Head of Household</th><th>Married</th><th>Married - Separated</th></tr>"
  );
  //dunno why this is needed for prepend but we give up. come back to it later.
  taxRateTableEl.prepend(tableHeaderEl);

  //create a loop to add a tr and td for each element in the table
  //generate a td for each with a data-attribute
  var filingStatusArray = [
    response.head_of_household,
    response.married,
    response.married_separately,
    response.single,
  ];

  var taxBracketArray = ["0", "1", "2", "3", "4", "5", "6"];

  //generate a row for each tax bracket in a loop
  for (var i = 0; i < taxBracketArray.length; i++) {
    //create a table row (tr)
    var taxRateRowEl = $("<tr></tr>");
    var rowHeaders = $("<th>Bracket " + i + "</th>");
    taxRateRowEl.append(rowHeaders);
    // console.log(filingStatusArray[0]);

    for (var j = 0; j < filingStatusArray.length; j++) {
      //create a table cell (td) the innerText value should be called from the tax response
      var thisCellEl = $(
        "<td>" +
          filingStatusArray[j].income_tax_brackets[i].marginal_rate +
          "</td>"
      );
      console.log(filingStatusArray[0].income_tax_brackets[0].marginal_rate);

      //append the table cell into the table row
      taxRateRowEl.append(thisCellEl);
    }
    //get the data from the data-attribute that was selected

    //append the table row into the table
    taxRateTableEl.append(taxRateRowEl);
  }
  console.log(response);
});

//use stored variable to calculate total profit from stock sale

//Start of what Martin is building
//get the element info and start populating data!
