/*
props drilling:
when there are deeply nested hierarchical react components and a top level components wants to pass a prop to a deeply nested react component then the prop needs to be explicitly passed through each and every component between them.
Inside Parent's functional component: <Child foo='bar'/>
Then child's props obj contains property foo with value 'bar':
const Child = (props) => {...} and can be accessed using:
props.foo and the child may have to further propogate it like its parent did to it(without using it itself).
This is called props drilling. Solution: React Context allows declaring globally visible data for all components.
Let UserContext be a React Context that stores the information about the logged in user which is visible to all components.
*/

import { createContext } from "react";

const UserContext = createContext({
    loggedInUsername: "" // Default Value, if mapped with the state, then the state's default overrides it
})

export default UserContext;
// React Contexts can be accessed using useContext() hook withing functional react components
// for class based react components: import UserContext from "../utils/UserContext";
// then <UserContext.Consumer>{(data)=>console.log(data.loggedInUsername)}</UserContext.Consumer>
// to update the value of the react context, wrap the html that uses UserContext.loggedInUsername
// in <UserContext.Provider value={newValue}></UserContext.Provider> everywhere and then all of them
// will update whenever its value is changed.