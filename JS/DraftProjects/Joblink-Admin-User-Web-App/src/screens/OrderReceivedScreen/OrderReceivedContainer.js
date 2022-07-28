import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import NewOrderReceived from "./OrderReceived";
import {
    cancelOneJobOffer,
    cancelOrderByEvent,
    createJobOffer,
    resetSelectedOrder,
    getOneJobEvent,
    showOrderLoader,
    submitJobLogFinal
} from "../../store/actions/ordersActions";
import {getAllPotentialEmployees} from "../../store/actions/employeesActions";
import {getOneJobRoleById} from "../../store/actions/jobRolesActions";

const mapStateToProps = (state) => ({
    fetchedOrders: state.orders.fetchedOrders,
    fetchedTasks: state.tasks.fetchedTasks,
    order: state.orders.selectedOrder,
    isLoading: state.orders.loading,
    employees: state.employees.fetchedEmployees,
})

const OrderReceivedContainer = connect(mapStateToProps, {
    getOneJobEvent,
    resetSelectedOrder,
    createJobOffer,
    showOrderLoader,
    cancelOrder: cancelOrderByEvent,
    cancelOffer: cancelOneJobOffer,
    fetchEmployees: getAllPotentialEmployees,
    submitJobLogFinal,
    getOneJobRoleById
})(withRouter(NewOrderReceived));

export default OrderReceivedContainer;
