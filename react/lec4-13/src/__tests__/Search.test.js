// Integration Test for Searching User Flow
import { render, screen, fireEvent } from "@testing-library/react"
import AppMain from "../components/AppMain"
import CARD_DATA_LIST_MOCK from "./../mocks/CardDataListMock.json"
import { act } from "react"
import { BrowserRouter } from "react-router"
import "@testing-library/jest-dom"

// We dont make network calls from a test
// So test can run even if offline
global.fetch = jest.fn(() => {
    return Promise.resolve({
        json: () => {
            return Promise.resolve(CARD_DATA_LIST_MOCK)
        }
    }
    )
})

beforeAll(() => {
    // runs before all the test cases
})

beforeEach(() => {
    // runs before each test case
})

afterAll(() => {
    // runs after all the test cases
})

afterEach(() => {
    // runs after each test case
})

// act ensures that all updates to the component and its state
// are processed and applied before assertions when the component
// contains async operations(even if they are mocked) like fetch()
test("Should search for 'Pizza' among all the cards", async () => {
    await act(async () => {
        render(
            <BrowserRouter>
                <AppMain />
            </BrowserRouter>
        )
    })

    // Check if Search Button Exists
    const searchButton = screen.getByRole("button", { name: "Search" })
    expect(searchButton).toBeInTheDocument()

    // Check if Search Input Box Esists
    const searchInput = screen.getByTestId("searchInput")
    expect(searchInput).toBeInTheDocument()

    // Add Text to it
    fireEvent.change(searchInput, { target: { value: "Pizza" } })
    // here event e in onchange handler is { target: { value: "Pizza" } }

    // Number of Cards Before Search
    const beforeSearch = screen.getAllByTestId("Card");
    expect(beforeSearch.length).toBe(20)


    // Click on Search
    fireEvent.click(searchButton)
    const searchResult = screen.getAllByTestId("Card");
    expect(searchResult.length).toBe(2)

})