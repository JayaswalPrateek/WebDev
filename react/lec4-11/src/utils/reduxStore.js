/**
 * Redux is a state management library / data store for react apps
 * Its roped into a project when managing the state using contexts becomes cumbersome
 * Projects can be built without it too, but using it simplifies the data layer
 * Architecture of Redux Toolkit:
 * - A single globally visible huge object acts as the data store
 * - This object contains slices which are logical partitions
 *      - each slice is for a specific purpose/type of data
 *      - like different tables in a relational database
 *      - so we dont need to create multiple objects
 * - We cant directly insert data from frontend UI to the store object
 * - Suppose a button updates a slice in the store object
 *      - clicking on the button should dispatch an action
 *      - this action calls a function called reducer
 *      - this reducer function modifies the slice in the store object
 * - To read data from a slice in the store object:
 *      - a selector lies between the slice and the component that requests the data
 *      - it moves the data from the slice to the component requesting the data
 *      - the selector allows the component to subscribe to the store's slice
 *      - if reducer changes some data, the data's subscribers update the value automatically
*/
import { configureStore } from "@reduxjs/toolkit";
// import reducers from all the stores:
import cartReducer from "./cartSlice";

// since all the slices are a part of the larger store,
// so all their reducers too are part of the reducer of the same larger store
// and aggregately mention them in configureStore()
const reduxStore = configureStore({
    reducer: {
        cart: cartReducer
        // ...
    }
})

export default reduxStore;
// Now we import it wherever we need to read/write data
// Lets use it to build the cart functionality
// import { Provider } from "react-redux";
// import reduxStore
// and wrap the entire app with <Provider store={reduxStore}></Provider>
// a selector is nothing but a hook in react called useSelector()
//      - we need to specify the slice we want to access