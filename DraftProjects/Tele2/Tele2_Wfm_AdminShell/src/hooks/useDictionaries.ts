import { useQuery } from 'react-query';
import Common from '@t2crm/wfm-utils/lib/types/common';
import {
  getAddressTypes,
  getCompanyGroups,
  getContactTypes,
  getJuridicalTypes,
  getMacroRegions,
  getRegions,
  getStatuses,
  getPositions,
  getDealers,
  getOfficesStatuses,
  getEmployeeActivities,
  getAutoOperationsTypes,
  getNotificationTypes,
  getNotificationConditions,
} from 'utils/api/dictionaries';

const bull = '\u{02022}';

type DictinaryName =
'statuses'
| 'juridical-types'
| 'company-groups'
| 'positions'
| 'contact-types'
| 'address-types'
| 'macroRegions'
| 'regions'
| 'dealers'
| 'officesStatuses'
| 'employee-activities'
| 'auto-operations-types'
| 'notification-types'
| 'notification-conditions';

type ListDictionaries = DictinaryName[];

const useDictionaries = (
  list: ListDictionaries = [],
  searchParams?: Common.KeyValue,
  isEnabled: boolean = true,
) => {
  const statuses = useQuery<Common.Option[]>({
    queryKey: 'statuses',
    queryFn: () => getStatuses().then((response) => {
      if (response.data) {
        return response.data.map((item) => ({
          value: item.id,
          label: item.name,
        }));
      }

      return [];
    }),
    initialData: [],
    enabled: isEnabled && list?.includes('statuses'),
  });

  const juridicalTypes = useQuery<Common.Option[]>({
    queryKey: 'juridical-types',
    queryFn: () => getJuridicalTypes().then((response) => {
      if (response.data) {
        return response.data.map((item) => ({
          value: item.id,
          label: item.name,
        }));
      }

      return [];
    }),
    initialData: [],
    enabled: isEnabled && list?.includes('juridical-types'),
  });

  const companyGroups = useQuery<Common.Option[]>({
    queryKey: 'company-groups',
    queryFn: () => getCompanyGroups().then((response) => {
      if (response.data) {
        return response.data.map((item) => ({
          value: item.companyGroupId,
          label: item.fullName,
        }));
      }

      return [];
    }),
    initialData: [],
    enabled: isEnabled && list?.includes('company-groups'),
  });

  const positions = useQuery<Common.Option[]>({
    queryKey: 'positions',
    queryFn: () => getPositions().then((response) => {
      if (response.data) {
        return response.data.map((item) => ({
          value: item.id,
          label: item.name,
        }));
      }

      return [];
    }),
    initialData: [],
    enabled: isEnabled && list?.includes('positions'),
  });

  const contactTypes = useQuery<Common.Option[]>({
    queryKey: 'contact-types',
    queryFn: () => getContactTypes().then((response) => {
      if (response.data) {
        return response.data.map((item) => ({
          value: item.id,
          label: item.name,
        }));
      }

      return [];
    }),
    initialData: [],
    enabled: isEnabled && list?.includes('contact-types'),
  });

  const addressTypes = useQuery<Common.Option[]>({
    queryKey: 'address-types',
    queryFn: () => getAddressTypes().then((response) => {
      if (response.data) {
        return response.data.map((item) => ({
          value: item.id,
          label: item.name,
        }));
      }

      return [];
    }),
    initialData: [],
    enabled: isEnabled && list?.includes('address-types'),
  });

  const macroRegions = useQuery<Common.Option[]>({
    queryKey: 'macroRegions',
    queryFn: () => getMacroRegions().then((response) => {
      if (response.data) {
        return response.data.map((item) => ({
          value: item.id,
          label: item.nameRus,
        }));
      }

      return [];
    }),
    initialData: [],
    enabled: isEnabled && list?.includes('macroRegions'),
  });

  const regions = useQuery<Common.Option[]>({
    queryKey: ['regions', searchParams],
    queryFn: () => getRegions(searchParams).then((response) => {
      if (response.data) {
        return response.data.map((item) => ({
          value: item.id,
          label: item.name,
        }));
      }

      return [];
    }),
    initialData: [],
    enabled: isEnabled && list?.includes('regions'),
  });

  const dealers = useQuery<Common.Option[]>({
    queryKey: ['dealers', searchParams],
    queryFn: () => getDealers(searchParams).then((response) => {
      if (response.data) {
        return response.data.map((item) => ({
          value: item.id,
          label: [item.id, item.name].filter(Boolean).join(` ${bull} `) || '',
        }));
      }

      return [];
    }),
    initialData: [],
    enabled: isEnabled && list?.includes('dealers'),
  });

  const officesStatuses = useQuery<Common.Option[]>({
    queryKey: 'officesStatuses',
    queryFn: () => getOfficesStatuses().then((response) => {
      if (response.data) {
        return response.data.map((item) => ({
          value: item.id,
          label: item.name,
        }));
      }

      return [];
    }),
    initialData: [],
    enabled: isEnabled && list?.includes('officesStatuses'),
  });

  const employeeActivities = useQuery<Common.Option[]>({
    queryKey: ['employee-activities', searchParams],
    queryFn: () => getEmployeeActivities(searchParams).then((response) => {
      if (response.data) {
        return response.data.map((item) => ({
          value: item.id,
          label: item.name || '',
        }));
      }

      return [];
    }),
    initialData: [],
    enabled: isEnabled && list?.includes('employee-activities'),
  });

  const autoOperationsTypes = useQuery<Common.Option[]>({
    queryKey: ['auto-operations-types', searchParams],
    queryFn: () => getAutoOperationsTypes(searchParams).then((response) => {
      if (response.data) {
        return response.data.map((item) => ({
          value: item.autoOperationsTypeId,
          label: item.autoOperationsTypeName,
        }));
      }

      return [];
    }),
    initialData: [],
    enabled: isEnabled && list?.includes('auto-operations-types'),
  });

  const notificationTypes = useQuery<Common.Option[]>({
    queryKey: ['notification-types'],
    queryFn: () => getNotificationTypes().then((response) => {
      if (response.data) {
        return response.data.map(({ notificationTypeId, notificationTypeName }) => ({
          value: notificationTypeId,
          label: notificationTypeName,
        }));
      }

      return [];
    }),
    initialData: [],
    enabled: isEnabled && list?.includes('notification-types'),
  });

  const notificationConditions = useQuery<Common.Option[]>({
    queryKey: ['notification-conditions'],
    queryFn: () => getNotificationConditions().then((response) => {
      if (response.data) {
        return response.data.map(({ notificationConditionId, notificationConditionName }) => ({
          value: notificationConditionId,
          label: notificationConditionName,
        }));
      }

      return [];
    }),
    initialData: [],
    enabled: isEnabled && list?.includes('notification-conditions'),
  });

  return {
    statuses,
    dealers,
    juridicalTypes,
    companyGroups,
    positions,
    contactTypes,
    addressTypes,
    macroRegions,
    regions,
    officesStatuses,
    employeeActivities,
    autoOperationsTypes,
    notificationTypes,
    notificationConditions,
  };
};

export default useDictionaries;
