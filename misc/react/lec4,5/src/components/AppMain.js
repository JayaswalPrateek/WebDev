import Card from "./Card";
import CardDataList from "../utils/mockData"; // behaves as a const
// all hooks are provided by React and not ReactDOM can to import them:
import { useState } from "react"; // we need to do a named import

const AppMain = () => {
    // let filteredCardDataList = CardDataList; // is a normal variable and not tied to the UI
    // so as it updates throughput the code, the UI wont update simultaneously
    // to do that we need to make it a state variable instead using a react hook called useState
    // a react hook is a normal built in javascript function provided by react
    // useState() and useEffect() are 2 most common hooks
    // useState() creates state variables to tie the state of the UI to the state of an object
    // the scope of a local state variable is inside the component
    // a state variable cant be modified with a simple assignment operator, use a
    // method returned by useState(). So to create a state variable with a initial defualt value:
    // let [statefulVar, setStatefulVarFunc] = useState(<default value of the state variable>):
    let [statefulCardDataList, setStatefulCardDataListFn] = useState(CardDataList);
    // then continue to use it as a normal variable, behind the scenes its tied to the UI
    return (
        <main id="appMain">
            <section id="searchContainer">
                Search
            </section>
            <section id="filterContainer">
                <button id='filterButton' onClick={() => {
                    // filteredCardDataList = CardDataList.filter(card => card.info.avgRating >= 4.5)
                    setStatefulCardDataListFn(statefulCardDataList.filter(card => card.info.avgRating >= 4.5))
                    // whenever a state variable is updated, the component associated to it is re rendered
                }}>
                    Top Rated(4.5★ or more)
                </button>
            </section>
            <section id="cardContainer">
                {/* <Card
            // cardName="La Pino'z Pizza" cardCuisine="Italian" cardETA="30" cardRating="4"
            // cardImageSrc="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/f44bc9708c514cd2dd6ae0d8b4677214"
            /> */}
                {/* <Card CardData={CardDataList[1]} /> */}
                {
                    statefulCardDataList.map(entry => <Card key={entry.info.id} CardData={entry} />)
                }
            </section>
        </main >
    )
};

// to fix the warning: Error: Each child in a list should have a unique "key" prop,
// we provide each card entry with its unique id, there is a unique id in the API result.
// react needs unique keys to optimize component rendering when new component is added
// after rendering is done, the new component can be identified by its unique id and
// then only the newly added component will be rerendered. otherwise all components
// will be rerendered which would degrade the performance.
// always avoid using array indices generated by map methods as keys

export default AppMain;

/** React Hooks Behind The Scenes:
 * Reconciliation Algorithm(React Fiber) introduced in React 16:
 * Initially we had a component with multiple children (before filtering)
 * After filterning we are left with far fewer children
 * Virtual DOM: representation of the actual DOM
 * Actual DOM made up of HTML elements that are already rendered
 * While React Components, before being rendered but after creating using JSX
 * exist in the virtual DOM. Virtual DOM is made up of JS Objects which under
 * multiple layers of abstraction are created using React.CreateElement()
 * A very performant diff algorithm compares 2 different virtual DOMs and
 * tries to re render only the components that have changed instead of
 * re rendering all the components. diff algorithm is react fiber
 * and the render process is called reconsiliation algorithm.
 * Using the state variable's setter method, a new virtual dom is
 * created and compared against the previous virtual dom and the
 * changes are evaluated by the react fiber diff algorithm that is
 * them used to make minimal changes to the actual dom instead of
 * having to re render the entier dom. Working with virtual dom is
 * much faster than working with the actual dom and this is the reason
 * why react is fast and why keys need to be unique(for diffing).
 * The elements common to both the virual doms(new and old) stay as it is
 * and arent modified/rendered again. The setter method for the state variable
 * triggers the diff algorithm which cant be done simply by using the
 * assignment operator.
 *
    - The crucial point about State variables is that
    whenever they update, React triggers a reconciliation
    cycle and re-renders the component.
    - This means that as soon as the data layer changes,
    React promptly updates the UI layer. The data layer is
    always kept in sync with the UI layer.
    - To achieve this rapid operation, React employs a
    reconciliation algorithm, also known as the diffing
    algorithm or React-Fibre
    - incremental rendering in React Fiber: the ability to split
    rendering work into chunks and spread it out over multiple
    frames.
    - "Reconciliation" is syncing of the virtual dom with the real one
    It is the algorithm React uses to diff one tree with another to determine which parts need to be changed.
    - Different component types are assumed to generate substantially different trees.
    - React will not attempt to diff them, but rather replace the old tree completely.
    Diffing of lists is performed using keys. Keys should be "stable, predictable, and unique."
    - The reason React can support so many targets is because React is designed so that reconciliation
    and rendering are separate phases. The reconciler does the work of computing which parts of a tree
    have changed; the renderer then uses that information to actually update the rendered app.
    - This separation means that React DOM and React Native can use their own renderers while
    sharing the same reconciler, provided by React core.
    - React Fiber implements the reconciler. It is not principally concerned with rendering
 *
 * More on this: https://github.com/acdlite/react-fiber-architecture
 */