const packageType = document.getElementById('form_pckg_type');
const lessonLength = document.getElementById('form_lesson_length');
const numOfStudents = document.getElementById('form_num_of_students');
const pricingCards = document.getElementsByClassName('pricing-card');

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

const getButtonState = (btnClassName) => {
  const btn = document.getElementsByClassName(btnClassName)[0];
  return btn.classList.contains(btnClassName + '-active') ? true : false;
};

const changeNumberOfMinutes = () => {
  switchButton('time-switcher-button');
  if (getButtonState('time-switcher-button')) {
    lessonLength.value = "90";
  } else {
    lessonLength.value = "60";
  }
}

const changeNumberOfStudents = () => {
  switchButton('student-switcher-button');
  if (getButtonState('student-switcher-button')) {
    numOfStudents.value = "2-3";
  } else {
    numOfStudents.value = "1";
  }
};

/* changes package type in the contact form */
const changePackageTypeSelection = target => {
    const targetClasses = target.classList;
    if(targetClasses.contains('pckg-trailblazer')) {
      packageType.value = "trailblazer";
    } else if(targetClasses.contains('pckg-achiever')) {
      packageType.value = "achiever";
    } else if(targetClasses.contains('pckg-binge-learner')) {
      packageType.value = "binge-learner";
    }
  };

for(const pricingCard of pricingCards) {
  pricingCard.addEventListener('click', event => changePackageTypeSelection(event.target));
}

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
