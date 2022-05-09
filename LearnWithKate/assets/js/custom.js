// mark today with a red border-top & red border-bottom to let the user know what day it is
const tagToday = (day) => {
  // list of all days in the week
  const todayRow = document.getElementsByClassName("opening-hours-row")[day === 0 ? 6 : (day - 1)];

  // mark today in the opening hours
  todayRow.classList.add("today-opening-hours");

  // show today tag
  const today = todayRow.getElementsByTagName("th")[0];
  today.innerHTML = `<span class='text-green'>TODAY</span>`;

  if(today.classList.contains('cs')) {
    today.innerHTML = `<span class='text-green'>DNES</span>`;
  }
};

const closeNavBar = () => {
  const navbar = document.getElementById("navbar-mobile");
  const backdrop = document.getElementsByClassName("offcanvas-backdrop")[0];

  navbar.classList.remove("show");
  backdrop.classList.remove("show");
};

const switchButton = buttonClassName => {
  const button = document.getElementsByClassName(buttonClassName);
  if(button[0].classList.contains(buttonClassName + '-active')) {
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
  if(isActive) {
    for(const plan of plans) {
      plan.classList.remove('plan-hidden');
    }
  } else {
    for(const plan of plans) {
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
  if(timeButton && studentButton) {
    const plans = document.getElementsByClassName('more-students 90-minutes');
    showDesiredPlans(plans, true);
  } else if(!timeButton && studentButton) {
    const plans = document.getElementsByClassName('more-students 60-minutes');
    showDesiredPlans(plans, true);
  } else if(timeButton && !studentButton) {
    const plans = document.getElementsByClassName('one-student 90-minutes');
    showDesiredPlans(plans, true);
  } else if(!timeButton && !studentButton) {
    const plans = document.getElementsByClassName('one-student 60-minutes');
    showDesiredPlans(plans, true);
  }
};

const changePricingTable = () => {
  const isTimeButtonActive = document.getElementsByClassName('time-switcher-button')[0].classList.contains('time-switcher-button-active');
  const isStudentButtonActive = document.getElementsByClassName('student-switcher-button')[0].classList.contains('student-switcher-button-active');

  const plans = document.getElementsByClassName('price-bundle-section');
  hideUndesiredPlans(plans);

  changeDesiredPlans(isTimeButtonActive,isStudentButtonActive);

};

changePricingTable();

tagToday(new Date().getDay());
