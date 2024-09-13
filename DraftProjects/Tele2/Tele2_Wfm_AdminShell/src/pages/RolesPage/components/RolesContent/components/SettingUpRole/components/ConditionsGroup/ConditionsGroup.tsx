import { FC } from "react";
import { Button, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import cn from "@t2crm/wfm-utils/lib/utils/cn";

import { ROLE_CONDITIONS_NAME } from "constants/roleConditions";

import { ActionPayloadRoleConditions } from "../../helpers";
import SelectPartnerCondition from "../SelectPartnerCondition";
import SelectDealerCondition from "../SelectDealerCondition";
import SelectSalesOfficeCondition from "../SelectSalesOfficeCondition";
import SelectPositionCondition from "../SelectPositionCondition";
import "./styles.less";

const className = cn("partner-conditions");

type Props = {
  conditions: {
    parameterTypeId: number;
    parameterTypeName: string;
    values: {
      value: string | null;
      initialValue: string;
    }[];
  };
  addCondition: (payload: ActionPayloadRoleConditions.AddCondition) => void;
  changeCondition: (
    payload: ActionPayloadRoleConditions.ChangeCondition
  ) => void;
  removeCondition: (
    payload: ActionPayloadRoleConditions.RemoveCondition
  ) => void;
};

const ConditionsGroup: FC<Props> = ({
  conditions,
  addCondition,
  changeCondition,
  removeCondition,
}) => {
  const onClickAdd = () => {
    addCondition({ typeName: conditions.parameterTypeName });
  };

  return (
    <Row className={className()}>
      <Col span={4}>
        <span>{conditions.parameterTypeName}</span>
      </Col>
      <Col className={className("condition-list")} span={12}>
        {conditions.values?.map((condition, idx) => {
          const typeName = conditions?.parameterTypeName;
          const props = {
            idx,
            condition,
            parameterTypeName: typeName,
            changeCondition,
            removeCondition,
          };

          switch (typeName) {
            case ROLE_CONDITIONS_NAME.PARTNER: {
              return <SelectPartnerCondition {...props} />;
            }
            case ROLE_CONDITIONS_NAME.Dealer: {
              return <SelectDealerCondition {...props} />;
            }
            case ROLE_CONDITIONS_NAME.SalesOffice: {
              return <SelectSalesOfficeCondition {...props} />;
            }
            case ROLE_CONDITIONS_NAME.POSITION: {
              return <SelectPositionCondition {...props} />;
            }
          }
        })}
        <Button
          block
          type="dashed"
          icon={<PlusOutlined />}
          onClick={onClickAdd}
        >
          Добавить значение
        </Button>
      </Col>
    </Row>
  );
};

export default ConditionsGroup;
