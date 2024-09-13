import {
  FC,
  useState,
  useMemo,
  lazy,
  Suspense,
  useEffect,
} from 'react';
import {
  Card,
  Table,
  Spin,
} from 'antd';
import { useInfiniteQuery } from 'react-query';

import useCheckRoles from '@t2crm/wfm-utils/lib/hooks/useCheckRoles';

import type Common from '@t2crm/wfm-utils/lib/types/common';
import type ResponsePerson from 'types/response/persons';
import Roles from 'enums/roles';
import cn from '@t2crm/wfm-utils/lib/utils/cn';

import { getPersons } from 'utils/api/persons';
import LoadPersons from './components/LoadPersons';
import EmptyScreen from './components/EmptyScreen';
import Filters from './components/Filters';
import ModalUserInfo from './components/ModalUserInfo';

import './styles.less';
import useColumns from './hooks/useColumns';

// @ts-ignore
const ScrollBlock = lazy(() => import('tele2_wfm_uilibraryapp/components/ScrollBlock'));

const className = cn('employees-page');

const pageSize = 20;

const EmployeesPage: FC = () => {
  const [activeFilters, setActiveFilters] = useState<Common.KeyValue | undefined>(undefined);
  const [activePerson, setActivePerson] = useState<ResponsePerson.Person | undefined>(undefined);
  const [isLoadAllPersons, setIsLoadAllPersons] = useState<boolean>(false);

  const isMigrationUsersDownload = useCheckRoles(Roles.MigrationUsersDownload);
  const isAuthWrite = useCheckRoles(Roles.AuthWrite);

  const columns = useColumns({ setActivePerson });

  useEffect(() => {
    setIsLoadAllPersons(false);
  }, [activeFilters]);

  const {
    data: personPages,
    isFetching: isFetchingPersons,
    fetchNextPage,
  } = useInfiniteQuery<ResponsePerson.Person[]>({
    queryKey: ['persons', activeFilters],
    queryFn: ({ pageParam = 0 }) => (
      getPersons({
        ...activeFilters,
        PageIndex: pageParam + 1,
        PageSize: pageSize,
      }).then((response) => {
        setIsLoadAllPersons(false);

        if (!response?.data || !response.data.length) {
          setIsLoadAllPersons(true);
          return [];
        }

        if (response.data.length < pageSize) {
          setIsLoadAllPersons(true);
        }

        return response.data;
      })
    ),
    enabled: !isLoadAllPersons && !!activeFilters,
    getNextPageParam: (lastPage, pages) => pages.length,
  });

  const persons = useMemo(() => (
    personPages?.pages?.reduce<ResponsePerson.Person[]>((list, page) => {
      page.forEach((item) => {
        list.push(item);
      });

      return list;
    }, []) ?? []
  ), [personPages]);

  return (
    <div className={className()}>
      <Filters updateActiveFilters={setActiveFilters} />
      <div className={className('content')}>
        <Card
          title="Пользователи"
          className={className('card')}
          extra={isMigrationUsersDownload ? <LoadPersons /> : <></>}
        >
          <Suspense fallback={<></>}>
            <ScrollBlock
              active={!isLoadAllPersons && !isFetchingPersons}
              onScrollToButtom={fetchNextPage}
              className={className('scroll-block')}
            >
              <Spin size="large" spinning={isFetchingPersons}>
                {!persons?.length ? (
                  <EmptyScreen />
                ) : (
                  <Table
                    columns={columns}
                    dataSource={persons}
                    className={className('table', { active: isAuthWrite })}
                    sticky
                    onRow={(record) => ({
                      onDoubleClick: () => setActivePerson(record),
                    })}
                    rowKey="personId"
                    pagination={false}
                  />
                )}
              </Spin>
            </ScrollBlock>
          </Suspense>
        </Card>
      </div>
      <ModalUserInfo
        person={activePerson}
        onCancel={() => setActivePerson(undefined)}
      />
    </div>
  );
};

export default EmployeesPage;
