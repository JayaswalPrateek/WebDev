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

export default Card;