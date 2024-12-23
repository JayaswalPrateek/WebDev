import { CDN_URL } from "../utils/constants";
const Card = (props) => {
    const { name, cloudinaryImageId, cuisines, sla, avgRating } = props.CardData.info;
    return (< div className="card m-[10px] w-[200px] bg-[lightgrey]
            hover:cursor-pointer hover:border-[2px] hover:border-[solid] hover:border-[grey]" >
        <img className="cardImage w-full" alt={name} src={CDN_URL + cloudinaryImageId}></img>
        <div className="cardInfo text-center" >
            <h3>{name}</h3>
            <h4><i>{cuisines.join(', ')}</i></h4>
            <h4>{sla.deliveryTime} mins</h4>
            <h4>{avgRating} ★</h4>
        </div>
    </div >
    )
};

// a higher order component accepts and returns a component
//      - In between it enhances the input component
//      - Pure Function coz input component itself isnt modified
export const promotedCard = // promotedCard is a Higher Order Functional React Component:
    (Card) => { // that accepts a Card Component
        return (props) => { // and then creates and returns
            return ( // functional component that will
                <div>
                    <Card {...props} /> {/* always contain <Card/> but will */}
                    {/* conditionally render the 'Promoted' label if that restraunt is being promoted */}
                    <label className="absolute bg-black text-white m-2 p-2 rounded-lg">Promoted</label>
                </div>
            )
        }
    };

export default Card;