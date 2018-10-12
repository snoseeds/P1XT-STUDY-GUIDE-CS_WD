/*
The following clarifications and reservations are what I've seen from the specifications in the phonePurchase project in chapter 1 of YDKJS - Up and Going

1) It is okay to go over the SPENDING_THRESHOLD value in order to buy an additional phone, while one shouldn't go over it because of wanting to buy an additional accessory. Let's agree that we can go on to buy the additional accessory irrespective of if adding its tax would make us go over the SPENDING_THRESHOLD. Of course, as said in #3, we also can't buy the additional accessory if adding its taxedAccessoryPrice to total amount would be more than bankBalance.

2) The stage at which the tax is being computed isn't right to me in his specification and solution, simply because it would have meant us having to do unnecessary back and forth in the case of the possibility that after only comparing our purchaseAmount to bankBalance in order to decide how many phones and accessories we can buy, we then get to a dead end by seeing that the finalPurchaseAmount (after adding tax to purchaseAmount) is more than the bankBalance, as that would mean that we can't end up buying up to the number of phones that we've computed that we can buy, and saying the client can't afford that is ambiguous and misleading, because he can definitely afford some of that.

3) Therefore, I'm to ensure that a phone or accessory is only ratified to be bought only after we have ascertained that we would be able to incur the finalPurchase of all what we've bought and what we are buying when their taxes have been added, and that is a function of their yet being less than our bankBalance.

4) Another quite wrong thing in the approach he used is to set the condition in the loop of buying more phones as amount < bankBalance, as passing that condition alone doesn't guarantee that the addition of the price of an additional phone wouldn't go beyond the bankBalance, in fact, it must go beyond it for the loop to stop running, and thus have we made the client unable to buy those number of phones that his bankBalance can normally afford.

4) Finally, the following codes would reflect the line of thought above. and would try printing a final slip showing the number of phones, no of accessories, unit price of phone, total amount spent on phones, unit price of accessory, total amount spent on accessories, total tax (no need to really separate the taxes since its the same tax rate that applies to both the phone and the accessory), finalPurchaseAmount, and probably remaining bankBalance.

*/

const PHONE_PRICE = 99.99;
const ACCESSORY_PRICE = 9.99;
const SPENDING_THRESHOLD = 250;
const TAX_RATE = 0.08;

var bankBalance = Number(prompt("What is your Bank Balance?"));
var amount = 0;
var noOfPhones = 0;
var noOfAccessories = 0;
var totalPhonePrice;
var totalAccesoryPrice;
var finalPurchaseAmount;
var totalTaxAmount;

function calculateTax(amt) {
  return amt * TAX_RATE;
}

function format(amt) {
  return "$" + amt.toFixed(2);
}

var taxedPhonePrice = PHONE_PRICE + calculateTax(PHONE_PRICE);
var taxedAccessoryPrice = ACCESSORY_PRICE + calculateTax(ACCESSORY_PRICE);


if (taxedPhonePrice < bankBalance) /*Having known that this would be tested below in the condition for the while loop, yet, This is to allow for a way to output the regret information through the else block*/{

  while ((amount + taxedPhonePrice)  < bankBalance) {
    amount += taxedPhonePrice;
    noOfPhones ++;

    if(((amount + ACCESSORY_PRICE) < SPENDING_THRESHOLD) && ((amount + taxedAccessoryPrice) < bankBalance)) {
      amount += taxedAccessoryPrice;
      noOfAccessories ++;
    }

  }


  totalPhonePrice = noOfPhones * PHONE_PRICE;
  totalAccesoryPrice = noOfAccessories * ACCESSORY_PRICE;
  totalTaxAmount = calculateTax(totalPhonePrice + totalAccesoryPrice);

  finalPurchaseAmount = format(amount);
  totalPhonePrice = format(totalPhonePrice);
  totalAccesoryPrice = format(totalAccesoryPrice);
  totalTaxAmount = format(totalTaxAmount);

  //Printing results
  if (noOfPhones > 1 && (noOfAccessories === 0 || noOfAccessories > 1)) {
    console.log("You've spent a total of " + finalPurchaseAmount + ", with the breakdown of: \n" + totalPhonePrice + ", spent for " + String(noOfPhones) + " phones, \n" + totalAccesoryPrice + ", spent for " + String(noOfAccessories) + " accessories, and \n" + totalTaxAmount + ", spent for taxes.");
  } else if (noOfPhones > 1 && noOfAccessories === 1) {
      console.log("You've spent a total of " + finalPurchaseAmount + ", with the breakdown of: \n" + totalPhonePrice + ", spent for " + String(noOfPhones) + " phones, \n" + totalAccesoryPrice + ", spent for " + String(noOfAccessories) + " accessory, and \n" + totalTaxAmount+ ", spent for taxes.");
  } else if (noOfPhones === 1 && noOfAccessories === 1) {
      console.log("You've spent a total of " + finalPurchaseAmount + ", with the breakdown of: \n" + totalPhonePrice + ", spent for " + String(noOfPhones) + " phone, \n" + totalAccesoryPrice + ", spent for " + String(noOfAccessories) + " accessory, and \n" + totalTaxAmount + ", spent for taxes.");
  } else /*noOfPhones === 1 and noOfAccessories ===0*/{
      console.log("You've spent a total of " + finalPurchaseAmount + ", with the breakdown of: \n" + totalPhonePrice + ", spent for " + String(noOfPhones) + " phone,\n" + totalAccesoryPrice + ", spent for " + String(noOfAccessories) + " accessories, and \n" + totalTaxAmount + ", spent for taxes.");
  }


  //Providing underlying information for convenient confirmation
  console.log("For your Information: \n Price of One Phone is " + format(PHONE_PRICE) + ". \n Price of One Accessory is " + format(ACCESSORY_PRICE) + ". \n Tax Rate for both Phones and Accessories is " + TAX_RATE + ".");

} else {
  console.log("Sorry, we regret to inform you that your bank Balance isn't enough to buy even one Taxed Phone!");
}
