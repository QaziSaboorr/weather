$(document).ready(async function () {
  //ed5f1f55c52f0d9ef61f594d6b513de3
  //6b1039e5e08149ff965e11bb07eed771
  let IntervalId = null;
  async function time(lat, long) {
    let whole = await fetch(
      `https://api.ipgeolocation.io/timezone?apiKey=6b1039e5e08149ff965e11bb07eed771&lat=${lat}&long=${long}`
    );
    let json = await whole.json();

    return json["time_12"];
  }

  $("body").fadeIn(3000).css("display", "flex");
  let searchshow = false;

  async function data(city, units) {
    let info = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ed5f1f55c52f0d9ef61f594d6b513de3&units=metric&lang=en`
    );

    let json = await info.json();

    if (json["message"] == "city not found") {
      $("#error").show();
      return false;
    }

    return json;
  }

  async function Pic() {
    let imageInfo = await fetch("https://openweathermap.org/img/wn/10d@2x.png");
    let imageblob = await imageInfo.blob();
    return imageblob;
  }

  $("#searchWeather").click(async () => {
    let LocalTime = document.getElementById("LocalTime");
    LocalTime.innerHTML = ``;
    $("#search").hide("slow");
    searchshow = false;
    clearInterval(null);

    $("#grid").fadeIn(5000).css("display", "grid");

    event.preventDefault();
    event.stopPropagation();
    let input_info = {
      City: $("#city-input").val(),
      Units: $("#units-input").val(),
    };

    dataJson = await data(input_info.City, input_info.Units);

    if (dataJson != false) {
      $("#error").hide();

      if (IntervalId != null) {
        clearInterval(IntervalId);
      }

      let image = $("#cityheader").text(
        `Weather Condition in ${input_info.City}`
      );
      let tempInfo = dataJson["main"];
      console.log(dataJson);
      let { tempNormal, feelslike, temp_min, temp_max, pressure, humidity } =
        tempInfo;
      feelslike = tempInfo["feels_like"];
      tempNormal = tempInfo["temp"];
      const imageInfo = Pic();

      let lang = dataJson["coord"].lon;
      let lat = dataJson["coord"].lat;
      const time_12 = await time(lat, lang);
      let Fl = document.getElementById("FeelsLike");
      Fl.innerHTML = `${feelslike}\u00B0C`;
      let MT = document.getElementById("MaximumTemperature");
      MT.innerHTML = `${temp_max}\u00B0C`;
      let curr = document.getElementById("CurrentTemperature");
      curr.innerHTML = `${tempNormal}\u00B0C`;
      let minT = document.getElementById("MinimumTemperature");
      minT.innerHTML = `${temp_min}\u00B0C`;
      let hum = document.getElementById("Humidity");
      hum.innerHTML = `${humidity}%`;

      IntervalId = setInterval(async () => {
        const time_12 = await time(lat, lang);

        LocalTime.innerHTML = ``;
        LocalTime.innerHTML = time_12 + 1;
      }, 1000);
    } else {
      if (searchshow === false) {
        $("#search").show("slow");
        searchshow = true;
      }
      $("#cityheader").text(``);
      let Fl = document.getElementById("FeelsLike");
      Fl.innerHTML = ``;
      let MT = document.getElementById("MaximumTemperature");
      MT.innerHTML = ``;
      let curr = document.getElementById("CurrentTemperature");
      curr.innerHTML = ``;
      let minT = document.getElementById("MinimumTemperature");
      minT.innerHTML = ``;
      let hum = document.getElementById("Humidity");
      hum.innerHTML = ``;
      let LocalTime = document.getElementById("LocalTime");
      LocalTime.innerHTML = ``;
    }
  });

  $("#searchbutton").click(() => {
    if (searchshow === false) {
      $("#search").show("slow");
      searchshow = true;
    } else {
      $("#search").hide("slow");
      searchshow = false;
    }
  });

  $("#lightbutton").click(() => {
    $("body").toggleClass("light");
    $(".boxes").toggleClass("boxesborder");
  });
});
