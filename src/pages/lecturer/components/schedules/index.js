import React from 'react'
import styled from 'styled-components'
import { Segment, Icon } from 'semantic-ui-react'
import {
  Row, Col, Button, Divider, Tooltip,
} from 'antd'
import Cookie from 'js-cookie'

import NotFound from '~/components/Table/NotFound'
import FormButton from '~/components/Form/Button'
import AddAppointment from './components/addAppointment'
// import DeleteIcon from '~/components/DeleteIcon'

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
    // day: a.get('day'),
    id: `${a.get('day')} ${a.get('start_time')} - ${a.get('end_time')}`,
    title: a.get('title'),
    detail: a.get('detail'),
  }))

  const schedules = {
    Monday: {
      1: appoint.filter(a => a.id === 'Monday 08.00 - 09.00').length === 0 ? null : appoint.filter(a => a.id === 'Monday 08.00 - 09.00'),
      2: appoint.filter(a => a.id === 'Monday 09.00 - 10.00').length === 0 ? null : appoint.filter(a => a.id === 'Monday 09.00 - 10.00'),
      3: appoint.filter(a => a.id === 'Monday 10.00 - 11.00').length === 0 ? null : appoint.filter(a => a.id === 'Monday 10.00 - 11.00'),
      4: appoint.filter(a => a.id === 'Monday 11.00 - 12.00').length === 0 ? null : appoint.filter(a => a.id === 'Monday 11.00 - 12.00'),
      5: appoint.filter(a => a.id === 'Monday 12.00 - 13.00').length === 0 ? null : appoint.filter(a => a.id === 'Monday 12.00 - 13.00'),
      6: appoint.filter(a => a.id === 'Monday 13.00 - 14.00').length === 0 ? null : appoint.filter(a => a.id === 'Monday 13.00 - 14.00'),
      7: appoint.filter(a => a.id === 'Monday 14.00 - 15.00').length === 0 ? null : appoint.filter(a => a.id === 'Monday 14.00 - 15.00'),
      8: appoint.filter(a => a.id === 'Monday 15.00 - 16.00').length === 0 ? null : appoint.filter(a => a.id === 'Monday 15.00 - 16.00'),
    },
    Tuesday: {
      1: appoint.filter(a => a.id === 'Tuesday 08.00 - 09.00').length === 0 ? null : appoint.filter(a => a.id === 'Tuesday 08.00 - 09.00'),
      2: appoint.filter(a => a.id === 'Tuesday 09.00 - 10.00').length === 0 ? null : appoint.filter(a => a.id === 'Tuesday 09.00 - 10.00'),
      3: appoint.filter(a => a.id === 'Tuesday 10.00 - 11.00').length === 0 ? null : appoint.filter(a => a.id === 'Tuesday 10.00 - 11.00'),
      4: appoint.filter(a => a.id === 'Tuesday 11.00 - 12.00').length === 0 ? null : appoint.filter(a => a.id === 'Tuesday 11.00 - 12.00'),
      5: appoint.filter(a => a.id === 'Tuesday 12.00 - 13.00').length === 0 ? null : appoint.filter(a => a.id === 'Tuesday 12.00 - 13.00'),
      6: appoint.filter(a => a.id === 'Tuesday 13.00 - 14.00').length === 0 ? null : appoint.filter(a => a.id === 'Tuesday 13.00 - 14.00'),
      7: appoint.filter(a => a.id === 'Tuesday 14.00 - 15.00').length === 0 ? null : appoint.filter(a => a.id === 'Tuesday 14.00 - 15.00'),
      8: appoint.filter(a => a.id === 'Tuesday 15.00 - 16.00').length === 0 ? null : appoint.filter(a => a.id === 'Tuesday 15.00 - 16.00'),
    },
    Wednesday: {
      1: appoint.filter(a => a.id === 'Wednesday 08.00 - 09.00').length === 0 ? null : appoint.filter(a => a.id === 'Wednesday 08.00 - 09.00'),
      2: appoint.filter(a => a.id === 'Wednesday 09.00 - 10.00').length === 0 ? null : appoint.filter(a => a.id === 'Wednesday 09.00 - 10.00'),
      3: appoint.filter(a => a.id === 'Wednesday 10.00 - 11.00').length === 0 ? null : appoint.filter(a => a.id === 'Wednesday 10.00 - 11.00'),
      4: appoint.filter(a => a.id === 'Wednesday 11.00 - 12.00').length === 0 ? null : appoint.filter(a => a.id === 'Wednesday 11.00 - 12.00'),
      5: appoint.filter(a => a.id === 'Wednesday 12.00 - 13.00').length === 0 ? null : appoint.filter(a => a.id === 'Wednesday 12.00 - 13.00'),
      6: appoint.filter(a => a.id === 'Wednesday 13.00 - 14.00').length === 0 ? null : appoint.filter(a => a.id === 'Wednesday 13.00 - 14.00'),
      7: appoint.filter(a => a.id === 'Wednesday 14.00 - 15.00').length === 0 ? null : appoint.filter(a => a.id === 'Wednesday 14.00 - 15.00'),
      8: appoint.filter(a => a.id === 'Wednesday 15.00 - 16.00').length === 0 ? null : appoint.filter(a => a.id === 'Wednesday 15.00 - 16.00'),
    },
    Thursday: {
      1: appoint.filter(a => a.id === 'Thursday 08.00 - 09.00').length === 0 ? null : appoint.filter(a => a.id === 'Thursday 08.00 - 09.00'),
      2: appoint.filter(a => a.id === 'Thursday 09.00 - 10.00').length === 0 ? null : appoint.filter(a => a.id === 'Thursday 09.00 - 10.00'),
      3: appoint.filter(a => a.id === 'Thursday 10.00 - 11.00').length === 0 ? null : appoint.filter(a => a.id === 'Thursday 10.00 - 11.00'),
      4: appoint.filter(a => a.id === 'Thursday 11.00 - 12.00').length === 0 ? null : appoint.filter(a => a.id === 'Thursday 11.00 - 12.00'),
      5: appoint.filter(a => a.id === 'Thursday 12.00 - 13.00').length === 0 ? null : appoint.filter(a => a.id === 'Thursday 12.00 - 13.00'),
      6: appoint.filter(a => a.id === 'Thursday 13.00 - 14.00').length === 0 ? null : appoint.filter(a => a.id === 'Thursday 13.00 - 14.00'),
      7: appoint.filter(a => a.id === 'Thursday 14.00 - 15.00').length === 0 ? null : appoint.filter(a => a.id === 'Thursday 14.00 - 15.00'),
      8: appoint.filter(a => a.id === 'Thursday 15.00 - 16.00').length === 0 ? null : appoint.filter(a => a.id === 'Thursday 15.00 - 16.00'),
    },
    Friday: {
      1: appoint.filter(a => a.id === 'Friday 08.00 - 09.00').length === 0 ? null : appoint.filter(a => a.id === 'Friday 08.00 - 09.00'),
      2: appoint.filter(a => a.id === 'Friday 09.00 - 10.00').length === 0 ? null : appoint.filter(a => a.id === 'Friday 09.00 - 10.00'),
      3: appoint.filter(a => a.id === 'Friday 10.00 - 11.00').length === 0 ? null : appoint.filter(a => a.id === 'Friday 10.00 - 11.00'),
      4: appoint.filter(a => a.id === 'Friday 11.00 - 12.00').length === 0 ? null : appoint.filter(a => a.id === 'Friday 11.00 - 12.00'),
      5: appoint.filter(a => a.id === 'Friday 12.00 - 13.00').length === 0 ? null : appoint.filter(a => a.id === 'Friday 12.00 - 13.00'),
      6: appoint.filter(a => a.id === 'Friday 13.00 - 14.00').length === 0 ? null : appoint.filter(a => a.id === 'Friday 13.00 - 14.00'),
      7: appoint.filter(a => a.id === 'Friday 14.00 - 15.00').length === 0 ? null : appoint.filter(a => a.id === 'Friday 14.00 - 15.00'),
      8: appoint.filter(a => a.id === 'Friday 15.00 - 16.00').length === 0 ? null : appoint.filter(a => a.id === 'Friday 15.00 - 16.00'),
    },
  }


  // console.log(schedules.Tuesday['2'])
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
      {
        appointApprove.size > 0 && (
          <>

        
      <Divider orientation='left' style={{ color: '#333', fontWeight: 'normal' }}>
        {/* sub-element align left */}
      </Divider>
      <Row
        justify='start'
        style={{
          height: '54px', display: 'flex', alignItems: 'center', backgroundColor: '#e8d4fa',
        }}
      >

        <Col span={4} style={{ width: '12%' }}>DAY</Col>
        <Col span={4} style={{ width: '11%' }}><div style={{ display: 'flex', justifyContent: 'center' }}>08.00 - 09.00</div></Col>
        <Col span={4} style={{ width: '11%' }}><div style={{ display: 'flex', justifyContent: 'center' }}>09.00 - 10.00</div></Col>
        <Col span={4} style={{ width: '11%' }}><div style={{ display: 'flex', justifyContent: 'center' }}>10.00 - 11.00</div></Col>
        <Col span={4} style={{ width: '11%' }}><div style={{ display: 'flex', justifyContent: 'center' }}>11.00 - 12.00</div></Col>
        <Col span={4} style={{ width: '11%' }}><div style={{ display: 'flex', justifyContent: 'center' }}>12.00 - 13.00</div></Col>
        <Col span={4} style={{ width: '11%' }}><div style={{ display: 'flex', justifyContent: 'center' }}>13.00 - 14.00</div></Col>
        <Col span={4} style={{ width: '11%' }}><div style={{ display: 'flex', justifyContent: 'center' }}>14.00 - 15.00</div></Col>
        <Col span={4} style={{ width: '11%' }}><div style={{ display: 'flex', justifyContent: 'center' }}>15.00 - 16.00</div></Col>
      </Row>

      <Row justify='start' style={{ height: '54px' }}>
        <Col span={4} style={{ width: '12%', height: '100%' }}>Monday</Col>
        <Col span={4} style={{ width: '11%', height: '100%' }}>
          <StyleColMon span={4} style={{ backgroundColor: schedules.Monday['1'] ? 'pink' : 'white' }}>
          {' '}
            {schedules.Monday['1'] ? (
              <Tooltip title={schedules.Monday['1'] ? (
                <div>
                  {schedules.Monday['1'][0].title}
                  <br />
                  {schedules.Monday['1'][0].detail}
                </div>
              ) : ''}
              >
                {schedules.Monday['1'][0].title}
              </Tooltip>
            ) : ''}
            {' '}
          </StyleColMon>
        </Col>
        <Col span={4} style={{ width: '11%', height: '100%' }}>
          <StyleColMon span={4} style={{ backgroundColor: schedules.Monday['2'] ? 'pink' : 'white' }}>
          {' '}
            {schedules.Monday['2'] ? (
              <Tooltip title={schedules.Monday['2'] ? (
                <div>
                  {schedules.Monday['2'][0].title}
                  <br />
                  {schedules.Monday['2'][0].detail}
                </div>
              ) : ''}
              >
                {schedules.Monday['2'][0].title}
              </Tooltip>
            ) : ''}
            {' '}
          </StyleColMon>
        </Col>
        <Col span={4} style={{ width: '11%', height: '100%' }}>
          <StyleColMon span={4} style={{ backgroundColor: schedules.Monday['3'] ? 'pink' : 'white' }}>
          {' '}
            {schedules.Monday['3'] ? (
              <Tooltip title={schedules.Monday['3'] ? (
                <div>
                  {schedules.Monday['3'][0].title}
                  <br />
                  {schedules.Monday['3'][0].detail}
                </div>
              ) : ''}
              >
                {schedules.Monday['3'][0].title}
              </Tooltip>
            ) : ''}
            {' '}
          </StyleColMon>
        </Col>
        <Col span={4} style={{ width: '11%', height: '100%' }}>
          <StyleColMon span={4} style={{ backgroundColor: schedules.Monday['4'] ? 'pink' : 'white' }}>
          {' '}
            {schedules.Monday['4'] ? (
              <Tooltip title={schedules.Monday['4'] ? (
                <div>
                  {schedules.Monday['4'][0].title}
                  <br />
                  {schedules.Monday['4'][0].detail}
                </div>
              ) : ''}
              >
                {schedules.Monday['4'][0].title}
              </Tooltip>
            ) : ''}
            {' '}
          </StyleColMon>
        </Col>
        <Col span={4} style={{ width: '11%', height: '100%' }}>
          <StyleColMon span={4} style={{ backgroundColor: schedules.Monday['5'] ? 'pink' : 'white' }}>
          {' '}
            {schedules.Monday['5'] ? (
              <Tooltip title={schedules.Monday['5'] ? (
                <div>
                  {schedules.Monday['5'][0].title}
                  <br />
                  {schedules.Monday['5'][0].detail}
                </div>
              ) : ''}
              >
                {schedules.Monday['5'][0].title}
              </Tooltip>
            ) : ''}
            {' '}
          </StyleColMon>
        </Col>
        <Col span={4} style={{ width: '11%', height: '100%' }}>
          <StyleColMon span={4} style={{ backgroundColor: schedules.Monday['6'] ? 'pink' : 'white' }}>
          {' '}
            {schedules.Monday['6'] ? (
              <Tooltip title={schedules.Monday['6'] ? (
                <div>
                  {schedules.Monday['6'][0].title}
                  <br />
                  {schedules.Monday['6'][0].detail}
                </div>
              ) : ''}
              >
                {schedules.Monday['6'][0].title}
              </Tooltip>
            ) : ''}
            {' '}
          </StyleColMon>
        </Col>
        <Col span={4} style={{ width: '11%', height: '100%' }}>
          <StyleColMon span={4} style={{ backgroundColor: schedules.Monday['7'] ? 'pink' : 'white' }}>
          {' '}
            {schedules.Monday['7'] ? (
              <Tooltip title={schedules.Monday['7'] ? (
                <div>
                  {schedules.Monday['7'][0].title}
                  <br />
                  {schedules.Monday['7'][0].detail}
                </div>
              ) : ''}
              >
                {schedules.Monday['7'][0].title}
              </Tooltip>
            ) : ''}
            {' '}
          </StyleColMon>
        </Col>
        <Col span={4} style={{ width: '11%', height: '100%' }}>
          <StyleColMon span={4} style={{ backgroundColor: schedules.Monday['8'] ? 'pink' : 'white' }}>
          {' '}
            {schedules.Monday['8'] ? (
              <Tooltip title={schedules.Monday['8'] ? (
                <div>
                  {schedules.Monday['8'][0].title}
                  <br />
                  {schedules.Monday['8'][0].detail}
                </div>
              ) : ''}
              >
                {schedules.Monday['8'][0].title}
              </Tooltip>
            ) : ''}
            {' '}
          </StyleColMon>
        </Col>
      </Row>
      <Row justify='start' style={{ height: '54px' }}>
        <Col span={4} style={{ width: '12%' }}>Tuesday</Col>
        <Col span={4} style={{ width: '11%', height: '100%' }}>
          <StyleColMon span={4} style={{ backgroundColor: schedules.Tuesday['1'] ? '#c0fff3' : 'white' }}>
            {' '}
            {schedules.Tuesday['1'] ? (
              <Tooltip title={schedules.Tuesday['1'] ? (
                <div>
                  {schedules.Tuesday['1'][0].title}
                  <br />
                  {schedules.Tuesday['1'][0].detail}
                </div>
              ) : ''}
              >
                {schedules.Tuesday['1'][0].title}
              </Tooltip>
            ) : ''}
            {' '}
          </StyleColMon>
        </Col>
        <Col span={4} style={{ width: '11%', height: '100%' }}>
          <StyleColMon span={4} style={{ backgroundColor: schedules.Tuesday['2'] ? '#c0fff3' : 'white' }}>
          {' '}
            {schedules.Tuesday['2'] ? (
              <Tooltip title={schedules.Tuesday['2'] ? (
                <div>
                  {schedules.Tuesday['2'][0].title}
                  <br />
                  {schedules.Tuesday['2'][0].detail}
                </div>
              ) : ''}
              >
                {schedules.Tuesday['2'][0].title}
              </Tooltip>
            ) : ''}
            {' '}
          </StyleColMon>
        </Col>
        <Col span={4} style={{ width: '11%', height: '100%' }}>
          <StyleColMon span={4} style={{ backgroundColor: schedules.Tuesday['3'] ? '#c0fff3' : 'white' }}>
          {' '}
            {schedules.Tuesday['3'] ? (
              <Tooltip title={schedules.Tuesday['3'] ? (
                <div>
                  {schedules.Tuesday['3'][0].title}
                  <br />
                  {schedules.Tuesday['3'][0].detail}
                </div>
              ) : ''}
              >
                {schedules.Tuesday['3'][0].title}
              </Tooltip>
            ) : ''}
            {' '}
          </StyleColMon>
        </Col>
        <Col span={4} style={{ width: '11%', height: '100%' }}>
          <StyleColMon span={4} style={{ backgroundColor: schedules.Tuesday['4'] ? '#c0fff3' : 'white' }}>
          {' '}
            {schedules.Tuesday['4'] ? (
              <Tooltip title={schedules.Tuesday['4'] ? (
                <div>
                  {schedules.Tuesday['4'][0].title}
                  <br />
                  {schedules.Tuesday['4'][0].detail}
                </div>
              ) : ''}
              >
                {schedules.Tuesday['4'][0].title}
              </Tooltip>
            ) : ''}
            {' '}
          </StyleColMon>
        </Col>
        <Col span={4} style={{ width: '11%', height: '100%' }}>
          <StyleColMon span={4} style={{ backgroundColor: schedules.Tuesday['5'] ? '#c0fff3' : 'white' }}>
          {' '}
            {schedules.Tuesday['5'] ? (
              <Tooltip title={schedules.Tuesday['5'] ? (
                <div>
                  {schedules.Tuesday['5'][0].title}
                  <br />
                  {schedules.Tuesday['5'][0].detail}
                </div>
              ) : ''}
              >
                {schedules.Tuesday['5'][0].title}
              </Tooltip>
            ) : ''}
            {' '}
          </StyleColMon>
        </Col>
        <Col span={4} style={{ width: '11%', height: '100%' }}>
          <StyleColMon span={4} style={{ backgroundColor: schedules.Tuesday['6'] ? '#c0fff3' : 'white' }}>
            {' '}
            {schedules.Tuesday['6'] ? (
              <Tooltip title={schedules.Tuesday['6'] ? (
                <div>
                  {schedules.Tuesday['6'][0].title}
                  <br />
                  {schedules.Tuesday['6'][0].detail}
                </div>
              ) : ''}
              >
                {schedules.Tuesday['6'][0].title}
              </Tooltip>
            ) : ''}
            {' '}
          </StyleColMon>
        </Col>
        <Col span={4} style={{ width: '11%', height: '100%' }}>
          <StyleColMon span={4} style={{ backgroundColor: schedules.Tuesday['7'] ? '#c0fff3' : 'white' }}>
          {' '}
            {schedules.Tuesday['7'] ? (
              <Tooltip title={schedules.Tuesday['7'] ? (
                <div>
                  {schedules.Tuesday['7'][0].title}
                  <br />
                  {schedules.Tuesday['7'][0].detail}
                </div>
              ) : ''}
              >
                {schedules.Tuesday['7'][0].title}
              </Tooltip>
            ) : ''}
            {' '}
          </StyleColMon>
        </Col>
        <Col span={4} style={{ width: '11%', height: '100%' }}>
          <StyleColMon span={4} style={{ backgroundColor: schedules.Tuesday['8'] ? '#c0fff3' : 'white' }}>
          {' '}
            {schedules.Tuesday['8'] ? (
              <Tooltip title={schedules.Tuesday['8'] ? (
                <div>
                  {schedules.Tuesday['8'][0].title}
                  <br />
                  {schedules.Tuesday['8'][0].detail}
                </div>
              ) : ''}
              >
                {schedules.Tuesday['8'][0].title}
              </Tooltip>
            ) : ''}
            {' '}
          </StyleColMon>
        </Col>
      </Row>
      <Row justify='start' style={{ height: '54px' }}>
        <Col span={4} style={{ width: '12%' }}>Wednesday</Col>
        <Col span={4} style={{ width: '11%', height: '100%' }}>
          <StyleColMon span={4} style={{ backgroundColor: schedules.Wednesday['1'] ? '#faf4c8' : 'white' }}>
          {' '}
            {schedules.Wednesday['1'] ? (
              <Tooltip title={schedules.Wednesday['1'] ? (
                <div>
                  {schedules.Wednesday['1'][0].title}
                  <br />
                  {schedules.Wednesday['1'][0].detail}
                </div>
              ) : ''}
              >
                {schedules.Wednesday['1'][0].title}
              </Tooltip>
            ) : ''}
            {' '}
          </StyleColMon>
        </Col>
        <Col span={4} style={{ width: '11%', height: '100%' }}>
          <StyleColMon span={4} style={{ backgroundColor: schedules.Wednesday['2'] ? '#faf4c8' : 'white' }}>
          {' '}
            {schedules.Wednesday['2'] ? (
              <Tooltip title={schedules.Wednesday['2'] ? (
                <div>
                  {schedules.Wednesday['2'][0].title}
                  <br />
                  {schedules.Wednesday['2'][0].detail}
                </div>
              ) : ''}
              >
                {schedules.Wednesday['2'][0].title}
              </Tooltip>
            ) : ''}
            {' '}
          </StyleColMon>
        </Col>
        <Col span={4} style={{ width: '11%', height: '100%' }}>
          <StyleColMon span={4} style={{ backgroundColor: schedules.Wednesday['3'] ? '#faf4c8' : 'white' }}>
          {' '}
            {schedules.Wednesday['3'] ? (
              <Tooltip title={schedules.Wednesday['3'] ? (
                <div>
                  {schedules.Wednesday['3'][0].title}
                  <br />
                  {schedules.Wednesday['3'][0].detail}
                </div>
              ) : ''}
              >
                {schedules.Wednesday['3'][0].title}
              </Tooltip>
            ) : ''}
            {' '}
          </StyleColMon>
        </Col>
        <Col span={4} style={{ width: '11%', height: '100%' }}>
          <StyleColMon span={4} style={{ backgroundColor: schedules.Wednesday['4'] ? '#faf4c8' : 'white' }}>
          {' '}
            {schedules.Wednesday['4'] ? (
              <Tooltip title={schedules.Wednesday['4'] ? (
                <div>
                  {schedules.Wednesday['4'][0].title}
                  <br />
                  {schedules.Wednesday['4'][0].detail}
                </div>
              ) : ''}
              >
                {schedules.Wednesday['4'][0].title}
              </Tooltip>
            ) : ''}
            {' '}
          </StyleColMon>
        </Col>
        <Col span={4} style={{ width: '11%', height: '100%' }}>
          <StyleColMon span={4} style={{ backgroundColor: schedules.Wednesday['5'] ? '#faf4c8' : 'white' }}>
          {' '}
            {schedules.Wednesday['5'] ? (
              <Tooltip title={schedules.Wednesday['5'] ? (
                <div>
                  {schedules.Wednesday['5'][0].title}
                  <br />
                  {schedules.Wednesday['5'][0].detail}
                </div>
              ) : ''}
              >
                {schedules.Wednesday['5'][0].title}
              </Tooltip>
            ) : ''}
            {' '}
          </StyleColMon>
        </Col>
        <Col span={4} style={{ width: '11%', height: '100%' }}>
          <StyleColMon span={4} style={{ backgroundColor: schedules.Wednesday['6'] ? '#faf4c8' : 'white' }}>
          {' '}
            {schedules.Wednesday['6'] ? (
              <Tooltip title={schedules.Wednesday['6'] ? (
                <div>
                  {schedules.Wednesday['6'][0].title}
                  <br />
                  {schedules.Wednesday['6'][0].detail}
                </div>
              ) : ''}
              >
                {schedules.Wednesday['6'][0].title}
              </Tooltip>
            ) : ''}
            {' '}
          </StyleColMon>
        </Col>
        <Col span={4} style={{ width: '11%', height: '100%' }}>
          <StyleColMon span={4} style={{ backgroundColor: schedules.Wednesday['7'] ? '#faf4c8' : 'white' }}>
          {' '}
            {schedules.Wednesday['7'] ? (
              <Tooltip title={schedules.Wednesday['7'] ? (
                <div>
                  {schedules.Wednesday['7'][0].title}
                  <br />
                  {schedules.Wednesday['7'][0].detail}
                </div>
              ) : ''}
              >
                {schedules.Wednesday['7'][0].title}
              </Tooltip>
            ) : ''}
            {' '}
          </StyleColMon>
        </Col>
        <Col span={4} style={{ width: '11%', height: '100%' }}>
          <StyleColMon span={4} style={{ backgroundColor: schedules.Wednesday['8'] ? '#faf4c8' : 'white' }}>
          {' '}
            {schedules.Wednesday['8'] ? (
              <Tooltip title={schedules.Wednesday['8'] ? (
                <div>
                  {schedules.Wednesday['8'][0].title}
                  <br />
                  {schedules.Wednesday['8'][0].detail}
                </div>
              ) : ''}
              >
                {schedules.Wednesday['8'][0].title}
              </Tooltip>
            ) : ''}
            {' '}
          </StyleColMon>
        </Col>
      </Row>
      <Row justify='start' style={{ height: '54px' }}>
        <Col span={4} style={{ width: '12%' }}>Thursday</Col>
        <Col span={4} style={{ width: '11%', height: '100%' }}>
          <StyleColMon span={4} style={{ backgroundColor: schedules.Thursday['1'] ? '#eabda7' : 'white' }}>
          {' '}
            {schedules.Thursday['1'] ? (
              <Tooltip title={schedules.Thursday['1'] ? (
                <div>
                  {schedules.Thursday['1'][0].title}
                  <br />
                  {schedules.Thursday['1'][0].detail}
                </div>
              ) : ''}
              >
                {schedules.Thursday['1'][0].title}
              </Tooltip>
            ) : ''}
            {' '}
          </StyleColMon>
        </Col>
        <Col span={4} style={{ width: '11%', height: '100%' }}>
          <StyleColMon span={4} style={{ backgroundColor: schedules.Thursday['2'] ? '#eabda7' : 'white' }}>
          {' '}
            {schedules.Thursday['2'] ? (
              <Tooltip title={schedules.Thursday['2'] ? (
                <div>
                  {schedules.Thursday['2'][0].title}
                  <br />
                  {schedules.Thursday['2'][0].detail}
                </div>
              ) : ''}
              >
                {schedules.Thursday['2'][0].title}
              </Tooltip>
            ) : ''}
            {' '}
          </StyleColMon>
        </Col>
        <Col span={4} style={{ width: '11%', height: '100%' }}>
          <StyleColMon span={4} style={{ backgroundColor: schedules.Thursday['3'] ? '#eabda7' : 'white' }}>
          {' '}
            {schedules.Thursday['3'] ? (
              <Tooltip title={schedules.Thursday['3'] ? (
                <div>
                  {schedules.Thursday['3'][0].title}
                  <br />
                  {schedules.Thursday['3'][0].detail}
                </div>
              ) : ''}
              >
                {schedules.Thursday['3'][0].title}
              </Tooltip>
            ) : ''}
            {' '}
          </StyleColMon>
        </Col>
        <Col span={4} style={{ width: '11%', height: '100%' }}>
          <StyleColMon span={4} style={{ backgroundColor: schedules.Thursday['4'] ? '#eabda7' : 'white' }}>
          {' '}
            {schedules.Thursday['4'] ? (
              <Tooltip title={schedules.Thursday['4'] ? (
                <div>
                  {schedules.Thursday['4'][0].title}
                  <br />
                  {schedules.Thursday['4'][0].detail}
                </div>
              ) : ''}
              >
                {schedules.Thursday['4'][0].title}
              </Tooltip>
            ) : ''}
            {' '}
          </StyleColMon>
        </Col>
        <Col span={4} style={{ width: '11%', height: '100%' }}>
          <StyleColMon span={4} style={{ backgroundColor: schedules.Thursday['5'] ? '#eabda7' : 'white' }}>
          {' '}
            {schedules.Thursday['5'] ? (
              <Tooltip title={schedules.Thursday['5'] ? (
                <div>
                  {schedules.Thursday['5'][0].title}
                  <br />
                  {schedules.Thursday['5'][0].detail}
                </div>
              ) : ''}
              >
                {schedules.Thursday['5'][0].title}
              </Tooltip>
            ) : ''}
            {' '}
          </StyleColMon>
        </Col>
        <Col span={4} style={{ width: '11%', height: '100%' }}>
          <StyleColMon span={4} style={{ backgroundColor: schedules.Thursday['6'] ? '#eabda7' : 'white' }}>
          {' '}
            {schedules.Thursday['6'] ? (
              <Tooltip title={schedules.Thursday['6'] ? (
                <div>
                  {schedules.Thursday['6'][0].title}
                  <br />
                  {schedules.Thursday['6'][0].detail}
                </div>
              ) : ''}
              >
                {schedules.Thursday['6'][0].title}
              </Tooltip>
            ) : ''}
            {' '}
          </StyleColMon>
        </Col>
        <Col span={4} style={{ width: '11%', height: '100%' }}>
          <StyleColMon span={4} style={{ backgroundColor: schedules.Thursday['7'] ? '#eabda7' : 'white' }}>
          {' '}
            {schedules.Thursday['7'] ? (
              <Tooltip title={schedules.Thursday['7'] ? (
                <div>
                  {schedules.Thursday['7'][0].title}
                  <br />
                  {schedules.Thursday['7'][0].detail}
                </div>
              ) : ''}
              >
                {schedules.Thursday['7'][0].title}
              </Tooltip>
            ) : ''}
            {' '}
          </StyleColMon>
        </Col>
        <Col span={4} style={{ width: '11%', height: '100%' }}>
          <StyleColMon span={4} style={{ backgroundColor: schedules.Thursday['8'] ? '#eabda7' : 'white' }}>
            {' '}
            {schedules.Thursday['8'] ? (
              <Tooltip title={schedules.Thursday['8'] ? (
                <div>
                  {schedules.Thursday['8'][0].title}
                  <br />
                  {schedules.Thursday['8'][0].detail}
                </div>
              ) : ''}
              >
                {schedules.Thursday['8'][0].title}
              </Tooltip>
            ) : ''}
            {' '}
          </StyleColMon>
        </Col>
      </Row>
      <Row justify='start' style={{ height: '54px' }}>
        <Col span={4} style={{ width: '12%' }}>Friday</Col>
        <Col span={4} style={{ width: '11%', height: '100%' }}>
          <StyleColMon span={4} style={{ backgroundColor: schedules.Friday['1'] ? '#d9d4f6' : 'white' }}>
          {' '}
            {schedules.Friday['1'] ? (
              <Tooltip title={schedules.Friday['1'] ? (
                <div>
                  {schedules.Friday['1'][0].title}
                  <br />
                  {schedules.Friday['1'][0].detail}
                </div>
              ) : ''}
              >
                {schedules.Friday['1'][0].title}
              </Tooltip>
            ) : ''}
            {' '}
          </StyleColMon>
        </Col>
        <Col span={4} style={{ width: '11%', height: '100%' }}>
          <StyleColMon span={4} style={{ backgroundColor: schedules.Friday['2'] ? '#d9d4f6' : 'white' }}>
          {' '}
            {schedules.Friday['2'] ? (
              <Tooltip title={schedules.Friday['2'] ? (
                <div>
                  {schedules.Friday['2'][0].title}
                  <br />
                  {schedules.Friday['2'][0].detail}
                </div>
              ) : ''}
              >
                {schedules.Friday['2'][0].title}
              </Tooltip>
            ) : ''}
            {' '}
          </StyleColMon>
        </Col>
        <Col span={4} style={{ width: '11%', height: '100%' }}>
          <StyleColMon span={4} style={{ backgroundColor: schedules.Friday['3'] ? '#d9d4f6' : 'white' }}>
          {' '}
            {schedules.Friday['3'] ? (
              <Tooltip title={schedules.Friday['3'] ? (
                <div>
                  {schedules.Friday['3'][0].title}
                  <br />
                  {schedules.Friday['3'][0].detail}
                </div>
              ) : ''}
              >
                {schedules.Friday['3'][0].title}
              </Tooltip>
            ) : ''}
            {' '}
          </StyleColMon>
        </Col>
        <Col span={4} style={{ width: '11%', height: '100%' }}>
          <StyleColMon span={4} style={{ backgroundColor: schedules.Friday['4'] ? '#d9d4f6' : 'white' }}>
          {' '}
            {schedules.Friday['4'] ? (
              <Tooltip title={schedules.Friday['4'] ? (
                <div>
                  {schedules.Friday['4'][0].title}
                  <br />
                  {schedules.Friday['4'][0].detail}
                </div>
              ) : ''}
              >
                {schedules.Friday['4'][0].title}
              </Tooltip>
            ) : ''}
            {' '}
          </StyleColMon>
        </Col>
        <Col span={4} style={{ width: '11%', height: '100%' }}>
          <StyleColMon span={4} style={{ backgroundColor: schedules.Friday['5'] ? '#d9d4f6' : 'white' }}>
          {' '}
            {schedules.Friday['5'] ? (
              <Tooltip title={schedules.Friday['5'] ? (
                <div>
                  {schedules.Friday['5'][0].title}
                  <br />
                  {schedules.Friday['5'][0].detail}
                </div>
              ) : ''}
              >
                {schedules.Friday['5'][0].title}
              </Tooltip>
            ) : ''}
            {' '}
          </StyleColMon>
        </Col>
        <Col span={4} style={{ width: '11%', height: '100%' }}>
          <StyleColMon span={4} style={{ backgroundColor: schedules.Friday['6'] ? '#d9d4f6' : 'white' }}>
          {' '}
            {schedules.Friday['6'] ? (
              <Tooltip title={schedules.Friday['6'] ? (
                <div>
                  {schedules.Friday['6'][0].title}
                  <br />
                  {schedules.Friday['6'][0].detail}
                </div>
              ) : ''}
              >
                {schedules.Friday['6'][0].title}
              </Tooltip>
            ) : ''}
            {' '}
          </StyleColMon>
        </Col>
        <Col span={4} style={{ width: '11%', height: '100%' }}>
          <StyleColMon span={4} style={{ backgroundColor: schedules.Friday['7'] ? '#d9d4f6' : 'white' }}>
          {' '}
            {schedules.Friday['7'] ? (
              <Tooltip title={schedules.Friday['7'] ? (
                <div>
                  {schedules.Friday['7'][0].title}
                  <br />
                  {schedules.Friday['7'][0].detail}
                </div>
              ) : ''}
              >
                {schedules.Friday['7'][0].title}
              </Tooltip>
            ) : ''}
            {' '}
          </StyleColMon>
        </Col>
        <Col span={4} style={{ width: '11%', height: '100%' }}>
          <StyleColMon span={4} style={{ backgroundColor: schedules.Friday['8'] ? '#d9d4f6' : 'white' }}>
          {' '}
            {schedules.Friday['8'] ? (
              <Tooltip title={schedules.Friday['8'] ? (
                <div>
                  {schedules.Friday['8'][0].title}
                  <br />
                  {schedules.Friday['8'][0].detail}
                </div>
              ) : ''}
              >
                {schedules.Friday['8'][0].title}
              </Tooltip>
            ) : ''}
            {' '}
          </StyleColMon>
        </Col>
      </Row>
      </>
        )
      }
      {
        appointApprove.size === 0 && (
          <>
                          <NotFound message='DO NOT HAVE AN APPOINTMENT' />
          </>
        )
      }
    </>
  )
}

export default Schedules

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
const StyleColMon = styled(Col)`
  width: 100% !important;
  flex: 1 1 0%;
  height: 100%;
  border: 0.3px solid #c3c2c2;
  display: flex !important;
  align-items: center;
  justify-content: center;
  font-weight: 500;
`
