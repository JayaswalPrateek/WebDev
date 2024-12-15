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
        <h1 className="heading">This is a Functional React Component</h1>
    </div>
); // explicitly return JSX if not using anonymous shorthand methods
const root2 = ReactDOM.createRoot(document.getElementById("root2"));
root2.render(<HeadingReactFunctionalComponent />);

// Component Composition:
// nesting a functional react component inside another one:
const OuterReactFunctionalComponent = () => (
    <div id="outer">
        <h2>Start of outer functional react component</h2>
        <HeadingReactFunctionalComponent />
        <h2>End of outer functional react component</h2>
    </div>
);

const root3 = ReactDOM.createRoot(document.getElementById("root3"));
root3.render(<OuterReactFunctionalComponent />);

// Expression Embedding in JSX:
// accessing js variables inside JSX within {}
// then they will be displayed as it is
// any evaluations, console.log() etc can be done
const foo = "bar baz 123";
// a simple jsx(not functional component) stored in a variable can
// be displayed by referencing it from within {}
const placeholderJSX = <h1 className="">THIS IS A PLACEHOLDER</h1>
const PlaceholderFuncComp = () => placeholderJSX;
const FunctComp = () => (
    <div>
        <h1>Hello World</h1>
        <h2>{foo}</h2>
        {foo + " 456"}
        {placeholderJSX}
        <h1>Bye World</h1>
        <PlaceholderFuncComp />
    </div>
);

const root4 = ReactDOM.createRoot(document.getElementById("root4"));
root4.render(<FunctComp />);