let currentUnit = 'metric';

function setUnit(unit) {
  currentUnit = unit;
  const btnMetric = document.getElementById('btnMetric');
  const btnImperial = document.getElementById('btnImperial');
  const heightInput = document.getElementById('height');
  const weightInput = document.getElementById('weight');
  const heightUnit = document.getElementById('heightUnit');
  const weightUnit = document.getElementById('weightUnit');

  if (unit === 'metric') {
    btnMetric.classList.add('active');
    btnImperial.classList.remove('active');
    heightUnit.textContent = 'cm';
    weightUnit.textContent = 'kg';
    heightInput.placeholder = '175';
    weightInput.placeholder = '70';
  } else {
    btnImperial.classList.add('active');
    btnMetric.classList.remove('active');
    heightUnit.textContent = 'in';
    weightUnit.textContent = 'lbs';
    heightInput.placeholder = '69';
    weightInput.placeholder = '154';
  }

  document.getElementById('resultCard').classList.remove('active');
}

function calculateBMI(event) {
  event.preventDefault();

  const height = parseFloat(document.getElementById('height').value);
  const weight = parseFloat(document.getElementById('weight').value);

  if (!height || !weight || height <= 0 || weight <= 0) return;

  let bmi = 0;
  if (currentUnit === 'metric') {
    const heightInMeters = height / 100;
    bmi = weight / (heightInMeters * heightInMeters);
  } else {
    bmi = (703 * weight) / (height * height);
  }

  const formattedBMI = bmi.toFixed(1);
  displayResult(formattedBMI);
}

function displayResult(bmi) {
  const resultCard = document.getElementById('resultCard');
  const bmiValueEl = document.getElementById('bmiValue');
  const bmiStatusEl = document.getElementById('bmiStatus');
  const bmiDescEl = document.getElementById('bmiDesc');

  bmiValueEl.textContent = bmi;
  bmiStatusEl.className = 'bmi-status';

  if (bmi < 18.5) {
    bmiStatusEl.textContent = 'Underweight';
    bmiStatusEl.classList.add('status-underweight');
    bmiDescEl.textContent = 'You are below the standard weight range.';
  } else if (bmi >= 18.5 && bmi < 25) {
    bmiStatusEl.textContent = 'Normal weight';
    bmiStatusEl.classList.add('status-normal');
    bmiDescEl.textContent = 'You are in a healthy weight range.';
  } else if (bmi >= 25 && bmi < 30) {
    bmiStatusEl.textContent = 'Overweight';
    bmiStatusEl.classList.add('status-overweight');
    bmiDescEl.textContent = 'You are slightly above the standard weight range.';
  } else {
    bmiStatusEl.textContent = 'Obese';
    bmiStatusEl.classList.add('status-obese');
    bmiDescEl.textContent = 'You are significantly above the standard weight range.';
  }

  resultCard.classList.add('active');
}