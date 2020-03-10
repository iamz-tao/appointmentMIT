import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Grid,
  Form,
} from 'semantic-ui-react'
import { notification, Button } from 'antd'
import styled from 'styled-components'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form/immutable'
import { bindActionCreators, compose } from 'redux'
import Router from 'next/router'

import get from 'lodash/get'
import Cookie from 'js-cookie'
import isNil from 'lodash/isNil'

import validate from './validate'

import Regis from '~/static/images/regis.png'

import Avatar from '~/components/UploadProfile'
import FormButton from '~/components/Form/Button'
import { registerSelector } from '~/modules/authentication/selectors'
import { registerAction } from '~/modules/authentication/actions'

import LoadingPulse from '~/components/LoadingPulse'
import renderInput from '~/components/ReduxForm/NomalInput'
import { marginLeft } from 'styled-system'

const FORM_NAME = 'CREATE_ACCOUNT'

class RegisterPage extends Component {
  static getDerivedStateFromProps(props) {
    const { getAuthenticationRegisterState } = props
    if (getAuthenticationRegisterState.status === 200) {
      return {
        register_confirm_modal: true,
      }
    }

    if (getAuthenticationRegisterState.status === 400) {
      return {
        register_error_modal: true,
        errorMessage: getAuthenticationRegisterState.payload.message,
      }
    }

    return {}
  }
  state = {
    status: '',
  }


  componentDidMount() {
 
  }

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value })
  }

  handleState = (status)=> {
  this.setState({ status  })
  }

  openNotificationRegisterSuccess = (type) => {
    notification[type]({
      message: 'Registration Successful!',
      description:
        'We will redirect to login page.',
    })
  }

  handleRegister = (values) => {
    // console.log(values.toJS())
    
    // const { status } = this.state
    const {
      id,
      firstname,
      lastname,
      email,
      password,
    } = values.toJS()

    const user = this.state.status
    console.log(user)
    const { registerUser } = this.props

    registerUser({
      data: {
        email,
        password,
        id,
        firstname,
        lastname,
        role: user,
      },
    }
    )

    this.openNotificationRegisterSuccess('success')
  }


  render() {
    const {
      getAuthenticationRegisterState,
      pristine,
      submitting,
      handleSubmit,
    } = this.props

    if (get(getAuthenticationRegisterState, 'isFetching')) {
      return (<LoadingPulse />)
    }

    return (
      <form onSubmit={handleSubmit(this.handleRegister)} style={{ display: 'contents' }}>
        <FormWrapper>
          <FormHeader>
            CREATE YOUR ACCOUNT
          </FormHeader>
          <br />
          <Wrapper>
            {/* <Grid style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar />
            </Grid> */}
            <StyleBorder
              container
              centered
            >

              <StyledForm>
                <Field
                  label='User ID :'
                  name='id'
                  component={renderInput}
                  type='text'
                  placeholder='ID'
                />
              </StyledForm>
              <StyledForm>
                <Field
                  label='NAME :'
                  name='firstname'
                  component={renderInput}
                  type='text'
                  placeholder='Name'
                />
              </StyledForm>
              <StyledForm>
                <Field
                  label='SURNAME :'
                  name='lastname'
                  component={renderInput}
                  type='text'
                  placeholder='Surname'
                />
              </StyledForm>
              <StyledForm>
                <Field
                  label='EMAIL :'
                  name='email'
                  component={renderInput}
                  type='email'
                  placeholder='Email'
                />
              </StyledForm>
              <StyledForm>
                <Field
                  label='PASSWORD :'
                  name='password'
                  component={renderInput}
                  type='password'
                  placeholder='Password'
                />
              </StyledForm>

              <div role="group" >
                <Button onClick={() => this.handleState('NISIT')}>STUDENT</Button>  &nbsp;
                <Button onClick={() => this.handleState('PROFESSOR')}>PROFESSOR</Button>
                <br/><br/>
              </div>
              
          
              
                 <FormButton
                disabled={ pristine || submitting }
                type='cancel'
                txtButton='CANCEL'
                width='50%'
                onClick={() => {
                  Router.replace('/home')
                }}
              />
                  &nbsp; &nbsp;
              <FormButton
                disabled={submitting}
                colorButton='#8c72c0'
                type='submit'
                txtButton='REGISTER'
                width='50%'
                onClick={() => {
                }}
              />
              
            

            </StyleBorder>
          </Wrapper>
        </FormWrapper>
        <StyleWrapperImg>
        <img src={Regis} style={{    transform: 'scaleX(-1)' }} />
        </StyleWrapperImg>
      </form> 
    )
  }
}

RegisterPage.propTypes = {
  getAuthenticationRegisterState: PropTypes.instanceOf(Object).isRequired,
  registerUser: PropTypes.func.isRequired,
  registerUserReset: PropTypes.func.isRequired,
}

const mapStateToProps = (state, props) => createStructuredSelector({
  getAuthenticationRegisterState: registerSelector.getAuthenticationRegisterState,
})(state, props)

const mapDispatchToProps = dispatch => bindActionCreators({
  registerUser: registerAction.registerUser,
  registerUserReset: registerAction.registerUserReset,
}, dispatch)

const withForm = reduxForm({
  form: FORM_NAME,
  validate,
  enableReinitialize: true,
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withForm,
)(RegisterPage)


const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 16px 90px 0px 90px;
  @media (max-width: 750px) {
    margin-top: 16px;
    margin-bottom: 16px;
  } 
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  margin: 0px;
  max-width: 46%;

  .ui.grid {
    display: flex;
    flex: 1;
    justify-content: center;
    // margin: 20px;
    margin:3px;
    padding-top: 17px;
  }


  .ui.checkbox label, .ui.checkbox input:focus~label {
    color: #666666;
  }

  .ui.checkbox input:checked~label:before {
    background: #F37021;
  }

  .ui.checkbox input:checked~label:after {
    color: #FFF;
    font-size: 12px;
  }

  .ui.checkbox label {
    color: rgba(0,0,0,.87);
    transition: color .1s ease;
    padding-left: 2px;
    @media (max-width: 60px) {
      padding-left: 2px;
  }
  }

  .ui.centered.grid>.row {
    text-align: left;
  }

  .ui.form {
    width: 100%;
  }

  .ant-upload.ant-upload-select-picture-card {
    width: 300px;
    height: 300px;
  }

`

const FormHeader = styled.div`
    font-family: Arial, Helvetica, sans-serif !important;
    font-size: 30px !important;
    font-weight: 700 !important;
    justify-content: center;
    display: flex;
`

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 0px;
  margin-left: 22px;
    margin-right: 22px;
  @media (max-width: 750px) {
    flex-direction: column;
  }
  
`

const StyledLabel = styled.label`
  text-align: left;
  line-height: 32px;
  padding-right: 10px;
  width: 177px;
  font-family: kanit;
  font-weight: 400;
  font-size: 14px;
  @media (max-width: 750px) {
    text-align: left;
  }
`

const StyledInput = styled(Form.Input)`
  width: 100%;
  input {
    background: #f1f1f1 !important;
    mix-blend-mode: normal;
    border: 1px solid rgba(148, 148, 148, 0.5) !important;
    box-sizing: border-box;
    border-radius: 28px !important;
    height: 46px !important;
  }

`

const StyledStar = styled.span`
  color: red;
`

const FormInput = styled(Form)`
  width: 100%;
  display: flex;
`

const StyleBorder = styled(Grid)`
  
  background: linear-gradient(180deg, #BFCCF6 0%, rgba(255, 0, 0, 0) 10%), #FABEAFF;
  box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 41px;
  background-color: #fff;
  background: #fff;
  width: 50px
  background: linear-gradient(180deg,#BFCCF6 0%,rgba(255,255,255,0) 100%),#C8CDDF;
`

const StyleWrapperImg = styled.div`
width: 100%;
display: flex;
justify-content: flex-end;
margin-top: 12px;
`
const styleButton= styled.div`

`
