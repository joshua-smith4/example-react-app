import { useState, useEffect } from "react";

function cards(numCards, width, margin) {
    let retVal = [];
    for (let i = 0; i < numCards; ++i) {
        retVal.push(
            <div
                style={{
                    backgroundColor: "green",
                    margin: margin,
                    width: width,
                    height: 300,
                }}
            ></div>
        );
    }
    return retVal;
}

function App() {
    const minCardWidth = 220;
    const margin = 10;

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    let numColumns = Math.floor(windowWidth / minCardWidth);
    if (numColumns <= 0) numColumns = 1;
    const totalMargin = numColumns * margin * 2 + 1;
    const cardWidth = (windowWidth - totalMargin) / numColumns;

    function onWindowResize(evt) {
        setWindowWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener("resize", onWindowResize);
        return () => {
            window.removeEventListener("resize", onWindowResize);
        };
    }, []);

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                }}
            >
                {cards(10, cardWidth, margin)}
            </div>
        </div>
    );
}

export default App;
