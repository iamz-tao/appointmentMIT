import {
  GET_LECTURER_LIST,
  SET_LECTURER_LIST,
  GET_REQUEST_APPOINTMENT,
  SET_REQUEST_APPOINTMENT,
  APPROVE_APPOINTMENT,
  REJECT_APPOINTMENT,
  APPROVE_APPOINTMENT_SUCCESS,
  APPROVE_APPOINTMENT_FAILED,
  REJECT_APPOINTMENT_SUCCESS,
  REJECT_APPOINTMENT_FAILED,
  CREATE_APPOINTMENT_SUCCESS,
  CREATE_APPOINTMENT_FAILED,
  CREATE_APPOINTMENT,
  STUDENT_GET_APPOINT_REQ_LIST,
  STUDENT_SET_APPOINT_REQ_LIST,
  CANCEL_APPOINT,
  CANCEL_APPOINT_SUCCESS,
} from '../constants'

export const getLecturerList = payload => ({
  payload,
  type: GET_LECTURER_LIST,
})

export const setLecturerList = payload => ({
  payload,
  type: SET_LECTURER_LIST,
})

export const getRequesAppointmentList = payload => ({
  payload,
  type: GET_REQUEST_APPOINTMENT,
})

export const setRequesAppointmentList = payload => ({
  payload,
  type: SET_REQUEST_APPOINTMENT,
})

export const approveAppointment = payload => ({
  payload,
  type: APPROVE_APPOINTMENT,
})

export const appointmentApproveSuccess = payload => ({
  payload,
  type: APPROVE_APPOINTMENT_SUCCESS,
})

export const appointmentApproveFailed = payload => ({
  payload,
  type: APPROVE_APPOINTMENT_FAILED,
})

export const rejectAppointment = payload => ({
  payload,
  type: REJECT_APPOINTMENT,
})

export const appointmentRejectSuccess = payload => ({
  payload,
  type: REJECT_APPOINTMENT_SUCCESS,
})

export const appointmentRejectFailed = payload => ({
  payload,
  type: REJECT_APPOINTMENT_FAILED,
})

export const createAppointment = payload => ({
  payload,
  type: CREATE_APPOINTMENT,
})

export const createAppointmentSuccess = payload => ({
  payload,
  type: CREATE_APPOINTMENT_SUCCESS,
})

export const createAppointmentFailed = payload => ({
  payload,
  type: CREATE_APPOINTMENT_FAILED,
})

export const getAppointReq = payload => ({
  payload,
  type: STUDENT_GET_APPOINT_REQ_LIST,
})

export const setAppointReq = payload => ({
  payload,
  type: STUDENT_SET_APPOINT_REQ_LIST,
})

export const cancelAppointment = payload => ({
  payload,
  type: CANCEL_APPOINT,
})

export const cancelAppointmentSuccess = payload => ({
  payload,
  type: CANCEL_APPOINT_SUCCESS,
})


ex
