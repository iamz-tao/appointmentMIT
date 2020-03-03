import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const FormGroup = styled.div`
    margin: 22px 0;
    position: relative;
    width: 100%;
    display: block;
    left: 22%;

`

const Label = styled.label`
display: flex;
align-items: flex-start;
    /* position: absolute; */
    right: 80%;
    top: 7px;
    transition: .5s;
    font-size: 16px;
    font-family: Kanit;

    @media (max-width: 700px) {
      width: auto;
      right: auto;
      top: -20px;
    }

    @media (max-width: 500px) {
      width: auto;
      left: 5%;
      top: -20px;
      right: auto;
    }
`

const Input = styled.input`
display: flex;
    width: 56% !important;
    height: 40px;
    border: 1px solid ${props => (props.error ? '#CA5353' : '#DADDE1')} !important;
    border-radius: 27px !important;
    font-family: Kanit !important;
    padding-left: 10px;
    background-color: ${props => props.error && '#FEE8E8'};

    :disabled {
      background-color: #f5f6f7 !important;
      color: #929598 !important;
    }
    
    @media (max-width: 700px) {
      width: 80% !important;
    }

    @media (max-width: 500px) {
      width: 90% !important;
    }
`
const CustomLabel = styled.span`
    font-family: kanit;
    color: #CA5353;
`

const FormInput = (field) => {
  const {
    label,
    type = 'text',
    disabled = false,
    placeholder,
    meta: {
      visited,
      touched,
      error,
    },
  } = field

  return (
    <FormGroup>
      <Label>{label}</Label>
      <Input
        {...field.input}
        disabled={disabled}
        type={type}
        error={touched && visited && error}
        placeholder={placeholder}
      />
      <div>
        {touched
        && (error && <CustomLabel>{error}</CustomLabel>)}
      </div>
    </FormGroup>
  )
}

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
}

export default FormInput
