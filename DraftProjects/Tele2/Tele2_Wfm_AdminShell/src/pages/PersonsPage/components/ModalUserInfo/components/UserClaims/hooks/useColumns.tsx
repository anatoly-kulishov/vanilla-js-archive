import { lazy } from 'react';
import { TableColumnsType } from 'antd';
import ResponseAuth from 'types/response/auth';

// @ts-ignore
const DeleteButton = lazy(() => import('tele2_wfm_uilibraryapp/components/DeleteButton'));

type UseColumnsProps = {
  onDeleteClaim: (claim: ResponseAuth.IndividualClaim) => void;
};

const stringCompare = (a: string, b: string) => (
  (a.toLocaleLowerCase() < b.toLocaleLowerCase()) ? -1 : 1
);

const useColumns = ({
  onDeleteClaim,
}: UseColumnsProps): TableColumnsType<ResponseAuth.IndividualClaim> => ([
  {
    title: 'Тип',
    dataIndex: 'type',
    key: 'type',
    sorter: (a, b) => stringCompare(a.type, b.type),
    width: '35%',
  },
  {
    title: 'Значение',
    dataIndex: 'value',
    key: 'value',
    sorter: (a, b) => stringCompare(a.value, b.value),
    width: '50%',
  },
  {
    title: '',
    dataIndex: 'operations',
    key: 'operations',
    render: (_, claim) => (
      <DeleteButton
        onDelete={() => onDeleteClaim(claim)}
      />
    ),
    width: '15%',
  },
]);

export default useColumns;
