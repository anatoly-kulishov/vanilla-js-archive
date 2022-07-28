import {connect} from "react-redux";
import SkillsCertificates from "./Skills&Certificates";
import {getAllCertificateTypes} from "../../store/actions/certificatesActions";

const mapStateToProps = (state) => ({
    term: state.certificates.term,
    certificateType: state.certificates.certificateType,
    isLoading: state.certificates.isLoading
})

const SkillsCertificatesContainer = connect(mapStateToProps, {getAllCertificateTypes})(SkillsCertificates);

export default SkillsCertificatesContainer;