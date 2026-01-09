let next = document.querySelector('.next')
let prev = document.querySelector('.prev')

let intervalDuration = 3000;
let intervalID = window.setInterval(autoSlide, intervalDuration);

function resetIntervalAfterClick() {

    clearInterval(intervalID);

    setTimeout(() => {
        intervalID = setInterval(autoSlide, intervalDuration);
    });
}

next.addEventListener('click', function(){
    let cards = document.querySelectorAll('.card')
    document.querySelector('.card-stack').appendChild(cards[0])
    resetIntervalAfterClick();
})

prev.addEventListener('click', function(){
    let cards = document.querySelectorAll('.card')
    document.querySelector('.card-stack').prepend(cards[cards.length - 1])
    resetIntervalAfterClick();
})






function autoSlide() {
    let cards = document.querySelectorAll('.card')
    document.querySelector('.card-stack').appendChild(cards[0])
}


function goToPage() {
    let cards = document.querySelector('.card')
    window.location.href = cards.id + '.html';
}



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