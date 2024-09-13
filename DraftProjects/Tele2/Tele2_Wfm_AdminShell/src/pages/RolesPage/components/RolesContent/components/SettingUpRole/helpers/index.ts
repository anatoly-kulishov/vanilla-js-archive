import { useReducer } from "react";
import RolesResponse from "types/response/roles";

enum ActionTypes {
  INIT_CONDITIONS = "INIT_CONDITIONS",
  ADD_CONDITION = "ADD_CONDITION",
  CHANGE_CONDITION = "CHANGE_CONDITION",
  REMOVE_CONDITION = "REMOVE_CONDITION",
}

type State = {
  [key: string]: {
    parameterTypeId: number;
    parameterTypeName: string;
    values: {
      value: string | null;
      initialValue: string;
    }[];
  };
};

export declare namespace ActionPayloadRoleConditions {
  type InitCondition = RolesResponse.AssignmentCondition[];

  type AddCondition = {
    typeName: string;
  };

  type ChangeCondition = {
    typeName: string;
    value: string;
    idx: number;
  };

  type RemoveCondition = {
    typeName: string;
    idx: number;
  };
}

type Action = {
  type: ActionTypes;
  payload?: unknown;
};

const initialState: State = {};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.INIT_CONDITIONS: {
      const conditions =
        action.payload as ActionPayloadRoleConditions.InitCondition;
      return conditions.reduce((accConditions, currCondition) => {
        accConditions[currCondition.parameterTypeName] = {
          ...currCondition,
          values: currCondition.parameterValues?.map((conditionValue) => {
            return {
              initialValue: conditionValue,
              value: conditionValue,
            };
          }) || [],
        };
        return accConditions;
      }, {} as State);
    }

    case ActionTypes.ADD_CONDITION: {
      const { typeName } =
        action.payload as ActionPayloadRoleConditions.AddCondition;
      const values = state[typeName].values || []

      return {
        ...state,
        [typeName]: {
          ...state[typeName],
          values: [
            ...values,
            {
              initialValue: "",
              value: null,
            },
          ],
        },
      };
    }

    case ActionTypes.CHANGE_CONDITION: {
      const { typeName, value, idx } =
        action.payload as ActionPayloadRoleConditions.ChangeCondition;
      return {
        ...state,
        [typeName]: {
          ...state[typeName],
          values: state[typeName].values.map((currValue, currIdx) =>
            currIdx === idx
              ? {
                ...currValue,
                value,
              }
              : currValue
          ),
        },
      };
    }

    case ActionTypes.REMOVE_CONDITION: {
      const { typeName, idx } =
        action.payload as ActionPayloadRoleConditions.RemoveCondition;
      return {
        ...state,
        [typeName]: {
          ...state[typeName],
          values: state[typeName].values.map((currValue, currIdx) =>
            currIdx === idx
              ? {
                ...currValue,
                value: null,
              }
              : currValue
          )
        },
      };
    }

    default: {
      return state;
    }
  }
};

export const useRoleConditions = () => {
  const [conditions, dispatch] = useReducer(reducer, initialState);

  const initConditions = (
    payload: ActionPayloadRoleConditions.InitCondition
  ) => {
    dispatch({
      type: ActionTypes.INIT_CONDITIONS,
      payload,
    });
  };

  const addCondition = (payload: ActionPayloadRoleConditions.AddCondition) => {
    dispatch({
      type: ActionTypes.ADD_CONDITION,
      payload,
    });
  };

  const changeCondition = (
    payload: ActionPayloadRoleConditions.ChangeCondition
  ) => {
    dispatch({
      type: ActionTypes.CHANGE_CONDITION,
      payload,
    });
  };

  const removeCondition = (
    payload: ActionPayloadRoleConditions.RemoveCondition
  ) => {
    dispatch({
      type: ActionTypes.REMOVE_CONDITION,
      payload,
    });
  };

  return {
    conditions,
    initConditions,
    addCondition,
    changeCondition,
    removeCondition,
  };
};
