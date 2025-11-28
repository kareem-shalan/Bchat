import React from 'react';
import styled from 'styled-components';

const LoadingButtons = () => {
  return (
    <StyledWrapper>
      <div className="loader">
        <div />
        <div />
        <div />
        <div />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .loader {
    display: inline-block;
    position: relative;
    width: 20px;
    height: 20px;
  }

  .loader div {
    position: absolute;
    top: 10px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #c517f0;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }

  .loader div:nth-child(1) {
    left: 8px;
    animation: flip1 0.6s infinite;
  }

  .loader div:nth-child(2) {
    left: 8px;
    animation: flip2 0.6s infinite;
  }

  .loader div:nth-child(3) {
    left: 32px;
    animation: flip2 0.6s infinite;
  }

  .loader div:nth-child(4) {
    left: 56px;
    animation: flip3 0.6s infinite;
  }

  @keyframes flip1 {
    0% {
      transform: scale(0);
    }

    100% {
      transform: scale(1);
    }
  }

  @keyframes flip3 {
    0% {
      transform: scale(1);
    }

    100% {
      transform: scale(0);
    }
  }

  @keyframes flip2 {
    0% {
      transform: translate(0, 0);
    }

    100% {
      transform: translate(24px, 0);
    }
  }`;

export default LoadingButtons;
