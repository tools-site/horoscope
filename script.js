const zodiacSigns = [
  {
    name: "白羊座",
    image: "images/aries.png",
    birthday: "3月21日 - 4月19日",
  },
  {
    name: "金牛座",
    image: "images/taurus.png",
    birthday: "4月20日 - 5月20日",
  },
  {
    name: "双子座",
    image: "images/gemini.png",
    birthday: "5月21日 - 6月21日",
  },
  {
    name: "巨蟹座",
    image: "images/cancer.png",
    birthday: "6月22日 - 7月22日",
  },
  {
    name: "狮子座",
    image: "images/leo.png",
    birthday: "7月23日 - 8月22日",
  },
  {
    name: "处女座",
    image: "images/virgo.png",
    birthday: "8月23日 - 9月22日",
  },
  {
    name: "天秤座",
    image: "images/libra.png",
    birthday: "9月23日 - 10月23日",
  },
  {
    name: "天蝎座",
    image: "images/scorpio.png",
    birthday: "10月24日 - 11月22日",
  },
  {
    name: "射手座",
    image: "images/sagittarius.png",
    birthday: "11月23日 - 12月21日",
  },
  {
    name: "摩羯座",
    image: "images/capricorn.png",
    birthday: "12月22日 - 1月19日",
  },
  {
    name: "水瓶座",
    image: "images/aquarius.png",
    birthday: "1月20日 - 2月18日",
  },
  {
    name: "双鱼座",
    image: "images/pisces.png",
    birthday: "2月19日 - 3月20日",
  },
];

function dateFormat(date, fmt) {
  let ret;
  const opt = {
    "Y+": date.getFullYear().toString(),
    "m+": (date.getMonth() + 1).toString(),
    "d+": date.getDate().toString(),
    "H+": date.getHours().toString(),
    "M+": date.getMinutes().toString(),
    "S+": date.getSeconds().toString(),
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
      );
    }
  }
  return fmt;
}

async function getHoroscope() {
  const apiUrl = `https://tools-site.github.io/horoscope/raw/${dateFormat(
    new Date(),
    "YYYmmdd"
  )}.json`;
  try {
    const response = await fetch(apiUrl);
    const datas = await response.json();
    return datas;
  } catch (error) {
    console.error("获取运势失败:", error);
    return {};
  }
}

function createZodiacGrid() {
  const grid = document.querySelector("#zodiacGrid");
  zodiacSigns.forEach((sign) => {
    const button = document.createElement("button");
    button.className = "zodiac-button";
    button.innerHTML = `
              <img src="${sign.image}" alt="${sign.name}" />
              <span>${sign.name}</span>
          `;
    button.addEventListener("click", () => selectZodiac(sign));
    grid.appendChild(button);
  });
  document.querySelector(".zodiac-button").click();
}

function selectZodiac(sign) {
  const selectedZodiacElement = document.querySelector("#selectedZodiac");
  selectedZodiacElement.innerHTML = `
          <img src="${sign.image}" alt="${sign.name}" />
          <div>
              <h3>${sign.name}</h3>
              <p>${sign.birthday}</p>
          </div>
      `;
  selectedZodiacElement.style.display = "flex";
  document.getElementById("fortuneSection").style.display = "block";
  showFortune("today", sign.name);
}

function updateActiveZodiacButton(zodiacName) {
  document.querySelectorAll(".zodiac-button").forEach((button) => {
    button.classList.toggle(
      "active",
      button.querySelector("span").textContent === zodiacName
    );
  });
}

async function showFortune(type, signName) {
  const content = document.getElementById("fortuneContent");
  const horoscopeData = await getHoroscope();
  const signData = horoscopeData?.[type]?.[signName];
  let summary = signData["summary"];
  if (type === "week") {
    let health = `健康： ${signData["health"]}`;
    let work = `事业： ${signData["work"]}`;
    let love = `爱情： ${signData["love"]}`;
    let money = `财富 ${signData["money"]}`;
    summary = `${health}\n${work}\n${love}\n${money}`;
  }
  content.textContent = summary;
  updateActiveTabButton(type);
  updateActiveZodiacButton(signName);
}

function updateActiveTabButton(type) {
  document.querySelectorAll(".tab-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === type);
  });
}

function tabButtonClicked(event) {
  const type = event.target.dataset.tab;
  const zodiac = document.querySelector(".zodiac-button.active");
  signName = zodiac.querySelector("span").textContent;
  showFortune(type, signName);
}

function addTabButtonListener() {
  document.querySelectorAll(".tab-button").forEach((button) => {
    button.addEventListener("click", tabButtonClicked);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  createZodiacGrid();
  addTabButtonListener();
});
