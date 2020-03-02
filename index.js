let input = document.querySelector('.upload');
  let wrapper = document.querySelector('.wrapper');
  let wrapImg = document.querySelector('.wrap-img');
  let img = document.querySelector('.img');

  input.addEventListener("change",function(){
    let selectedFile = this.files[0];
    img.style.backgroundImage = `url(${URL.createObjectURL(selectedFile)})`;

  });

          // SCALE

  function addOnWheel(elem, handler) {
      if (elem.addEventListener) {
        if ('onwheel' in document) {
          // IE9+, FF17+
          elem.addEventListener("wheel", handler);
        } else if ('onmousewheel' in document) {
          elem.addEventListener("mousewheel", handler);
        } else {
          // 3.5 <= Firefox < 17
          elem.addEventListener("MozMousePixelScroll", handler);
        }
      } else { // IE8-
        text.attachEvent("onmousewheel", handler);
      }
    }
    let scale = 1;
    let degree = 0;

    addOnWheel(wrapImg, function(e) {
      let delta = e.deltaY || e.detail || e.wheelDelta;
      if (delta > 0) scale += 0.05;
      else scale -= 0.05;
      changeScaleDegree();
      e.preventDefault();
    });

    function changeScaleDegree() {
        img.style.transform = img.style.WebkitTransform = img.style.MsTransform = 'rotate(' + degree + 'deg) scale(' + scale + ')';
    };


    // ROTATE

    let  offset = {
      left: wrapper.offsetLeft,
      top:  wrapper.offsetTop 
  };

let  mouseDown = false;
function mouse(evt) {
    if(mouseDown === true){
    let center_x = (offset.left) - (wrapper.offsetWidth / 2) + (wrapImg.offsetWidth / 2);
    let center_y = (offset.top) - (wrapper.offsetHeight / 2) + (wrapImg.offsetHeight / 2);
    let mouse_x = evt.pageX;
    let mouse_y = evt.pageY;
    let radians = Math.atan2(mouse_x - center_x, mouse_y - center_y);
    degree = (radians * (180 / Math.PI) * -1) + 90;
    changeScaleDegree();
    };
};

function touch(evt) {
    if(mouseDown === true){
    let center_x = (offset.left) - (wrapper.offsetWidth / 2) + (wrapImg.offsetWidth / 2);
    let center_y = (offset.top) - (wrapper.offsetHeight / 2) + (wrapImg.offsetHeight / 2);
    let mouse_x = evt.changedTouches[0].clientX;
    let mouse_y = evt.changedTouches[0].clientY;
    let radians = Math.atan2(mouse_x - center_x, mouse_y - center_y);
    degree = (radians * (180 / Math.PI) * -1) + 90;
    changeScaleDegree();
    }
}
    
let touchOld = null;
wrapImg.addEventListener('touchmove', (e)=> {
    if (e.touches.length === 2) {
      let x0 = e.touches[0].clientX;
      let y0 = e.touches[0].clientY;
      let x1 = e.touches[1].clientX;
      let y1 = e.touches[1].clientY;
      let touchNew = Math.sqrt((x1-x0)*(x1-x0) + (y1-y0)*(y1-y0));
        if ( touchNew > touchOld ) { 
            scale += 0.03;
          } else {
            scale -= 0.03;
          };
      touchOld = touchNew;
      changeScaleDegree();
      } else if (e.touches.length === 1) {
        mouseDown = true;
        touch(e);
      };
});

wrapImg.addEventListener('touchend', ()=> {
  mouseDown = false;
});

wrapImg.addEventListener('mousedown', function (e) {
    mouseDown = true;
    document.addEventListener('mousemove', mouse);
});

document.addEventListener('mouseup', function () {
    mouseDown = false;
});