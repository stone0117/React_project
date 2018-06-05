import { baseUrl } from '../../httpmanager/SNHTTPManager';
export const fetchServer = function*(filters, pageinfo, sortinfo) {


  //发出ajax请求
  const { count, results } = yield fetch(baseUrl + "/cars", {
    "method" : "POST",
    "headers": {
      "Content-Type": "application/json",
    },
    "body"   : JSON.stringify({ filters, pageinfo, sortinfo }),
  }).then(data => data.json());

  return { count, results };
};