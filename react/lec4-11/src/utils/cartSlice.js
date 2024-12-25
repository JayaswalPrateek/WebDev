import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart", // name of the slice
    initialState: { // default/initial state of the slice
        items: []
    },
    reducers: { //  methods to modify/update the slice data (plural)
        addItem: (state, action) => {
            console.log(action.payload);
            state.items.push(action.payload);
        },
        removeItem: (state) => {
            state.items.pop();
        },
        clearCart: (state) => {
            // we want to mutate the state like this:
            state.items.length = 0
            // and not destroy and recreate ie override the local state variable like:
            // state.items = []; as bts, redux diffs the current and prev state
            // state is a local copy and assigning [] won't update the store's data
            // This is the most common reason behind buggy reducer methods
            // you either do state.items.length = 0
            // or return a new state like return {items: []} as per the docs.
            // but you cant assign a new state on top of a local copy of an existing state like: state.items=[]
            // ie returning from a reducer methods can update the state too.
        } // these methods are combined into a single reducer(singular) object for exporting
    }
});

/**
 * import { current } from "@reduxjs/toolkit";
 * to log the state use current(state)
 */

/**
 * createSlice() returns an object that looks like:
 * {
 *      actions: {
 *          addItem,
 *          removeItem,
 *          clearCart
 *      }
 *      reducer: {...}
 * }
 */

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;