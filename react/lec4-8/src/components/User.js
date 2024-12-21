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

// useState() and other hooks only support functional components
// so they work very inconsistently with class based components
// a state is created when an instance of a class based component is created
// so state variables are created within their constructor itself using this.state

class User extends React.Component {
    constructor(props) { // needed for passing props to a class based react component
        super(props); // needed for passing the props to the parent class React.Component
        this.state = { count: 0 }
        // to create another state variable dont do this.state = { count2: 1 }
        // as it will override the existing state variabiles inside this.state
        // at the end of the constructor of the class based component render() is called
        // just like render(), we can define componentDidMount() method which is called
        // after constructor calls render and render finishes its execution
    }

    render() {
        return (
            <div id="userCard">
                <h2>Name: {this.props.name}</h2>
                <h3>Location: bar</h3>
                <h4>Contact: baz</h4>
                <h5>Count: {this.state.count}</h5>
                {/* <button onClick={() => { this.state.count++ WRONG }}>Increment Count</button> */}
                <button onClick={() => {
                    this.setState({
                        count: this.state.count + 1
                        // count: this.state.count++ wont work
                        // can contain multiple updates inside the same block
                        // no need for multiple contiguous this.setState() blocks
                        // if multiple state variables exist and we arent updating all
                        // then we only specify the ones that are changing and we dont
                        // need to specify all the unchanged variabls as react will manage it
                        // behind the scenes as we only specify the state variables that have
                        // changed inside the this.setState() block

                    })
                }}>Increment Count</button>
            </div>
        );
    }
}

export default User; // exporting/importing/using class based components is same as functional components