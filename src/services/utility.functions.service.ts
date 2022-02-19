import * as moment from 'moment';

export default class UtilityFunctionsService {
	static myInstance:any = null;

	static getInstance() {
		if (this.myInstance === null) {
		  this.myInstance = new this();
		}
		return this.myInstance;
	  }

    // constructor() {}
  

  public uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  public formatDate(date: string) {
    if (!date) { return ''; }
    if (date.indexOf('T') > -1) {
      // date time
      // Remove 'Z' so the function doesn't think the dates are GMT
      return moment.default(date.replace('Z', '')).format('L') + ' ' + moment.default(date.replace('Z', '')).format('LT');
    } else {
      return moment.default(date).format('L');
    }
  }



}