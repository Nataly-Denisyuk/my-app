// statuses
import StatusesQuery from '../queries/StatusesQuery'
import statusesQueryData from '../queries/fakedata/statusesQueryData.json' 

// instruments
import InstrumentsQuery from '../queries/InstrumentsQuery'
import instrumentsQueryData from '../queries/fakedata/instrumentsQueryData' 


export default class FakeQueriesApi {
  /**
   * Calls query API.   
   * @param {*} query query action and parameters 
   */
  execute(query) {
    console.log('FakeQueriesApi: ' + query.url, query.params);
    // statuses (static json)
    if (query instanceof StatusesQuery) return this._getWithTimeout( statusesQueryData ) 

    // instruments (func)
    if (query instanceof InstrumentsQuery) return this._getWithTimeout( () => instrumentsQueryData(query.params.filter) ) 


    return new Promise((_, reject) => { reject(new Error(`${query.url} is not supported by FakeQueriesApi`)) })
  }

  /**
   * Returns static data after timeout
   * @param {any} result func or object
   * @param {number} timeout 
   */
  _getWithTimeout(resultFuncOrObj, timeout = 500) {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        try {
          clearTimeout(timeoutId)          
          let result = typeof resultFuncOrObj === 'function' ? resultFuncOrObj() : resultFuncOrObj
          console.log('FakeQueriesApi: Result: ', result)        
          resolve(result)          
        } catch (e) {
          reject(e)
        }
      }, timeout)
    })
  }
}
