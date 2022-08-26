import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import CompanyDetails from "./CompanyDetails";
import {getOneCompany} from "../../../store/actions/accountsActions";

const mapStateToProps = (state) => ({
    costCenters: state.costCenters.fetchedCostCenters,
    account: state.accounts.selectedAccount
})

const CompanyDetailsContainer = connect(mapStateToProps, {getOneCompany})(withRouter(CompanyDetails));

export default CompanyDetailsContainer;