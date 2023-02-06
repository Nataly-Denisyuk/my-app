import ApiService from '../ApiService'

export default class CommandsApi extends ApiService {
  /**
   * Calls commands API
   * @param {*} command url and parameters
   */
  execute(command){
    return this.postData(`${command.url}`, 
                command.model);
  }
}