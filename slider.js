let images = [{
  sliderCity: "Rostov-on-Don, Admiral",
  url: "./images/image2.1.jpg",
  city: "Rostov-on-Don, Admiral",
  area: "81 m2",
  time: "3.5 months"
}, {
  sliderCity: "Sochi Thieves",
  url: "./images/image2.jpg",
  city: "Sochi Thieves",
  area: "105 m2",
  time: "4 months"
}, {
  sliderCity: "Rostov-on-Don Patriotic",
  url: "./images/image3.jpg",
  city: "Rostov-on-Don Patriotic",
  area: "93 m2",
  time: "3 months"
}];

function initSlider(images, options) {
  if (!images || !images.length) return;

  options = options || {
    dots: false
  }

  const sliderWrapper = document.querySelector(".completed_projects");
  const sliderImages = sliderWrapper.querySelector(".completedproj_img");
  const sliderCity = document.querySelector(".navigation_completed_nav");
  const sliderArrows = document.querySelector(".completed_text_block_arrows");
  const sliderDots = document.querySelector(".slider_dots");
  const city = sliderWrapper.querySelector(".city");
  const area = sliderWrapper.querySelector(".areas");
  const time = sliderWrapper.querySelector(".repair_time");

  initImages();
  initLinks();
  initArrows();
  initDots()
  initCity();
  initArea();
  initTime();



  if (options.links) {
    initLinks();
  }
  if (options.autoplay) {
    initAutoplay();
  }



  function initImages() {
    images.forEach((image, index) => {
      let imageElement = document.createElement("div");
      imageElement.classList = `image n${index} ${index ? "" : "active"}`;
      imageElement.dataset.index = index;
      imageElement.style.backgroundImage = `url(${image.url})`;
      sliderImages.appendChild(imageElement);
    });
  }
  function initArrows() {
    let lastIndex = images.length - 1; sliderArrows.querySelectorAll(".slider_arrow").forEach(arrow => {
      arrow.addEventListener("click", function () {
        let curNumber = +sliderImages.querySelector(".active").dataset.index;
        let nextNumber;
        if (arrow.classList.contains("left")) {
          nextNumber = curNumber === 0 ? images.length - 1 : curNumber - 1;
        } else {
          nextNumber = curNumber === images.length - 1 ? 0 : curNumber + 1;
        }
        moveSlider(nextNumber);
      });
    });
  }


  function initDots() {
    images.forEach((image, index) => {
      let dot = `<div class="slider_dots-item n${index} ${index === 0 ? "active" : ""}" 
          data-index="${index}"></div>`;
      sliderDots.innerHTML += dot;
    });
    sliderDots.querySelectorAll(".slider_dots-item").forEach(dot => {
      dot.addEventListener("click", function () {
        moveSlider(this.dataset.index);
      });
    });
  }
  function initLinks() {
    images.forEach((image, index) => {
      let link = `<a class ="completed-nav__item-li n${index} ${index === 0 ? "active" : ""}" data-index="${index}">${images[index].sliderCity}</a>`;
      sliderCity.innerHTML += link;
    });
    sliderCity.querySelectorAll(".completed-nav__item-li").forEach(link => {
      link.addEventListener("click", function () {
        moveSlider(this.dataset.index);
      })
    })
  }
  function initCity() {
    let citySpan = `<span class="completed_text_block city">${images[0].city}</span>`;
    city.innerHTML += citySpan;
  }
  function changeCity(num) {
    if (!images[num].city) return;
    let sliderCity = city.querySelector(".city");
    sliderCity.innerHTML = images[num].city;
  }
  function initArea() {
    let areaSpan = `<span class="completed_text_block areas">${images[0].area}</span>`;
    area.innerHTML += areaSpan;
  }
  function changeArea(num) {
    if (!images[num].area) return;
    let sliderArea = area.querySelector(".areas");
    sliderArea.innerText = images[num].area;
  }
  function initTime() {
    let timeSpan = `<span class="completed_text_block repair_time">${images[0].time}</span>`;
    time.innerHTML += timeSpan;
  }
  function changeTime(num) {
    if (!images[num].time) return;
    let sliderTime = time.querySelector(".repair_time");
    sliderTime.innerText = images[num].time;
  }

  function initAutoplay() {
    setInterval(() => {
      let curNumber = +sliderImages.querySelector(".active").dataset.index;
      let nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
      moveSlider(nextNumber);
    }, options.autoplayInterval);
  }

  function moveSlider(num) {
    sliderImages.querySelector(".active").classList.remove("active");
    sliderImages.querySelector(`.n${num}`).classList.add("active");

    sliderDots.querySelector(".active").classList.remove("active");
    sliderDots.querySelector(".n" + num).classList.add("active");

    sliderCity.querySelector(".active").classList.remove("active");
    sliderCity.querySelector(".n" + num).classList.add("active");

    changeArea(num);
    changeCity(num);
    changeTime(num);
  }
}


document.addEventListener("DOMContentLoaded", () => {
  let sliderOptions = {
    dots: true,
    autoplay: true,
   autoplayInterval: 3000
  }
  initSlider(images, sliderOptions);
});
