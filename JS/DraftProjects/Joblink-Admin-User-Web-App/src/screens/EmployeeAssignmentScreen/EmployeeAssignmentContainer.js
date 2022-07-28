import EmployeeAssignment from "./EmployeeAssignment";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {compose} from "redux";
import {sendOfferToEmployees, getAllPotentialEmployees} from "../../store/actions/employeesActions";

const mapStateToProps = (state) => ({
    potentialEmployees: state.employees.potentialEmployees,
    tasks: state.tasks.fetchedTasks,
    currentOrder: state.orders.selectedOrder,
    isLoading: state.employees.isLoading,
    costCenters: state.costCenters.fetchedCostCenters
})

const EmployeeAssignmentContainer = compose(
    withRouter,
    connect(mapStateToProps, {getAllPotentialEmployees, sendOfferToEmployees})
)(EmployeeAssignment);

export default EmployeeAssignmentContainer;
