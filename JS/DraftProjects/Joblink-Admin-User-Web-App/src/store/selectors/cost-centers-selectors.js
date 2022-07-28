/*********************** Simple Selectors ***********************/
export const getAllCostCenters = (state) => state.costCenters.fetchedCostCenters;
export const getCostCentersLoadingStatus = (state) => state.costCenters.isLoading;
