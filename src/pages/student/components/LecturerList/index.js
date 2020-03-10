import React from 'react'
import styled from 'styled-components'
import { Segment, Icon } from 'semantic-ui-react'
import { Button } from 'antd'
import FormButton from '~/components/Form/Button'
import DeleteIcon from '~/components/DeleteIcon'



const LecturerList = (props) => {
  const {
    lecturerList,
    handleOpenSchedule,
  } = props

  return (
    <Column>
      <Wrapper>
        <Column>
          {lecturerList.map(lec => (
            <ItemWrapper>
              <Row>
                <UserDetailGroup>
                  <ListDetail style={{ flex: 2 }}>
                    <ItemSpan>
                      {lec.get('firstname')}
                    &nbsp;
                      {lec.get('lastname')}
                    </ItemSpan>
                  </ListDetail>
                  <CustomDelete>
                    <Trash
                      name='table'
                      onClick={(e) => {
                        e.preventDefault()
                        handleOpenSchedule(lec.get('id'))
                      }}
                    />
                  </CustomDelete>
                </UserDetailGroup>

              </Row>
            </ItemWrapper>
          ))}
        </Column>
      </Wrapper>
    </Column>
  )
}

export default LecturerList

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  .ant-btn {
    width: 100px;
    height: 38px;
    margin-right: 23px;
    border-radius: 24px;
    background-color: #CA5353 !important;
    border: 0.8px solid #CA5353;
    box-sizing: border-box;
    color: #ffff !important;
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
  cursor: pointer;
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
  height: 52px;
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
    display: flex;
    line-height: 40px;
    padding-left: 16px;
`

const ListDetail = styled(OtherWrapper)`
  flex: 1;
  display: flex;
  text-align: start;
`

const CustomDelete = styled(OtherWrapper)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`
const UserDetailGroup = styled.div`
  display: flex;
  flex: 5;
`
const Trash = styled(Icon)`
  color: #E1E1E1;
  margin: 0px !important;
  line-height: 24px !important;
  font-size: 1.7em !important;
  cursor: pointer;
`
