import {connect} from "react-redux";
import PasswordReset from "./PasswordReset";
import {resetPassword} from "../../store/actions/authActions";

// const mapStateToProps = (state) => ({})

const PasswordResetContainer = connect(null, {resetPassword})(PasswordReset);

export default PasswordResetContainer;