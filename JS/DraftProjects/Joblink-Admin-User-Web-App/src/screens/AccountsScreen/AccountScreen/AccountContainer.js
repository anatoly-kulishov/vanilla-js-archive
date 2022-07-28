import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Account from "./Account";
import {getUserById} from "../../../store/actions/usersActions";

const mapStateToProps = (state) => ({
    selectedAccount: state.users.selectedAccount,
    isLoading: state.users.loading
})

const AccountContainer = connect(mapStateToProps, {getUserById})(withRouter(Account));

export default AccountContainer;