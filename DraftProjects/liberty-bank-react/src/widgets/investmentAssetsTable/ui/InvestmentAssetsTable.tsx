import { Table, TableData } from '@/shared/ui/table/table';

interface Props {
  tableData: TableData;
}

export function InvestmentAssetsTable(props: Props) {
  return <Table {...props.tableData} />;
}
