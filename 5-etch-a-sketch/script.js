'use strict';
const gridContainer = document.getElementById("container");
for (let i = 0; i < 16; i++){
    const row = document.createElement("div");
    row.id = "r"+i;
    for (let j = 0; j < 16; j++){
        const col = document.createElement("div");
        col.id = "c" + j;
        col.className = "square";
        row.appendChild(col);
    }
    row.style.display = "flex";
    gridContainer.appendChild(row);
}