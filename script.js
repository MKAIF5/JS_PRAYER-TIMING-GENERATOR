document.getElementById("check").addEventListener("click", function (event) {
  event.preventDefault();
  document.getElementById("answer").innerHTML = "";
  let cityName = document.getElementById("cityName").value;

  let nowCities = [
    "karachi",
    "lahore",
    "islamabad",
    "london",
    "paris",
    "berlin",
    "delhi",
    "moscow",
    "newyork",
    "dubai",
    "mumbai",
    "shanghai",
    "riyadh",
    "seoul",
    "tokyo",
    "dhaka",
    "tehran",
    "istanbul",
  ];

  if (!nowCities.includes(cityName)) {
    document.getElementById("answer").innerHTML =
      "Please enter a valid city name of Pakistan.";
    return;
  }

  let date = new Date().toISOString().slice(0, 10);
  const apiAnswer = `https://api.aladhan.com/v1/timingsByCity/${date}?city=${cityName}&country=Pakistan`;

  fetch(apiAnswer)
    .then((response) => response.json())
    .then((data) => {
      if (data.code === 200) {
        let timings = data.data.timings;
        let prayerTimes = `
          Fajr: ${timings.Fajr}<br>
          Dhuhr: ${timings.Dhuhr}<br>
          Asr: ${timings.Asr}<br>
          Maghrib: ${timings.Maghrib}<br>
          Isha: ${timings.Isha}
        `;
        document.getElementById("answer").innerHTML = `Date Of ${cityName} (${date}):<br>${prayerTimes}`;
      } else {
        document.getElementById(
          "answer"
        ).innerHTML = `Sorry, could not find prayer timings for ${cityName} (${date})`;
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      document.getElementById("answer").innerHTML = `Error: ${error.message}`;
    });
});
