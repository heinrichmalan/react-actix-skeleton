import React from 'react';
import styled, { keyframes } from 'styled-components';

const dash = keyframes`
to {
    transform: rotate(-360deg);
}
`;

const SpinningSVG = styled.svg`
    display: inline-block;
    animation: ${dash} 1s linear backwards;
    animation-iteration-count: infinite;
    transform: rotate(0deg);
    transform-origin: 50% 50%;
`;

const circleColour = keyframes `
    50% {
      stroke: white;
    }
    100% {
      stroke: #61DAFB;
    }
`;

const ColourChangeCircle = styled.circle`
    stroke-dasharray: 250;
    //stroke-dashoffset: 100;
    stroke: #61DAFB;
    stroke-width: 5px;
    animation: ${circleColour} 2s linear;
    animation-iteration-count: infinite;

    
`;


const Spinner = () => {
    return (
        <SpinningSVG
            width="25mm"
            height="25mm"
            viewBox="0 0 113.85714 113.85714"
            version="1.1"
            id="svg8">
            <g
                id="layer1"
                transform="translate(-60.244053,-122.89881)">
                <ColourChangeCircle
                style={{fill:"none", fillOpacity: 0.87362635, strokeLinecap: "round", strokeMiterlimit:4, strokeOpacity:1, paintOrder: "normal"}}
                cx="117.17262"
                cy="179.82738"
                r="54.42857"/>
            </g>
        </SpinningSVG>
    )
}
export default Spinner;