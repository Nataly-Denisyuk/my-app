class ApiUtils {
  /**
   * Extracts non null keys from model
   * @param {any} model 
   */
  static extractNotNull(model) {
    if (!model) return model;
    let result = {};
    Object.keys(model).forEach(key => { if (model[key]) result[key] = model[key] });
    return result;
  }

  /**
   * Builds query string from model
   * @param {object} model - model to transmitt
   */
  static buildQuery(model) {
    if (model === null)
      return '';

    let queryString = '';
    for (var key in model) {
      // do not transmit nulls
      if (model[key] === null || model[key] === undefined)
        continue;

      // array specified logic
      if (Array.isArray(model[key])) {
        const v = model[key].reduce((p, c) => p == null ? `${c}` : `${p},${c}`)
        queryString += `${key}=${v}&`;
        // const arr = model[key];
        // for (var i = 0; i < arr.length; i++) {
        //   queryString += `${key}=${arr[i]}&`;
        // }
      }
      else
        queryString += `${key}=${model[key]}&`;
    }
    return queryString;
  }
}

export default ApiUtils;