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
        this.state = {
            userInfo: null,
            count: 0
        }
        // to create another state variable dont do this.state = { count2: 1 }
        // as it will override the existing state variabiles inside this.state
        // at the end of the constructor of the class based component render() is called
        // just like render(), we can define componentDidMount() method which is called
        // after constructor calls render and render finishes its execution which is
        // useful for making API calls in class based reaact components just like we use
        // useEffect() in functional react components. React optimizes between render and
        // componentDidMount, by batching children rendering and commiting them to the
        // real dom together. So if a class based parent component contains 2 child class
        // based components, then the parents constructor is called, then its render is
        // called which encounters the children so it defers componentDidMount for the
        // parent and calls the constructor and render of the the 2 children together
        // and waits till both are rendered and commits them to the actual dom together
        // and then calls their componentDidMount and finally parent's componentDidMount
        // ie the constructor of the 2nd child doesnt wait for componentDidMount of its
        // prev sibling(2nd child) ie we dont render/commit them seperately. Can make it
        // async if its code inside it uses await.
    }

    render() {
        return (
            <div id="userCard">
                <img src={this.state.userInfo?.avatar_url} width="100px"></img>
                <h2>Name: {this.state.userInfo?.name}</h2>
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
            </div >
        );
    }

    async componentDidMount() {
        const data = await fetch("https://api.github.com/users/jayaswalPrateek");
        const json = await data.json();
        this.setState({ userInfo: json });
    }
    /**
     * Lifecycle only applies to Class Based React Components
     * Phase 1: Mounting:
     *              - constructor called
     *              - render default data in this.state
     *              - commit the render(draw) to actual DOM
     *              - run componentDidMount which calls the API
     * Phase 2: Updating:
     *              - after the API returns the result, we update this.state
     *              - render is called again(no constructor called this time)
     *                  - if there are multiple children, multiple renders are batched
     *                  - and then all renders are commited at once
     *              - commit the updated render(diff) to actual DOM
     *              - run componentDidUpdate method(if defined)
     * Phase 3: Unmounting:
     *              - calls componentDidUnmount method(if defined)
     *                  - called when the component is about to be removed
     *                      - like when going to another route/page
     *                  - useful for clearing setInterval()
     *                      - if not removed, every time a component is rendered,
     *                        a new setInterval() is started without removing the
     *                        previous one, reressing the performance.
     *                      - to achieve the same thing in functional components, return
     *                        a method at then end of the useEffect() which is called when
     *                        when the functional component is about to be unloaded
     */
    // componentDidMount and componentDidUnmount happen only once at the start and end
    // in between multiple componentDidUpdate may happen.
}

export default User; // exporting/importing/using class based components is same as functional components