import React from 'react';
import styled from 'styled-components';

const Input = ({ TypeInput, placeholder, optionsHookForm, className, name, value }) => {
  return (
      
    <StyledWrapper >

        <input
          type={TypeInput}
          autoComplete="off"
          name={name}
          value={value}
          className={`input ${className}`}
          placeholder={placeholder}
          {...optionsHookForm} />
    </StyledWrapper>
      
  );
}

const StyledWrapper = styled.div`
  .input {
    border: none;
    outline: none;
    border-radius: 15px;
    padding: 1em;
    background-color: #ccc;
    box-shadow: inset 2px 5px 10px rgba(0,0,0,0.3);
    transition: 300ms ease-in-out;
  }

  .input:focus {
    background-color: white;
    color: black;
    transform: scale(1.02);
    box-shadow: 13px 13px 100px #969696,
               -13px -13px 100px #ffffff;
  }
               
    .input:checked + label {
    background-color: red;
    border-color: red;
   }

   input:checked {
    background-color: red;
    border-color: red;
   }
  
  `
 

export default Input;
