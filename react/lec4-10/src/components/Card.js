import { CDN_URL } from "../utils/constants";
const Card = (props) => {
    const { name, cloudinaryImageId, cuisines, sla, avgRating } = props.CardData.info;
    return (< div className="card" >
        <img className="cardImage" alt={name} src={CDN_URL + cloudinaryImageId}></img>
        <div className="cardInfo">
            <h3>{name}</h3>
            <h4><i>{cuisines.join(', ')}</i></h4>
            <h4>{sla.deliveryTime} mins</h4>
            <h4>{avgRating} ★</h4>
        </div>
    </div >
    )
};

export default Card;