const signDateRanges = {
  "白羊座": "3月21日 - 4月19日",
  "金牛座": "4月20日 - 5月20日",
  "双子座": "5月21日 - 6月20日",
  "巨蟹座": "6月21日 - 7月22日",
  "狮子座": "7月23日 - 8月22日",
  "处女座": "8月23日 - 9月22日",
  "天秤座": "9月23日 - 10月22日",
  "天蝎座": "10月23日 - 11月21日",
  "射手座": "11月22日 - 12月21日",
  "摩羯座": "12月22日 - 1月19日",
  "水瓶座": "1月20日 - 2月18日",
  "双鱼座": "2月19日 - 3月20日",
};

async function getHoroscope() {
  const sign = document.getElementById("sign").value;
  const horoscopeResult = document.getElementById("horoscopeResult");
  const dateRange = document.getElementById("dateRange");
  const apiUrl = `https://tools-site.github.io/horoscope/raw/${dateFormat(new Date(), "YYYmmdd")}.json`;
  try {
    const response = await fetch(apiUrl);
    const datas = await response.json();
    const todayDatas = datas.today;
    const sinData = todayDatas[sign]
    horoscopeResult.textContent = `今日${sign}的运势：${sinData.summary}`;
    dateRange.textContent = `星座日期范围：${signDateRanges[sign]}`;
  } catch (error) {
    console.error("获取运势失败:", error);
    horoscopeResult.textContent = "获取运势失败，请稍后再试。";
  }
}

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
