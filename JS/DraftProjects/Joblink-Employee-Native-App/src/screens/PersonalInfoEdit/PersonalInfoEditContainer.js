import {connect} from "react-redux";
import PersonalInfoEdit from "./PersonalInfoEdit";

const mapStateToProps = (state) => ({
    profile: state.auth.profile
})

const PersonalInfoEditContainer = connect(mapStateToProps, {})(PersonalInfoEdit);

export default PersonalInfoEditContainer;
