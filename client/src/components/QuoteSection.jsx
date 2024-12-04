import React from "react";
import { InfiniteMovingCards } from ".";

const aiQuotes = [
  {
    quote:
      "Artificial intelligence will reach human levels by around 2029. Follow that out further to, say, 2045, we will have multiplied the intelligence, the human biological machine intelligence of our civilization a billion-fold.",
    name: "Ray Kurzweil",
    title: "American Inventor & Futurist",
  },
  {
    quote:
      "Machine learning and AI will empower and improve every business, every government organization, and every philanthropy. I can’t imagine any aspect of life that isn’t going to be impacted by these technologies.",
    name: "Satya Nadella",
    title: "CEO of Microsoft",
  },
  {
    quote:
      "Artificial intelligence, deep learning, machine learning — whatever you’re doing if you don’t understand it — learn it. Because otherwise, you’re going to be a dinosaur within 3 years.",
    name: "Mark Cuban",
    title: "Entrepreneur & Investor",
  },
  {
    quote:
      "The development of full artificial intelligence could spell the end of the human race.",
    name: "Stephen Hawking",
    title: "Theoretical Physicist",
  },
  {
    quote:
      "AI will probably most likely lead to the end of the world, but in the meantime, there'll be great companies.",
    name: "Sam Altman",
    title: "Entrepreneur & Investor",
  },
];

function QuoteSection() {
  return (
    <div>
      <div className="h-[40rem] w-full dark:bg-black dark:bg-grid-white/[0.1] relative flex flex-col items-center justify-center overflow-hidden">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
          AI Insights
        </h1>
        <div className="flex justify-center w-full overflow-hidden px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-6xl">
            <InfiniteMovingCards
              items={aiQuotes}
              direction="right"
              speed="slow"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuoteSection;
