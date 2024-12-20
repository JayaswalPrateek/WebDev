import Card from "./Card";
// import CardDataList from "../utils/mockData"; // behaves as a const
// all hooks are provided by React and not ReactDOM can to import them:
import { useState, useEffect } from "react"; // we need to do a named import
import ShimmerUI from "./ShimmerUI";
import { Link } from "react-router"; // so that clicking on cards takes us to the menu

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
    // let [statefulCardDataList, setStatefulCardDataListFn] = useState(CardDataList);
    const [statefulCardDataList, setStatefulCardDataListFn] = useState([]);
    // then continue to use it as a normal variable, behind the scenes its tied to the UI
    // so whenever the variable is updated, the UI displaying the variable gets rerendered too
    // is a reconsoliation cycle is triggered every time state variable changes

    const [statefulFilteredCardDataList, setStatefulFilteredCardDataListFn] = useState();
    // is for search feature and not filter feature. If we filter and update the original list
    // then we lose the remaining data forever preventing future searches on the orginial list
    // so the original list stays intact throughout the code and this list is updated and
    // displayed throuhout the program and initially it mirrors the original list but later
    // it uses the original list to keep updating itself and we use this list to render cards


    const [searchBoxInputText, setSearchBoxInputText] = useState("");
    // how are they changing when they are const?
    // Ans: They are changed when the component is rerendered so they ar reassigned and not modified

    // never create state variables outside of a component
    // good practice to create them at the top withing a component
    // never create them inside a if else conditional, for loops, functions nested inside component

    /**
     * 2 approaches to load a website whose content is fetched from an API Call:
     * 1. Load the website -> Call the API -> Render the UI with the data from the API
     *      Pros: No redundant rendering cycles needed
     *      Cons: Untill the API call is successful, we see a blank white screen
     * 2. Load the website -> Render wireframe -> Call the API -> Populate the wireframe
     *      Pros: User doesnt see a blank white screen till the API sends a result
     *      Cons: One extra rendering cycle needed thats wasteful as its overwritten after the API responds
     *                  - Technically not too bad/wasteful as react is very efficient + Better UX too
     * So with React, prefer 2 over 1 and to achieve 2 use need to use another hook called useEffect()
     * useEffect() react hook takes in a callback method and a dependency list
     */

    // useEffect(() => { console.log("USE EFFECT CALLED"); }, [statefulCardDataList]);
    // the callback function is executed every time the component rendering is done
    // so we will fetch the data to be displayed within the body of this callback function
    // specifying the callback function is mandatory but specifying the dependency array is optional
    // if the dependency array is not specified, the default behaviour is that the callback function
    // is called every time the component is rendered. If an empty dependency array is specified then
    // the callback method is only called once for the first render. If the dependency array contains
    // state variables or props, then the callback methods is called whenever eny one of these
    // dependency changes their values. Will still be called after the initial render.
    useEffect(() => { fetchData() }, [])
    const fetchData = async () => {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.2108683&lng=72.9608202&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
        const json = await data.json();
        console.log(json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants);
        setStatefulCardDataListFn(json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants);
        setStatefulFilteredCardDataListFn(json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants);
    }

    // Conditional Rendering:
    // if (statefulCardDataList.length === 0) return <h1>Loading...</h1>
    // This is not a good approach as the content jumps on the user's screen
    // instead of fitting in place. Shimmer UI solves this by showing
    // greyed out placeholders in places where we are expecting to render
    // after getting the response from the fetch API
    // Using Shimmer UI:
    if (statefulCardDataList.length === 0) return <ShimmerUI />

    return (
        <main id="appMain">
            <section id="searchContainer">
                {/* here every onChange event triggers reconsoliation cycle on the entire body */}
                {/* but only the input box is rerendered as its the only diff between the 2 virtual DOMs */}
                {/* Its updating the value attribute of the input box in every reconsoliation cycle */}
                <input type="text" className="searchBox" value={searchBoxInputText} onChange={(e) => setSearchBoxInputText(e.target.value)} />
                <button onClick={() => {
                    console.log(searchBoxInputText);
                    setStatefulFilteredCardDataListFn(statefulCardDataList.filter(card => card.info.name.toLowerCase().includes(searchBoxInputText.toLowerCase())));
                }}>Search</button>
                <section id="filterContainer">
                    <button id='filterButton' onClick={() => {
                        // filteredCardDataList = CardDataList.filter(card => card.info.avgRating >= 4.5)
                        setStatefulFilteredCardDataListFn(statefulCardDataList.filter(card => card.info.avgRating >= 4.5))
                        // whenever a state variable is updated, the component associated to it is re rendered
                    }}>
                        Top Rated(4.5★ or more)
                    </button>
                </section>
            </section>
            <section id="cardContainer">
                {/* <Card
            // cardName="La Pino'z Pizza" cardCuisine="Italian" cardETA="30" cardRating="4"
            // cardImageSrc="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/f44bc9708c514cd2dd6ae0d8b4677214"
            /> */}
                {/* <Card CardData={CardDataList[1]} /> */}
                {
                    // key should be on the outer most element so here its on Link instead of Card
                    statefulFilteredCardDataList.map(entry => <Link to={"/restaurant/" + entry.info.id} key={entry.info.id}>
                        <Card CardData={entry} />
                    </Link>
                    )}
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