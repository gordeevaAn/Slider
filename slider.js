let images = [{
    url: "https://i121.fastpic.org/big/2023/0222/b5/f7e7bbbe5dcf56c5922ab9e966a77fb5.jpg",
    sliderCity: "Rostov-on-Don, Admiral"
  }, {
    url: "https://i121.fastpic.org/big/2023/0222/a7/a426927dc1a15b9e56b3938c0a6f39a7.jpg",
    sliderCity: "Sochi Thieves"
  }, {
    url: "https://i121.fastpic.org/big/2023/0222/e2/fbd2117e519aa12feffd3c75aea994e2.jpg",
    sliderCity:"Rostov-on-Don Patriotic"
}];

function initSlider(images, options) {
    if (!images || !images.length) return;

    options = options || {
        dots: false
    }
    
    const sliderWrapper = document.querySelector(".completed_projects");
    const sliderImages = sliderWrapper.querySelector(".completedproj_img");
    const sliderArrows = document.querySelector(".completed_text_block_arrows");
     const sliderDots = document.querySelector(".slider_dots");
    const sliderCity =  document.querySelector(".navigation_completed_nav");
    
    initImages();
    initArrows();
   
    if (options.dots) {
      initDots();
    }
    if (options.links) {
    initLinks();
  }

  
    
    function initImages() {
      images.forEach((image, index) => {
        let imageElement = document.createElement("div");
        imageElement.classList = `image n${index} ${index? "" : "active"}`;
        imageElement.dataset.index = index;
        imageElement.style.backgroundImage = `url(${image.url})`;
        sliderImages.appendChild(imageElement);
      });
    }
    function initArrows(){
     let lastIndex = images.length - 1; sliderArrows.querySelectorAll(".slider_arrow").forEach(arrow =>{
        arrow.addEventListener("click", function() {
          let curNumber = +sliderImages.querySelector(".active").dataset.index;
          let nextNumber;
          if(arrow.classList.contains("left")){
            nextNumber = curNumber ===0? images.length -1 : curNumber -1;
          } else {
            nextNumber = curNumber ===images.length -1? 0 : curNumber +1;
          }
          moveSlider(nextNumber);
        });
      });
     }
    function moveSlider(num){
      sliderImages.querySelector(".active").classList.remove("active");
      sliderImages.querySelector(`.n${num}`).classList.add("active");

      sliderDots.querySelector(".active").classList.remove("active");
      sliderDots.querySelector(".n" + num).classList.add("active");
      
      sliderCity.querySelector(".active").classList.remove("active");
      sliderCity.querySelector(".n" + num).classList.add("active");
    }

      function initDots() {
        images.forEach((image, index) => {
          let dot = `<div class="slider_dots-item n${index} ${index === 0? "active" : ""}" 
          data-index="${index}"></div>`;
          sliderDots.innerHTML += dot;
        });
          sliderDots.querySelectorAll(".slider_dots-item").forEach(dot => {
            dot.addEventListener("click", function() {
            moveSlider(this.dataset.index);
          });
        });
      }
      function initLinks() {
  images.forEach((image, index) => {
    let link = `<a class ="completed-nav__item-li n${index} ${index === 0? "active" : ""}" data-index="${index}">${images[index].sliderCity}</a>`;
    sliderCity.innerHTML += link;
});
  sliderCity.querySelectorAll(".completed-nav__item-li").forEach(link => {
    link.addEventListener("click", function() {
      moveSlider(this.dataset.index);
    })
  })   
}
      
    }
  
  
  document.addEventListener("DOMContentLoaded", () => {
    let sliderOptions = {
        dots: true,
        links: true
    }
    initSlider(images, sliderOptions);
  });
