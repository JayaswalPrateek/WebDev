'use strict';
const gridContainer = document.getElementById("container");
for (let i = 0; i < 16; i++){
    const row = document.createElement("div");
    for (let j = 0; j < 16; j++){
        const col = document.createElement("div");
        col.className = "square";
        row.appendChild(col);
    }
    row.style.display = "flex";
    gridContainer.appendChild(row);
}
console.log(document.getElementById("container"));
document.getElementById("container").addEventListener("mouseover", (e) => {
    if (e.target.id === "container") return;
    e.target.style.backgroundColor = "black";
});