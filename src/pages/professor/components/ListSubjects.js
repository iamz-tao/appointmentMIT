import React from 'react'
import styled from 'styled-components'
import { Segment } from 'semantic-ui-react'
import DeleteIcon from '~/components/DeleteIcon'

const SubjectsList = (props) => {
  const {
    subjects,
    filter,
    handleDeleteSection,
    handleModal,
  } = props

  return (
    <Column>
      <Wrapper>
        <Column>
          {subjects.map(s => (
            <ItemWrapper>
              <Row>
                <a onClick={() => handleModal(s.get('id'))}>
                  <UserDetailGroup>
                    <ListDetail>
                      <ItemSpan>
                        {s.getIn(['Subject', 'subject_name'])}
                      </ItemSpan>
                    </ListDetail>
                    <ListDetail>
                      <ItemSpan>
                        {s.get('section_number')}
                      </ItemSpan>
                    </ListDetail>
                  </UserDetailGroup>
                  <ListDetail>
                    <DeleteIcon
                      className='trash'
                      onClick={() => handleDeleteSection(s.get('id'))}
                    />
                  </ListDetail>
                </a>
              </Row>
            </ItemWrapper>
          ))}
        </Column>
      </Wrapper>
    </Column>
  )
}

export default SubjectsList

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  .ant-btn {
    width: 100px;
    height: 38px;
    font-family: kanit;
    font-size: 13px;
    margin-right: 23px;
    border-radius: 24px;
    background-color: #ffff !important;
    border: 1px solid #a2a2a2;
    box-sizing: border-box;
    color: #1AB433 !important;
    :hover {
      background-color: #ffff !important;
      color: #CA5353 !important;
    }
  }
`

const ItemWrapper = styled(Segment)`
  background-color: white;
  width: 100%;
  border-radius: 4px;
  margin-bottom: 0px !important;
  padding: 0 !important;
  background: #FFFFFF !important;
  border: 1px solid #D0CDCD !important;
  box-sizing: border-box !important;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25) !important;
  border-radius: 18px !important;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 14px;
  width: 100%;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 76px;
  width: 100%;
`

const ItemSpan = styled.span`
    font-size: 14px;
    font-family: Sarabun;
    font-weight: 600;
    word-break: break-word;

    .b {
      font-weight: bold;
    }
`

const OtherWrapper = styled.div`
    width: 150px;
    display: flex;
    line-height: 40px;
    padding-left: 8px;
`

const ListDetail = styled(OtherWrapper)`
  flex: 1;
  display: inline-block;
  padding-left: 40px;
  text-align: left;
`

const UserDetailGroup = styled.div`
  display: flex;
  flex: 3;
`
