document.addEventListener("DOMContentLoaded", init);

function init() {
    const inlineSVGs = document.querySelectorAll(".inline-svg[data-src]");
    inlineSVGs.forEach(loadSVG);
}

async function loadSVG(svgContainer) {
    const response = await fetch(svgContainer.dataset.src);
    svgContainer.innerHTML = await response.text();
}
