import classNames from 'classnames';
import { Icon, Text, getTestIdAttribute } from '@/shared';
import { BANK_DELIVERY_STEP_PAGE_TEXT, Position } from '../../../../../../model';
import { getDistanceFromLatLon } from '../../../../../../lib';
import styles from './BankBranchItem.module.scss';

interface Props {
  officeID: string;
  officeNumber: string;
  isClosed: boolean;
  city: string;
  street: string;
  buildingNumber: string;
  branchPosition: Position;
  userPosition: Position | null;
  isSelected: boolean;
  onBranchSelect: (officeID: string) => void;
  testId?: string;
}

export const BankBranchItem = ({
  officeID,
  officeNumber,
  isClosed,
  city,
  street,
  buildingNumber,
  branchPosition,
  userPosition,
  isSelected,
  onBranchSelect,
  testId,
}: Props) => {
  const itemTestId = getTestIdAttribute('branch-item', testId);
  const bankIconTestId = getTestIdAttribute('bank-icon', testId);
  const branchNumberTestId = getTestIdAttribute('branch-number', testId);
  const branchStatusTestId = getTestIdAttribute('branch-status', testId);
  const branchAddressTestId = getTestIdAttribute('branch-address', testId);
  const branchDistanceTestId = getTestIdAttribute('branch-distance', testId);

  const handleBankBranchClick = () => {
    onBranchSelect(officeID);
  };

  return (
    <li
      className={classNames(styles.itemWrapper, { [styles.selectedItem]: isSelected })}
      onClick={handleBankBranchClick}
      {...itemTestId}
    >
      <div className={styles.row}>
        <div className={styles.bankBranch}>
          <Icon icon={'bank'} {...bankIconTestId} />
          <Text tag='p' weight='medium' size='s' {...branchNumberTestId}>
            {`${BANK_DELIVERY_STEP_PAGE_TEXT.BANK_BRANCH_NUMBER}${officeNumber}`}
          </Text>
        </div>
        <Text tag='p' weight='medium' size='s' {...branchStatusTestId}>
          {/* TODO: Пока не принято решение показываем ли только открытые, поправить исходя из решения */}
          {isClosed
            ? BANK_DELIVERY_STEP_PAGE_TEXT.BANK_BRANCHES_CLOSED
            : BANK_DELIVERY_STEP_PAGE_TEXT.BANK_BRANCHES_OPEN}
        </Text>
      </div>
      <div className={styles.row}>
        <Text tag='p' weight='regular' size='s' className={styles.caption} {...branchAddressTestId}>
          {`${city}, ${street}, ${buildingNumber}`}
        </Text>
        {userPosition && (
          <Text
            tag='p'
            weight='regular'
            size='s'
            className={styles.caption}
            {...branchDistanceTestId}
          >
            {getDistanceFromLatLon(
              userPosition.lat,
              userPosition.lon,
              branchPosition.lat,
              branchPosition.lon,
            )}
          </Text>
        )}
      </div>
    </li>
  );
};
