import { useSelector } from "react-redux";
import AccordianList from "./AccordianList";
import { useContext } from "react";
import UserContext from "../utils/UserContext";
import { useDispatch } from "react-redux"
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
    // avoid subscribing to data that's not needed to optimize performance
    // design the store and its slices with logical seperation, loose coupling
    // the subscriber is notified when the subscribed data mutates
    // if the subscriber not using some data, its still being notified when it changes
    const cart = useSelector((store) => store.cart.items)
    const data = {
        itemCards: cart,
        noAdd: true
    }

    console.log(cart)

    const totalPrice = cart.reduce((sum, item) => {
        const price = item.card.info.price ?? item.card.info.defaultPrice;
        return sum + (Number(price) / 100);
    }, 0);

    const { loggedInUsername } = useContext(UserContext);

    const dispatch = useDispatch() // Dispatch an action using useDispatch()

    return (
        <div id="cart" className="text-center m-1 p-10">
            {
                (cart.length != 0) ?
                    <div className="w-6/12 mx-auto my-4 bg-[lightgrey] shadow-lg p-4">
                        <div className="text-right">
                            <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-bold flex items-center gap-2 ml-auto"
                                onClick={() => {
                                    // dispatch an action that was exported by the slice
                                    dispatch(clearCart())
                                    // action is the argument to the dispatcher
                                    // no argument to this action ie no payload
                                }}> Clear Cart </button>
                        </div>
                        <AccordianList data={data} />
                        <div className="flex justify justify-between">
                            <h1 className="text-4xl font-bold text-left pl-6">Total</h1>
                            <h1 className="text-4xl font-bold text-right pr-6">₹ {totalPrice}</h1>
                        </div>
                    </div>
                    : <div>
                        <h1 className="text-6xl font-semibold text-center pt-10">Cart is Empty</h1>
                        <h1 className="text-2xl font-semibold text-center pt-2 text-stone-500">
                            {loggedInUsername === "" ? "" : "Hey " + loggedInUsername + ", "}What are you craving today?
                        </h1>
                    </div>
            }
        </div>
    );
};

export default Cart;