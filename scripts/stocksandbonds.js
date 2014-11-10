var StocksAndBonds = {};
StocksAndBonds.year = 1;

StocksAndBonds.bearMarket = {
   2: [  12,  14,  13,  10,  10,  20,  21,  25,   8 ],
   3: [   7,  -6,  10, -10,  30,   6, -19,  22,  -2 ],
   4: [   9,  10,   7,  -5, -20,  12,  21,  18,   7 ],
   5: [   7,   8,   5,  -6, -40,   3,  16, -14,   4 ],
   6: [   8,   6,   4,  -4,  40,   8,   4, -12,   3 ],
   7: [   6,   4,   3,   3, -15,   5,   8,  -8,   5 ],
   8: [   5,   7,  -1,  -3,  45,   6, -10,  10,   4 ],
   9: [  -2,   6,  -3,  -8, -20,   7,  10,  14,   6 ],
  10: [  11,  11,  -5,  -7,  30,  10, -11, -18,  -4 ],
  11: [  -5,  13,  -8,   6,  25,   4,  18, -22,  -4 ],
  12: [  -8, -10, -10, -15, -20, -20, -23, -25,  -7 ]
};

StocksAndBonds.bullMarket = {
   2: [  -2, -10,  -7,  -9,  -2,  -9,  -7, -16,  -4 ],
   3: [  26,  16,  25,   8, -14,  21,  14,  -4,  17 ],
   4: [  18,  23,  11,  12,  46,  18,  -5,  34,  15 ],
   5: [  23,  28,  -2,  11,  56,  19,  30,  29,  14 ],
   6: [  20,  15,  15,   7, -20,  15,  13, -10,  12 ],
   7: [  17,  21,  13,  -2,  37,  23,  23,  19,  14 ],
   8: [  19,  24,  17,   9,  -5,  26,  13,  -7,  15 ],
   9: [  11,  18,  14,  11,  67,  15,  22,  18,  13 ],
  10: [  13,  31,   1,  14, -11,  18,  18, -14,  10 ],
  11: [  14,  -8,  19,  -1,  -9,  25, -10,  13,  19 ],
  12: [  24,  24,  23,  20,  51,  27,  38,  33,  18 ]
};

$(function() {
  $('#next').click(function() {
    var isBull = getRandomInt(0, 1);
    if (isBull = 0) {
      StocksAndBonds.market = 'bearMarket';
    } else {
      StocksAndBonds.market = 'bullMarket';
    }
    StocksAndBonds.diceRoll = getRandomInt(1, 6) + getRandomInt(1, 6)
    $('#roll').html(StocksAndBonds.diceRoll);
    StocksAndBonds.year++;
    StocksAndBonds.iter = 0;
    
    fillInPrices('growth');
    fillInPrices('metro');
    fillInPrices('pioneer');
    fillInPrices('shady');
    fillInPrices('stryker');
    fillInPrices('tri-city');
    fillInPrices('united');
    fillInPrices('uranium');
    fillInPrices('valley');
  });
  
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function fillInPrices(company) {
    var lastYearPrice = 100;
    var didItSplit = false;
    if (StocksAndBonds.year > 2) {
      lastYearPrice = $('#' + company + ' td:nth-child(' + (StocksAndBonds.year - 1) + ')').html();
    }
    if (isNaN(lastYearPrice)) {
      lastYearPrice = lastYearPrice.substring(0, lastYearPrice.length-1);
    }
    var thisYearPrice = StocksAndBonds[StocksAndBonds.market][StocksAndBonds.diceRoll][StocksAndBonds.iter] + parseInt(lastYearPrice, 10);
    
    if (thisYearPrice > 150) {
      thisYearPrice = Math.floor(thisYearPrice / 2);
      didItSplit = true;
    }
    
    $('#' + company + ' td:nth-child(' + StocksAndBonds.year + ')').html(thisYearPrice);
    if (didItSplit) {
      $('#' + company + ' td:nth-child(' + StocksAndBonds.year + ')').append('*');
    }
    StocksAndBonds.iter++;
  }
});