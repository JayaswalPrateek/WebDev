import { useState } from "react";
import AccordianList from "./AccordianList";

const AccordionCategory = (props) => {
    const [showAccordianList, setShowAccordianList] = useState(false)
    return (
        <div id="accordionCategoryContainer">
            <div id="accordionCategoryHeader" className="w-6/12 mx-auto my-4 bg-gray-100 shadow-lg p-4">
                <div className="flex justify-between cursor-pointer" onClick={
                    () => {
                        setShowAccordianList(!showAccordianList)
                        let indicator = document.getElementById("arrow")
                        if (indicator.innerText === "↓")
                            indicator.innerText = "↑"
                        else
                            indicator.innerText = "↓"
                    }}>
                    <span className="font-bold text-lg">{props.data.title} ({props.data.itemCards.length})</span>
                    <span id="arrow">↓</span>
                </div>
                {showAccordianList && <AccordianList data={props.data} />}
            </div>
        </div>
    );
}

export default AccordionCategory;