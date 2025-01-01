import { CDN_URL } from "../utils/constants";
const Card = (props) => {
    const { name, cloudinaryImageId, cuisines, sla, avgRating } = props.CardData.info;
    return (
        <div data-testid="Card" className="flex flex-col rounded-lg h-[450px] w-[200px] bg-[lightgrey] hover:cursor-pointer m-5 hover:border-[2px] hover:border-[solid] hover:border-[grey]">
            <img className="h-[200px] object-cover rounded-t-lg w-full" alt={name} src={CDN_URL + cloudinaryImageId}></img>
            <div className="text-center p-2 flex flex-col flex-grow items-center justify-evenly">
                <h3 className="font-bold text-xl">{name}</h3>
                <h4><i>{cuisines.join(', ')}</i></h4>
                <h4 className="font-bold">{sla.deliveryTime} mins</h4>
                <h4 className="font-bold">{avgRating} ★</h4>
            </div>
        </div>
    );
};

// a higher order component accepts and returns a component
//      - In between it enhances the input component
//      - Pure Function coz input component itself isnt modified
export const promotedCard = // promotedCard is a Higher Order Functional React Component:
    (Card) => { // that accepts a Card Component
        return (props) => { // and then creates and returns
            return ( // functional component that will
                <div className="relative">
                    <Card {...props} /> {/* always contain <Card/> but will */}
                    {/* conditionally render the 'Promoted' label if that restraunt is being promoted */}
                    <label className="text-sm text-bold absolute mx-15  top-2 left-2 bg-black text-white px-2 py-1 rounded-lg">Promoted</label>
                </div>
            )
        }
    };

export default Card;