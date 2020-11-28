var VideoEl = document.querySelector("#Video"),
    viewEl = VideoEl.querySelector(".view"),
    viewContainerEl = viewEl.querySelector(".view-container"),
    viewItemEls = viewContainerEl.querySelectorAll(".view-item"),

    viewItemImgEls = viewContainerEl.querySelectorAll(".view-item > video"),

    paddleNavEl = VideoEl.querySelector(".paddle-nav"),
    btnPaddleNavEls = paddleNavEl.querySelectorAll("button.arrow"),
    btnPaddleNavPreEl = paddleNavEl.querySelector("button.arrow.prev"),
    btnPaddleNavNextEl = paddleNavEl.querySelector("button.arrow.next"),

    listEl = VideoEl.querySelector(".list"),
    listItemEls = listEl.querySelectorAll("li"),
    btnListItemEls = listEl.querySelectorAll("li > a"),

    // txtEl = VideoEl.querySelector(".txt-wrap"),
    // txtContainerEl = txtEl.querySelector(".txt-container"),
    // txtItemEls = txtContainerEl.querySelectorAll(".txt-item"),

    // list 버튼 클릭 || 패들 버튼 클릭 시 동영상과 함께 텍스트 넘기기
    // txtEl = VideoEl.querySelector(".txt"),
    // txtItemEls = txtEl.querySelectorAll("li"),
    // btntxtItemEls = txtEl.querySelectorAll("li a"),
    
    _duration = 300,
    _addDuration = 200,

    _isAni = false,

    _imgOW = 1600,
    _imgOH = 1000,

    // _galleryW = 800,
    _galleryW = null,
    _galleryH = null,
    _cuId = 0,
    _exId = null,
    _max = null;

function onResize(){
    console.log("resize");
    // 브라우저의 가로폭, 세로 높이 값을 구하여 viewContainerEl 의 width, height 에 적용.
    console.log(window.innerWidth, window.innerHeight);
    _galleryW = window.innerWidth;
    _galleryH = window.innerHeight;
    console.log(_galleryW);

    // 비디오 갤러리 사이즈가 변경되도록 galleryResize() 호출한다.
    galleryResize();
    gallerySlide(true); // 애니메이션이 없는 상태로 고정값 적용( translate3d() )
}

// function onClicktxtItem(e){
//     e.preventDefault();
//     var el = e.currentTarget, parentEl = el.parentElement, index = btntxtItemEls.indexOf(el);
//     if(_isAni) return;
//     if(!parentEl.classList.contains("selected")) {
//         _cuId = index;
//         txtItemEls[_exId].classList.remove("selected");
//         txtItemEls[_cuId].classList.add("selected");
//         gallerySlide();

//         console.log(txtItemEls);

//         // 강제로 변환하도록 했기때문에 버튼 클릭 시 exId 가 변환하지 않음
//         // _exId = _cuId;
//     }
// }

function onClickListItem(e) {
    e.preventDefault();
    var el = e.currentTarget, parentEl = el.parentElement, index = btnListItemEls.indexOf(el);
    if(_isAni) return;
    if(!parentEl.classList.contains("selected")) {
        _cuId = index;
        listItemEls[_exId].classList.remove("selected");
        listItemEls[_cuId].classList.add("selected");
        gallerySlide();
        

        // 강제로 변환하도록 했기때문에 버튼 클릭 시 exId 가 변환하지 않음
        // _exId = _cuId;
    }
}
function onClickPaddleNav(e){
    e.preventDefault();
    var el = e.currentTarget;
    if(el.classList.contains("prev")){
        console.log("이전");
        // _cuId--; // -1
        _cuId--;
        // 이전 버튼 한 번 더 누르면 또 넘어감
        // -1 이 되었을때 0으로 값을 강제 변경.
        if(_cuId < 0){
            _cuId = 0;
        }
    } else if (el.classList.contains("next")){
        console.log("다음");
        // _cuId++; // +1
        _cuId++;
        // 4 이 되었을때 3으로 값을 강제 변경.
        if(_cuId > _max - 1){
            _cuId = _max - 1;
        }
    }
    gallerySlide();
}

function onTransitionEnd(e) {
    _isAni = false;
    viewContainerEl.style.removeProperty("transition"); 
}

function galleryResize() {
    viewEl.style.width = _galleryW + "px";
    viewEl.style.height = _galleryH + "px";
    // viewEl 에 높이 적용.

    viewEl.style.width = _galleryW + "px";
    viewContainerEl.style.width = _galleryW * _max + "px";
    for(var i = 0; i < _max; i++) {
        viewItemEls[i].style.width = _galleryW + "px";
    }

    for(var j = 0; j < _max; j++){
        var imgW, imgH, imgT, imgL;

        // 가로폭부터 적용 후 높이 계산.
        imgW = _galleryW;
        // _galleryW : ? = imgOW : imgOH (ratio)
        imgH = Math.round(imgW * _imgOH / _imgOW);
        // 브라우저 리사이즈할 떄, galleryW 보다 galleryH 가 더 수치가 높아져서 여백이 생기는 구간이 발생됨.
        if(imgH <= _galleryH){
            imgH = _galleryH;
            // ? : _galleryW = imgOW : imgOH (ratio)
            // imgW 를 다시 계산.
            imgW = imgH * _imgOW / _imgOH;
        }
        // 이미지를 중심으로 이동시키기 위한 공식.
        // 프레임의 가로폭의 반 - 이미지의 가로폭의 반
        // 프레임의 세로높이의 반 - 이미지의 세로높이의 반
        imgT = Math.round(_galleryH / 2 - imgH / 2);
        imgL = Math.round(_galleryH / 2 - imgW / 2);

        // viewItemImgEls[j].style.width = imgW + "px";
        // viewItemImgEls[j].style.height = imgH + "px";
        // viewItemImgEls[j].style.top = imgT + "px";
        // viewItemImgEls[j].style.left = imgL + "px";
    }
}
// function txtSlide(b){
//     var duration = _duration + Math.abs(_cuId - _exId) * _addDuration, 
//     bool = (b) ? b : false;

//     txtContainerEl.style.transform = "translate3d(" + _galleryW * _cuId * -1 + "px, 0, 0)";

// }
function gallerySlide(b) {
    var duration = _duration + Math.abs(_cuId - _exId) * _addDuration, 
    bool = (b) ? b : false;

    // ===
    /* 
    if(b){
        bool = true;
    }else{
        bool = false;
    } */

    viewContainerEl.style.transform = "translate3d(" + _galleryW * _cuId * -1 + "px, 0, 0)";
    // 함수 안에서 2가지 기능을 사용할 때 쓰는 방법 (boolean 타입을 활용)
    if(!bool){
        // 애니메이션. (flase)
        _isAni = true;

        setNavSelected();

        viewContainerEl.style.transition = "transform " + duration + "ms cubic-bezier(0.455, 0.030, 0.515, 0.955)";
        _exId = _cuId; // 속도가 유지됨
    } else {
        // 정적 값을 적용.(true) == 애니메이션 없이 고정값으로 적용되도록 
        console.log("리사이즈");
        viewContainerEl.style.removeProperty("transition");
    }
    // _isAni = true;
}
function setNavSelected() {
    listItemEls[_exId].classList.remove("selected");
    listItemEls[_cuId].classList.add("selected");

    // txtItemEls[_exId].classList.remove("selected");
    // txtItemEls[_exId].classList.add("selected");
}

function addEvent() {
    
    window.addEventListener("resize", onResize);

    for(var i = 0; i < _max; i++) {
        btnListItemEls[i].addEventListener("click", onClickListItem);
    }
    // for(var i = 0; i < _max; i++) {
    //     btntxtItemEls[i].addEventListener("click", onClicktxtItem);
    // }
    //  btnPaddleNavEls.length === 2
    for(var j = 0; j < btnPaddleNavEls.length; j++) {
        btnPaddleNavEls[j].addEventListener("click", onClickPaddleNav);
    }

    viewContainerEl.addEventListener("transitionend", onTransitionEnd);
    viewContainerEl.addEventListener("webkitTransitionEnd", onTransitionEnd);
}
function init() {
    _exId = _cuId;
    _max = viewItemEls.length;
    btnListItemEls = Array.prototype.slice.call(btnListItemEls);
    // btntxtItemEls = Array.prototype.slice.call(btntxtItemEls);
    // galleryResize(); // 처음부터 시작될 필요가 없다.
    addEvent();

    // window 에 적용된 resize 이벤트를 사용자의 조작 없이 강제 자동 실행.
    window.dispatchEvent(new Event("resize"));
}
init();