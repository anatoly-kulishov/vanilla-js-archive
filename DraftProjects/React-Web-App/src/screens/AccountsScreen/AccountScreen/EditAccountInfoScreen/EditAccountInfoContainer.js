import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getUserById, updateUserById} from "../../../../store/actions/usersActions";
import EditAccountInfo from "./EditAccountInfo";

const mapStateToProps = (state) => ({
    selectedAccount: state.users.selectedAccount,
    isLoading: state.users.loading,
    response: state.users.response,
})

const EditAccountInfoContainer = connect(mapStateToProps, {getUserById, updateUserById})(withRouter(EditAccountInfo));

export default EditAccountInfoContainer;