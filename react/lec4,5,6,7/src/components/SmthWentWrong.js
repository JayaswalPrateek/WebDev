import { useRouteError } from "react-router"; // proides error information

const SmthWentWrong = () => {
    const error = useRouteError();
    console.log(error);
    return (
        <div>
            <h1>OOPS! Something Went Wrong!</h1>
            <h3>{error.data}</h3>
        </div>
    )
};

export default SmthWentWrong;