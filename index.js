// const cityLookup = lookupViaCity("Chicago");
// console.log(cityLookup);

$(document).ready(async function () {
  //ed5f1f55c52f0d9ef61f594d6b513de3
  // fetch(
  //   `http://api.timezonedb.com/v2.1/list-time-zone?key=0FICLL0V72S3&format=xml&city=Calgary`
  // )
  //   .then((value) => {
  //     return value.json();
  //   })
  //   .then((value) => {
  //     console.log(value);
  //   });
  $("body").fadeIn(3000).css("display", "flex");
  let searchshow = false;

  async function data(city, units) {
    let info = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ed5f1f55c52f0d9ef61f594d6b513de3&units=metric&lang=en`
    );

    let json = await info.json();
    console.log(json);
    if (json["message"] == "city not found") {
      $("#error").show();
      return false;
    }

    return json;
  }

  $("#searchWeather").click(async () => {
    $("#search").hide("slow");
    searchshow = false;

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

      $("#cityheader").text(`Weather Condition in ${input_info.City}`);
      let tempInfo = dataJson["main"];
      console.log(dataJson);
      let { tempNormal, feelslike, temp_min, temp_max, pressure, humidity } =
        tempInfo;
      feelslike = tempInfo["feels_like"];
      tempNormal = tempInfo["temp"];
      let timezoned = dataJson["timezone"];
      const offsetInSeconds = timezoned;

      let Fl = document.getElementById("FeelsLike");
      Fl.innerHTML = `${feelslike}\u00B0`;
      let MT = document.getElementById("MaximumTemperature");
      MT.innerHTML = `${temp_max}\u00B0`;
      let curr = document.getElementById("CurrentTemperature");
      curr.innerHTML = `${tempNormal}\u00B0`;
      let minT = document.getElementById("MinimumTemperature");
      minT.innerHTML = `${temp_min}\u00B0`;
      let hum = document.getElementById("Humidity");
      hum.innerHTML = `${humidity}`;

      setInterval(() => {
        const date = new Date();
        date.setSeconds(date.getSeconds() + offsetInSeconds);
        date.setHours(date.getHours() + 6);
        const time = date.toTimeString().split(" ")[0];
        LocalTime.innerHTML = `${time}`;
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
