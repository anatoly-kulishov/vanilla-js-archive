import {FC, lazy, Suspense, useMemo, useState} from "react";
import { useInfiniteQuery } from "react-query";
import { Button } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import { debounce } from "lodash";
import cn from "@t2crm/wfm-utils/lib/utils/cn";
import Common from "@t2crm/wfm-utils/lib/types/common";

import { getPartners } from "utils/api/partners";

import { ActionPayloadRoleConditions } from "../../helpers";
import "../ConditionsGroup/styles.less";

const LazyLoadSelect = lazy(
  // @ts-ignore
  () => import("tele2_wfm_uilibraryapp/components/LazyLoadSelect")
);

const className = cn("partner-conditions");

const PAGE_SIZE = 20;

type Props = {
  idx: number;
  condition: {
    value: string | null;
    initialValue: string;
  };
  parameterTypeName: string;
  changeCondition: (
    payload: ActionPayloadRoleConditions.ChangeCondition
  ) => void;
  removeCondition: (
    payload: ActionPayloadRoleConditions.RemoveCondition
  ) => void;
};

const SelectPartnerCondition: FC<Props> = ({
  idx,
  condition,
  parameterTypeName,
  changeCondition,
  removeCondition,
}) => {
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [options, setOptions] = useState<Common.Option[]>([]);

  const { fetchNextPage, isFetchingNextPage, isFetching, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["partners", searchValue],
      queryFn: async ({ pageParam = 1 }) => {
        const { data } = await getPartners({
          pageIndex: pageParam,
          pageSize: PAGE_SIZE,
          search: searchValue,
        });

        return { data, pageParam };
      },
      onSuccess: ({ pages }) => {
        const options = pages.reduce((acc, curr) => {
          const pageOptions = curr.data.partners.map(({ id, fullName }) => ({
            value: id,
            label: `${id}, ${fullName}`,
          }));

          return [...acc, ...pageOptions];
        }, [] as Common.Option[]);

        setOptions(options);
      },
      getNextPageParam: ({ data, pageParam }) => {
        if (pageParam < data.totalPages) {
          return pageParam + 1;
        }
      },
    });

  const onSearch = debounce((value: string) => {
    setSearchValue(value);
  }, 300);

  const onSelect = (value: string) => {
    changeCondition({
      idx,
      value,
      typeName: parameterTypeName,
    });
  };

  const onClickRemove = () => {
    removeCondition({ typeName: parameterTypeName, idx });
  };

  const currentValue = options.find(el => String(el.value) === String(condition.value));

  return (
    <div className={className("condition-list__row")}>
      <Suspense fallback={null}>
        <LazyLoadSelect
          className={className("condition-list__row__select")}
          placeholder="Выберите значение"
          defaultValue={currentValue?.label || undefined}
          value={currentValue?.label || undefined}
          loading={isFetching}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          isAllLoaded={!hasNextPage}
          showSearch
          options={options}
          onSearch={onSearch}
          onSelect={onSelect}
        />
      </Suspense>
      <Button
        type="text"
        icon={<MinusCircleOutlined />}
        onClick={onClickRemove}
      />
    </div>
  );
};

export default SelectPartnerCondition;
