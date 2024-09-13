import Common from '@t2crm/wfm-utils/lib/types/common';
import { RuleObject } from 'antd/lib/form';

const activityIdRule = (
  activityTypes: Common.Option[] | undefined,
  isFetching: boolean,
): RuleObject => ({
  validator: async () => {
    if (activityTypes && activityTypes?.length === 0 && !isFetching) {
      const message = 'С данной активностью нельзя добавить автоматическую операцию';
      return Promise.reject(new Error(message));
    }
    return Promise.resolve(undefined);
  },
});

export default activityIdRule;
