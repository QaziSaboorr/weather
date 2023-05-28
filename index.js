//ed5f1f55c52f0d9ef61f594d6b513de3

async function data() {
  x = await fetch(
    " https://api.openweathermap.org/data/2.5/weather?q=Karachi&appid=ed5f1f55c52f0d9ef61f594d6b513de3&units=metric&lang=en"
  );
  y = await x.json();
  console.log(y);
}

data();
