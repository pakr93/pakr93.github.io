
// round down to the nearest 10
const roundDown = (price) => {
  return Math.floor(price / 10) * 10;
}

// change price according to the Kate's pricing table
const changePrice = (prices, index, newPrice) => {
  prices[index].children[0].innerHTML = `<span>
  <span class='display-4'>${newPrice}</span> CZK</span>`;
};

const updateBundlePrices = () => {
  // prices for 1 bundle -> 1 student 60 minutes, 2-3 students 60 minutes, 1 student 90 minutes, 2-3 students 90 minutes
  const initialPrices = [3500, 3200, 5250, 4950];
  const discount = [3, 5, 7];
  const prices = document.getElementsByClassName('price-bundle-section');

  changePrice(prices, 4, 3 * roundDown(initialPrices[0] * ((100 - discount[0]) / 100)));
  changePrice(prices, 5, 3 * roundDown(initialPrices[1] * ((100 - discount[0]) / 100)));
  changePrice(prices, 6, 3 * roundDown(initialPrices[2] * ((100 - discount[0]) / 100)));
  changePrice(prices, 7, 3 * roundDown(initialPrices[3] * ((100 - discount[0]) / 100)));
  changePrice(prices, 8, 5 * roundDown(initialPrices[0] * ((100 - discount[1]) / 100)));
  changePrice(prices, 9, 5 * roundDown(initialPrices[1] * ((100 - discount[1]) / 100)));
  changePrice(prices, 10, 5 * roundDown(initialPrices[2] * ((100 - discount[1]) / 100)));
  changePrice(prices, 11, 5 * roundDown(initialPrices[3] * ((100 - discount[1]) / 100)));
  changePrice(prices, 12, 8 * roundDown(initialPrices[0] * ((100 - discount[2]) / 100)));
  changePrice(prices, 13, 8 * roundDown(initialPrices[1] * ((100 - discount[2]) / 100)));
  changePrice(prices, 14, 8 * roundDown(initialPrices[2] * ((100 - discount[2]) / 100)));
  changePrice(prices, 15, 8 * roundDown(initialPrices[3] * ((100 - discount[2]) / 100)));
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

togglePlans = (plans, isActive) => {
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
