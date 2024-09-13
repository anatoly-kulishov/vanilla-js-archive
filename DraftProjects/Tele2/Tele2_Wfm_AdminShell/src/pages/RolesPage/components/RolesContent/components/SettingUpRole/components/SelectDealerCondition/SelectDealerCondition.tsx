import {FC, Suspense, lazy, useState, useMemo} from "react";
import { useQuery } from "react-query";
import { Button } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import { debounce } from "lodash";
import cn from "@t2crm/wfm-utils/lib/utils/cn";

import { getDealers } from "utils/api/partners";

import { ActionPayloadRoleConditions } from "../../helpers";
import "../ConditionsGroup/styles.less";

const LazyLoadSelect = lazy(
  // @ts-ignore
  () => import("tele2_wfm_uilibraryapp/components/LazyLoadSelect")
);

const className = cn("partner-conditions");

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

const SelectDealerCondition: FC<Props> = ({
  idx,
  condition,
  parameterTypeName,
  changeCondition,
  removeCondition,
}) => {
  const [searchValue, setSearchValue] = useState<string | null>(null);

  const { data: options, isFetching } = useQuery({
    queryKey: ["dealers", searchValue],
    queryFn: async () => {
      const { data } = await getDealers({
        name: searchValue,
      });

      return (
        data?.map(({ id, fullName }) => {
          return { value: id, label: `${id}, ${fullName}` };
        }) || []
      );
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

  const currentValue = options?.find(el => String(el.value) === String(condition.value))

  return (
    <div className={className("condition-list__row")}>
      <Suspense fallback={null}>
        <LazyLoadSelect
          className={className("condition-list__row__select")}
          placeholder="Выберите значение"
          defaultValue={currentValue?.label || undefined}
          value={currentValue?.label || undefined}
          loading={isFetching}
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

export default SelectDealerCondition;
