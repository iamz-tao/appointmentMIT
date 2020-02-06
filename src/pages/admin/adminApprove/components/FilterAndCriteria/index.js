import React from 'react'
import PropTypes from 'prop-types'
import {
  Input,
  Segment,
  Dropdown,
} from 'semantic-ui-react'
import styled from 'styled-components'
import FormButton from '~/components/Form/Button'

const FilterAndCriteria = (props) => {
  const {
    // handleInputChange, filter, handleResetFilter, reset,
  } = props
  const semesters = [
    {
      key: 1,
      text: 'First',
      value: 'First',
    },
    {
      key: 2,
      text: 'Second',
      value: 'Second',
    },
    {
      key: 3,
      text: 'Summer',
      value: 'Summer',
    },
  ]
  return (
    <Wrapper>
      <HeaderSection>
        <HeaderText>
          SEARCH SUBJECT
        </HeaderText>
        
      </HeaderSection>
      <SectionWrapper>
        <SearchText>
          YEAR/ SEMESTER: 2563/1
        </SearchText>
        <SearchText>
          SUBJECT:
        </SearchText>
        <Input
          // value={filter.keyword}
          name='keyword'
          placeholder='Year'
          // onChange={handleInputChange}
        />
      </SectionWrapper>
      <SectionWrapper>
        <SearchText>
            SEMESTER :
        </SearchText>
        <Dropdown placeholder='Semester' search selection options={semesters} />
      </SectionWrapper>
      <CustomButton>
        <FormButton
          isFilter
          type='cancel'
          txtButton='RESET'
          width='50%'
          onClick={() => {
          }}
        />
                  &nbsp; &nbsp;
        <FormButton
          isFilter
          colorButton='#CA5353'
          type='submit'
          txtButton='SEARCH'
          width='50%'
          onClick={() => {
          }}
        />
      </CustomButton>
    </Wrapper>
  )
}

FilterAndCriteria.propsTypes = {
  filter: PropTypes.instanceOf(Object),
  handleResetFilter: PropTypes.func,
}

FilterAndCriteria.defaultProps = {
  filter: {
    areas: [],
  },
  maxGrossPrice: 0,
  handleResetFilter: () => {
  },
}

export default FilterAndCriteria

const Wrapper = styled(Segment)`
  background: white;
  border-radius: 4px;
  border: none;
  width: 300px;

  && {
    margin: 0;
    border: 1px solid #E8E8E8;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 28px;
    padding: 1em 2em;
  }

  .ui.input>input {
    background: #FFFFFF;
    border: 1px solid #243445;
    box-sizing: border-box;
    border-radius: 18px;
  }

  .ui.search.dropdown {
    background: #FFFFFF;
    border: 1px solid #243445;
    box-sizing: border-box;
    border-radius: 18px;
  }
`

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 14px;
`

const HeaderText = styled.h1`
    font-size: 16px;
`

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 0px 20px 0px;
`

const SearchText = styled.span`
  font-size: 14px;
  font-family: kanit;
  text-transform: capitalize;
  color: #575757;
  margin: 10px 0px 10px 0px;
`

const CustomButton = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`