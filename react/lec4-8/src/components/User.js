// Equivalent Functional Component For Referece:
// const User = () => (
//     <div id="userCard">
//         <h2>Name: foo</h2>
//         <h3>Location: bar</h3>
//         <h4>Contact: baz</h4>
//     </div>
// );

// Class Based Component For The Same:
// Just like how a functional component is a simple js function,
// a class based component is a simple js class too! Which extends
// React.Component class provided by react. The class should contain
// a render method that returns JSX code.

import React from "react";

class User extends React.Component {
    constructor(props) { // needed for passing props to a class based react component
        super(props); // needed for passing the props to the parent class React.Component
    }

    render() {
        return (
            <div id="userCard">
                <h2>Name: {this.props.name}</h2>
                <h3>Location: bar</h3>
                <h4>Contact: baz</h4>
            </div>
        );
    }
}

export default User; // exporting/importing/using class based components is same as functional components