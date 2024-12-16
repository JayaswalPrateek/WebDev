import Card from "./Card";
import CardDataList from "../utils/mockData";

const AppMain = () => (
    <main id="appMain">
        <section id="searchContainer">
            Search
        </section>
        <section id="cardContainer">
            {/* <Card
            // cardName="La Pino'z Pizza" cardCuisine="Italian" cardETA="30" cardRating="4"
            // cardImageSrc="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/f44bc9708c514cd2dd6ae0d8b4677214"
            /> */}
            {/* <Card CardData={CardDataList[1]} /> */}
            {
                CardDataList.map(entry => <Card key={entry.info.id} CardData={entry} />)
            }
        </section>
    </main >
);

// to fix the warning: Error: Each child in a list should have a unique "key" prop,
// we provide each card entry with its unique id, there is a unique id in the API result.
// react needs unique keys to optimize component rendering when new component is added
// after rendering is done, the new component can be identified by its unique id and
// then only the newly added component will be rerendered. otherwise all components
// will be rerendered which would degrade the performance.
// always avoid using array indices generated by map methods as keys


export default AppMain;