import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import Router from 'next/router'
import { Segment, Icon } from 'semantic-ui-react'
import { Modal, Button } from 'antd';
// import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;


import Cookie from 'js-cookie'
import { createStructuredSelector } from 'reselect'
import { appointmentAction } from '~/modules/student/actions'
import { appointmentSelector } from '~/modules/student/selectors'

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

class LecturerHomePage extends Component{
    
    componentDidMount() {
        const authToken = Cookie.get('token')
        if (!authToken) {
          Router.push('/login')
        }
      const { getRequestAppointment } =this.props
      getRequestAppointment({})
    }

    showConfirm = () => {
      confirm({
        title: 'Do you want to delete these items?',
        content: 'When clicked the OK button, this dialog will be closed after 1 second',
        onOk() {
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          }).catch(() => console.log('Oops errors!'));
        },
        onCancel() {},
      });
    }

    
    render(){
      const {AppointmentList} = this.props
        return(
          // <Column>
            <Wrapper>
              {/* <Row>
               <UserDetailGroup>
                  <ListHeader style={{ flex: 2 }}>
                    <ItemHeader>
                        Appointment Requests 
                    </ItemHeader>
                  </ListHeader>
                
              </UserDetailGroup>
              </Row> */}
              
              <Column>
              <TableHeader />

              {
                      AppointmentList !== null && AppointmentList.size > 0 && AppointmentList.map(lec => ( 
                      
              // <Row>
            
              //   <UserDetailGroup>
              //     <ListDetail style={{ flex: 2 }}>
              //       {lec.get('title')} from {lec.get('student_name')}
                    
              //     </ListDetail>
              //   </UserDetailGroup>
                
              // </Row>
              <ColumnTest>
              <WrapperTest>
                <ColumnTest>
                  {AppointmentList.map(lec => (
                    <ItemWrapperTest>
                      <RowTest>
                        <UserDetailGroupTest>
                          <ListDetailTest style={{ flex: 1}}>
                            <ItemSpanTest>
                              {lec.get('title')}
                              </ItemSpanTest>
                          </ListDetailTest>
                          <ListDetailTest style={{flex: 1 }} >
                            <ItemSpanTest>
                               from &nbsp; {lec.get('student_name')}
                            </ItemSpanTest>
                          </ListDetailTest>
                          <ListDetailTest >
                          {lec.get('approved_status') === 'PENDING' && (
                            <ItemSpanTest style={{ color: 'blue'}}>
                                {lec.get('approved_status')}
                            </ItemSpanTest>
                          )}
                           {lec.get('approved_status') === 'APPROVE' && (
                            <ItemSpanTest style={{ color: 'blue'}}>
                                {lec.get('approved_status')}
                            </ItemSpanTest>
                          )}
                          </ListDetailTest>
                          <CustomDeleteTest>
                           <TrashTest
                              name='list alternate outline'
                               onClick={(e) => {}}
    />
                  </CustomDeleteTest>
                      
                        </UserDetailGroupTest>
                        {lec.get('approved_status') === 'PENDING' && (
                          <div>
                            <Button onClick={() => this.showConfirm()} >APPROVE</Button> 
                            <Button type="primary">REJECT</Button> 
                          </div>
                            // <ItemSpanTest style={{ color: 'blue'}}>
                            //     {lec.get('approved_status')}
                            // </ItemSpanTest>
                          )}
                        
        
                      </RowTest>
                    </ItemWrapperTest>
                   ))} 
                </ColumnTest>
              </WrapperTest>
            </ColumnTest>          
              ))
              }
              </Column>   
            </Wrapper>
          // </Column>
        )
        }
}

const mapStateToProps = (state, props) => createStructuredSelector({
    AppointmentList: appointmentSelector.GetRequestAppointment,
  })(state, props)
  
  const mapDispatchToProps = dispatch => bindActionCreators({
    getRequestAppointment: appointmentAction.getRequesAppointmentList,
  }, dispatch)
  
  export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    // withLayout,
  )(LecturerHomePage)

// const PageWrapper = styled.div`
//   font-family: Sarabun;
//   position: relative;
//   width: 100%;
//   margin: 18px;
//   margin-top: 46px;
//   .ant-modal-confirm-body .ant-modal-confirm-title {
//     font-weight: 400;
//     font-size: 20px;
//     line-height: 1.4;
//     font-family: kanit;
//   }
// `

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

// const RowContainer = styled.div`
//   display: flex;
//   padding: 0px 14px;
//   flex: 1;
//   justify-content: center;
// `
// const Col = styled.div`
//   display: flex;
//   flex-direction: column;
// `

// const ListCol = styled(Col)`
//   flex: 1;
//   .ui.dropdown > .text {
//     color: #00a699;
//   }
// `

// const Space = styled.div`
// `


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
// const ButtonWrapper = styled.div`
//   display: flex;
//   width: 100%;
//   justify-content: flex-end;
// `
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
  height: 52px;
  width: 100%;
`

const ItemSpanTest = styled.span`
    font-size: 14px;
    font-family: Sarabun;
    font-weight: 600;
    word-break: break-word;

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
  justify-content: center;
  align-items: center;
`
const UserDetailGroupTest = styled.div`
  display: flex;
  flex: 5;
 
`
const TrashTest = styled(Icon)`
  color: #E1E1E1;
  margin: 0px !important;
  line-height: 24px !important;
  font-size: 1.7em !important;
  cursor: pointer;
`
