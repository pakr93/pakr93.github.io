
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

const hidePlans = plans => {
  togglePlans(plans, false);
};

const showPlans = plans => {
  togglePlans(plans, true);
};

/**
  timeButton false = 60 minutes
  timeButton true = 90 minutes

  studentButton false = 1 student
  studentButton true = 2-3 students
 */
const changePlans = (timeButton, studentButton) => {
  if (timeButton && studentButton) {
    const plans = document.getElementsByClassName('more-students 90-minutes');
    showPlans(plans, true);
  } else if (!timeButton && studentButton) {
    const plans = document.getElementsByClassName('more-students 60-minutes');
    showPlans(plans, true);
  } else if (timeButton && !studentButton) {
    const plans = document.getElementsByClassName('one-student 90-minutes');
    showPlans(plans, true);
  } else if (!timeButton && !studentButton) {
    const plans = document.getElementsByClassName('one-student 60-minutes');
    showPlans(plans, true);
  }
};

// changes the pricing table when any of the buttons changes its state
const changePricingTable = () => {
  const isTimeButtonActive = document.getElementsByClassName('time-switcher-button')[0].classList.contains('time-switcher-button-active');
  const isStudentButtonActive = document.getElementsByClassName('student-switcher-button')[0].classList.contains('student-switcher-button-active');

  const plans = document.getElementsByClassName('price-bundle-section');
  hidePlans(plans);

  changePlans(isTimeButtonActive, isStudentButtonActive);
};

changePricingTable();
