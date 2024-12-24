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
                        <li key={id} className="p-4 m-4 border-b-2  border-[grey] text-left">
                            <div className="flex justify-between items-center">
                                <span className="italic font-bold text-xl">{name}</span>
                                <div className="flex items-center justify-center">
                                    <span className="font-extrabold">₹ {displayPrice}</span>
                                    <button className="font-semibold text-xl border border-[grey] rounded-xl p-0 m-2 h-8 w-8">+</button>
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
