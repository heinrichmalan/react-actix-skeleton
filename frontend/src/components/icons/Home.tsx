import React, { useState } from "react";

const HomeIcon = ({
    width = "15mm",
    height = "15mm",
    stroke = "#000000"
}: {
    width?: string;
    height?: string;
    stroke?: string;
}) => {
    const [strokeColor, setStrokeColor] = useState(stroke);
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            id="svg8"
            version="1.1"
            viewBox="0 0 150 150"
            height={width}
            width={height}
            onMouseEnter={() => {
                setStrokeColor("#FFFFFF");
            }}
            onMouseLeave={() => {
                setStrokeColor(stroke);
            }}
        >
            <g transform="translate(-34.387722,-27.529758)" id="layer1">
                <g
                    style={{ stroke: "#000000", strokeOpacity: 1 }}
                    transform="translate(9.224033,-1.8914502)"
                    id="g856"
                >
                    <path
                        style={{
                            fill: "none",
                            strokeWidth: 10,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeMiterlimit: 4,
                            strokeDasharray: "none",
                            strokeOpacity: 1,
                            stroke: strokeColor
                        }}
                        d="M 49.892857,97.050589 V 173.77976 H 150.05654 V 97.050589"
                        id="path833"
                    />
                    <path
                        style={{
                            fill: "none",
                            strokeWidth: 10,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeMiterlimit: 4,
                            strokeDasharray: "none",
                            strokeOpacity: 1,
                            stroke: strokeColor
                        }}
                        d="m 38.175598,97.050591 61.988092,-61.98809 61.98809,61.98809"
                        id="path847"
                    />
                    <path
                        style={{
                            fill: "none",
                            strokeWidth: 10,
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeMiterlimit: 4,
                            strokeDasharray: "none",
                            strokeOpacity: 1,
                            stroke: strokeColor
                        }}
                        d="M 49.892857,72.860117 V 44.133919 c 7.386333,-10e-7 14.221101,-10e-7 20.599704,0 v 7.370542"
                        id="path851"
                    />
                </g>
            </g>
        </svg>
    );
};

export default HomeIcon;
