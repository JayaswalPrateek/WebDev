import { useRouteError } from "react-router"; // proides error information

const SmthWentWrong = () => {
    const error = useRouteError();
    console.log(error);
    return (
        <div>
            <h1 className="text-8xl font-bold p-5">OOPS! Something Went Wrong!</h1>
            <h3 className="text-4xl italic p-5">{error.data}</h3>
        </div>
    )
};

export default SmthWentWrong;