import React from 'react'
import styled from 'styled-components'
import { Segment, Icon } from 'semantic-ui-react'
import { Button } from 'antd'
import FormButton from '~/components/Form/Button'
import DeleteIcon from '~/components/DeleteIcon'


const AppointmentRequireList = (props) => {
  const {
    appointmentList,
    // handleOpenSchedule,
    handleDeleteAppoint,
  } = props

  return (
    <Column>
      <Wrapper>
        <Column>
          {appointmentList.get('appoints').map(lec => (
            <ItemWrapper>
              <Row>
                <UserDetailGroup>
                  <ListDetail style={{ flex: 2 }}>
                    <ItemSpan>
                      {lec.get('title')}
                    </ItemSpan>
                  </ListDetail>
                  <ListDetail style={{ flex: 2 }}>
                    <ItemSpan>
                      {lec.get('teacher_name')}
                    </ItemSpan>
                  </ListDetail>
                  <ListDetail style={{ flex: 1 }}>
                    {lec.get('approved_status') === 'APPROVE' && (
                    <ItemSpan style={{ color: '#21ba45' }}>
                      APPROVE
                    </ItemSpan>
                    )}
                    {lec.get('approved_status') === 'PENDING' && (
                    <ItemSpan style={{ color: '#1890ff' }}>
                      PENDING
                    </ItemSpan>
                    )}

                  </ListDetail>
                  <CustomDelete>
                    <Button
                      type='dashed'
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteAppoint(lec.get('request_id'))
                      }}
                    >
                      Cancel
                    </Button>
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

export default AppointmentRequireList

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  .ant-btn {
    width: 72px;
    height: 36px;
    margin-right: 23px;
    border-radius: 24px;
    box-sizing: border-box;
    color: #e49a9a  !important;
    :hover {
      background-color: #ffff;
      color: #CA5353;
      border-color: #CA5353;
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
