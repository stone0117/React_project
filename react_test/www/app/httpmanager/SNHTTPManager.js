export async function requestWithGET(urlString) {

  try {
    return await fetch(urlString).then(response => response.json());
  } catch ( err ) {
    throw new Error(err);
  }
  // return await fetch(urlString).then(response => response.json()).catch(err => { throw new Error(err); });
}

export function getArray(result) {

  if ( Object.prototype.toString.call(result) === '[object Object]' ) {
    let item = result;
    return Object.keys(item).map(key => {
      return { value: key, label: key, children: getArray(item[ key ]) };
    });
  }
  if ( result instanceof Array ) {
    if ( Object.prototype.toString.call(result[ 0 ]) === '[object Object]' ) {
      return result.map((item) => {
        return { value: Object.keys(item)[ 0 ], label: Object.keys(item)[ 0 ], children: getArray(item[ Object.keys(item)[ 0 ] ]) };
      });
    } else {
      return result.map(item => {
        return { value: item, label: item };
      });
    }
  }
}


export async function requestWithPOST(urlString, parameter) {

  try {
    return fetch(urlString, {
      method : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body   : JSON.stringify(parameter),
    }).then(data => data.json());
  } catch ( err ) {
    throw new Error(err);
  }

}

export const baseUrl = 'http://localhost:3000';