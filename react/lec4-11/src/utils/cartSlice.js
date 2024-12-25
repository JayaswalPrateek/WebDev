import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart", // name of the slice
    initialState: { // default/initial state of the slice
        items: []
    },
    reducers: { //  methods to modify/update the slice data
        addItem: (state, action) => {
            console.log(action.payload);
            state.items.push(action.payload);
        },
        removeItem: (state) => {
            state.items.pop();
        },
        clearCart: (state) => {
            state.items.length = 0
        }
    }
});

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