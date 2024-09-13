import { Form, notification } from 'antd'
import { useFormAvailability } from './useFormAvailability'
import { useFillNewOrder } from './useFillNewOrder'
import { useFillOpenedOrder } from './useFillOpenedOrder'

export function useMainForm (isCreating, formInitData) {
  const [form] = Form.useForm()

  useFillNewOrder(form, isCreating, formInitData)
  useFillOpenedOrder(form, isCreating, formInitData)

  const validateForm = async callback => {
    try {
      await form.validateFields()
      callback()
    } catch {
      notification.error({
        message: 'Недостаточно данных на форме заявки ШПД',
        description: 'Пожалуйста, проверьте поля, подсвеченные красным'
      })
    }
  }

  const { isFormDisabled, areFormControlsEnabled, areFormActionsEnabled, isReducedForm } = useFormAvailability(
    isCreating,
    formInitData
  )
  return { form, isFormDisabled, areFormControlsEnabled, areFormActionsEnabled, validateForm, isReducedForm }
}
