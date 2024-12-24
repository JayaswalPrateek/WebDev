// import { useState } from "react";
import AccordianList from "./AccordianList";

const AccordionCategory = (props) => {
    // const [showAccordianList, setShowAccordianList] = useState(false)
    // instead of having a state for each category, lets lift the state from
    // the child to the parent ie from AcordianCategory to RestrauntMenu.
    // This will ensure that only one category is expanded at a time.
    // so instead of showAccordianList, use props.showAccordianList.
    // By lifting the state up from AcordianCategory to RestrauntMenu,
    // AcordianCategory becomes a controlled component of RestrauntMenu.
    // Before, with its own state, it was an uncontrolled component.
    // setExpandedIndex() is passed from parent as a prop
    /**
     * makes the child AccordionCategory a controlled component of the parent
     * RestaurantMenu which itself holds the state instead of each child holding one.
     * By default the first category is expanded(0th index).
     * The click handler in the child uses a function showAccordianList() passed by
     * the parent to expand itself which controls the value of another variable
     * passed to it called showAccordianList. The child conditionally renders its
     * list if the variable is set to true.
     */
    return (
        <div id="accordionCategoryContainer">
            <div id="accordionCategoryHeader" className="w-6/12 mx-auto my-4 bg-gray-100 shadow-lg p-4">
                <div className="flex justify-between cursor-pointer" onClick={() => {
                    // setShowAccordianList(!showAccordianList)
                    props.setExpandedIndex()
                }}>
                    <span className="font-bold text-lg">{props.data.title} ({props.data.itemCards.length})</span>
                    <span id="arrow">↓</span>
                </div>
                {props.showAccordianList && <AccordianList data={props.data} />}
            </div>
        </div>
    );
}

export default AccordionCategory;