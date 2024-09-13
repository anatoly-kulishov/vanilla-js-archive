import { AccountInfo } from '@/entities';

export interface SortedAccounts {
  ACTIVE: AccountInfo[];
  BLOCKED: AccountInfo[];
  CLOSED: AccountInfo[];
  REQUEST: AccountInfo[];
}
