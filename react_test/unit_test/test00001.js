(function () {
  let bigObj = {};
  for ( let i = 1; i <= 36; ++i ) {
    for ( let j = 1; j < 36; ++j ) {
      for ( let k = 1; k <= 36; ++k ) {
        if ( i * j * k === 36 ) {
          if ( bigObj[ i + j + k ] ) {
            let arr = bigObj[ i + j + k ];
            let flag = true;
            for ( let l = 0; l < arr.length; ++l ) {
              let inner_arr = arr[ i ];
              if ( arr[ l ].includes(i) || arr[ l ].includes(j) || arr[ l ].includes(k) ) {
                flag = false;
                break;
              }
            }
            if ( flag ) {
              bigObj[ i + j + k ].push([ i, j, k ].sort((left, right) => (right - left)));
            }
          } else {
            bigObj[ i + j + k ] = [];
            bigObj[ i + j + k ].push([ i, j, k ].sort((left, right) => (right - left)));
          }
        }
      }
    }
  }
  console.log(bigObj);
  Object.keys(bigObj).filter(key => bigObj[ key ].length > 1).forEach(key => {
    let result = bigObj[ key ].map(item => item.join(',')).filter((item, index) => /\d+,(\d+),\1/.test(item));
    console.log(result);
  });
})();