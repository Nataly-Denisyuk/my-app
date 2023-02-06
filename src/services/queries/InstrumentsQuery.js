import PropTypes from 'prop-types'

const instrumentsQueryPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
)

class InstrumentsQuery {
  constructor(filter){
    this.params = { filter }
  }
  get url() { return "instruments" }
}

export default InstrumentsQuery
export { instrumentsQueryPropTypes }