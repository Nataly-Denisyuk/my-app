import ApiService from '../ApiService'

class QueriesApi extends ApiService  {
  
  /**
   * Calls query API.   
   * @param {*} query query action and parameters 
   */
  execute(query){
    return this.fetchData(`${query.url}`, query.params);
  }
}

export default QueriesApi;