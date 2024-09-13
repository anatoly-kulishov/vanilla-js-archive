const ERROR_NAME = 'BUSSINESS_LOGIC_ERROR_WEBSELLER'

class BussinessLogicError extends Error {
  constructor (message) {
    super(message)
    this.name = ERROR_NAME
  }
}

export const isBussinessLogicError = error => error instanceof BussinessLogicError

export default BussinessLogicError
