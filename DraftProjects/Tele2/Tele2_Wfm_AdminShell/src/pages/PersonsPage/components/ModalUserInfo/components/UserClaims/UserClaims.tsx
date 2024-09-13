import {
  FC, useEffect, useMemo, useState,
} from 'react';
import {
  Form,
  Table,
  Row,
  Col,
  Button,
  Input,
  FormInstance,
  TablePaginationConfig,
} from 'antd';
import cn from '@t2crm/wfm-utils/lib/utils/cn';
import { useQuery } from 'react-query';
import type ResponseAuth from 'types/response/auth';
import { tablePaginationConfig } from 'constants/tableConstants';
import { getUserClaims } from 'utils/api/auth';
import useColumns from './hooks/useColumns';
import useClaimMutations from './hooks/useClaimMutations';
import './styles.less';

const { Item, useWatch } = Form;

const className = cn('user-claims');

type Props = {
  form: FormInstance;
  userId: number | undefined;
  visible: boolean;
};

const filterClaims = (data: ResponseAuth.IndividualClaim[]) => {
  const checkSet = new Set<string>();
  const resultData: ResponseAuth.IndividualClaim[] = [];
  data?.forEach((item) => {
    const uniqClaimStr = `${item.type}-${item.value}`;
    if (!checkSet.has(uniqClaimStr)) {
      checkSet.add(uniqClaimStr);
      resultData.push(item);
    }
  });
  return resultData;
};

const UserClaims: FC<Props> = ({ form, userId, visible }) => {
  const typeField = useWatch('type', form);
  const valueField = useWatch('value', form);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, []);

  const { createClaimMutation, deleteClaimMutation } = useClaimMutations();

  const onDeleteClaim = (claim: ResponseAuth.IndividualClaim) => {
    if (userId) {
      deleteClaimMutation.mutateAsync({ userId, claim });
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [visible]);

  const pagination: TablePaginationConfig = {
    ...tablePaginationConfig,
    current: currentPage,
    onChange: (page: number) => setCurrentPage(page),
  };

  const columns = useColumns({ onDeleteClaim });

  const disabledAddButton = useMemo(() => (!typeField || !valueField),
    [typeField, valueField]);

  const {
    isFetching,
    data: userClaims,
  } = useQuery({
    queryKey: ['user-claims', userId],
    queryFn: () => getUserClaims(userId as number)
      .then(({ data }) => filterClaims(data) || []),
    enabled: !!userId,
  });

  const onFinish = () => {
    if (userId) {
      const claim = {
        type: typeField,
        value: valueField,
      };
      createClaimMutation.mutateAsync({ userId, claim }).then(() => form.resetFields());
    }
  };

  return (
    <div className={className()}>
      <Table
        columns={columns}
        dataSource={userClaims}
        loading={isFetching}
        rowKey={({ type, value }) => `${type}${value}`}
        pagination={pagination}
        className={className('table')}
      />
      <Form
        form={form}
        onFinish={onFinish}
      >
        <Row gutter={12}>
          <Col span={8}>
            <Item name="type" label="">
              <Input />
            </Item>
          </Col>
          <Col span={12}>
            <Item name="value" label="">
              <Input />
            </Item>
          </Col>
          <Col span={4}>
            <Item label="">
              <Button
                type="primary"
                htmlType="submit"
                disabled={disabledAddButton}
                className={className('add-button')}
              >
                Добавить
              </Button>
            </Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default UserClaims;
