$(document).ready(async function () {
  //ed5f1f55c52f0d9ef61f594d6b513de3
  let tempInfo;
  let cloudInfo;

  async function data(city, units) {
    console.log(city);
    console.log(units);
    try {
      let info = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ed5f1f55c52f0d9ef61f594d6b513de3&units=${units}&lang=en`
      );
      let json = await info.json();
      console.log(json);
      return json;
    } catch (error) {
      console.log(error);
    }
  }

  $("#searchWeather").click(async () => {
    event.preventDefault();
    event.stopPropagation();
    let input_info = {
      City: $("#city-input").val(),
      Units: $("#units-input").val(),
    };

    dataJson = await data(input_info.City, input_info.Units);
    tempInfo = dataJson["main"];
    console.log(tempInfo);
    let { tempNormal, feelslike, temp_min, temp_max, pressure, humidity } =
      tempInfo;
    feelslike = tempInfo["feels_like"];
  });
});
