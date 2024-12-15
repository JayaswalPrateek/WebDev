import React from "react";
import ReactDOM from "react-dom/client";

// const parent = React.createElement("div", { id: "parent" },
//     React.createElement("div", { id: "child" }, [
//         React.createElement("h1", { id: "heading1" }, "I'm a h1 sibling"),
//         React.createElement("h2", { id: "heading2" }, "I'm a h2 sibling"),
//     ])
// )

// creating the same react element using JSX syntax instead of createElement():
const parent = (
    <div id="parent">
        <div id="child">
            <h1 id="heading1">I'm a h1 sibling</h1>
            <h2 id="heading2">I'm a h2 sibling</h2>
        </div>
    </div>
);
// creates the same react element as React.createElement() did,
// but it looks much cleaner than it especially as nesting increases.
// JSX is not a part of ecmascript spec so parcel bundler transpiles it.
// Parcel and other bundlers depend on Babel for this traspilation step.

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(parent); // Error: Each child in a list should have a unique "key" prop.

// some JSX attributes are different than their HTML counterparts
// sometime its camelcased but sometimes its more than that
// like class in HTML is className in JSX
const HeadingReactFunctionalComponent = () => (
    <div id="container">
        <h1 className="heading">This is a Functonal React Component</h1>
    </div>
);
const root2 = ReactDOM.createRoot(document.getElementById("root2"));
root2.render(<HeadingReactFunctionalComponent />);