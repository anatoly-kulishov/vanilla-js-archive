import {connect} from "react-redux";
import Orders from "./Orders";
import {getAllJobEvents} from "../../store/actions/ordersActions";

const mapStateToProps = (state) => ({
    fetchedOrders: state.orders.fetchedOrders,
    loading: state.orders.loading
})

const OrdersContainer = connect(mapStateToProps, {fetchOrders: getAllJobEvents})(Orders);

export default OrdersContainer;