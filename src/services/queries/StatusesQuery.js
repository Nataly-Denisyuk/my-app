import PropTypes from 'prop-types'

const statusesQueryPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.number.isRequired,
    statusCode: PropTypes.string.isRequired,
    statusName: PropTypes.string.isRequired
  }).isRequired
)

class StatusesQuery {
  get url() { return "statuses" }
}

export default StatusesQuery
export { statusesQueryPropTypes }