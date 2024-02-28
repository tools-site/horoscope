const signDateRanges = {
  Aries: "3月21日 - 4月19日",
  Taurus: "4月20日 - 5月20日",
  Gemini: "5月21日 - 6月20日",
  Cancer: "6月21日 - 7月22日",
  Leo: "7月23日 - 8月22日",
  Virgo: "8月23日 - 9月22日",
  Libra: "9月23日 - 10月22日",
  Scorpio: "10月23日 - 11月21日",
  Sagittarius: "11月22日 - 12月21日",
  Capricorn: "12月22日 - 1月19日",
  Aquarius: "1月20日 - 2月18日",
  Pisces: "2月19日 - 3月20日",
};

async function getHoroscope() {
  const sign = document.getElementById("sign").value;
  const horoscopeResult = document.getElementById("horoscopeResult");
  const dateRange = document.getElementById("dateRange");
  const apiUrl = `http://web.juhe.cn:8080/constellation/getAll?consName=${sign}&type=today&key=360bd0afcae3e55a9ef02322cb5faa34`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    horoscopeResult.textContent = `今日${sign}的运势：${data.summary}`;
    dateRange.textContent = `星座日期范围：${signDateRanges[sign]}`;
  } catch (e) {
    console.error("获取运势失败:", error);
    horoscopeResult.textContent = "获取运势失败，请稍后再试。";
  }
}
