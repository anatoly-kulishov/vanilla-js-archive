import { BranchServes } from '@/widgets/mapControls/ui/MapControlsFilter/types';
import React from 'react';
import { DEFAULT_FILTER_BRANCH_SERVES } from '../const';
import { BranchServesTypes } from '../model';

export const createBranchServesProps = (
  filterBranchServes: BranchServesTypes,
  setFilterBranchServes: React.Dispatch<React.SetStateAction<BranchServesTypes>>,
): BranchServes[] =>
  DEFAULT_FILTER_BRANCH_SERVES.map(({ type, value }) => ({
    type,
    value,
    isSelected: type === filterBranchServes,
    onChange: setFilterBranchServes,
  }));
