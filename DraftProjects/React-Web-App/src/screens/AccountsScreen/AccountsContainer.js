import {connect} from "react-redux";
import Accounts from "./Accounts";

const mapStateToProps = (state) => ({
    term: state.users.termUsers,
    users: state.users.fetchedUsers,
    accountsResponse: state.accounts.response,
    admins: state.users.fetchedAdmins,
    loading: state.users.loading,
    costCenters: state.costCenters.fetchedCostCenters,
})

const AccountsContainer = connect(mapStateToProps, null)(Accounts);

export default AccountsContainer;