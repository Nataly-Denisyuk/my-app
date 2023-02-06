export default class FakeCommandApi  {  
    /**
     * Calls commands API
     * @param {*} command command action and parameters
     */
    execute(command){
      let timeout = 1000; 
      return new Promise((resolve, _reject)=>{
        const timeoutId = setTimeout(()=> {
          clearTimeout(timeoutId)
          console.log(`${command.url}:`, JSON.stringify(command.model) /*this._serializer.serialize(command.model)*/)
          resolve()
        }, timeout)
      })
    }
  }