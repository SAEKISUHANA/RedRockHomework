const div = document.querySelector("#scrollContent>div");
// let dataArr = ["湿度 12", "西南风 2级"];

// 顶部文字滚动轮播
function textScroll(dataArr) {
  for (let i = 0; i < dataArr.length; i++) {
    const p = document.createElement("p");
    p.innerHTML = dataArr[i];
    div.appendChild(p);
  }
  let timer = null;
  let p = document.querySelectorAll("#scrollContent p");
  // 保存页面中四条数据的top值
  let topArr = [0, 25];
  // 初始给每一条数据添加top值
  for (let i = 0; i < p.length; i++) {
    p[i].style.top = topArr[i] + "px";
  }
  function run() {
    timer = setInterval(() => {
      for (let i = 0; i < topArr.length; i++) {
        // 当第一条数据移出dom外面时
        if (topArr[0] == -25) {
          // 暂停计时器
          clearInterval(timer);

          // 将第一条数据添加到最后
          dataArr.push(p[0].innerHTML);
          // 删除第一条数据
          dataArr.shift();

          // 将第1条数据添加到dom的最后
          const liDom = document.createElement("p");
          liDom.innerHTML = dataArr[1];
          div.appendChild(liDom);

          // 删除dom的第一条数据
          div.removeChild(p[0]);

          topArr.shift();
          topArr.push(25);

          // 重新获取结构改变后的dom
          p = document.querySelectorAll("#scrollContent p");

          setTimeout(() => {
            run();
          }, 3000);
        }

        // 自减
        topArr[i] -= 1;
        // 重新赋值
        p[i].style.top = topArr[i] + "px";

        // 计算透明度
        let opacity;
        if (topArr[i] >= 0) {
          opacity = 1 - topArr[i] / 10;
        } else {
          opacity = 1 - Math.abs(topArr[i]) / 5;
        }
        p[i].style.opacity = opacity;
      }
    }, 10);
  }

  run();
}

// 创建底部生活指数轮播
const mySwiper = new Swiper(".swiper", {
  pagination: {
    el: ".swiper-pagination",
  },
});
