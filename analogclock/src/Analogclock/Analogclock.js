import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import styled from 'styled-components';

const AnalogClockContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 100vh;
color: white;
background: linear-gradient(to bottom, #FFD700, #FF8C00);

`;


const ClockContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  border: 2px solid white;
  border-radius: 50%;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
`;

const HourText = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform-origin: bottom;
  transform: ${({ rotation }) => `translateX(-50%) translateY(-100%) rotateZ(${-rotation}deg)`};
  font-size: 14px;
  font-weight: bold;
  color: white;
`;

const HourHand = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: bottom;
  transform: ${({ rotation }) => `translateX(-50%) translateY(-100%) rotateZ(${rotation}deg)`};
  width: 4px;
  height: 70px;
  background-color: white;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
`;

const MinuteHand = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: bottom;
  transform: ${({ rotation }) => `translateX(-50%) translateY(-100%) rotateZ(${rotation}deg)`};
  width: 2px;
  height: 90px;
  background-color: white;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
`;

const SecondHand = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: bottom;
  transform: ${({ rotation }) => `translateX(-50%) translateY(-100%) rotateZ(${rotation}deg)`};
  width: 1px;
  height: 100px;
  background-color: red;
  box-shadow: 0px 0px 8px rgba(255, 0, 0, 0.3);
`;

const CenterDot = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.3);
`;

const AnalogClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getRotationValue = (handType) => {
    const rotationValue = time[`get${handType}`]() * 6; // 6 degrees per unit (hours, minutes, seconds)
    return rotationValue;
  };

  const renderHourNumbers = () => {
    const hourNumbers = [];
    const radius = 80; // Adjust the radius based on your clock size
    const offsetAngle = -90; // Offset angle to start from 12 o'clock
    const fontSize = 14; // Adjust the font size of the hour numbers
    const yOffset = -12;
    const xOffset = -4;
  
    for (let i = 1; i <= 12; i++) {
      const angle = ((i * 30) + offsetAngle) * (Math.PI / 180); // Calculate angle in radians
      const x = Math.cos(angle) * radius + xOffset + 100; // Adjust the x-coordinate based on the center of the clock
      const y = Math.sin(angle) * radius + 100 + yOffset; // Adjust the y-coordinate based on the center of the clock and apply the offset
      const numberStyle = {
        left: `${x}px`,
        top: `${y}px`,
        fontSize: `${fontSize}px`, // Set the font size
      };
  
      hourNumbers.push(
        <HourText key={i} style={numberStyle}>
          {i}
        </HourText>
      );
    }
  
    return hourNumbers;
  };
  
  

  return (
    
    <AnalogClockContainer>
      <Typography variant="h4" component="div" gutterBottom>
        Analog Clock
      </Typography>
      <ClockContainer>
        {renderHourNumbers()}
        <HourHand rotation={getRotationValue('Hours')} />
        <MinuteHand rotation={getRotationValue('Minutes')} />
        <SecondHand rotation={getRotationValue('Seconds')} />
        <CenterDot />
      </ClockContainer>
    </AnalogClockContainer>
  );
};

export default AnalogClock;
