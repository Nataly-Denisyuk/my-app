import ApiUtils from '../utils/ApiUtils'

export default class ApiService {
  constructor(apiUrl/*, authService*/) {
    this._apiUrl = apiUrl
    //this._authService = authService
  }

  /**
  * Returns Api url
  */
  get apiUrl() {
    return this._apiUrl;
  }  

  /**
   * Fetches data from remote API service.
   * @param {string} relativeUrl url (API method)
   */
   fetchData(relativeUrl, params) {
    let headers = new Headers();
    // if (this._authService.isAuthenticated){
    //   const authHeadersToAdd = this._authService.headers
    //   for ( let header in authHeadersToAdd) {
    //     headers.append(header, authHeadersToAdd[header])
    //   }
    // }
    var init = {
      method: 'GET',
      accept: 'application/json',
      headers: headers
    }
    return this._fetch(relativeUrl, init, params); 
  }    

  _fetch(relativeUrl, init, params){
    return new Promise((resolve, reject) => {
      let resp = fetch(this.getFullUrl(relativeUrl, params), init);      
      resp.then( r => {                  
        if (r.status === 200)
          resp.then(r => r.json())
              .then(data => resolve( data ))
              .catch(e => reject(new Error(`Wrong reposponse format: ${e.message}`)));
        else
          reject(new Error('Прототип. Status != 200 считаем ошибкой'))

        // if (r.status === 500 || r.status === 400 ){
        //   resp.then(r => r.json()).then(data => reject ( new ApiError(data) ))
        // }        
        // else if (r.status === 204) {// successful command no content
        //   resolve( );
        // }
        // else if (r.status === 200)
        //   resp.then(r => isBlob ? r.blob() : r.json()).then(data => resolve ( data )).catch(e => reject( this._makeGlobalError(new Error(`Wrong reposponse format: ${e.message}`)) ))
        // else if (r.status === 401) {
        //   this._logoutAndRedirectToRoot()
        //   //reject( new UnauthorizedError( this._makeGlobalError(new Error("Пользователь не авторизован")) ) )
        // }
        // else if (r.status === 403) 
        //   reject( new ForbiddenError( this._makeGlobalError(new Error("Доступ запрещён")) ) )
        // else if (r.status === 404) 
        //   reject( new NotFoundError( this._makeGlobalError(new Error(`Метод API не найден [${relativeUrl}]`)) ) )
        // else reject( new ApiError( this._makeGlobalError(new Error(`Not Expected Response (${r.status})`)) ))
      })                        
      .catch(e => {
        reject( e /*new FetchFailedError(this._makeGlobalError({ message: 'Сервер недоступен'}))*/ )
      })
    }); 
  }  

  /**
  * Returns full url (apiUrl + relativeUrl + params )
  */
  getFullUrl(relativeUrl, params = null) {
    let url = this._apiUrl.concat(relativeUrl);    
    if (params !== null) {
      const queryString = ApiUtils.buildQuery(params);
      if (queryString !== null && queryString.trim().length > 0)
        url += `?${queryString}`;
    }
    return url;
  }   
}