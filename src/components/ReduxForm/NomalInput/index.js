import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

// language=SCSS prefix=&{ suffix=}
const FormGroup = styled.div`
    margin: 8px 0;
    position: relative;
    display: flex;
    justify-content: flex-end;
`

// language=SCSS prefix=&{ suffix=}
const Label = styled.label`
    position: absolute;
    right: 76%;
    top: 7px;
    transition: .5s;
    font-size: 14px;
    font-family: Kanit;
    font-weight: 500;

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

// language=SCSS prefix=&{ suffix=}
const Input = styled.input`
    width: 74% !important;
    height: 38px;
    border: 1px solid #DADDE1 !important;
    border-radius: 27px !important;
    font-family: Kanit !important;
    padding-left: 10px;
    
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

const FormNomalInput = (field) => {
  const {
    label,
    type = 'text',
    disabled = false,
    placeholder,
    meta: { visited, touched, error },
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
    </FormGroup>
  )
}

FormNomalInput.propTypes = {
  label: PropTypes.string.isRequired,
}

export default FormNomalInput