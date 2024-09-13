import { FC, lazy, Suspense, useState } from "react";
import { useQuery } from "react-query";
import { Button } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import { debounce } from "lodash";
import cn from "@t2crm/wfm-utils/lib/utils/cn";

import { getPositions } from "utils/api/roles";

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

const SelectPositionCondition: FC<Props> = ({
  idx,
  condition,
  parameterTypeName,
  changeCondition,
  removeCondition,
}) => {
  const [searchValue, setSearchValue] = useState<string>();

  const { data: options, isFetching } = useQuery({
    queryKey: ["positions", searchValue],
    queryFn: async () => {
      const { data } = await getPositions({
        name: searchValue,
      });

      return (
        data?.map(({ id, name }) => {
          return { value: id, label: name };
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

  return (
    <div className={className("condition-list__row")}>
      <Suspense fallback={null}>
        <LazyLoadSelect
          className={className("condition-list__row__select")}
          placeholder="Выберите значение"
          defaultValue={condition.initialValue || undefined}
          value={condition.value || undefined}
          loading={isFetching}
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

export default SelectPositionCondition;
