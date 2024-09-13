import { FC, lazy, Suspense, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { Button } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import { debounce } from "lodash";
import cn from "@t2crm/wfm-utils/lib/utils/cn";
import Common from "@t2crm/wfm-utils/lib/types/common";

import { getOffices } from "utils/api/offices";

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

const SelectSalesOfficeCondition: FC<Props> = ({
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
      queryKey: ["sales-offices", searchValue],
      queryFn: async ({ pageParam = 1 }) => {
        const { data } = await getOffices({
          pageIndex: pageParam,
          pageSize: PAGE_SIZE,
          officeId: searchValue,
        });

        return { data, pageParam };
      },
      onSuccess: ({ pages }) => {
        const options = pages.reduce((acc, curr) => {
          const pageOptions = curr.data.saleOffices.map(({ officeId }) => ({
            value: officeId,
            label: String(officeId),
          }));

          return [...acc, ...pageOptions];
        }, [] as Common.Option[]);

        setOptions(options);
      },
      getNextPageParam: ({ pageParam, data: { total } }, allPages) => {
        const currLength = allPages.reduce((acc, curr) => {
          return acc + curr.data.saleOffices.length;
        }, 0);

        if (currLength < total) {
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

  return (
    <div className={className("condition-list__row")}>
      <Suspense fallback={null}>
        <LazyLoadSelect
          className={className("condition-list__row__select")}
          placeholder="Выберите значение"
          defaultValue={condition.initialValue || undefined}
          value={condition.value || undefined}
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
        icon={<MinusCircleOutlined rev={undefined} />}
        onClick={onClickRemove}
      />
    </div>
  );
};

export default SelectSalesOfficeCondition;
