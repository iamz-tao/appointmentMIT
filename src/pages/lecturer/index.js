import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import Router from 'next/router'
import { Segment, Icon } from 'semantic-ui-react'
import {
  Modal, Button, Breadcrumb, Layout, Menu,
} from 'antd'
import moment from 'moment'

import Cookie from 'js-cookie'
import { createStructuredSelector } from 'reselect'
import NotFound from '~/components/Table/NotFound'
import LoadingPulse from '~/components/LoadingPulse'
import Schedules from './components/schedules'
import { appointmentAction } from '~/modules/student/actions'
import { appointmentSelector } from '~/modules/student/selectors'
import { userAction } from '~/modules/user/actions'
import { loginAction } from '~/modules/authentication/actions'


const { confirm } = Modal
const { Header, Content, Footer } = Layout

const TableHeader = () => (
  <Wrapper>
    <Row>
      <UserDetailGroup>
        <ListHeader style={{ width: '100%' }}>
          <ItemHeader>
            APPOINTMENT
          </ItemHeader>
        </ListHeader>
      </UserDetailGroup>
    </Row>
  </Wrapper>
)

const ApproveModal = (props) => {
  const {
    title, detail, std_name, day, s_time, e_time, visible, status, id, confirmLoading, handleApprove, handleReject, closeModal, isApprove, handleCancelAppoint,
  } = props
  return (
    <Modal
      title={`Title : ${title}`}
      visible={visible}
      maskClosable={false}
      closable={false}
      confirmLoading={confirmLoading}
      footer={null}
    >
      <div>
        <StyleDivModal>
          <StyleTextModal>Request From :</StyleTextModal>
          {' '}
          {' '}
          {' '}
          {std_name}
        </StyleDivModal>
        <StyleDivModal>
          <StyleTextModal> Detail : </StyleTextModal>
          {' '}
          {' '}
          {detail}
        </StyleDivModal>
        <StyleDivModal>
          <StyleTextModal> Time : </StyleTextModal>
          {' '}
          {' '}
          {day}
          {' '}
          {s_time}
          {' '}
          -
          {' '}
          {e_time}
        </StyleDivModal>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <CustomButtonCancel type='primary' onClick={() => closeModal()}>CLOSE</CustomButtonCancel>
        {
      status === 'PENDING' && (
        <dvi>
          <CustomButtonReject type='primary' onClick={() => handleReject(id)}>REJECT</CustomButtonReject>
          <CustomButton type='primary' onClick={() => handleApprove(id)}>APPROVE</CustomButton>
        </dvi>
      )
        }
        {isApprove && (
          <dvi>
            <CustomButtonReject type='primary' onClick={() => handleCancelAppoint(id)}>CANCEL</CustomButtonReject>
          </dvi>
        )}
      </div>
    </Modal>
  )
}

class LecturerHomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      visible: false,
      confirmLoading: false,
      title: '',
      detail: '',
      std_name: '',
      day: '',
      s_time: '',
      e_time: '',
      status: '',
      id: '',
      titleAppoint: '',
      detailAppoint: '',
      dayAppoint: '',
      start_time: '',
      end_time: '',
      key: 1,
      isApprove: false,
    }
  }


  componentDidMount() {
    const authToken = Cookie.get('token')
    if (!authToken) {
      Router.push('/login')
    }
    const { getRequestAppointment, getAppointTeacher } = this.props
    getRequestAppointment({
      authToken,
    })
    getAppointTeacher({
      authToken,
    })
  }

  handleRender = (key) => {
    this.setState({
      key,
    })
  }

  handleSelectDay = (e, { value }) => {
    this.setState({
      dayAppoint: value,
    })
  }

  handleSelectTime = (e, { value }) => {
    this.setState({
      start_time: value.start_time,
      end_time: value.end_time,
    })
  }

  handleSubmit = () => {
    const id = Cookie.get('id')
    const {
      open, titleAppoint, start_time, end_time, detailAppoint, dayAppoint,
    } = this.state
    const { createAppointment } = this.props
    const data = {
      Title: titleAppoint,
      Detail: detailAppoint,
      day: dayAppoint,
      start_time,
      end_time,
      teacher_id: id,
    }

    createAppointment({
      data,
      role: 'PROFESSOR',
    })

    this.setState({
      open: !open,
    })
  }

  handleModalCreateAppoint = () => {
    const { open } = this.state
    this.setState({
      open: !open,
    })
  }

  handleCancelAppoint = (id) => {
    const { cancelAppoints } = this.props
    cancelAppoints({ id, role: 'LECTURER' })
    this.setState({
      visible: false,
    })
  }

  handleCancel = () => {
    const { open } = this.state
    this.setState({
      open: !open,
      titleAppoint: '',
      detailAppoint: '',
      start_time: '',
      end_time: '',
      dayAppoint: '',
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

  showModal = (data) => {
    this.setState({
      visible: true,
      ...data,
    })
  };

  closeModal = () => {
    this.setState({
      visible: false,
    })
  }

  handleApprove = (id) => {
    const { approveAppointment } = this.props
    approveAppointment({
      id,
    })
    this.setState({
      confirmLoading: true,
    })
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      })
    }, 2000)
  };

  handleReject = (id) => {
    const { rejectAppointment } = this.props
    rejectAppointment({ id })
    this.setState({
      visible: false,
    })
  };

    handleLogout = () => {
      const { logout, handleLogout } = this.props
      logout()
      handleLogout()
      window.location.href = '/'
    }


    render() {
      const { AppointmentList, AllAppoint } = this.props
      const {
        visible, confirmLoading, title, detail, std_name, day, s_time, e_time, status, id, open, key, isApprove,
      } = this.state
      let appointApprove = []
      let appointPending = []

      if (AppointmentList) {
        appointApprove = AppointmentList.filter(app => app.get(
          'approved_status',
        ) === 'APPROVE').toJS()
        appointPending = AppointmentList.filter(app => app.get(
          'approved_status',
        ) === 'PENDING').toJS()
      }

      if (!AppointmentList && !AllAppoint) {
        return (
          <LoadingPulse />
        )
      }

      // console.log(appointPending)
      return (
        <PageWrapper>
          <ApproveModal
            visible={visible}
            confirmLoading={confirmLoading}
            title={title}
            status={status}
            detail={detail}
            std_name={std_name}
            day={day}
            s_time={s_time}
            e_time={e_time}
            id={id}
            isApprove={isApprove}
            handleReject={this.handleReject}
            handleApprove={this.handleApprove}
            closeModal={this.closeModal}
            handleCancelAppoint={this.handleCancelAppoint}
          />
          <RowContainer>
            <RowContainer style={{ padding: '0px 8px 0px 0px', flex: 1 }}>

              <ListCol>
                {/* <div style={{
                  width: '100%', display: 'flex', justifyContent: 'flex-end', width: '100%',
                }}
                >
                </div> */}
                <TableHeader page='Req' />
                <ListCol>
                  <ColumnTest>
                    <WrapperTest>
                      <Layout>
                        <Header>
                          <div className='logo' />
                          <Menu
                            theme='dark'
                            mode='horizontal'
                            defaultSelectedKeys={['1']}
                          >
                            <Menu.Item key='1' onClick={() => this.handleRender(1)}>REQUEST</Menu.Item>
                            <Menu.Item key='2' onClick={() => this.handleRender(2)}>APPOINTMENT</Menu.Item>
                          </Menu>
                        </Header>
                      </Layout>
                      <ColumnTest>
                        { key === 1 && AppointmentList !== null && appointPending.length > 0 && appointPending.map(lec => (
                          <ItemWrapperTest>
                            <RowTest>
                              <UserDetailGroupTest>
                                <ListDetailTest style={{ flex: 1 }}>
                                  <ItemSpanTest>
                                    <StyleTextModal style={{ fontWeight: 500 }}>TITLE :&nbsp;</StyleTextModal>
                                    <StyleTextModal>{lec.title}</StyleTextModal>
                                  </ItemSpanTest>
                                  <CustomDeleteTest>
                                    <TrashTest
                                      name='list alternate outline'
                                      onClick={() => {
                                        const data = {
                                          title: lec.title,
                                          detail: lec.detail,
                                          std_name: lec.student_name,
                                          day: lec.day,
                                          s_time: lec.start_time,
                                          e_time: lec.end_time,
                                          status: lec.approved_status,
                                          id: lec.request_id,
                                          isApprove: false,
                                        }
                                        this.showModal(data)
                                      }}
                                    />

                                  </CustomDeleteTest>
                                </ListDetailTest>
                                <ListDetailTest style={{ flex: 1 }}>
                                  <ItemSpanTest>
                                    <StyleTextModal style={{ fontWeight: 500 }}>STUDENT NAME :&nbsp;</StyleTextModal>
                                               &nbsp;
                                    {' '}
                                    <StyleTextModal>{lec.student_name}</StyleTextModal>
                                  </ItemSpanTest>
                                </ListDetailTest>
                                <ListDetailTest>
                                  <ItemSpanTest>
                                    <StyleTextModal style={{ fontWeight: 500 }}>STATUS :&nbsp;</StyleTextModal>

                                    {lec.approved_status === 'APPROVE' && (
                                    <StyleTextModal style={{ color: '#0038FF' }}>APPROVE</StyleTextModal>

                                    )}
                                    {lec.approved_status === 'PENDING' && (
                                    <StyleTextModal style={{ color: '#1AB433' }}>PENDING&nbsp;</StyleTextModal>

                                    )}

                                  </ItemSpanTest>
                                </ListDetailTest>
                              </UserDetailGroupTest>
                            </RowTest>
                          </ItemWrapperTest>
                        ))}
                        { key === 2 && AllAppoint !== null && AllAppoint.size > 0 && AllAppoint.toJS().map(all => (
                          <ItemWrapperTest>
                            <RowTest>
                              <UserDetailGroupTest>
                                <ListDetailTest style={{ flex: 1 }}>
                                  <ItemSpanTest>
                                    <StyleTextModal style={{ fontWeight: 500 }}>TITLE :&nbsp;</StyleTextModal>
                                    <StyleTextModal>{all.title}</StyleTextModal>
                                  </ItemSpanTest>
                                  <CustomDeleteTest>
                                    <TrashTest
                                      name='list alternate outline'
                                      onClick={() => {
                                        const data = {
                                          title: all.title,
                                          detail: all.detail,
                                          std_name: all.student_name,
                                          day: all.day,
                                          s_time: all.start_time,
                                          e_time: all.end_time,
                                          status: 'APPROVE',
                                          id: all.request_id,
                                          isApprove: true,
                                        }
                                        this.showModal(data)
                                      }}
                                    />

                                  </CustomDeleteTest>
                                </ListDetailTest>
                                <ListDetailTest style={{ flex: 1 }}>
                                  <ItemSpanTest>
                                    <StyleTextModal style={{ fontWeight: 500 }}>STUDENT NAME :&nbsp;</StyleTextModal>
                                               &nbsp;
                                    {' '}
                                    <StyleTextModal>{all.student_name}</StyleTextModal>
                                  </ItemSpanTest>
                                </ListDetailTest>
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
                  { AllAppoint !== null && (
                    <Schedules
                      handleModal={this.handleModalCreateAppoint}
                      open={open}
                      handleInputChange={this.handleInputChange}
                      getTimeFrom={this.getTimeFrom}
                      getTimeTo={this.getTimeTo}
                      handleSubmit={this.handleSubmit}
                      handleCancel={this.handleCancel}
                      handleSelectDay={this.handleSelectDay}
                      handleSelectTime={this.handleSelectTime}
                      appointApprove={AllAppoint}
                    />
                  )}

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
  AllAppoint: appointmentSelector.lecturerGetAppointApprove,
})(state, props)

const mapDispatchToProps = dispatch => bindActionCreators({
  getRequestAppointment: appointmentAction.getRequesAppointmentList,
  approveAppointment: appointmentAction.approveAppointment,
  rejectAppointment: appointmentAction.rejectAppointment,
  logout: userAction.logout,
  createAppointment: appointmentAction.createAppointment,
  cancelAppoints: appointmentAction.cancelAppointment,
  getAppointTeacher: appointmentAction.getAppointTeacher,
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

  i.icon, i.icons {
    font-size: 1.5em;
}

.ant-menu.ant-menu-dark .ant-menu-item-selected {
    background-color: #e57272;
}
`

const StyleImgWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column; 
  margin-bottom: 16px;
`

const CustomButton = styled(Button)`
  margin-right: 6px !important;
  width: 60px !important;
  font-size: 10px !important;
  padding: 0 !important;
  height: 32px !important;
  background-color: #21ba45 !important;
  border-color: #21ba45 !important;

  :hover {
    background-color: #6dd799 !important;
    border-color: #6dd799 !important;
  }
`
const CustomButtonReject = styled(Button)`
  margin-right: 6px !important;
  width: 60px !important;
  font-size: 10px !important;
  padding: 0 !important;
  height: 32px !important;
  background-color: #b22525 !important;
  border-color: #b22525 !important;

  :hover {
    background-color: #cf7ca1 !important;
    border-color: #cf7ca1 !important;
  }
`
const CustomButtonCancel = styled(Button)`
  margin-right: 6px !important;
  width: 60px !important;
  font-size: 10px !important;
  padding: 0 !important;
  height: 32px !important;
  background-color: #FFFFFF !important;
  border-color: #525252 !important;
  color: #525252 !important;
  :hover {
    color: #40a9ff !important; 
    border-color: #40a9ff !important;
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

const ListHeader = styled(OtherWrapper)`
  display: flex;
  justify-content: center;
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
const WrapperTest = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
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
  background-color: #001529;
  padding: 4px;
  border-radius: 16px;;
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
const StyleTextModal = styled.span`
  color: #525252;
  font-weight: 400; 
`
const StyleDivModal = styled.div`
  margin-bottom: 6px;
`
