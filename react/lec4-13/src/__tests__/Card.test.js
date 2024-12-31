import { render, screen } from "@testing-library/react"
import Card, { promotedCard } from "../components/Card"
import CARD_DATA_MOCK from "../mocks/CardDataMock.json"
import "@testing-library/jest-dom"

test("Should render the Card component with the props data", () => {
    render(<Card CardData={CARD_DATA_MOCK} />)

    const name = screen.getByText(CARD_DATA_MOCK.info.name)

    expect(name).toBeInTheDocument()
})

test("Should render the promoted Card component with the props data", () => {
    const PromotedCard = promotedCard(Card);
    render(<PromotedCard CardData={CARD_DATA_MOCK} />);

    const name = screen.getByText("Promoted");

    expect(name).toBeInTheDocument();
})
