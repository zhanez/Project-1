var ticker = "aapl";
var queryURL = "https://cloud.iexapis.com/stable/stock/" + ticker + "/batch?types=quote,news&range=1m&last=10&token=pk_57959b017ffa47508ac2c7eff69d3b05";



$.ajax({
    url: queryURL,
    method: "GET"
})
    .then(function(response) {

        // var results = response.data;
        // console.log(results);
        console.log(response);
    });

    console.log("test");