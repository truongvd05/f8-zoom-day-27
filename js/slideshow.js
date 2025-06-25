const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let index = 0;

const controls = $(".wrap-btn");
const slideShow = $(".inner");
const e = $(".active");
const p = $("p");

const imgs = $$(".img");

let a = 0;
// add eventlistiner

// handle Transition
function handleOpacity(event, old, current) {
    if (event.propertyName === "opacity") {
        setTimeout(() => toast(old, current), 400);
    }
}

// create dot
function createDot() {
    const wrapBox = $(".wrap-dot");
    imgs.forEach(() => {
        const span = document.createElement("span");
        span.className = "dot";
        wrapBox.appendChild(span);
    });
}
createDot();

// chuyển tiếp tơi ảnh khi bấm vào dot
const dots = $$(".dot");
dots.forEach((dot, index) => {
    dot.onclick = function () {
        a = index;
        removeActive();
        dotRemove(dots);
        imgs[a].classList.add("active");
        dots[a].classList.add("dot-active");
    };
});

// khởi tạo active cho dot đầu tiên
$$(".dot")[0].classList.add("dot-active");

// handle click
controls.onclick = function (e) {
    const controlsImg = e.target.closest(".btn");
    const dots = $$(".dot");

    if (controlsImg.matches(".next")) {
        a++;
        if (a === imgs.length) {
            a = 0;
        }
        removeActive();
        dotRemove(dots);
        imgs[a].classList.add("active");
        toast(a, a + 1);
        dots[a].classList.add("dot-active");
    }

    if (controlsImg.matches(".return")) {
        --a;
        if (a < 0) {
            a = imgs.length - 1;
        }
        removeActive();
        dotRemove(dots);
        imgs[a].classList.add("active");
        toast(a + 1, a);
        dots[a].classList.add("dot-active");
    }
};

// remove active
function removeActive() {
    imgs.forEach((img) => {
        img.classList.remove("active");
    });
}

// remove dot active
function dotRemove(dots) {
    dots.forEach((dot) => {
        dot.classList.remove("dot-active");
    });
}

function loop() {
    a++;
    if (a === imgs.length) {
        a = 0;
    }
    removeActive();
    dotRemove(dots);
    imgs[a].classList.add("active");
    dots[a].classList.add("dot-active");
}

let loopImg = setInterval(loop, 3000);

// hover thì ảnh ko chuyển tiếp nữa
slideShow.addEventListener("mouseenter", () => {
    return clearInterval(loopImg);
});

// ko hover thì ảnh chuyển tiếp
slideShow.addEventListener("mouseleave", () => {
    return (loopImg = setInterval(loop, 3000));
});
function toast(old, current) {
    const container = $(".toast-container");
    const p = document.createElement("p");
    p.classList.add("show");
    p.innerHTML = `slideshow:change ${escapeseHTML(old)} to ${escapeseHTML(
        current
    )}`;
    container.appendChild(p);

    setTimeout(() => {
        p.classList.remove("show");
        p.remove();
    }, 3000);
}
// escapese HTML
function escapeseHTML(html) {
    const div = document.createElement("div");
    div.textContent = html;
    return div.innerHTML;
}
