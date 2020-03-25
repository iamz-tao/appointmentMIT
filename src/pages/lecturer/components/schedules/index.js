import React from 'react'
import styled from 'styled-components'
import { Segment, Icon } from 'semantic-ui-react'
import {
  Row, Col, Button, Divider,
} from 'antd'
import Cookie from 'js-cookie'


import FormButton from '~/components/Form/Button'
import AddAppointment from './components/addAppointment'
// import DeleteIcon from '~/components/DeleteIcon'

const day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Firday']
const Schedules = (props) => {
  const {
    appointApprove,
    open,
    handleModal,
    handleInputChange,
    getTimeFrom, 
    getTimeTo, 
    handleSubmit, 
    handleCancel, 
    handleSelectDay, 
    handleSelectTime,
  } = props
  const name = Cookie.get('name')

  const appoint = []
  appointApprove.map(a => appoint.push({
    day: a.get('day'),
    time: `${a.get('start_time')} - ${a.get('end_time')}`,
    title: a.get('title')
  }))


  // console.log(appoint)
  return (
    <>
      <AddAppointment
        open={open}
        handleModal={handleModal}
        handleInputChange={handleInputChange}
        getTimeFrom={getTimeFrom}
        getTimeTo={getTimeTo}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        handleSelectDay={handleSelectDay}
        handleSelectTime={handleSelectTime}
      />
      <ItemHeader>
        <div style={{ flex: 1 }}>
          SCHEDULE
          <br />
          Lecturer :
          {' '}
          {name}
          {' '}
        </div>
        <div>
          <ButtonWrapper>
            <Button
              type='submit'
              size='large'
              onClick={() => {
                handleModal()
              }}
            >
              ADD APPOINTMENT
            </Button>
          </ButtonWrapper>
        </div>
      </ItemHeader>
      <Divider orientation='left' style={{ color: '#333', fontWeight: 'normal' }}>
        {/* sub-element align left */}
      </Divider>
      <Row
        justify='start'
        style={{
          height: '54px', display: 'flex', alignItems: 'center', backgroundColor: '#e8d4fa',
        }}
      >
        <Col span={4} style={{ width: '11%' }}>DAY</Col>
        <Col span={4} style={{ width: '11%' }}><div style={{ display: 'flex', justifyContent: 'center' }}>08.00 - 09.00</div></Col>
        <Col span={4} style={{ width: '11%' }}><div style={{ display: 'flex', justifyContent: 'center' }}>09.00 - 10.00</div></Col>
        <Col span={4} style={{ width: '11%' }}><div style={{ display: 'flex', justifyContent: 'center' }}>10.00 - 11.00</div></Col>
        <Col span={4} style={{ width: '11%' }}><div style={{ display: 'flex', justifyContent: 'center' }}>11.00 - 12.00</div></Col>
        <Col span={4} style={{ width: '11%' }}><div style={{ display: 'flex', justifyContent: 'center' }}>12.00 - 13.00</div></Col>
        <Col span={4} style={{ width: '11%' }}><div style={{ display: 'flex', justifyContent: 'center' }}>13.00 - 14.00</div></Col>
        <Col span={4} style={{ width: '11%' }}><div style={{ display: 'flex', justifyContent: 'center' }}>14.00 - 15.00</div></Col>
        <Col span={4} style={{ width: '11%' }}><div style={{ display: 'flex', justifyContent: 'center' }}>15.00 - 16.00</div></Col>
      </Row>

      {
        day.map(d => (
          <Row justify='start' style={{ height: '54px' }}>
            <Col span={4} style={{ width: '11%' }}>{d}</Col>

            {
appoint[0].day === d && appoint[0].time === '08.00 - 09.00' ? (
  <Col span={4} style={{ width: '11%', height: '100%', backgroundColor: 'white' }}>
    xxxxx
  </Col>
) : (
  <Col span={4} style={{ width: '11%', height: '100%', backgroundColor: 'peachpuff' }}>
    xxxxx
  </Col>
)
            }
            {
appoint[0].day === d && appoint[0].time === '09.00 - 10.00' ? (
  <Col span={4} style={{ width: '11%', height: '100%', backgroundColor: 'white' }}>
    xxxxx
  </Col>
) : (
  <Col span={4} style={{ width: '11%', height: '100%', backgroundColor: 'pink' }}>
    xxxxx
  </Col>
)
            }


            {
appoint[0].day === d && appoint[0].time === '10.00 - 11.00' ? (
  <Col span={4} style={{ width: '11%', height: '100%', backgroundColor: 'white' }}>
    xxxxx
  </Col>
) : (
  <Col span={4} style={{ width: '11%', height: '100%', backgroundColor: 'red' }}>
    xxxxx
  </Col>
)
            }
            {
appoint[0].day === d && appoint[0].time === '11.00 - 12.00' ? (
  <Col span={4} style={{ width: '11%', height: '100%', backgroundColor: 'white' }}>
    xxxxx
  </Col>
) : (
  <Col span={4} style={{ width: '11%', height: '100%', backgroundColor: 'green' }}>
    xxxxx
  </Col>
)
            }
            {
appoint[0].day === d && appoint[0].time === '12.00 - 13.00' ? (
  <Col span={4} style={{ width: '11%', height: '100%', backgroundColor: 'white' }}>
    xxxxx
  </Col>
) : (
  <Col span={4} style={{ width: '11%', height: '100%', backgroundColor: 'blue' }}>
    xxxxx
  </Col>
)
            }
            {
appoint[0].day === d && appoint[0].time === '13.00 - 14.00' ? (
  <Col span={4} style={{ width: '11%', height: '100%', backgroundColor: 'white' }}>
    xxxxx
  </Col>
) : (
  <Col span={4} style={{ width: '11%', height: '100%', backgroundColor: 'black' }}>
    xxxxx
  </Col>
)
            }
            {
appoint[0].day === d && appoint[0].time === '14.00 - 15.00' ? (
  <Col span={4} style={{ width: '11%', height: '100%', backgroundColor: 'white' }}>
    xxxxx
  </Col>
) : (
  <Col span={4} style={{ width: '11%', height: '100%', backgroundColor: 'yellow' }}>
    xxxxx
  </Col>
)
            }
            {
appoint[0].day === d && appoint[0].time === '15.00 - 16.00' ? (
  <Col span={4} style={{ width: '11%', height: '100%', backgroundColor: 'white' }}>
    xxxxx
  </Col>
) : (
  <Col span={4} style={{ width: '11%', height: '100%', backgroundColor: 'purple' }}>
    xxxxx
  </Col>
)
             }
          </Row>
          // ))

        ))
      }
      {/* <Row justify='start' style={{ height: '54px' }}>
        {if(day)}
        <Col span={4} style={{ width: '11%', height: '100%' }}>Monday</Col>
        <Col span={4} style={{ width: '11%', height: '100%' }}>
          <Col span={4} style={{width: '50%',flex: 1, backgroundColor: 'pink', height: '100%'}}>cdvndjvb</Col>
          <Col span={4} style={{width: '50%',flex: 1, backgroundColor: 'black' , height: '100%'}}/>
        </Col>
        <Col span={4} style={{ width: '11%', height: '100%' }}>
          <Col span={4} style={{width: '50%',flex: 1, backgroundColor: 'pink' , height: '100%'}}/>
          <Col span={4} style={{width: '50%',flex: 1, backgroundColor: 'black' , height: '100%'}}/>
        </Col>
        <Col span={4} style={{ width: '11%', height: '100%'}}>
          <Col span={4} style={{width: '50%',flex: 1, backgroundColor: 'pink', height: '100%'}}/>
          <Col span={4} style={{width: '50%',flex: 1, backgroundColor: 'black', height: '100%'}}/>
        </Col>
        <Col span={4} style={{ width: '11%', height: '100%' }}>
          <Col span={4} style={{width: '50%',flex: 1, backgroundColor: 'pink', height: '100%'}}/>
          <Col span={4} style={{width: '50%',flex: 1, backgroundColor: 'black', height: '100%'}}/>
        </Col>
        <Col span={4} style={{ width: '11%', height: '100%' }}>
          <Col span={4} style={{width: '50%',flex: 1, backgroundColor: 'pink', height: '100%'}}/>
          <Col span={4} style={{width: '50%',flex: 1, backgroundColor: 'black', height: '100%'}}/>
        </Col>
        <Col span={4} style={{ width: '11%', height: '100%' }}>
          <Col span={4} style={{width: '50%',flex: 1, backgroundColor: 'pink', height: '100%'}}/>
          <Col span={4} style={{width: '50%',flex: 1, backgroundColor: 'black', height: '100%'}}/>
        </Col>
        <Col span={4} style={{ width: '11%', height: '100%' }}>
          <Col span={4} style={{width: '50%',flex: 1, backgroundColor: 'pink' , height: '100%'}}/>
          <Col span={4} style={{width: '50%',flex: 1, backgroundColor: 'black' , height: '100%'}}/>
        </Col>
        <Col span={4} style={{ width: '11%', height: '100%' }}>
          <Col span={4} style={{width: '50%',flex: 1, backgroundColor: 'pink', height: '100%'}}/>
          <Col span={4} style={{width: '50%',flex: 1, backgroundColor: 'black', height: '100%'}}/>
        </Col>
      </Row>
      <Row justify='start' style={{ height: '54px' }}>
        <Col span={4} style={{ width: '11%' }}>Tuesday</Col>
        <Col span={4} style={{ width: '11%' }} />
        <Col span={4} style={{ width: '11%' }} />
        <Col span={4} style={{ width: '11%' }} />
        <Col span={4} style={{ width: '11%' }} />
        <Col span={4} style={{ width: '11%' }} />
        <Col span={4} style={{ width: '11%' }} />
        <Col span={4} style={{ width: '11%' }} />
        <Col span={4} style={{ width: '11%' }} />
      </Row>
      <Row justify='start' style={{ height: '54px' }}>
        <Col span={4} style={{ width: '11%' }}>Wednesday</Col>
        <Col span={4} style={{ width: '11%' }} />
        <Col span={4} style={{ width: '11%' }} />
        <Col span={4} style={{ width: '11%' }} />
        <Col span={4} style={{ width: '11%' }} />
        <Col span={4} style={{ width: '11%' }} />
        <Col span={4} style={{ width: '11%' }} />
        <Col span={4} style={{ width: '11%' }} />
        <Col span={4} style={{ width: '11%' }} />
      </Row>
      <Row justify='start' style={{ height: '54px' }}>
        <Col span={4} style={{ width: '11%' }}>Thursday</Col>
        <Col span={4} style={{ width: '11%' }} />
        <Col span={4} style={{ width: '11%' }} />
        <Col span={4} style={{ width: '11%' }} />
        <Col span={4} style={{ width: '11%' }} />
        <Col span={4} style={{ width: '11%' }} />
        <Col span={4} style={{ width: '11%' }} />
        <Col span={4} style={{ width: '11%' }} />
        <Col span={4} style={{ width: '11%' }} />
      </Row>
      <Row justify='start' style={{ height: '54px' }}>
        <Col span={4} style={{ width: '11%' }}>Firday</Col>
        <Col span={4} style={{ width: '11%' }} />
        <Col span={4} style={{ width: '11%' }} />
        <Col span={4} style={{ width: '11%' }} />
        <Col span={4} style={{ width: '11%' }} />
        <Col span={4} style={{ width: '11%' }} />
        <Col span={4} style={{ width: '11%' }} />
        <Col span={4} style={{ width: '11%' }} />
        <Col span={4} style={{ width: '11%' }} />
      </Row> */}
    </>
  )
}

export default Schedules

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

const RowWrapper = styled.div`
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

const ItemHeader = styled.div`
    display: flex; 
    width: 100% ;
    justify-content: flex-start;
    font-family: kanit;
    font-size: 18px;
    margin: 0;
    color: black;
    cursor: pointer;
    margin: 18px 0px 18px 0px;
`
const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`
