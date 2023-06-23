async function fetchData() {
  try {
    const response = await fetch("../js/aes.json");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data; // 返回获取到的数据
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}
// 获取历史记录
const history_arr = sessionStorage.getItem("history_arr");

// 获取城市代码
(async () => {
  const res = await fetchData(); // 调用函数并等待结果

  if (res) {
    const list = document.querySelector(".main>.list");
    // 搜索列表
    const search_list = document.querySelector(".main>.search_list");
    // 历史记录
    const history_list = document.querySelector(".history .list");
    // 清除历史记录按钮
    const del_history_list = document.querySelector(".history img");
    // 热门城市
    const hot_list = document.querySelector(".hotList .list");
    // 输入框
    const input = document.querySelector("input");
    // 取消
    const cancellation = document.querySelector(".cancellation");

    // 隐藏搜索列表
    search_list.style.display = "none";

    // 监听input输入事件
    input.addEventListener("input", function (event) {
      console.log("Input changed to:", event.target.value);
      // 隐藏列表选项
      list.style.display = "none";

      let query = event.target.value;

      // 处理json数据
      const data = {};

      for (const key in res) {
        for (const s_key in res[86]) {
          data[s_key] = {
            name: res[86][s_key],
            citys: {},
          };
          for (const q_key in res[s_key]) {
            data[s_key].citys[q_key] = {
              name: res[s_key][q_key],
              area: res[q_key],
            };
          }
        }
      }

      //   拿到处理完以后的数组
      const search_list_arr = searchLocation(data, query);

      search_list.style.display = "block";

      search_list.innerHTML = search_list_arr.join("");
    });

    // 取消
    cancellation.addEventListener("click", () => {
      location.href = "../index.html";
    });

    // 热门城市列表
    const hotList = [
      {
        city_code: "11",
        city_name: "北京",
      },
      {
        city_code: "31",
        city_name: "上海",
      },
      {
        city_code: "440100000000",
        city_name: "广州",
      },
      {
        city_code: "440300000000",
        city_name: "深圳",
      },
      {
        city_code: "410100000000",
        city_name: "郑州",
      },
      {
        city_code: "610100000000",
        city_name: "西安",
      },
      {
        city_code: "320100000000",
        city_name: "南京",
      },
      {
        city_code: "330100000000",
        city_name: "杭州",
      },
      {
        city_code: "420100000000",
        city_name: "武汉",
      },
      {
        city_code: "510100000000",
        city_name: "成都",
      },
      {
        city_code: "210100000000",
        city_name: "沈阳",
      },
      {
        city_code: "12",
        city_name: "天津",
      },
    ];

    if (history_arr) {
      const history_city = uniqueByProperty(
        JSON.parse(history_arr),
        "city_code"
      );
      for (const item of history_city) {
        // 渲染历史记录
        const pElement = document.createElement("p");
        pElement.textContent = item.city_name;

        const code = item.city_code;

        // 绑定点击事件
        pElement.addEventListener("click", () => {
          handlePClick(code, item.city_name);
        });

        history_list.appendChild(pElement);
      }
    }

    // 清除历史记录
    del_history_list.addEventListener("click", () => {
      history_list.innerHTML = "";
      sessionStorage.removeItem("history_arr");
    });

    // 渲染热门城市
    for (const item of hotList) {
      const pElement = document.createElement("p");
      pElement.textContent = item.city_name;

      const code = item.city_code;

      // 绑定点击事件
      pElement.addEventListener("click", () => {
        handlePClick(code, item.city_name);
      });

      hot_list.appendChild(pElement);
    }
  }
})();

function searchLocation(data, query) {
  const results = [];
  for (let provinceCode in data) {
    const province = data[provinceCode];
    const provinceName = province.name;
    const cities = province.citys;

    if (provinceName.includes(query)) {
      results.push(...buildPaths(provinceName, cities, query));
    }

    if (cities) {
      for (let cityCode in cities) {
        const city = cities[cityCode];
        const cityName = city.name;
        const districts = city.area;

        if (cityName.includes(query)) {
          results.push(
            ...buildPaths(`${provinceName}/${cityName}`, districts, query)
          );
        }

        if (districts) {
          for (let districtCode in districts) {
            const districtName = districts[districtCode];

            if (districtName.includes(query)) {
              results.push(
                highlight(
                  `${provinceName}/${cityName}/${districtName}`,
                  query,
                  districtCode + "000000",
                  districtName
                )
              );
            }
          }
        }
      }
    }
  }

  return results;
}

function buildPaths(parentPath, childrenData, query) {
  let paths = [];
  for (let childCode in childrenData) {
    const child = childrenData[childCode];
    const childName = child.name || child;
    const childPath = `${parentPath}/${childName}`;
    const lastCode = childCode + "000000";
    paths.push(highlight(childPath, query, lastCode, childName));

    if (child.area) {
      paths.push(...buildPaths(childPath, child.area, query));
    }
  }

  return paths;
}

function handlePClick(code, name) {
  console.log(code, name);
  const city = {
    city_code: code,
    city_name: name,
  };
  if (history_arr) {
    const history_city = uniqueByProperty(JSON.parse(history_arr), "city_code");

    history_city.push(city);
    sessionStorage.setItem("history_arr", JSON.stringify(history_city));
  } else {
    const arr = []
    arr.push(city)
    sessionStorage.setItem("history_arr", JSON.stringify(arr));
  }

  location.href = "../index.html?code=" + code;
}

function highlight(path, query, code, name) {
  return `<p onclick="handlePClick('${code}', '${name}')">${path.replace(
    query,
    `<span style='color: #f00'>${query}</span>`
  )}</p>`;
}

// 去重
function uniqueByProperty(arr, prop) {
  const seen = new Set();

  return arr.filter((item) => {
    const value = item[prop];
    const isDuplicate = seen.has(value);
    seen.add(value);
    return !isDuplicate;
  });
}
