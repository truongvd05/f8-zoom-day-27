const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const list = $(".list");
const body = document.body;

const players = [
    {
        id: 1,
        name: "user 1",
        img: "../html/img/tender.jpg",
        age: 35,
    },
    {
        id: 1,
        name: "user 2",
        img: "../html/img/tender1.jpg",
        age: 20,
    },
    {
        id: 1,
        name: "user 3",
        img: "../html/img/tender2.jpg",
        age: 22,
    },
    {
        id: 1,
        name: "user 4",
        img: "../html/img/tender3.jpg",
        age: 27,
    },
    {
        id: 1,
        name: "user 5",
        img: "../html/img/tender4.jpg",
        age: 21,
    },
];

let index = 0;

// Lưu vị trí click ban đầu
let startX = 0;
let startLeft = 0;
// Tính vị trí click trong box

// kéo thả item

let isToching = false;

// giá trị của item khi chưa bị move
let start = null;
let final = null;
list.onmousedown = function (event) {
    const item = event.target.closest(".item");
    // lấy vị trí ban đầu của element
    if (!item) return;

    const rect = item.getBoundingClientRect();
    start = rect.left;
    item.style.transition = ``;

    isToching = true;
    startX = event.clientX;
    startLeft = item.offsetLeft;
    list.style.cursor = "grabbing";
};

list.onmousemove = function (event) {
    const item = event.target.closest(".item");

    // lấy vị trí ban đầu của phần element
    const dx = event.clientX - startX;
    if (isToching) {
        item.style.left = `${startLeft + dx}px`;
    }
};

body.onmouseup = function (event) {
    isToching = false;
    const item = event.target.closest(".item");

    // lấy vị trí cuối cùng của element
    if (item) {
        const rect = item.getBoundingClientRect();
        final = rect.left;
        const defaultItem = Math.abs(final - start);
        if (start > final + 100 || start < final - 100) {
            item.classList.add("hidden");
        } else {
            item.style.transition = `left 0.4s linear`;
            item.style.left = `${startLeft}px`;
        }
    }
};

// dispatch event for mobile

list.addEventListener("touchstart", function (e) {
    e.preventDefault();
    const touch = e.touches[0]; // Lấy điểm chạm đầu tiên

    const simulatedEvent = new MouseEvent("mousedown", {
        bubbles: true,
        cancelable: true,
        clientX: touch.clientX, // vị trí X như chuột
    });
    const item = e.target.closest(".item");
    if (item) {
        item.dispatchEvent(simulatedEvent);
    }
});

// dispatch event for mobile
document.addEventListener("touchmove", function (e) {
    if (!isToching || e.touches.length === 0) return;

    const touch = e.touches[0];

    const simulatedEvent = new MouseEvent("mousemove", {
        bubbles: true,
        cancelable: true,
        clientX: touch.clientX,
    });

    const item = e.target.closest(".item");
    if (item) {
        item.dispatchEvent(simulatedEvent);
    }
});

// dispatch event for mobile

document.addEventListener("touchend", function (e) {
    const touch = e.changedTouches[0];

    const simulatedEvent = new MouseEvent("mouseup", {
        bubbles: true,
        cancelable: true,
        clientX: touch.clientX,
        clientY: touch.clientY,
    });

    // Dispatch sự kiện mouseup đến phần tử được chạm
    e.target.dispatchEvent(simulatedEvent);
});

function render() {
    players.forEach((player) => {
        const div = document.createElement("div");
        const p = document.createElement("p");
        p.textContent = `${player.name}, Age: ${player.age}`;
        Object.assign(p.style, {
            position: "absolute",
            bottom: "5%",
            left: "5%",
        });
        div.append(p);
        div.className = "item";
        Object.assign(div.style, {
            backgroundImage: `url(${player.img})`,
        });

        list.append(div);
    });
}

render();
