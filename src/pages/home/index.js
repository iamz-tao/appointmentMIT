import React, { Component } from 'react'
import { compose, bindActionCreators } from 'redux'
import styled from 'styled-components'
import { Button } from 'antd'

import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import { reduxForm, Field } from 'redux-form/immutable'
import Router from 'next/router'
import get from 'lodash/get'
import { Link } from '~/routes'
import Logo from '~/static/images/logo2.svg'

import { loginAction } from '~/modules/authentication/actions'
import { loginSelector } from '~/modules/authentication/selectors'
import ErrorModal from '~/components/Modals/Error'
import FormButton from '~/components/Form/Button'
import LoadingPulse from '~/components/LoadingPulse'
import renderInput from '~/components/ReduxForm/Input'

// import validate from './validate'

export const FORM_NAME = 'LOGIN_PAGE'
/**
 * @typedef {object} Props
 * @property {typeof homepageAction.fetchAssets} fetchAssets
 */

/** @extends {Component<Props>} */
// @ts-ignore
class Home extends Component {
  static getDerivedStateFromProps(props) {
    const { getAuthenticationLoginState } = props

    // have error show modal
    if (getAuthenticationLoginState.status === 400) {
      return {
        errorMessage: getAuthenticationLoginState.errorMessage,
        login_modal_error: true,
      }
    }

    // Login Success redirect to home
    if (getAuthenticationLoginState.status === 200) {
      // Router.replace('/')
    }

    return {}
  }

  state = {
    email: '',
    password: '',
    login_modal_error: false,

  }

  componentDidMount() {
  }

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value })
  }

  handleLogin = (values) => {
    const { loginWithUsername } = this.props

    loginWithUsername({
      data: {
        email: values.get('email'),
        password: values.get('password'),
      },
    })
  }

  handleCloseModal = () => {
    const { LoginCloseModal } = this.props
    LoginCloseModal()
    this.setState({ login_modal_error: false })
  }

  checkDisabled = () => {
    const {
      email,
      password,
    } = this.state

    return (
      email === ''
      || password === ''
    )
  }

  render() {
    const {
      getAuthenticationLoginState,
      pristine,
      submitting,
      handleSubmit,
    } = this.props

    const {
      login_modal_error,
      errorMessage,
    } = this.state

    return (
      <AppWrapper>
        <div style={{ width: '100%' }}>
          <Logo />
        </div>
         
        <div style={{ width: '100%' }}>
          <Tiltle>
            LECTURER APPOINTMENTS
          </Tiltle>
          <BoxSpace />
          <form onSubmit={handleSubmit(this.handleLogin)}>
       
          {/* <Container> */}
            <FormWrapper>
              <BodyWrapper>
                <Field
                  label='EMAIL'
                  name='email'
                  component={renderInput}
                  type='email'
                  placeholder='Email'
                />
                <Field
                  label='PASSWORD'
                  name='password'
                  component={renderInput}
                  type='password'
                  placeholder='Password'
                />

                <FormButton
                  disabled={pristine || submitting}
                  type='cancel'
                  txtButton='CANCEL'
                  width='50%'
                  onClick={() => {
                    Router.replace('/home')
                  }}
                />
                   &nbsp; &nbsp;
                <FormButton
                  colorButton='#006765'
                  disabled={submitting}
                  type='submit'
                  txtButton='LOGIN'
                  width='50%'
                  onClick={() => {
                  }}
                />

              </BodyWrapper>
            </FormWrapper>
          {/* </Container> */}
          <ErrorModal
            open={login_modal_error}
            content='Error'
            message={errorMessage}
            onClick={this.handleCloseModal}
            txtButton='Close'
          />
       
      </form>
        </div>

      </AppWrapper>
    )
  }
}

const mapStateToProps = (state, props) => createStructuredSelector({
  getAuthenticationLoginState: loginSelector.getAuthenticationLoginState,
})(state, props)

const mapDispatchToProps = dispatch => bindActionCreators({
  loginWithUsername: loginAction.loginWithUsername,
  LoginCloseModal: loginAction.LoginCloseModal,
  handleAlreadyLogin: loginAction.handleAlreadyLogin,
}, dispatch)

const withForm = reduxForm({
  form: FORM_NAME,
  // validate,
  enableReinitialize: true,
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withForm,
)(Home)

const AppWrapper = styled.div`
  text-align: center;
  background-color: #ffffff;
  font-family: sans-serif;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .ant-btn {
  color: #ffff;
  background-color: #9e7fc6;
  border-color: #9e7fc6;
  border: 2px solid #FFFFFF;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 28px;
  font-family: sans-serif;
  font-size: 18px;
  width: 120px;
  height: 48px;
}
.ant-btn:hover, .ant-btn:focus {
  color: #c2afdb;
  background-color: #fff;
  border-color: #c2afdb;
}
`

const Tiltle = styled.div`
  font-family: inherit;
  font-size: 36px;
  `
const BoxSpace = styled.div`
  height: 12px;
`
const CustomButton = styled(Button)`
.ant-btn {
  color: #0000;
    background-color: #9e7fc6;
    border-color: #9e7fc6;
}
`
const HeaderCustom = styled.div`
  background-color: #000000;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`
const Container = styled.section`
    width: 100%;
    height: calc(100vh - 57px);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
`
const FormWrapper = styled.section`
    max-width: 650px;
    position: absolute;
    top: auto;
    left: auto;
    width: 90%;
    height: fit-content !important;
    display: flex;
    font-size: 1em;
    flex-direction: column;
    text-align: center;
    border-radius: 41px;
`

const BodyWrapper = styled.div`
    width: 100%;
    margin: 20px 0px;
    height: fit-content;
`
const HomeWrapper = styled.div`
    display: block;
    position: relative;

    .rc-slider-handle {
      width: 30px;
      height: 30px;
      bottom: -8px;
      border: solid 2px #F37021;

      :focus {
        box-shadow: none;
      }
    }

    .rc-slider-track {
      background: #F37021;
    }
`

