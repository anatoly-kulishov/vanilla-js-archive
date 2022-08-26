import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import EditCompany from "./EditCompanyInfo";
import {updateOneCompany} from "../../../store/actions/accountsActions";

const mapStateToProps = (state) => ({
    alert: state.app.alert,
    account: state.accounts.selectedAccount,
    loading: state.accounts.loading,
})

const EditCompanyInfoContainer = connect(mapStateToProps, {updateOneCompany})(withRouter(EditCompany));

export default EditCompanyInfoContainer;