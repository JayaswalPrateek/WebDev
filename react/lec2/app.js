import React from "react";
import ReactDOM from "react-dom/client";

const parent = React.createElement("div", { id: "parent" },
    React.createElement("div", { id: "child" }, [
        React.createElement("h1", { id: "heading1" }, "I'm a h1 sibling"),
        React.createElement("h2", { id: "heading2" }, "I'm a h2 sibling"),
    ])
)
console.dir(ReactDOM)
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(parent); // Error: Each child in a list should have a unique "key" prop.
console.log(parent);