import { Add2NosDemo } from "../components/Add2NosDemo"

test("The function should calculate the sum of 2 numbers", () => {
    const result = Add2NosDemo(75, 25);
    expect(result).toBe(100); // Assertion
})