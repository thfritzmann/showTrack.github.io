// JavaScript Class Functions
// These are functions used in web courses for Craig Miller
// Adapted random functions from Dave Read
//
// Revised February 2020

function roundMoney(amount)
// Given: a numeric value
// Returns: the given value rounded to the nearest hundredth
{
  return Math.round(amount * 100) / 100;
}

function round(amount, numDecimals)
// Given: a numeric value
//        a whole number equal or greater to 0
// Returns: the given value rounded to the number of decimals specified by
//          numDecimals
{
  return Math.round(amount * Math.pow(10, numDecimals)) 
             / Math.pow(10, numDecimals);
}


// The following are several routines for generating random values.


function randomNum(low, high)
// Given : low <= high
// Returns : a random number in the range [low, high)
{
    return Math.random()*(high-low) + low;
}

function randomInt(low, high)
// Given : low <= high
// Returns : a random integer in the range [low, high]
{
    return Math.floor(Math.random()*(high-low+1)) + low;
}

function randomChar(str)
// Given : str is a nonempty string
// Returns: a random character from the string
{
    return str.charAt(randomInt(0, str.length-1));
}

function randomOneOf(list)
// Given : list is a nonempty list (array)
// Returns: a random item from the list
{
    return list[randomInt(0, list.length-1)];
}

