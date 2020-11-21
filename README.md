# Project-1

## **Description**

One of the key components of being a successful investor is being an informed investor. Many brokerage sites these days do a good job of showing how much a position has gained/lost, however, they fail to give the investor insights on what they will pay in taxes should they decide to liquidate a position. <br><br> This information is an important factor in the decision process in regards to a sale. Selling out of a position for a small gain will ultimately prove unprofitable if taxes end up being more than the profit margin. <br><br> The main idea for this web application is to provide users with a way easily obtain the correct variables they need to calculate the total profitability of a stock sale with taxes factored in. 
<br><br>

--

## **Technologies Used**
We incorporated two different API’s into our project- IEX Cloud for pulling stock information and Taxee to pull current US income tax brackets. We decided to use Bulma as a CSS framework because it seemed like a user friendly option for novice coders.
<br><br>

--

## **Usage** 

* Near the top of the page, the user will find two form entries with an accompanying search and buy button. 

* User will first enter a stock in the search bar that they want to view the price of, then should they choose to buy, they will enter a desired quantity into the buy bar and press "Buy This Stock".

* Clicking the buy button will add the desired amount and the last recorded price of the stock to their "portfolio".

* There is a tax bracket table on the page that the user will use to determine the rate that their sale will be taxed. They will view whichever marital status column applies to them, they will choose the button that is less than or equal to their gross yearly income, and they will press that button to apply it to their equation. In their portfolio table, they will enter what price they are wanting to sell each share at in the form and the table will automatically calculate the amount they will pay in tax and what their expected income will be. 
<br><br>

--

## **Screenshots**
![](assets/Capture.png)
* This is an example of the functioning tax bracket table and portfolio table. This is how the user will determine what their expected profit will be.
<br><br>

--

## **Links**
Deployed Link: https://zhanez.github.io/Project-1/<br>
Github Repo: https://github.com/zhanez/Project-1
<br><br>

--

## **License**

MIT License 

Copyright (c) 2020 **Brian Shor, Andrew Wilkinson, Zhane Zabala, Martin Renteria, David Vargas**

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT  WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.