import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { createStructuredSelector } from 'reselect'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import {
  Modal, notification, Menu,
} from 'antd'
import Router from 'next/router'

import Cookie from 'js-cookie'

import LecturerList from './components/LecturerList'
import Schedules from './components/schedules'
import NotFound from '~/components/Table/NotFound'
import LoadingPulse from '~/components/LoadingPulse'
import FormButton from '~/components/Form/Button'

import withLayout from '~/hocs/Layouts/withLayout'
import { appointmentAction } from '~/modules/student/actions'
import { appointmentSelector } from '~/modules/student/selectors'

const { confirm } = Modal
const { SubMenu } = Menu

const TableHeader = () => (
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

    <Row>
      <UserDetailGroup>
        <ListHeader style={{ flex: 2 }}>
          <ItemHeader>
            NAME
          </ItemHeader>
        </ListHeader>
        <ListHeader />
      </UserDetailGroup>
    </Row>
  </Wrapper>
)

class StudentHomePage extends Component {
  state = {
    lecturer_id: '',
    open: false,
    title: '',
    detail: '',
    day: '',
    start_time: '',
    end_time: ''
  }

  componentDidMount() {
    const authToken = Cookie.get('token')
    if (!authToken) {
      Router.push('/login')
    }
    const { getLecturers } = this.props
    getLecturers({})
  }

  handleOpenSchedule = (id) => {
    this.setState({
      lecturer_id: id,
    })
  }

  handleModal = () => {
    const { open } = this.state
    this.setState({
      open: !open,
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
    this.fetch()
  }


  openNotificationDeleteSuccess = (type) => {
    notification[type]({
      message: 'Delete Success!',
      description:
        'Action completed successfully.',
    })
  }

  showDeleteConfirm = (id) => {
    const { deleteUser } = this.props
    const success = 'success'
    confirm({
      title: 'Confirm Deletion',
      content: 'Are you sure delete this user? You can\'t undo this action.',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        deleteUser({ id })
        notification[success]({
          message: 'Delete Success!',
          description:
            'Action completed successfully.',
        })
      },
      onCancel() {
      },
    })
  }

  render() {
    const {
      lecturerList,
    } = this.props
    const {
      lecturer_id,
      open,
    } = this.state
    let lecturer_detail = null
    if (lecturer_id !== '') {
      lecturer_detail = lecturerList.filter(lec => lec.get('id') === lecturer_id)
    }

    return (
      <PageWrapper>
        <RowContainer>
          <RowContainer style={{ paddingTop: 0, flex: 1 }}>
            {
                    lecturerList !== null && lecturerList.size > 0 && (
                    <ListCol>
                      <TableHeader />
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
                        <Schedules lecturer={lecturer_detail} handleModal={this.handleModal} open={open} handleInput={this.handleInput} handleInputChange={this.handleInputChange} />
                      </ListCol>
                    ) : (
                      <NotFound message='Please select lecturer.' />
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
})(state, props)

const mapDispatchToProps = dispatch => bindActionCreators({
  getLecturers: appointmentAction.getLecturerList,
}, dispatch)

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  // withLayout,
)(StudentHomePage)

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
