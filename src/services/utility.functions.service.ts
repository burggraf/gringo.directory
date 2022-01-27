import * as moment from 'moment';

export default class UtilityFunctionsService {
	static myInstance:any = null;

	static getInstance() {
		if (this.myInstance == null) {
		  this.myInstance = new this();
		}
		return this.myInstance;
	  }

    // constructor() {}
  




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