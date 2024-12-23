const AccordianList = (props) => {
    const itemCards = props.data.itemCards;

    return (
        <div >
            <ul>
                {itemCards.map((dish) => {
                    // console.log(dish.card.info);
                    const { id, name, price, defaultPrice, description } = dish.card.info;
                    const displayPrice = (price ?? defaultPrice) / 100;

                    return (
                        <li key={id} className="p-4 m-4 border-b-2  border-neutral-200 text-left">
                            <div className="flex justify-between">
                                <span>{name}</span>
                                <div className="flex flex-col items-center justify-center">
                                    <span>₹ {displayPrice}</span>
                                    <button className=" border border-stone-400 rounded-lg p-1">ADD</button>
                                </div>
                            </div>
                            <p className="text-xs ">{description}</p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default AccordianList;
