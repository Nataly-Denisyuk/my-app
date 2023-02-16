import PropTypes from "prop-types";

const ordersQueryPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.number.isRequired,
    ordersNumber: PropTypes.string.isRequired,
  }).isRequired
);

class OrdersQuery {
  get url() {
    return "orders";
  }
}

export default OrdersQuery;
export { ordersQueryPropTypes };
