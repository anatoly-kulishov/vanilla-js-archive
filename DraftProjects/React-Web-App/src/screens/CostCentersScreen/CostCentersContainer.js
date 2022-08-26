import {connect} from "react-redux";
import CostCenters from "./CostCenters";
import {getAllCostCenters} from "../../store/actions/costCentersActions";

const mapStateToProps = (state) => ({
    term: state.costCenters.term,
    costCenters: state.costCenters.fetchedCostCenters,
    accounts: state.accounts.fetchedAccounts,
    isLoading: state.costCenters.loading,
})

const CostCentersContainer = connect(mapStateToProps, {getAllCostCenters})(CostCenters);

export default CostCentersContainer;