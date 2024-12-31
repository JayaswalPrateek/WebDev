import { fireEvent, render, screen } from "@testing-library/react"
import AppHeader from "../components/AppHeader"
import { Provider } from "react-redux"
import reduxStore from "../utils/reduxStore"
import { BrowserRouter } from "react-router"
import "@testing-library/jest-dom"

/*
    Note:
    Apparently one of the imports needs TextEncoder
    which isnt being provided by JSDOM and we need
    to polyfill it using a setupTests.js
*/

test("Should render the AppHeader component with a login button", () => {
    // render(<AppHeader />)
    // will throw an error as the component uses redux
    // and we are rendering it in isolation in JSDOM
    // JSDOM doesn't support know redux hooks
    // to fix it we need to render it with redux support:
    /**
     render(
        <Provider store={reduxStore}>
        <AppHeader />
        </Provider>
    )
    */
    // this will again throw an error due to <Link>
    // which is provided by react-router-dom
    // so we need to add router support
    render(
        <BrowserRouter>
            <Provider store={reduxStore}>
                <AppHeader />
            </Provider>
        </BrowserRouter>
    )

    // Multiple ways to query:
    // const loginButton = screen.getByRole("button");
    const loginButton = screen.getByText("Login");
    // if there were multiple buttons, and we want to find the one named Login:
    // const loginButton = screen.getByRole("button", { name: "Login" });

    expect(loginButton).toBeInTheDocument();
})


test("Should render the AppHeader component with 0 cart items", () => {
    render(
        <BrowserRouter>
            <Provider store={reduxStore}>
                <AppHeader />
            </Provider>
        </BrowserRouter>
    )

    const cartItems = screen.getByText(/Cart/); // regex

    expect(cartItems).toBeInTheDocument();
})

test("Should toggle between login and logout buttons onclick", () => {
    jest.spyOn(window, 'prompt').mockImplementation(() => 'guest');
    const mockSetUsername = jest.fn();

    render(
        <BrowserRouter>
            <Provider store={reduxStore}>
                <AppHeader setUsername={mockSetUsername} />
            </Provider>
        </BrowserRouter>
    )

    fireEvent.click(screen.getByText("Login"))
    expect(window.prompt).toHaveBeenCalled();
    const logOutButton = screen.getByRole("button", { name: "Log Out(guest)" })
    expect(logOutButton).toBeInTheDocument();

    window.prompt.mockRestore(); // Cleanup
})