import { useState, useEffect } from "react";

function withWindowScalingTiles(component_generator) {
    const components = component_generator();
    return ({ margin, minWidth, minHeight }) => {
        const [windowWidth, setWindowWidth] = useState(window.innerWidth);

        let numColumns = Math.floor(windowWidth / (minWidth + margin * 2));
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
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                }}
            >
                {components.map((TileComp, key) => {
                    return (
                        <TileComp
                            key={key}
                            width={cardWidth}
                            minHeight={minHeight}
                            margin={margin}
                        />
                    );
                })}
            </div>
        );
    };
}

function cards() {
    let retVal = [];
    for (let i = 0; i < 10; ++i) {
        retVal.push(({ width, minHeight, margin }) => (
            <div
                style={{
                    backgroundColor: "green",
                    width: width,
                    minHeight: minHeight,
                    margin: margin,
                }}
            ></div>
        ));
    }
    return retVal;
}

const TiledDivs = withWindowScalingTiles(cards);

function App() {
    return <TiledDivs margin={10} minWidth={220} minHeight={300} />;
}

export default App;
