import {connect} from "react-redux";
import Login from "./Login";
import {signIn} from "../../store/actions/authActions";

const mapStateToProps = state => ({
    alert: state.app.alert,
    disable: state.app.disable,
    isAuth: state.login.isAuth
})


const LoginContainer = connect(mapStateToProps, {signIn})(Login);

export default LoginContainer;