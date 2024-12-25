import { useDispatch } from "react-redux"
import { addItem } from "../utils/cartSlice";

const AccordianList = (props) => {
    const itemCards = props.data.itemCards;
    const dispatch = useDispatch() // Dispatch an action using useDispatch()

    return (
        <div >
            <ul>
                {itemCards.map((dish) => {
                    // console.log(dish.card.info);
                    const { id, name, price, defaultPrice, description } = dish.card.info;
                    const displayPrice = (price ?? defaultPrice) / 100;
                    return (
                        <li key={id} className="p-4 m-4 border-b-2  border-[grey] text-left">
                            <div className="flex justify-between items-center">
                                <span className="italic font-bold text-xl">{name}</span>
                                <div className="flex items-center justify-center">
                                    <span className="font-extrabold">₹ {displayPrice}</span>
                                    {
                                        // safe conditional rendering to ensure + button isnt shown on the cart page
                                        !props.data.hasOwnProperty('noAdd') ?
                                            <button className="font-semibold text-xl border border-[grey] rounded-xl p-0 m-2 h-8 w-8"
                                                onClick={() => {
                                                    // dispatch an action that was exported by the slice
                                                    dispatch(addItem(dish))
                                                    // action is the argument to the dispatcher
                                                    // argument to this action is the payload
                                                }}>
                                                +
                                            </button>
                                            :
                                            <div></div>
                                    }
                                </div>
                            </div>
                            <p className="text-xs ">{description}</p>
                        </li>
                    );
                })}
            </ul>
        </div >
    );
};

export default AccordianList;
