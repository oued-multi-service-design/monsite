var menu_hamburger = document.querySelector('.menu_hamburger');
var nav_main = document.querySelector('.nav_main');

menu_hamburger.onclick= function() {
    menu_hamburger.classList.toggle('active');
    nav_main.classList.toggle('active');
}
alert('Hello world!');