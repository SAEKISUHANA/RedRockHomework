function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const result = {};

  for (let param of params.entries()) {
    result[param[0]] = param[1];
  }

  return result;
}
// 获取url上的参数
const urlParams = getUrlParams();
// 顶部点击城市搜索
const search = document.querySelector(".search");
// 城市
const city = document.querySelector("#city");
// 实时温度
const tem = document.querySelector("#tem");
// 实时天气
const wea = document.querySelector("#wea");
// 空气质量父盒子
const air_parent = document.querySelector('#air_parent')
// 空气质量
const air = document.querySelector("#air");
// 空气质量等级
const air_level = document.querySelector("#air_level");
// 气象预警
const alarm = document.querySelector("#alarm");
// 今天天气
const today_day_wea = document.querySelector("#today_day_wea");
// 今天气温
const today_day_tem = document.querySelector("#today_day_tem");
// 今天气温图片
const today_day_wea_img = document.querySelector("#today_day_wea_img");
// 明天天气
const tomorrow_day_wea = document.querySelector("#tomorrow_day_wea");
// 明天气温
const tomorrow_day_tem = document.querySelector("#tomorrow_day_tem");
// 明天气温图片
const tomorrow_day_wea_img = document.querySelector("#tomorrow_day_wea_img");
// 每小时天气
const hours = document.querySelector("#hours");
// 生活指数
const lifeItems = document.querySelectorAll(".swiper-slide");
// 生活指数弹框
const life_Bullet_box = document.querySelector(".life");
// 生活指数弹框--标题
const life_Bullet_box_title = document.querySelector(".life .title");
// 生活指数弹框--内容
const life_Bullet_box_text = document.querySelector(".life .text");
// 生活指数弹框--按钮
const life_Bullet_box_btn = document.querySelector(".life .btn");
// 初始隐藏弹框
life_Bullet_box.style.display = "none";

search.addEventListener("click", () => {
  location.href = "/html/search.html";
});

// echarts图表实例
const myChart = echarts.init(document.querySelector("#echarts_main"));

// 天气图片映射表
const imgObj = {
  // 白天
  tem_day: {
    xue: "../image/sports.png",
    lei: "../image/sports.png",
    shachen: "../image/sports.png",
    wu: "../image/sports.png",
    bingbao: "../image/sports.png",
    yun: "../image/day/yun.png",
    yu: "../image/day/yu.png",
    yin: "../image/day/yin.png",
    qing: "../image/day/qing.png",
  },
  //   晚上
  tem_night: {
    xue: "../image/sports.png",
    lei: "../image/sports.png",
    shachen: "../image/sports.png",
    wu: "../image/sports.png",
    bingbao: "../image/sports.png",
    yun: "../image/night/yun.png",
    yu: "../image/night/yu.png",
    yin: "../image/night/yin.png",
    qing: "../image/night/qing.png",
  },
};

// 生活指数映射表
const lifeObj = {
  lukuang: {
    img: "limit.png",
    color: "#B3BAE5",
  },
  fenghan: {
    img: "cloth.png",
    color: "#EDC7DA",
  },
  yusan: {
    img: "umbrella.png",
    color: "#C1A4E0",
  },
  ganmao: {
    img: "pill.png",
    color: "#85C988",
  },
  xiche: {
    img: "washcar.png",
    color: "#5CFB67",
  },
  yundong: {
    img: "sports.png",
    color: "#E6D99D",
  },
  fangshai: {
    img: "sun.png",
    color: "#FFD95F",
  },
  diaoyu: {
    img: "diaoyu.png",
    color: "#A3DFD4",
  },
  lvyou: {
    img: "lvyou.png",
    color: "#EDB19D",
  },
  jiaotong: {
    img: "car.png",
    color: "#8599A6",
  },
  wuran: {
    img: "wuran.png",
    color: "#4FC3F7",
  },
  shushidu: {
    img: "smile.png",
    color: "#96D099",
  },
  liangshai: {
    img: "liangshai.png",
    color: "#ADBFD0",
  },
  huazhuang: {
    img: "kouhong.png",
    color: "#ECBEBE",
  },
  chenlian: {
    img: "chenlian.png",
    color: "#C1E1ED",
  },
  guomin: {
    img: "cold.png",
    color: "#A6AFDD",
  },
};

const _this = this;

// 判断当前时间是白天还是晚上
function DayOrNight(time) {
  const currentHour = time.slice(0, 2);

  if (currentHour >= 6 && currentHour < 18) {
    return "tem_day";
  }
  return "tem_night";
}

// 今日天气
let today_url =
  "https://v0.yiketianqi.com/api?unescape=1&version=v63&appid=91523636&appsecret=QG3HzEwV";
if (urlParams.code) {
  today_url += `&adcode=${urlParams.code}`;
}
fetch(today_url)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json(); // 如果响应是 JSON 格式
  })
  .then((res) => {
    // 当前城市
    _this.city.innerHTML = res.city;
    // 当前温度
    _this.tem.innerHTML = res.tem;
    // 当前天气
    _this.wea.innerHTML = res.wea;
    // 根据空气质量改变颜色
    _this.air_parent.style.backgroundColor =  res.air_level === '优' ? '#A3D765' : res.air_level === '良' ? '#f0cc35' : '#f00'
    // 当前空气质量指数
    _this.air.innerHTML = res.air;
    // 当前空气质量等级
    _this.air_level.innerHTML = res.air_level;
    // "alarm":[
    //     {
    //         "alarm_type":"雷电",
    //         "alarm_level":"黄色",
    //         "alarm_title":"上海市嘉定区发布雷电黄色预警",
    //         "alarm_content":"嘉定区气象局2021年08月12日11时05分发布雷电黄色预警[Ⅲ级/较重]：预计今天半夜以前我区将出现雷电活动，局地可能伴有1小时最大雨强40-60mm的短时强降水，请加强防范。（预警信息来源：国家预警信息发布中心）"
    //     },
    //     {
    //         "alarm_type":"雷电",
    //         "alarm_level":"黄色",
    //         "alarm_title":"上海市发布雷电黄色预警",
    //         "alarm_content":"上海中心气象台2021年08月12日11时00分发布雷电黄色预警[Ⅲ级/较重]：预计今天半夜以前本市大部地区将出现雷电活动，局地可能伴有1小时最大雨强40-60mm的短时强降水，请加强防范。（预警信息来源：国家预警信息发布中心）"
    //     }
    // ]
    // 判断是否隐藏预警
    if (!res?.alarm?.length) {
      _this.alarm.style.display = "none";
    } else {
      _this.alarm.innerHTML = res.alarm[0].alarm_type + "预警";
    }

    // 顶部文字滚动轮播
    dataArr = [`湿度 ${res.humidity}`, `${res.win} ${res.win_speed}`];
    textScroll(dataArr);

    // 每小时天气
    let str = "";
    for (const item of res.hours) {
      str += `
            <div>
                <p>${item.hours}</p>
                <img src="${
                  imgObj[DayOrNight(item.hours)][item.wea_img]
                }" alt="">
                <p>${item.tem}°</p>
            </div>
        `;
    }

    _this.hours.innerHTML = str;

    // dom转图片, 功能调试正常
    // const node = document.querySelector("#header");
    // 找到要包含的隐藏元素
    // let hiddenImg = node.querySelector('img[style*="display: none;"]');

    // 临时显示该元素
    // hiddenImg.style.display = "block";

    // domtoimage
    //   .toPng(node)
    //   .then(function (dataUrl) {
    //     let img = new Image();
    //     img.src = dataUrl;
    //     document.body.appendChild(img);

        // 图片生成后，再将元素隐藏
    //     hiddenImg.style.display = "none";
    //   })
    //   .catch(function (error) {
    //     console.error("oops, something went wrong!", error);
    //   });
  })
  .catch((error) =>
    console.error("There has been a problem with your fetch operation:", error)
  );

// 7日天气
let sevenDay_url =
  "https://v0.yiketianqi.com/api?unescape=1&version=v91&appid=91523636&appsecret=QG3HzEwV";
if (urlParams.code) {
  sevenDay_url += `&adcode=${urlParams.code}`;
}
fetch(sevenDay_url)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json(); // 如果响应是 JSON 格式
  })
  .then((res) => {
    const { data } = res;
    // 今天天气
    _this.today_day_wea.innerHTML = data[0].wea;
    // 今天温度
    _this.today_day_tem.innerHTML = data[0].tem1 + "/" + data[0].tem2;
    // 今天天气图片
    _this.today_day_wea_img.innerHTML = imgObj.tem_day[data[0].wea_img];
    // 明天天气
    _this.tomorrow_day_wea.innerHTML = data[1].wea;
    // 明天温度
    _this.tomorrow_day_tem.innerHTML = data[1].tem1 + "/" + data[1].tem2;
    // 明天天气图片
    _this.tomorrow_day_wea_img.innerHTML = imgObj.tem_day[data[1].wea_img];

    // 星期转换
    const days = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
    const EChartsDayData = [
      "今天",
      "明天",
      "后天",
      days[new Date(data[3].date).getDay() - 1],
      days[new Date(data[4].date).getDay() - 1],
      days[new Date(data[5].date).getDay() - 1],
      days[new Date(data[6].date).getDay() - 1],
    ];

    // 日期截取并转换
    const formattedDate = [];

    for (let i = 0; i < 7; i++) {
      const originalDate = data[i].date;
      const dateParts = originalDate.split("-"); // 分割字符串为 ["2023", "06", "23"]
      const dataStr = `${dateParts[1]}/${dateParts[2]}`; // 使用月份和日期部分组合成新格式
      formattedDate.push(dataStr);
    }

    // 天气图标
    const weaImgData = data.map((item) => {
      return {
        wea_day_img: imgObj.tem_day[item.wea_day_img],
        wea_night_img: imgObj.tem_night[item.wea_night_img],
      };
    });

    // echarts配置项
    const option = {
      // 背景色
      backgroundColor: "#fff",
      textStyle: {
        // color: '#aaa',
        fontSize: 14,
      },
      // 直角坐标系内绘图网格
      grid: {
        // 是否显示直角坐标系网格
        show: true,
        backgroundColor: "transparent",
        opacity: 0.3,
        borderWidth: "0",
        height: 110,
        top: "190",
        bottom: "180",
      },
      // 提示框组件
      tooltip: {
        trigger: "axis",
      },
      // 图例组件
      legend: {
        show: false,
      },
      // 直角坐标系 grid 中的 x 轴
      xAxis: [
        // 星期
        {
          type: "category",
          boundaryGap: false,
          position: "top",
          offset: 140,
          zlevel: 100,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            interval: 0,
            formatter: ["{a|{value}}"].join("\n"),
            rich: {
              a: {
                color: "#aaa",
                fontSize: 14,
              },
            },
          },
          nameTextStyle: {},
          data: EChartsDayData,
        },
        // 日期
        {
          type: "category",
          boundaryGap: false,
          position: "top",
          offset: 120,
          zlevel: 100,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          data: formattedDate,
          axisLabel: {
            interval: 0,
            formatter: ["{a|{value}}"].join("\n"),

            rich: {
              a: {
                color: "#aaa",
                fontSize: 14,
              },
            },
          },
          nameTextStyle: {
            fontWeight: "bold",
            fontSize: 14,
          },
        },
        // 天气图标
        {
          type: "category",
          boundaryGap: false,
          position: "top",
          offset: 40,
          zlevel: 100,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },

          axisLabel: {
            interval: 0,
            formatter: function (value, index) {
              return "{b|" + value + "}\n{" + index + "| }";
            },
            rich: {
              0: {
                backgroundColor: {
                  // image: require('@/assets/weather_icon/' + this.weatherIconDic[this.weatherdata.weather[0]] + '.png')
                  image: weaImgData[0].wea_day_img,
                },
                height: 40,
                width: 40,
              },
              1: {
                backgroundColor: {
                  // image: require('@/assets/weather_icon/' + this.weatherIconDic[this.weatherdata.weather[1]] + '.png')
                  image: weaImgData[1].wea_day_img,
                },
                height: 40,
                width: 40,
              },
              2: {
                backgroundColor: {
                  // image: require('@/assets/weather_icon/' + this.weatherIconDic[this.weatherdata.weather[2]] + '.png')
                  image: weaImgData[2].wea_day_img,
                },
                height: 40,
                width: 40,
              },
              3: {
                backgroundColor: {
                  // image: require('@/assets/weather_icon/' + this.weatherIconDic[this.weatherdata.weather[3]] + '.png')
                  image: weaImgData[3].wea_day_img,
                },
                height: 40,
                width: 40,
              },
              4: {
                backgroundColor: {
                  // image: require('@/assets/weather_icon/' + this.weatherIconDic[this.weatherdata.weather[4]] + '.png')
                  image: weaImgData[4].wea_day_img,
                },
                height: 40,
                width: 40,
              },
              5: {
                backgroundColor: {
                  // image: require('@/assets/weather_icon/' + this.weatherIconDic[this.weatherdata.weather[5]] + '.png')
                  image: weaImgData[5].wea_day_img,
                },
                height: 40,
                width: 40,
              },
              6: {
                backgroundColor: {
                  // image: require('@/assets/weather_icon/' + this.weatherIconDic[this.weatherdata.weather[5]] + '.png')
                  image: weaImgData[6].wea_day_img,
                },
                height: 40,
                width: 40,
              },
              b: {
                // color: 'white',
                fontSize: 14,
                lineHeight: 30,
              },
            },
          },
          nameTextStyle: {
            fontWeight: "bold",
            fontSize: 14,
          },
          // data: this.weatherdata.weather
          data: data.map((item) => item.wea_day),
        },
        // 天气图标
        {
          type: "category",
          boundaryGap: false,
          position: "bottom",
          offset: -20,
          zlevel: 100,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            interval: 0,
            formatter: function (value, index) {
              return "{" + index + "| }\n{b|" + value + "}";
            },
            rich: {
              0: {
                backgroundColor: {
                  // image: require('@/assets/weather_icon/' + this.weatherIconDic[this.weatherdata.weather[0]] + '.png')
                  image: weaImgData[0].wea_night_img,
                },
                height: 40,
                width: 40,
              },
              1: {
                backgroundColor: {
                  // image: require('@/assets/weather_icon/' + this.weatherIconDic[this.weatherdata.weather[1]] + '.png')
                  image: weaImgData[1].wea_night_img,
                },
                height: 40,
                width: 40,
              },
              2: {
                backgroundColor: {
                  // image: require('@/assets/weather_icon/' + this.weatherIconDic[this.weatherdata.weather[2]] + '.png')
                  image: weaImgData[2].wea_night_img,
                },
                height: 40,
                width: 40,
              },
              3: {
                backgroundColor: {
                  // image: require('@/assets/weather_icon/' + this.weatherIconDic[this.weatherdata.weather[3]] + '.png')
                  image: weaImgData[3].wea_night_img,
                },
                height: 40,
                width: 40,
              },
              4: {
                backgroundColor: {
                  // image: require('@/assets/weather_icon/' + this.weatherIconDic[this.weatherdata.weather[4]] + '.png')
                  image: weaImgData[4].wea_night_img,
                },
                height: 40,
                width: 40,
              },
              5: {
                backgroundColor: {
                  // image: require('@/assets/weather_icon/' + this.weatherIconDic[this.weatherdata.weather[5]] + '.png')
                  image: weaImgData[5].wea_night_img,
                },
                height: 40,
                width: 40,
              },
              6: {
                backgroundColor: {
                  // image: require('@/assets/weather_icon/' + this.weatherIconDic[this.weatherdata.weather[5]] + '.png')
                  image: weaImgData[6].wea_night_img,
                },
                height: 40,
                width: 40,
              },
              b: {
                // color: 'white',
                fontSize: 14,
                lineHeight: 30,
              },
            },
          },
          nameTextStyle: {
            fontWeight: "bold",
            fontSize: 14,
          },
          // data: this.weatherdata.weather
          data: data.map((item) => item.wea_night),
        },
        // 风向
        {
          type: "category",
          boundaryGap: false,
          position: "bottom",
          offset: 60,
          zlevel: 100,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            interval: 0,
            formatter: function (value) {
              // 如果文字长度超过限制，则添加省略号
              const maxLength = 5; // 设置最大长度
              return value.length > maxLength
                ? value.slice(0, maxLength) + "..."
                : value;
            },
            rich: {
              a: {
                color: "#aaa",
                fontSize: 14,
              },
            },
          },
          nameTextStyle: {},
          data: data.map((item) => item.win[0] + "/" + item.win[1]),
        },
        // 风级
        {
          type: "category",
          boundaryGap: false,
          position: "bottom",
          offset: 80,
          zlevel: 100,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            interval: 0,
            formatter: ["{a|{value}}"].join("\n"),
            rich: {
              a: {
                color: "#aaa",
                fontSize: 14,
              },
            },
          },
          nameTextStyle: {
            fontWeight: "bold",
            fontSize: 14,
          },
          data: data.map((item) => item.win_speed),
        },
      ],
      // 直角坐标系 grid 中的 y 轴
      yAxis: {
        type: "value",
        show: false,

        axisLabel: {
          formatter: "{value} °",
          color: "white",
        },
      },
      series: [
        {
          name: "最高气温",
          type: "line",
          data: data.map((item) => item.tem1),
          symbol: "circle", // 实心圆
          symbolSize: 8,
          showSymbol: true,
          smooth: true,
          itemStyle: {
            normal: {
              color: "#FFB74D",
            },
          },
          label: {
            show: true,
            position: "top",
            fontFamily: "sans-serif", // 设置字体
            fontSize: 14,
            // color: 'white',
            formatter: "{c} °",
          },
          lineStyle: {
            width: 2,
            // color: 'white'
          },
          areaStyle: {
            opacity: 1,
            color: "transparent",
          },
        },
        {
          name: "最低气温",
          type: "line",
          data: data.map((item) => item.tem2),
          symbol: "circle", // 实心圆
          symbolSize: 8,
          showSymbol: true,
          smooth: true,
          itemStyle: {
            normal: {
              color: "#4FC3F7",
            },
          },
          label: {
            show: true,
            position: "bottom",
            fontFamily: "sans-serif", // 设置字体
            // color: 'white',
            formatter: "{c} °",
          },
          lineStyle: {
            width: 2,
            // color: 'white'
          },
          areaStyle: {
            opacity: 1,
            color: "transparent",
          },
        },
      ],
    };

    // 绘制echarts图表
    myChart.setOption(option);
  })
  .catch((error) =>
    console.error("There has been a problem with your fetch operation:", error)
  );

// 生活指数
let livingIndex_url =
  "https://www.tianqiapi.com/life/lifepro?appid=91523636&appsecret=QG3HzEwV";
if (urlParams.code) {
  livingIndex_url += `&adcode=${urlParams.code}`;
}
fetch(livingIndex_url)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json(); // 如果响应是 JSON 格式
  })
  .then((res) => {
    let counter = 0;
    let currentDomIndex = 0;

    for (const key in res.data) {
      if (lifeObj[key] && counter < 16) {
        // 创建swiper-item元素
        const swiperItem = document.createElement("div");
        swiperItem.classList.add("swiper-item");
        // 为了避免和全局的 name 属性冲突，使用一个不同的变量名
        const itemName = res.data[key].name;
        const itemDesc = res.data[key].desc;
        const itemColor = lifeObj[key].color;

        // 渲染生活指数
        swiperItem.innerHTML = `
            <img src="../image/${lifeObj[key].img}" alt="">
            <p>${itemName}</p>
            <p>${res.data[key].level}</p>
        `;

        // 绑定点击事件,打开弹框
        swiperItem.addEventListener(
          "click",
          (function (itemName, itemDesc) {
            return function () {
              // 标题背景颜色
              life_Bullet_box_title.style.backgroundColor = itemColor;
              // 按钮背景颜色
              life_Bullet_box_btn.style.backgroundColor = itemColor;
              // 标题文字
              life_Bullet_box_title.innerHTML = itemName;
              // 内容文字
              life_Bullet_box_text.innerHTML = itemDesc;
              // 显示弹框
              life_Bullet_box.style.display = "block";
            };
          })(itemName, itemDesc)
        );

        // 添加swiper-item到相应的DOM元素
        lifeItems[currentDomIndex].appendChild(swiperItem);

        counter++;

        // 切换到下一个 DOM 元素
        if (counter === 8) {
          currentDomIndex = 1;
        }
      }
    }
  })
  .catch((error) =>
    console.error("There has been a problem with your fetch operation:", error)
  );

// 隐藏弹框
life_Bullet_box_btn.addEventListener("click", () => {
  life_Bullet_box.style.display = "none";
});
