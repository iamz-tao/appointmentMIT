import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { createStructuredSelector } from 'reselect'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import {
  Modal, notification, Menu, Button,
} from 'antd'
import Router from 'next/router'

import Cookie from 'js-cookie'
import moment from 'moment'

import LecturerList from './components/LecturerList'
import AppointmentReqList from './components/AppointmentReqList'
import Schedules from './components/schedules'
import NotFound from '~/components/Table/NotFound'
import LoadingPulse from '~/components/LoadingPulse'
import FormButton from '~/components/Form/Button'

import withLayout from '~/hocs/Layouts/withLayout'
import { appointmentAction } from '~/modules/student/actions'
import { appointmentSelector } from '~/modules/student/selectors'
import { userAction } from '~/modules/user/actions'
import { loginAction } from '~/modules/authentication/actions'

const { confirm } = Modal
const { SubMenu } = Menu

const TableHeader = props => (
  <Wrapper>
    {/* <ButtonWrapper>
      <FormButton
        colorButton='#006765'
        type='submit'
        txtButton='NEW'
        width='50%'
        onClick={() => {
          Router.push('/adminRegister')
        }}
      />
    </ButtonWrapper> */}

    {props.page === 'Req' ? (
      <Row>
        <UserDetailGroup>
          <ListHeader style={{ flex: 2 }}>
            <ItemHeader>
              TITLE
            </ItemHeader>
          </ListHeader>
          <ListHeader style={{ flex: 2 }}>
            <ItemHeader>
              LECTURER NAME
            </ItemHeader>
          </ListHeader>
          {/* <ListHeader style={{ flex: 1 }}>
            <ItemHeader>
              STATUS
            </ItemHeader>
          </ListHeader> */}
          <ListHeader />
        </UserDetailGroup>
      </Row>
    ) : (
      <Row>
        <UserDetailGroup>
          <ListHeader style={{ flex: 2 }}>
            <ItemHeader>
              LECTURER NAME
            </ItemHeader>
          </ListHeader>
          <ListHeader />
        </UserDetailGroup>
      </Row>
    )
}

  </Wrapper>
)

class AdminHomePage extends Component {
  state = {
    lecturer_id: '',
    open: false,
    title: '',
    detail: '',
    day: '',
    start_time: '',
    end_time: '',
  }

  componentDidMount() {
    const authToken = Cookie.get('token')
    if (!authToken) {
      Router.push('/login')
    }
    const { getLecturers, getAppointReq } = this.props
    getLecturers({})
    getAppointReq({})
  }

  handleOpenSchedule = (id) => {
    this.setState({
      lecturer_id: id,
    })
  }

  handleSelectDay = (e, { value }) => {
    this.setState({
      day: value,
    })
  }

  handleReset = () => {
    this.setState({
      lecturer_id: '',
    })
  }

  handleSubmit = () => {
    const {
      open, title, start_time, end_time, detail, day, lecturer_id,
    } = this.state
    const { createAppointment } = this.props
    const data = {
      Title: title,
      Detail: detail,
      day,
      start_time,
      end_time,
      teacher_id: lecturer_id,
    }

    createAppointment({
      data,
      role: 'ADMIN',
    })

    this.setState({
      open: !open,
    })
  }

  handleModal = () => {
    const { open } = this.state
    this.setState({
      open: !open,
    })
  }

  handleCancel = () => {
    const { open } = this.state
    this.setState({
      open: !open,
      title: '',
      detail: '',
      start_time: '',
      end_time: '',
      day: '',
    })
  }

  handleDeleteAppoint = (id) => {
    const { cancelAppoints } = this.props
    const success = 'success'
    confirm({
      title: 'Confirm Deletion',
      content: 'Are you sure cancel this appointment? You can\'t undo this action.',
      okText: 'OK',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        cancelAppoints({ id })
        notification[success]({
          message: 'Cancel Success!',
          description:
            'Action completed successfully.',
        })
      },
      onCancel() {
      },
    })
  }

  handleInput = (type, e) => {
    const { change } = this.props
    change(type, e)
  }


  handleInputChange = async ({ target }) => {
    await this.setState(state => ({
      ...state,
      [target.name]: target.value,
    }))
  }

  getTimeFrom = (from) => {
    const newForm = new Date(from)
    this.setState({
      start_time: moment(newForm).format('h:mm A'),
    })
  }

  getTimeTo = (to) => {
    const newForm = new Date(to)
    this.setState({
      end_time: moment(newForm).format('h:mm A'),
    })
  }

  openNotificationDeleteSuccess = (type) => {
    notification[type]({
      message: 'Delete Success!',
      description:
        'Action completed successfully.',
    })
  }

  handleLogout = () => {
    const { logout, handleLogout } = this.props
    logout()
    handleLogout()
    window.location.href = '/'
  }

  render() {
    const {
      lecturerList,
      appointmentList,
    } = this.props
    const {
      lecturer_id,
      open,
    } = this.state
    let lecturer_detail = null
    if (lecturer_id !== '') {
      lecturer_detail = lecturerList.filter(lec => lec.get('id') === lecturer_id)
    }
    if (!lecturerList) {
      return (
        <LoadingPulse />
      )
    }
    return (
      <PageWrapper>
        <RowContainer>
          <RowContainer style={{ paddingTop: 0, flex: 1 }}>
            {
                    lecturerList !== null && lecturerList.size > 0 && (
                    <ListCol>
                      <div style={{
                        width: '100%', display: 'flex', justifyContent: 'flex-end', width: '100%',
                      }}
                      >
                        <Button onClick={() => this.handleReset()}>RESET</Button>
                      </div>
                      <TableHeader page='Lecturer' />
                      <ListCol>
                        <LecturerList lecturerList={lecturerList} handleOpenSchedule={this.handleOpenSchedule} />
                      </ListCol>
                    </ListCol>
                    )
                    }
          </RowContainer>
          <RowContainer style={{ paddingTop: 0, flex: 3 }}>
            {
                    lecturer_id !== '' ? (
                      <ListCol style={{ padding: '0px 28px' }}>
                        <div style={{
                          width: '100%', display: 'flex', justifyContent: 'flex-end', width: '100%',
                        }}
                        >
                          <Button type='primary' danger onClick={() => this.handleLogout()}>LOGOUT</Button>
                        </div>
                        <Schedules
                          lecturer={lecturer_detail}
                          handleModal={this.handleModal}
                          open={open}
                          handleInputChange={this.handleInputChange}
                          getTimeFrom={this.getTimeFrom}
                          getTimeTo={this.getTimeTo}
                          handleSubmit={this.handleSubmit}
                          handleCancel={this.handleCancel}
                          handleSelectDay={this.handleSelectDay}
                        />
                      </ListCol>
                    ) : (
                    //   <ListCol>
                    //     <div style={{
                    //       width: '100%', display: 'flex', justifyContent: 'flex-end', width: '100%',
                    //     }}
                    //     >
                    //       <Button type='primary' danger onClick={() => this.handleLogout()}>LOGOUT</Button>
                    //     </div>
                    //     <NotFound message='PLEASE SELECT LECTURER NAME.' />
                    //   </ListCol>
                    // )

                      <ListCol style={{ padding: '0px 28px' }}>
                        {appointmentList !== null && appointmentList.size > 0 ? (
                          <>
                            <div style={{
                              width: '100%', display: 'flex', justifyContent: 'flex-end', width: '100%',
                            }}
                            >
                              <Button type='primary' danger onClick={() => this.handleLogout()}>LOGOUT</Button>
                            </div>
                            <TableHeader page='Req' />
                            <ListCol>
                              <AppointmentReqList handleDeleteAppoint={this.handleDeleteAppoint} appointmentList={appointmentList} />
                            </ListCol>
                          </>
                        ) : (
                          <NotFound message='DO NOT HAVE AN APPOINTMENT' />
                        )}

                      </ListCol>
                    )
                    }
          </RowContainer>
        </RowContainer>
      </PageWrapper>
    )
  }
}

const mapStateToProps = (state, props) => createStructuredSelector({
  lecturerList: appointmentSelector.getLecturers,
  appointmentList: appointmentSelector.studentGetAppointment,
})(state, props)

const mapDispatchToProps = dispatch => bindActionCreators({
  getLecturers: appointmentAction.getLecturerList,
  createAppointment: appointmentAction.createAppointment,
  getAppointReq: appointmentAction.getAppointReq,
  cancelAppoints: appointmentAction.cancelAppointment,
  logout: userAction.logout,
  handleLogout: loginAction.handleLogout,
}, dispatch)

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  // withLayout,
)(AdminHomePage)

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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
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
  color: #929598;
  font-size: 16px;
  flex: 5;
`
const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`
