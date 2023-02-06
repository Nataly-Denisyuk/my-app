import PropTypes from 'prop-types'
import ApiContext from '../contexts/ApiContext'

const withApi = (WrappedComponent) => (props) => 
  (
    <ApiContext.Consumer>
      { value => <WrappedComponent api={value} {...props} />}
    </ApiContext.Consumer>
  )  

const apiPropTypes = PropTypes.shape({
  api: PropTypes.shape( {
    query: PropTypes.shape({
      execute: PropTypes.func.isRequired,
    }).isRequired,
    command: PropTypes.shape({
      execute: PropTypes.func.isRequired
    }).isRequired
  })  
}).isRequired

export default withApi
export { apiPropTypes }