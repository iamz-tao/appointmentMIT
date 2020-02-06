import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { createStructuredSelector } from 'reselect'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import { Modal, notification } from 'antd'
import Router from 'next/router'

import FilterAndCriteria from './components/FilterAndCriteria'
import SubjectsList from './components/ListSubjects'
import HeaderAdmin from '~/components/HeaderNavbar/Admin'

import NotFound from '~/components/Table/NotFound'
import LoadingPulse from '~/components/LoadingPulse'
import FormButton from '~/components/Form/Button'

import withLayout from '~/hocs/Layouts/withLayout'
import { Link } from '~/routes'
import { subjectAction } from '~/modules/subject/actions'
import { subjectsSelector } from '~/modules/subject/selectors'

const { confirm } = Modal

const TableHeader = () => (
  <Wrapper>
    <FormButton
      colorButton='#006765'
      type='submit'
      txtButton='NEW'
      width='50%'
      onClick={() => {
        Router.push('/create-subject')
      }}
    />
    <Row>
      <UserDetailGroup>
        <ListUserEmail>
          <ItemHeader>
          SUBJECT CODE
          </ItemHeader>
        </ListUserEmail>
        <ListUserName style={{ minWidth: '500px' }}>
          <ItemHeader>
          SUBJECT NAME
          </ItemHeader>
        </ListUserName>
        <ListUserName>
          <ItemHeader>
          STATUS
          </ItemHeader>
        </ListUserName>
      </UserDetailGroup>
    </Row>
  </Wrapper>
)

class AdminListSubjects extends Component {
  state = {
    subjects: null,
    filter: {
      user_role: [],
      keyword: '',
    },
  }

  componentDidMount() {
    const { getSubjects } = this.props
    getSubjects({})
  }

  fetch = () => {
    const { filter } = this.state
    const { getSubjects } = this.props
    getSubjects({
      filter: {
        ...filter,
      },
    })
  }

  handleDeleteSubject = (id) => {
    // const { deleteSubject } = this.props
    const success = 'success'
    confirm({
      title: 'Confirm Deletion',
      content: 'Are you sure delete this subject? You can\'t undo this action.',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        // deleteSubject({ id })
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


  handleInputChange = async ({ target }) => {
    await this.setState(state => ({
      ...state,
      filter: {
        ...state.filter,
        [target.name]: target.value,
      },
    }))
    this.fetch()
  }

  handleResetFilter = () => {
    // this.setState({
    //   filter: {
    //     user_role: [],
    //     keyword: '',
    //   },
    // })
  }

  handleMenuClick = () => {
      //change status
  }

  render() {
    const {
      subjects,
    } = this.props

    const {
      filter,
    } = this.state

    const subjectApprove = subjects ? subjects.toJS().filter(s => s.approved_status === 'APPROVE') : []
    return (
      <PageWrapper>
        <HeaderAdmin />
        <RowContainer>
          <FilterWrapper>
            <FilterAndCriteria
              filter={filter}
              handleInputChange={this.handleInputChange}
              handleResetFilter={this.handleResetFilter}
            />
          </FilterWrapper>
          <RowContainer style={{ paddingTop: 0 }}>
            <ListCol
              style={{
                position: 'relative',
              }}
            >

              {
                <Fragment>
                  <Space />
                  {
                    subjects === null && (
                      <LoadingPulse />
                    )
                  }
                  {
                    subjects !== null && subjects.size > 0 && (
                      <ListCol>
                        <TableHeader />
                        <ListCol>
                          <SubjectsList
                            subjects={subjectApprove}
                            filter={filter}
                            handleDeleteSubject={this.handleDeleteSubject}
                            handleMenuClick={this.handleMenuClick}
                          />
                        </ListCol>
                      </ListCol>
                    )
                  }

                  {
                    subjects !== null && subjects.size === 0 && (
                      <NotFound />
                    )
                  }
                </Fragment>
                // )
              }
            </ListCol>
          </RowContainer>
        </RowContainer>
      </PageWrapper>
    )
  }
}

const mapStateToProps = (state, props) => createStructuredSelector({
  subjects: subjectsSelector.getSubjects,
})(state, props)

const mapDispatchToProps = dispatch => bindActionCreators({
  getSubjects: subjectAction.getSubjects,
//   deleteSubject: subjectAction.deleteSubject, wait API
}, dispatch)

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withLayout,
)(AdminListSubjects)

const PageWrapper = styled.div`
  font-family: Sarabun;
  position: relative;
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
    justify-content: center;
    text-align: center;
`

const RowContainer = styled.div`
  display: flex;
  padding: 0px 32px;
  flex: 1;
  justify-content: center;
  padding-left: 42px;
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

const FilterWrapper = styled(Col)`
  transition: 0.5s;
  margin-top: 50px;

  @media (max-width: 1024px) {
    position: absolute;
    transform: translate(-500%, 0px);
  }
`
const Space = styled.div`
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0px 0px 16px 0px;
`

const ListUserEmail = styled(OtherWrapper)`
  flex: 1;
  display: inline-block;
  padding-left: 35px;
  text-align: left;
  min-width: 250px;
`
const ListUserName = styled(OtherWrapper)`
  flex: 1;
  display: inline-block;
  padding-left: 40px;
  text-align: left;
  min-width: 250px;
`

const ListUserStatus = styled(OtherWrapper)`
  padding-left: 5px;
`
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32%;
  width: 100%;
`
const UserDetailGroup = styled.div`
  width: 66%;
  display: flex;
  color: #929598;
  font-size: 16px;
`
const UserStatusGroup = styled.div`
  width: 34%;
  display: flex;
  justify-content: center;
  padding-right: 108px;
  font-size: 16px;
`