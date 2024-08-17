
// 默认为fou
localStorage.setItem('iscatelogue', 'false');

// 回到顶部的按钮
let toTopButton = document.getElementById('onGoTop');

// 移动端目录的按钮
let catalogueButton = document.getElementById('catalogue');
// 目录元素
let cataloguePanButton = document.getElementById('toc-pane');

// 屏幕宽度
 let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

// 初始化按钮为隐藏
toTopButton.style.display = 'none';
// 设定一个阈值，比如滚动超过200px时显示按钮
  const threshold = 300;
// 监听滚动事件
window.addEventListener('scroll', function() {
  // 获取滚动条距离顶部的距离
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

 

  // 如果滚动条位置大于阈值，显示按钮
  if (scrollTop > threshold) {
    toTopButton.style.display = 'block';
      toTopButton.style.opacity =1
  } else {
    // 否则隐藏按钮
    toTopButton.style.display = 'none';
       toTopButton.style.opacity =0
  }
});

// 定义滚动到顶部的函数
function scrollToTop() {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  } else {
    // 滚动到顶部后隐藏按钮
    toTopButton.style.display = 'none';
  }
}
// 获取当前滚动位置距离顶部的距离
function getCurrentScrollPosition() {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
}
const CurrentscrollTop = getCurrentScrollPosition();
// 如果滚动条位置大于阈值，显示按钮
  if ( CurrentscrollTop > threshold) {
    toTopButton.style.display = 'block';
      toTopButton.style.opacity =1
  } else {
    // 否则隐藏按钮
    toTopButton.style.display = 'none';
    toTopButton.style.opacity =0
  }

// 绑定按钮点击事件
toTopButton.addEventListener('click', scrollToTop);

// 目录在移动端的显示
function handleResize() {
    // 请求一个动画帧
    requestAnimationFrame(function() {
        // 窗口的宽度和高度
       
        var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    
        if(width < 610 && cataloguePanButton){
            catalogueButton.style.display = 'block';
            localStorage.setItem('iscatelogue', 'true');
        }else{
            catalogueButton.style.display = 'none';
            localStorage.setItem('iscatelogue', 'false');
        }
       
    });
}

// 绑定handleResize函数到resize事件
window.addEventListener('resize', handleResize);

// 判断 
function istoggle(){
    let value = JSON.parse(localStorage.getItem('iscatelogue'));

  
     let val = !value
     localStorage.setItem('iscatelogue', val);
    if(val) cataloguePanButton.classList.add('showCatalogue');
    if(!val) cataloguePanButton.classList.remove('showCatalogue');
}

// 绑定按钮点击事件
catalogueButton.addEventListener('click', istoggle);

// 判断目录按钮是否显示
if(cataloguePanButton&& width < 610){
          catalogueButton.style.display = 'block';
          localStorage.setItem('iscatelogue', 'false');
      }


document.querySelectorAll('.image').forEach(function(img) {
  
    img.addEventListener('click', function() {
        let allImg = img.getElementsByTagName('img')
        viewer_img(allImg[0].currentSrc)

    });
});

var viewer; // 定义Viewer对象变量
function viewer_img(imgUrl) {
    // event.preventDefault(); // 阻止<a>标签的默认行为
    var image = new Image();
    image.src = imgUrl;

    // 等待图片加载完成后创建Viewer对象
    //下面的导航栏可以根据需求增添
    image.onload = function() {
        viewer = new Viewer(image, {
            toolbar: {
                zoomIn: true,
                zoomOut: true,
                oneToOne: true,
                reset: true,
                prev: true,//上一张
                play: true,
                next: true,//下一张
                rotateLeft: true,
                rotateRight: true,
                flipHorizontal: true,
                flipVertical: true,
            },
        });

        viewer.show(); // 显示Viewer对象
    };
}
 // let mind_note_data = await utils.getData('1ILps4EyoM4r');
// console.log(mind_note_data)

