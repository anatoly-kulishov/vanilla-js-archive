import {connect} from "react-redux";
import Login from "./Login";
import {signIn} from "../../store/actions/authActions";

const mapStateToProps = (state) => ({
    validated: state.auth.validate
})

const LoginContainer = connect(mapStateToProps, {signIn})(Login);

export default LoginContainer;