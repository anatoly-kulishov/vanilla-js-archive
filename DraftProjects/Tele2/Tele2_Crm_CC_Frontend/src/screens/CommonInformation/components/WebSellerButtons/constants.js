import SimReplacementIcon from '../../assets/simReplacement.svg'
import TerminationIcon from '../../assets/termination.svg'
import CorrectionIcon from '../../assets/correction.svg'
import RecreationIcon from '../../assets/recreation.svg'
import Duplicate from '../../assets/duplicate.svg'

export const OPERATION_BUTTONS = {
  CORRECTION: 'CORRECTION',
  RECREATION: 'RECREATION',
  TERMINATION: 'TERMINATION',
  REPLACE_SIM: 'REPLACE_SIM',
  DUPLICATE_RFA: 'DUPLICATE_RFA'
}

export const OPERATION_BUTTONS_VIEW_CONFIG = {
  [OPERATION_BUTTONS.CORRECTION]: {
    title: 'Корректировка',
    icon: CorrectionIcon,
    iconBackground: '#64D49E'
  },
  [OPERATION_BUTTONS.RECREATION]: {
    title: 'Переоформление',
    icon: RecreationIcon,
    iconBackground: '#FFF176'
  },
  [OPERATION_BUTTONS.TERMINATION]: {
    title: 'Расторжение',
    icon: TerminationIcon,
    iconBackground: '#ABABFF'
  },
  [OPERATION_BUTTONS.REPLACE_SIM]: {
    title: 'Замена SIM',
    icon: SimReplacementIcon,
    iconBackground: '#3FCBFF'
  },
  [OPERATION_BUTTONS.DUPLICATE_RFA]: {
    title: 'Дубликат договора',
    icon: Duplicate,
    iconBackground: '#FF77A8'
  }
}

export const ANONYMOUS_OPERATION_BUTTONS_IS_HIDDEN_MAP = {
  [OPERATION_BUTTONS.CORRECTION]: false,
  [OPERATION_BUTTONS.RECREATION]: true,
  [OPERATION_BUTTONS.TERMINATION]: true,
  [OPERATION_BUTTONS.REPLACE_SIM]: true,
  [OPERATION_BUTTONS.DUPLICATE_RFA]: true
}
