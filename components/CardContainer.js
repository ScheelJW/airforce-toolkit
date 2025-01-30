import React from "react";
import { Card, CardContent } from "./Card"; // Ensure Card and CardContent are correctly imported

const CardContainer = ({ cards, onCardClick }) => {
    return (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center max-w-6xl mx-auto">
            {cards.map((card, index) => (
                <div
                    key={index}
                    onClick={() => onCardClick(card.title)} // Pass the card's title to the onCardClick function
                    className="cursor-pointer hover:scale-105 transition-transform"
                >
                    <Card className="w-64 h-64">
                        <CardContent className="flex flex-col justify-center items-center h-full">
                            {card.icon}
                            <h2 className="text-xl font-bold mb-2 text-center">{card.title}</h2>
                            <p className="text-sm text-gray-300 text-center">{card.description}</p>
                        </CardContent>
                    </Card>
                </div>
            ))}
        </div>
    );
};

export default CardContainer;