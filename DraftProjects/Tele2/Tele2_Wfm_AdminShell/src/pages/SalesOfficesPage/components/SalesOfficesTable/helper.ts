const WORK_TIME_PATTERN_TOOLTIP = 'График работы не соответсвует шаблону';
const EMPLOYEE_TOOLTIP = 'Отсутсвует менеджер';
const COORDINATES_TOOLTIP_TEXT = 'Отсутствуют координаты';

const prepareExclamationTooltip = (
  hasWorkTimePatternId: boolean,
  hasEmployeeId: boolean,
  hasCoordinates: boolean,
) => {
  const workTimePatternTooltip = hasWorkTimePatternId ? '' : WORK_TIME_PATTERN_TOOLTIP;
  const employeeTooltip = hasEmployeeId ? '' : EMPLOYEE_TOOLTIP;
  const coordinatesTooltip = hasCoordinates ? '' : COORDINATES_TOOLTIP_TEXT;

  return [workTimePatternTooltip, employeeTooltip, coordinatesTooltip].filter(Boolean).join('. ');
};

export default prepareExclamationTooltip;
