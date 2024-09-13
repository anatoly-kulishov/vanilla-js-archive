import PropTypes from 'prop-types'
import moment from 'moment'

export const INITIAL_MASS_PROBLEMS_COLUMNS = [
  // Always clear cache and localStorage after changes
  {
    property: 'ProblemId',
    label: 'Номер',
    width: 200
  },
  {
    property: 'StatusName',
    label: 'Статус',
    width: 100
  },
  {
    property: 'ProblemName',
    label: 'Название',
    width: 100
  },
  {
    property: 'ProblemRegions',
    label: 'Регион',
    width: 100
  },
  {
    property: 'ProblemArea',
    label: 'Города',
    width: 100
  },
  {
    property: 'ServiceName',
    label: 'Краткое описание',
    width: 100
  },
  {
    property: 'ReasonName',
    label: 'Причина заметки',
    width: 100
  },
  {
    property: 'CategoryName',
    label: 'Категория обращения',
    width: 100
  },
  {
    property: 'OpenedDateTime',
    label: 'Открыта',
    width: 100
  },
  {
    property: 'StartDateTime',
    label: 'Начало',
    width: 100
  },
  {
    property: 'FinishDateTime',
    label: 'Окончание',
    width: 100
  },
  {
    property: 'NoteCount',
    label: 'Заметки',
    width: 100
  },
  {
    property: 'NoteCountToday',
    label: 'Заметки сегодня',
    width: 100
  },
  {
    property: 'ParsedWhatHappens',
    label: 'Что происходит',
    width: 100
  },
  {
    property: 'HowDidItKnown',
    label: 'Как узнали о проблеме',
    width: 100
  },
  {
    property: 'ProblemReason',
    label: 'Причина',
    width: 100
  },
  {
    property: 'TechnicalObject',
    label: 'Объект',
    width: 100
  },
  {
    property: 'TtNumber',
    label: 'Номер TT',
    width: 100
  },
  {
    property: 'ProblemTypeName',
    label: 'Тип проблемы',
    width: 100
  },
  {
    property: 'ProblemNote',
    label: 'Комментарий',
    width: 100
  },
  {
    property: 'Author',
    label: 'Автор',
    width: 100
  },
  {
    property: 'IsEmergency',
    label: 'Критичная',
    width: 100
  }
]

const MassProblemStatusShape = {
  StatusId: PropTypes.number.isRequired,
  StatusName: PropTypes.string.isRequired
}

const MassProblemTypeShape = {
  TypeId: PropTypes.number.isRequired,
  TypeName: PropTypes.string.isRequired,
  TypeNote: PropTypes.string,
  ShortName: PropTypes.string,
  IsActive: PropTypes.bool.isRequired,
  IsDeleted: PropTypes.bool.isRequired
}

const MassProblemServiceShape = {
  Id: PropTypes.string.isRequired,
  ServiceId: PropTypes.string,
  Name: PropTypes.string.isRequired,
  MaxPeriodForClosedSms: PropTypes.number
}

const MassProblemRegionShape = {
  BranchId: PropTypes.number.isRequired,
  BranchName: PropTypes.string.isRequired,
  Brand: PropTypes.string.isRequired,
  MacroRegion: PropTypes.string.isRequired
}

const MassProblemSmsTemplateShape = {
  Id: PropTypes.string.isRequired,
  Name: PropTypes.string.isRequired
}

const MassProblemUseShape = {
  ProblemId: PropTypes.number.isRequired,
  ReasonId: PropTypes.number.isRequired,
  CategoryId: PropTypes.number.isRequired,
  StatusId: PropTypes.number.isRequired,
  StatusName: PropTypes.string,
  ProblemTypeName: PropTypes.string,
  ProblemName: PropTypes.string.isRequired,
  ServiceName: PropTypes.string,
  ReasonName: PropTypes.string,
  CategoryName: PropTypes.string,
  Regions: PropTypes.arrayOf(PropTypes.number).isRequired,
  Author: PropTypes.string,
  ProblemArea: PropTypes.string,
  OpenedDateTime: PropTypes.string,
  StartDateTime: PropTypes.string,
  FinishDateTime: PropTypes.string,
  NoteCount: PropTypes.number,
  NoteCountToday: PropTypes.number,
  ParsedWhatHappens: PropTypes.string,
  HowDidItKnown: PropTypes.string.isRequired,
  ProblemReason: PropTypes.string,
  TechnicalObject: PropTypes.string,
  TtNumber: PropTypes.string,
  ProblemNote: PropTypes.string,
  IsEmergency: PropTypes.bool,
  RowBackColor: PropTypes.string,
  RowTextColor: PropTypes.string
}

const MassProblemFullShape = {
  ...MassProblemUseShape,
  BeginDateTime: PropTypes.string,
  EndDateTime: PropTypes.string,
  ProblemTypeId: PropTypes.number.isRequired,
  ServiceId: PropTypes.string.isRequired,
  WhatHappens: PropTypes.string.isRequired,
  AnswerText: PropTypes.string.isRequired,
  ParsedAnswerText: PropTypes.string,
  WhatToControl: PropTypes.string,
  ParsedWhatToControl: PropTypes.string,
  ParsedWhatHappens: PropTypes.string,
  Recomendation: PropTypes.string,
  ParsedRecomendation: PropTypes.string,
  NocEvent: PropTypes.string,
  TechnicalExpert: PropTypes.string,
  RegisterDescription: PropTypes.string,
  ParsedRegisterDescription: PropTypes.string,
  FeedbackDescription: PropTypes.string,
  ParsedFeedbackDescription: PropTypes.string,
  TtCount: PropTypes.number,
  SmsTemplateId: PropTypes.string,
  MaxPeriodForClosedSms: PropTypes.number,
  IsCommentRequired: PropTypes.bool,
  CommentDescription: PropTypes.string,
  ClosedVisibleTimeout: PropTypes.number,
  NotifyMonPeriod: PropTypes.number,
  NotifyMonEdge: PropTypes.number,
  IsNotifyOn: PropTypes.bool
}

export const MassProblemFilterShape = {
  StatusId: PropTypes.number,
  ReasonId: PropTypes.number,
  CategoryId: PropTypes.number,
  ProblemTypeId: PropTypes.number,
  Author: PropTypes.string.isRequired,
  ProblemId: PropTypes.string.isRequired,
  ServiceId: PropTypes.string,
  ProblemName: PropTypes.string.isRequired,
  GeneralText: PropTypes.string.isRequired,
  DatePeriodStart: PropTypes.instanceOf(moment).isRequired,
  DatePeriodFinish: PropTypes.instanceOf(moment).isRequired,
  Regions: PropTypes.arrayOf(PropTypes.number).isRequired,
  RegionSearchMethod: PropTypes.number.isRequired
}

const MassProblemInteractionShape = {
  InteractionNoteId: PropTypes.number.isRequired,
  CreatedOn: PropTypes.string.isRequired,
  ReasonName: PropTypes.string,
  CategoryName: PropTypes.string,
  SubscriberBranchId: PropTypes.number,
  Msisdn: PropTypes.string,
  IsToday: PropTypes.bool
}

const MassProblemTemplateShape = {
  TemplateId: PropTypes.number.isRequired,
  TemplateName: PropTypes.string.isRequired,
  ServiceName: PropTypes.string.isRequired,
  TemplateRegions: PropTypes.string,
  ReasonName: PropTypes.string.isRequired,
  CategoryName: PropTypes.string.isRequired,
  IsActive: PropTypes.bool,
  IsDeleted: PropTypes.bool
}

const MassProblemHistoryShape = {
  RecId: PropTypes.string.isRequired,
  ModifyType: PropTypes.string,
  Attribute: PropTypes.string,
  OldValue: PropTypes.string,
  NewValue: PropTypes.string,
  Author: PropTypes.string,
  ModifiedOn: PropTypes.string.isRequired
}

const StandardAnswerShape = {
  PhraseId: PropTypes.number.isRequired,
  GroupName: PropTypes.string.isRequired,
  ProblemCore: PropTypes.string.isRequired,
  PhraseText: PropTypes.string.isRequired
}

const MassProblemFileShape = {
  ResourceId: PropTypes.number.isRequired,
  ResourceName: PropTypes.string.isRequired,
  ResourceOwner: PropTypes.number.isRequired
}

const MassProblemParameterShape = {
  ParameterId: PropTypes.number.isRequired,
  ParameterName: PropTypes.string.isRequired,
  ParameterValue: PropTypes.string.isRequired,
  Description: PropTypes.string.isRequired,
  Note: PropTypes.string
}

const MassProblemMsisdnStatusShape = {
  msisdn: PropTypes.number.isRequired,
  isAnonymous: PropTypes.bool.isRequired
}

export const MassProblemStatusProps = PropTypes.shape(MassProblemStatusShape)
export const MassProblemTypeProps = PropTypes.shape(MassProblemTypeShape)
export const MassProblemServiceProps = PropTypes.shape(MassProblemServiceShape)
export const MassProblemRegionProps = PropTypes.shape(MassProblemRegionShape)
export const MassProblemSmsTemplateProps = PropTypes.shape(MassProblemSmsTemplateShape)
export const MassProblemListProps = PropTypes.shape(MassProblemUseShape)
export const MassProblemCardProps = PropTypes.shape(MassProblemFullShape)
export const MassProblemInteractionProps = PropTypes.shape(MassProblemInteractionShape)
export const MassProblemTemplateProps = PropTypes.shape(MassProblemTemplateShape)
export const MassProblemHistoryProps = PropTypes.shape(MassProblemHistoryShape)
export const StandardAnswerProps = PropTypes.shape(StandardAnswerShape)
export const MassProblemFileProps = PropTypes.shape(MassProblemFileShape)
export const MassProblemParameterProps = PropTypes.shape(MassProblemParameterShape)
export const MassProblemMsisdnStatusProps = PropTypes.shape(MassProblemMsisdnStatusShape)

export const REGIONS_SEARCH_OPTIONS = [
  { value: 0, label: 'Полное соответствие списков' },
  { value: 1, label: 'Полное вхождение списка поиска' },
  { value: 2, label: 'Имеет хотя бы один регион списка' }
]

export const FILE_FIELDS = {
  0: '',
  1: 'Что происходит',
  2: 'Стандартный ответ',
  3: 'Описание регистрации',
  4: 'Описание обратной связи',
  5: 'Что проверять',
  6: 'Рекомендации'
}

export const fetchMassProblemsForRegionParams = {
  RequestType: 2,
  RegionSearchMethod: 1
}

export const ATTRIBUTES_FOR_INTERFACES_FIELDS_ENUM = {
  WhatHappens: 'WhatHappens',
  Answer: 'Answer',
  Name: 'Name',
  ParsedWhatHappens: 'ParsedWhatHappens',
  ParsedAnswer: 'ParsedAnswer'
}

export const DEFAULT_MTP_FIELDS_ENUM = {
  WhatHappens: 'WhatHappens',
  AnswerText: 'AnswerText',
  ProblemName: 'ProblemName',
  ParsedWhatHappens: 'ParsedWhatHappens',
  ParsedAnswerText: 'ParsedAnswerText'
}

export const CHANNELED_TO_DEFAULT_MAPPING = {
  [ATTRIBUTES_FOR_INTERFACES_FIELDS_ENUM.WhatHappens]: DEFAULT_MTP_FIELDS_ENUM.WhatHappens,
  [ATTRIBUTES_FOR_INTERFACES_FIELDS_ENUM.Name]: DEFAULT_MTP_FIELDS_ENUM.ProblemName,
  [ATTRIBUTES_FOR_INTERFACES_FIELDS_ENUM.Answer]: DEFAULT_MTP_FIELDS_ENUM.AnswerText,
  [ATTRIBUTES_FOR_INTERFACES_FIELDS_ENUM.ParsedAnswer]: DEFAULT_MTP_FIELDS_ENUM.ParsedAnswerText,
  [ATTRIBUTES_FOR_INTERFACES_FIELDS_ENUM.ParsedWhatHappens]: DEFAULT_MTP_FIELDS_ENUM.ParsedWhatHappens
}
