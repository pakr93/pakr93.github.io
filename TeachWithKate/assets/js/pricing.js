// round down to the nearest 10
const roundDown = (price) => {
  return Math.floor(price / 100) * 100;
}

// change a price of a single bundle item
const changePrice = (prices, index, newPrice) => {
  prices[index].children[0].innerHTML = `<span><span class='display-4'>${newPrice}</span> CZK</span>`;
};

// change the prices of the whole bundle
const changeBundlePrices = (prices, indexStart, indexEnd, bundleNr, initialPrices, discount) => {
  const numberOfBundlePrices = 4;
  let counter = 0, index = indexStart;

  while(index <= indexEnd || counter < numberOfBundlePrices) {
    changePrice(prices, index, roundDown(bundleNr * initialPrices[counter] * ((100 - discount) / 100)));
     index++;
     counter++;
  }
};

const updateBundlePrices = () => {
  // prices for 1 bundle -> 1 student 60 minutes, 2-3 students 60 minutes, 1 student 90 minutes, 2-3 students 90 minutes
  const initialPrices = [3500, 3200, 5250, 4950];
  const discount = [0, 3, 5, 7];
  const prices = document.getElementsByClassName('price-bundle-section');

  changeBundlePrices(prices, 4, 7, 3, initialPrices, discount[1]);
  changeBundlePrices(prices, 8, 11, 5, initialPrices, discount[2]);
  changeBundlePrices(prices, 12, 15, 8, initialPrices, discount[3]);
};

updateBundlePrices();

const switchButton = buttonClassName => {
  const button = document.getElementsByClassName(buttonClassName);
  if (button[0].classList.contains(buttonClassName + '-active')) {
    button[0].classList.remove(buttonClassName + '-active');
    button[0].classList.add(buttonClassName + '-inactive');
  } else {
    button[0].classList.remove(buttonClassName + '-inactive');
    button[0].classList.add(buttonClassName + '-active');
  }
}

const changeNumberOfMinutes = () => {
  switchButton('time-switcher-button');
}

const changeNumberOfStudents = () => {
  switchButton('student-switcher-button');
};

const togglePlans = (plans, isActive) => {
  if (isActive) {
    for (const plan of plans) {
      plan.classList.remove('plan-hidden');
    }
  } else {
    for (const plan of plans) {
      plan.classList.add('plan-hidden');
    }
  }
};

const hideUndesiredPlans = plans => {
  togglePlans(plans, false);
};

const showDesiredPlans = plans => {
  togglePlans(plans, true);
};

/**
  timeButton false = 60 minutes
  timeButton true = 90 minutes

  studentButton false = 1 student
  studentButton true = 2-3 students
 */
const changeDesiredPlans = (timeButton, studentButton) => {
  if (timeButton && studentButton) {
    const plans = document.getElementsByClassName('more-students 90-minutes');
    showDesiredPlans(plans, true);
  } else if (!timeButton && studentButton) {
    const plans = document.getElementsByClassName('more-students 60-minutes');
    showDesiredPlans(plans, true);
  } else if (timeButton && !studentButton) {
    const plans = document.getElementsByClassName('one-student 90-minutes');
    showDesiredPlans(plans, true);
  } else if (!timeButton && !studentButton) {
    const plans = document.getElementsByClassName('one-student 60-minutes');
    showDesiredPlans(plans, true);
  }
};

// changes the pricing table when any of the buttons changes its state
const changePricingTable = () => {
  const isTimeButtonActive = document.getElementsByClassName('time-switcher-button')[0].classList.contains('time-switcher-button-active');
  const isStudentButtonActive = document.getElementsByClassName('student-switcher-button')[0].classList.contains('student-switcher-button-active');

  const plans = document.getElementsByClassName('price-bundle-section');
  hideUndesiredPlans(plans);

  changeDesiredPlans(isTimeButtonActive, isStudentButtonActive);
};

changePricingTable();
