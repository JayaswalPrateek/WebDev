// Integration Test For Cart
// Add dishes to cart, Increment cart size in header
import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react";
import RestrauntMenu from "../components/RestaurantMenu";
import RESTAURANT_DATA_MOCK from "../mocks/RestaurantDataMock.json"
import "@testing-library/jest-dom"
import { Provider } from "react-redux";
import reduxStore from "../utils/reduxStore";
import AppHeader from "../components/AppHeader";
import { BrowserRouter } from "react-router";
import Cart from "../components/Cart"

global.fetch = jest.fn(() =>
    Promise.resolve(
        { json: () => Promise.resolve(RESTAURANT_DATA_MOCK) }
    )
)

test("Should load RestrauntMenu component", async () => {
    await act(async () => render(
        <BrowserRouter>
            <Provider store={reduxStore}>
                <AppHeader />
                <RestrauntMenu />
                <Cart />
            </Provider>
        </BrowserRouter>
    ))

    // Find and Expand 'Croissants'
    const croissantsAccordionMenu = screen.getByText("Croissants (3)")
    expect(croissantsAccordionMenu).toBeInTheDocument()
    fireEvent.click(croissantsAccordionMenu)

    // Check if all 3 Croissants are shown
    const dishesBeforeAdding = screen.getAllByTestId("dish").length
    expect(dishesBeforeAdding).toBe(3)

    // Check if the dish can be added
    expect(screen.getByText("Cart")).toBeInTheDocument()
    const addButtons = screen.getAllByRole("button", { name: "+" })
    fireEvent.click(addButtons[0])
    expect(screen.getByText("Cart(1)")).toBeInTheDocument()
    fireEvent.click(addButtons[2])
    expect(screen.getByText("Cart(2)")).toBeInTheDocument()

    // Check if the Cart page reflects it
    // 3 dish rendered by RestrauntMenu
    // After adding 1st and 3rd dishes:
    // 2 dishes rendered in the cart
    // all on the same page/screen
    const dishesAfterAdding = screen.getAllByTestId("dish").length
    expect(dishesAfterAdding).toBe(3 + 2)

    // after clearing the cart:
    const clearButton = screen.getByRole("button", { name: "Clear Cart" })
    fireEvent.click(clearButton)
    const dishesAfterClearing = screen.getAllByTestId("dish").length
    expect(dishesAfterClearing).toBe(3 + 2 - 2)
    expect(screen.getByText("Cart is Empty")).toBeInTheDocument()
    expect(screen.getByText("What are you craving today?")).toBeInTheDocument()

    // Ideally split such large single tests into multiple tests
    // so that its easy to debug if a single assertion fails
})
