'use strict';
function buildGrid(dimension) {
    const gridContainer = document.getElementById("container");
    for (let i = 0; i < dimension; i++){
        const row = document.createElement("div");
        for (let j = 0; j < dimension; j++){
            const col = document.createElement("div");
            col.className = "square";
            row.appendChild(col);
        }
        row.style.display = "flex";
        gridContainer.appendChild(row);
    }
}
document.getElementById("container").addEventListener("mouseover", (e) => {
    if (e.target.id === "container") return;
    if (!e.target.style.backgroundColor || !e.target.dataset.brightnessLevel) {
        const x = Math.floor(Math.random() * 256);
        const y = Math.floor(Math.random() * 256);
        const z = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${x}, ${y}, ${z})`;
        e.target.dataset.brightnessLevel = 1;
    } else {
        let brightnessLevel = parseFloat(e.target.dataset.brightnessLevel);
        brightnessLevel -= 0.1;
        if (brightnessLevel < 0) brightnessLevel = 0;
        e.target.dataset.brightnessLevel = brightnessLevel;
        e.target.style.filter = `brightness(${brightnessLevel})`;
    }
});
document.getElementById("configure").addEventListener("click", (e) => {
    const newDimension = Number(prompt("Enter New Dimension: "));
    if (newDimension < 1 || newDimension > 100) {
        alert("Invalid Dimension(Range: 1-100)");
        return;
    }
    const gridContainer = document.getElementById("container");
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
    buildGrid(newDimension);
});
buildGrid(16);