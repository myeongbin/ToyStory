var btn_menuOpen = document.querySelector("div.menu-open");
    btn_menuClose = document.querySelector("div.menu-close");
    nav = document.querySelector(".nav");
    navLink = document.querySelectorAll(".nav-link");
    navLinkEl = document.querySelectorAll("nav-link a");

function onClickMenuTag(e){
    e.preventDefault();
    // var el = e.currentTarget, index = navLink.indexOf(el);
    nav.classList.toggle('active');
}

btn_menuOpen.addEventListener("click", onClickMenuTag);
btn_menuClose.addEventListener("click", onClickMenuTag);
// navLink = Array.prototype.slice.call(navLink);
// navLink.addEventListener("click", onCLickMenuTag);
navLinkEl.forEach((link) => {
    link.addEventListener("click", onClickMenuTag);
});

