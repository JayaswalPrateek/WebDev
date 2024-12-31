// JSDOM emulates the browser DOM so we can use it to test components in isolation
// Browser's DOM doesn't natively support testing, so we use JSDOM instead
// render() does DOM manipulation on the screen
// screen object helps in asserting that the element has been rendered
import { render, screen } from "@testing-library/react"
import ContactUS from "../components/ContactUS"
import "@testing-library/jest-dom" // enhances assertion support with methods like toBeInTheDocument(), getters, etc

test("Should load the ContactUS Component", () => {
    // React Testing Pattern: render -> query -> assert
    render(<ContactUS />)
    const heading = screen.getByRole("heading") // other roles: "button", etc
    // can also getByText() to check if specific text is visible on the screen after rendering
    // getAllByRole() returns an array of matches so that we can assert each one of them
    // all such getters ie querying methods on the screen return the react virtual DOM node object
    expect(heading).toBeInTheDocument()
})

// a single file can have multiple test cases regd. that specific component
// test(...)
// test(...)
// test(...)
// test(...)

// to group related test cases in one block, use
/**
 describe("", () => {
    test(...)
    test(...)
    test(...)
    test(...)
})
*/

// we can nest describe blocks inside another describe block
/**
describe("", () => {
    describe("", () => {
        test(...)
        test(...)
    })
    describe("", () => {
        test(...)
        test(...)
    })
})
*/

// instead of using test() we can also use it() coz its just an alias(both are same)