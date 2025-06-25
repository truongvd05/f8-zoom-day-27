const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const valueInput = $(".text");
const context = $(".context-menu");
const code = $(".code");
const container = $(".container");
const body = document.body;

const widthViewPort = container.offsetWidth;
const hightViewPort = container.offsetHeight;

body.addEventListener("mousedown", function (e) {
    const deleteValue = e.target.closest(".delete");
    if (deleteValue) {
        valueInput.value = null;
    }
});

valueInput.oninput = function () {
    const value = valueInput.value;
    window.addEventListener("beforeunload", handleBeforUnLoad);
    if (value) {
        body.addEventListener("keydown", handelComfirm);
    }
    render(value);
};

function render(value) {
    code.srcdoc = value;
}

// confirm when reload
const handelComfirm = (event) => {
    if (event.key === "F5") {
        const comfirmReload = confirm("Bạn có chắc muốn tải lại trang?");
        if (!comfirmReload) {
            event.preventDefault();
        }
    }
};

// confirm when closing tab
const handleBeforUnLoad = (event) => {
    event.preventDefault();
    event.returnValue = "";
};

// lây chều dài + rộng của element
function getWidth() {
    const widthElement = context.offsetLeft;
    return widthElement;
}

function getHight() {
    const hightElement = context.offsetTop;
    return hightElement;
}

// context menu

container.addEventListener("contextmenu", function (event) {
    event.preventDefault();
    context.hidden = false;

    // lấy dài rộng của phần element
    const width = parseFloat(context.offsetWidth);
    const hight = parseFloat(context.offsetHeight);

    Object.assign(context.style, {
        top: event.clientY + "px",
        left: event.clientX + "px",
    });
    if (
        widthViewPort - getWidth() <= width &&
        hightViewPort - getHight() <= hight * 2
    ) {
        return Object.assign(context.style, {
            top: event.clientY - hight * 2 + "px",
            left: event.clientX - width + "px",
        });
    }
    if (widthViewPort - getWidth() <= width) {
        return Object.assign(context.style, {
            top: event.clientY + "px",
            left: event.clientX - width + "px",
        });
    } else if (hightViewPort - getHight() <= hight * 2) {
        return Object.assign(context.style, {
            top: event.clientY - hight * 2 + "px",
            left: event.clientX + "px",
        });
    }
});

document.addEventListener("mousedown", function () {
    context.hidden = true;
});
