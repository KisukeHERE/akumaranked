document.querySelector('.close-menu-phone').addEventListener('click', () => {
    document.getElementById('menu-phone').style.display = "none";
    document.getElementById('html').style.overflowY = "initial";
});

document.querySelector('.bg-menu-phone').addEventListener('click', () => {
    document.getElementById('menu-phone').style.display = "none";
    document.getElementById('html').style.overflowY = "initial";
});

document.querySelector('.open-menu-phone').addEventListener('click', () => {
    document.getElementById('menu-phone').style.display = "initial";
    document.getElementById('html').style.overflowY = "hidden";
});