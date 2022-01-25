// Varialbles
// Setting set mesurement being used.
var setting = "metric";

// Variables entered by user
var sex = "man";
var age = 0;
var heigth = 0;
var weigth = 0;
var activityLevel = 1;
var bmr = 0;


function changeToMetric() {
  if (setting !== "metric") {
    setting = "metric";

    // Value Conversion
    updateImperialValue();
    convertImperialToMetric();

    // CSS adaptation
    document.getElementById("imperial-form").style.display = "none";
    document.getElementById("metric-form").style.display = "block";
    document.getElementById("container").style.backgroundColor = "#264653";

    //Display Values
    document.getElementById("meters").value = Math.floor(heigth / 100);
    document.getElementById("cm").value = Math.round(heigth % 100);
    document.getElementById("kg").value = Math.round(weigth);
  }
}

function changeToImperial() {
  if (setting !== "imperial") {
    setting = "imperial";

    // Value Conversion
    updateMetricValue();
    convertMetricToImperial();

    // CSS adaptation
    document.getElementById("metric-form").style.display = "none";
    document.getElementById("imperial-form").style.display = "block";
    document.getElementById("container").style.backgroundColor = "#e76f51";

    // Display Values
    document.getElementById("feet").value = Math.floor(heigth / 12);
    document.getElementById("inches").value = Math.round(heigth % 12);
    document.getElementById("pounds").value = Math.round(weigth);
  }
}

function calculateBMR() {
  sex = document.getElementById("gender").value;
  age = parseInt(document.getElementById("age").value);
  activityLevel = parseInt(document.querySelector('input[name="activityLevel"]:checked').value);

  // Look into the setting selected by the user.
  if (setting == "metric") {
    updateMetricValue();
  } else {
    updateImperialValue();
    convertImperialToMetric();
  }

  // BRM Calculation
  if (sex == "man") {
    bmr = (10 * weigth) + (6.25 * heigth) - (5 * age) + 5;
  } else {
    bmr = (10 * weigth) + (6.25 * heigth) - (5 * age) - 161;
  }

  // Adapt BMR based on activity level
  switch (activityLevel) {
    case 1:
      bmr *= 1.2;
      break;
    case 2:
      bmr *= 1.4;
      break;
    case 3:
      bmr *= 1.5;
      break;
    case 4:
      bmr *= 1.8;
      break;
    case 5:
      bmr *= 1.9;
      break;
  }

  // Display resutl on page (Daily calorie intake)
  if (isNaN(bmr)){
    document.getElementById("result-text").innerHTML = ("Please make sure you fill every fields.");
  } else {
    document.getElementById("result-text").innerHTML = ("Your current BMR is " + Math.round(bmr) + " calories daily.");
  }
}

function updateMetricValue() {
  heigth = parseInt(document.getElementById("meters").value);
  heigth *= 100;
  heigth = heigth + parseInt(document.getElementById("cm").value);
  weigth = parseInt(document.getElementById("kg").value);
}

function updateImperialValue() {
  heigth = parseInt(document.getElementById("feet").value);
  heigth *= 12;
  heigth = heigth + parseInt(document.getElementById("inches").value);
  weigth = parseInt(document.getElementById("pounds").value);
}

function convertImperialToMetric() {
  heigth *= 2.54; // 1 inches = 2.54 cm
  weigth /= 2.205; // 1 kg = 2.205 pounds;
}

function convertMetricToImperial() {
  heigth /= 2.54; // 1 inches = 2.54 cm
  weigth *= 2.205; // 1 kg = 2.205 pounds;
}
