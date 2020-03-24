import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import Router from 'next/router'
import { Segment, Icon } from 'semantic-ui-react'
import { Modal, Button } from 'antd'

import Cookie from 'js-cookie'
import { createStructuredSelector } from 'reselect'
import NotFound from '~/components/Table/NotFound'
import Schedules from './components/schedules'
import { appointmentAction } from '~/modules/student/actions'
import { appointmentSelector } from '~/modules/student/selectors'
import { userAction } from '~/modules/user/actions'
import { loginAction } from '~/modules/authentication/actions'

const { confirm } = Modal

const TableHeader = () => (
  <Wrapper>
    <Row>
      <UserDetailGroup>
        <ListHeader style={{ flex: 2 }}>
          <ItemHeader>
            Appointment Requests
          </ItemHeader>
        </ListHeader>
        <ListHeader />
      </UserDetailGroup>
    </Row>
  </Wrapper>
)

class LecturerHomePage extends Component {
  componentDidMount() {
    const authToken = Cookie.get('token')
    if (!authToken) {
      Router.push('/login')
    }
    const { getRequestAppointment } = this.props
    getRequestAppointment({
      authToken,
    })
  }

    showConfirm = (action) => {
      confirm({
        title: `Do you want to ${action} this appointment?`,
        content: 'If you click confirm, You can\'t undo this action.',
        onOk() {
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
          }).catch(() => console.log('Oops errors!'))
        },
        onCancel() {},
      })
    }

    handleLogout = () => {
      const { logout, handleLogout } = this.props
      logout()
      handleLogout()
      window.location.href = '/'
    }


    render() {
      const { AppointmentList } = this.props
      let appointApprove = []
      if (AppointmentList) {
        appointApprove = AppointmentList.filter((app) => app.get(
          'approved_status') === 'APPROVE').toJS()
      }

      // console.log(appointApprove)
      return (
        <PageWrapper>
          <RowContainer>
            <RowContainer style={{ padding: '0px 8px 0px 0px', flex: 1 }}>
              <ListCol>
                <div style={{
                  width: '100%', display: 'flex', justifyContent: 'flex-end', width: '100%',
                }}
                >
                  <Button onClick={() => this.handleReset()}>RESET</Button>
                </div>
                <TableHeader page='Req' />
                <ListCol>
                  <ColumnTest>
                    <WrapperTest>
                      <ColumnTest>
                        {AppointmentList !== null && AppointmentList.size > 0 && AppointmentList.map(lec => (
                          <ItemWrapperTest>
                            <RowTest>
                              <UserDetailGroupTest>
                                <ListDetailTest style={{ flex: 1 }}>
                                  <ItemSpanTest>
                                    <span style={{ color: 'black', fontWeight: '600' }}>TITLE :&nbsp;</span>
                                    {lec.get('title')}
                                  </ItemSpanTest>
                                  <CustomDeleteTest>
                                    <TrashTest
                                      name='list alternate outline'
                                      onClick={(e) => {}}
                                    />
                                  </CustomDeleteTest>
                                </ListDetailTest>
                                <ListDetailTest style={{ flex: 1 }}>
                                  <ItemSpanTest>
                                    <span style={{ color: 'black', fontWeight: '600' }}>STUDENT NAME :&nbsp;</span>
                                               &nbsp;
                                    {' '}
                                    {lec.get('student_name')}
                                  </ItemSpanTest>
                                </ListDetailTest>
                                <ListDetailTest>
                                  <ItemSpanTest style={{ color: 'blue' }}>
                                    <span style={{ color: 'black', fontWeight: '600' }}>STATUS :&nbsp;</span>

                                    {lec.get('approved_status')}
                                  </ItemSpanTest>
                                </ListDetailTest>
                                {
                                lec.get('approved_status') === 'PENDING' && (
                                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <CustomButton onClick={() => this.showConfirm('approve')}>APPROVE</CustomButton>
                                    <CustomButtonReject type='primary' onClick={() => this.showConfirm('reject')}>REJECT</CustomButtonReject>
                                  </div>
                                )
                              }

                              </UserDetailGroupTest>
                            </RowTest>
                          </ItemWrapperTest>
                        ))}
                      </ColumnTest>
                    </WrapperTest>
                  </ColumnTest>
                </ListCol>
              </ListCol>
            </RowContainer>
            <RowContainer style={{ paddingTop: 0, flex: 3 }}>
              <ListCol>
                <div style={{
                  width: '100%', display: 'flex', justifyContent: 'flex-end', width: '100%',
                }}
                >
                  <Button type='primary' danger onClick={() => this.handleLogout()}>LOGOUT</Button>
                </div>
                {/* <TableHeader page='Lecturer' /> */}
                <ListCol>
                  <Schedules  appointApprove={appointApprove}/>
                </ListCol>
              </ListCol>
            </RowContainer>

          </RowContainer>
        </PageWrapper>
      )
    }
}

const mapStateToProps = (state, props) => createStructuredSelector({
  AppointmentList: appointmentSelector.GetRequestAppointment,
})(state, props)

const mapDispatchToProps = dispatch => bindActionCreators({
  getRequestAppointment: appointmentAction.getRequesAppointmentList,
  logout: userAction.logout,
  handleLogout: loginAction.handleLogout,
}, dispatch)

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  // withLayout,
)(LecturerHomePage)

const PageWrapper = styled.div`
  font-family: Sarabun;
  position: relative;
  width: 100%;
  margin: 18px;
  margin-top: 46px;
  .ant-modal-confirm-body .ant-modal-confirm-title {
    font-weight: 400;
    font-size: 20px;
    line-height: 1.4;
    font-family: kanit;
  }
  .ant-btn-primary {
    color: #fff;
    background-color: #e57272;
    border-color: #e57272;
  }

  .ant-btn-primary:hover {
    color: #e57272;
    background-color: #ffffff;
    border-color: #e57272;
  }
`
const CustomButton = styled(Button)`
  margin-right: 6px !important;
  width: 60px !important;
  font-size: 10px !important;
  padding: 0 !important;
  height: 32px !important;
  background-color: #21ba45 !important;
  border-color: #21ba45 !important;
`
const CustomButtonReject = styled(Button)`
  margin-right: 6px !important;
  width: 60px !important;
  font-size: 10px !important;
  padding: 0 !important;
  height: 32px !important;
  background-color: #b22525 !important;
  border-color: #b22525 !important;

`

const ItemHeader = styled.span`
    font-family: kanit;
    font-size: 18px;
    margin: 0;
    color: black;
    cursor: pointer;
`

const OtherWrapper = styled.div`
    display: flex;
    text-align: start;
`

const RowContainer = styled.div`
  display: flex;
  padding: 0px 14px;
  flex: 1;
  justify-content: center;
`
const Col = styled.div`
  display: flex;
  flex-direction: column;
`

const ListCol = styled(Col)`
  flex: 1;
  .ui.dropdown > .text {
    color: #00a699;
  }
`

const Space = styled.div`
`


const ListHeader = styled(OtherWrapper)`
  flex: 1;
  display: flex;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32px;
  width: 100%;
  padding-left: 16px;
`
const UserDetailGroup = styled.div`
  display: flex;
  color: #000000;
  font-size: 16px;
  flex: 5;
`
const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`
// แสดง appointment list
const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  .ant-btn {
    width: 100px;
    height: 38px;
    margin-right: 23px;
    border-radius: 24px;
    background-color: #5aa08d;
    border: 0.8px solid #CA5353;
    box-sizing: border-box;
    color: #ffff !important;
    :hover {
      background-color: #ffff !important;
      color: #CA5353 !important;
    }
  }
`
const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 14px;
  width: 100%;
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
const ItemSpan = styled.span`
    font-size: 14px;
    font-family: Sarabun;
    font-weight: 600;
    word-break: break-word;

    .b {
      font-weight: bold;
    }
`
const ListDetail = styled(OtherWrapper)`
  // flex: 1;
  // display: flex;
  // text-align: start;
`

const WrapperTest = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  .ant-btn {
    width: 100px;
    height: 38px;
    margin-right: 23px;
    border-radius: 24px;
    background-color: #5aa08d;
    border: 0.8px solid #5aa08d;
    box-sizing: border-box;
    color: #ffff !important;
    :hover {
      background-color: #ffff !important;
      color: #378d75 !important;
    }
  }
`

const ItemWrapperTest = styled(Segment)`
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

const ColumnTest = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 14px;
  width: 100%;
`

const RowTest = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: fit-content;;
  width: 100%;
`

const ItemSpanTest = styled.span`
    font-size: 14px;
    font-family: Sarabun;
    font-weight: 600;
    word-break: break-word;
    line-height: 23px;
    .b {
      font-weight: bold;
    }
`

const OtherWrapperTest = styled.div`
    display: flex;
    line-height: 40px;
    padding-left: 16px;
`

const ListDetailTest = styled(OtherWrapper)`
  flex: 1;
  display: flex;
  text-align: start;

`

const CustomDeleteTest = styled(OtherWrapper)`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`
const UserDetailGroupTest = styled.div`
  display: flex;
  flex: 5;
  flex-direction: column;
  padding: 12px;
`
const TrashTest = styled(Icon)`
  color: #E1E1E1;
  margin: 0px !important;
  line-height: 24px !important;
  font-size: 1.7em !important;
  cursor: pointer;
`
