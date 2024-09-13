import { ReactElement } from 'react';
import {
  FormItemProps, ModalFuncProps,
} from 'antd';
import { TableProps as AntdTableProps } from 'antd/lib/table';
import { FormLayout } from 'antd/lib/form/Form';
import Common from '@t2crm/wfm-utils/lib/types/common';

namespace AdminPanelNamespace {
  export enum FormItemTypes {
    Select = 'select',
    PartnerSelect = 'partnerSelect',
    Input = 'input',
    Checkbox = 'checkbox',
    Autocomplete = 'autocomplete',
    Switch = 'switch',
    TextArea = 'textArea',
    RangePicker = 'rangePicker',
  }
  export enum ModalState {
    Edit,
    Add,
    Close,
  }

  export type FormItem = {
    type: FormItemTypes,
    formItemProps: FormItemProps,
    controlProps?: Common.KeyValue,
  };

  export type FilterItems = FormItem[];
  export type ModalItems = FormItem[];
  export type ModalData<T = Record<string, any>> = {
    data?: null | T,
    state: ModalState,
  };

  export type CustomModalProps = {
    modalData: ModalData;
    onCancel: () => void,
  };

  export interface TableProps extends AntdTableProps<any> {
  }

  interface AdminTableProps extends TableProps {
    cardTitle: string;
    isShowToolbar?: boolean;
    useEditAction?: boolean;
    useDeleteAction?: boolean;
    onConfirmDelete?: (record: Common.KeyValue) => void;
  }

  export interface AdminPanelProps {
    filtersProps: {
      filterItems: FilterItems,
      filtersMap: Map<string, string>;
      filtersKey: string;
      updateActiveFilters: (filters: Common.KeyValue) => void;
    };
    tableProps: AdminTableProps,
    modalProps: {
      modalTitle?: string;
      modalItems?: ModalItems,
      formLayout?: FormLayout;
      onModalOk?: (modalData: any) => Promise<void>;
      CustomModal?: React.ElementType;
    };
  }

  export interface FilterItemProps extends FormItem {}

  export interface FilterProps {
    filterItems: FilterItems;
    updateActiveFilters: (filters: Common.KeyValue) => void;
    filtersMap: Map<string, string>;
    filtersKey: string;
  }

  export interface ModalProps extends ModalFuncProps {
    modalData: ModalData,
    modalItems: ModalItems,
    additionalInfo?: ReactElement | string,
    formLayout: FormLayout;
  }
}

export default AdminPanelNamespace;
