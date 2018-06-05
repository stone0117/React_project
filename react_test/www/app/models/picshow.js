import * as R from "ramda";

export default {
  namespace: "picshow",
  state    : {
    nowid   : 1000001,  //当前汽车编号
    nowalbum: "view",   //当前图集
    nowidx  : 0,        //初始下标
    carinfo : {},
    carlike : [],
  },
  reducers : {
    //====第一天========================================================
    //改变carinfo
    changeId(state, action){
      return R.set(R.lensProp("nowid"), action.nowid, state);
    },
    //改变album
    changeNowalbum(state, action){
      return R.set(R.lensProp("nowalbum"), action.nowalbum, state);
    },
    //改变nowidx
    changeNowidx(state, action){
      return R.set(R.lensProp("nowidx"), action.nowidx, state);
    },
    //============================================================
    //改变carinfo
    changeCarinfo(state, action){
      return R.set(R.lensProp("carinfo"), action.carinfo, state);
    },
    //改变carlike
    changeCarlike(state, action){
      return R.set(R.lensProp("carlike"), action.carlike, state);
    },
    // sn
    changeCarinfoCarlike(state, action){

      return R.compose(R.set(R.lensProp("carinfo"), action.carinfo), R.set(R.lensProp("carlike"), action.carlike))(state);

      // return {
      //   ...state,
      //   carinfo: action.carinfo,
      //   carlike: action.carlike,
      // };
    },
  },
  effects  : {
    //初始化
    *init(action, { put, call, select }){

      const promise1 = fetch("/carinfo/" + action.nowid).then(data => data.json());

      const promise2 = fetch("/carlike/" + action.nowid).then(data => data.json());

      const promises = [ promise1, promise2 ];

      let result_list = yield Promise.all(promises);

      //改变nowid，根据acation携带的载荷改变nowid

      yield put({ "type": "changeId", "nowid": action.nowid });

      //发出请求，请求汽车信息
      // const { result } = yield fetch("/carinfo/" + action.nowid).then(data => data.json());
      //改变carinfo
      // yield put({ "type": "changeCarinfo", "carinfo": result_list[ 0 ].result });
      //发出请求，请求相似车辆
      // const { results } = yield fetch("/carlike/" + action.nowid).then(data => data.json());
      //改变carlike
      // yield put({ "type": "changeCarlike", "carlike": result_list[ 1 ].results });

      yield put({ "type": "changeCarinfoCarlike", "carlike": result_list[ 1 ].results, "carinfo": result_list[ 0 ].result });

      //改变nowalbume
      yield put({ "type": "changeNowalbum", "nowalbum": "view" });
      //改变nowidx
      yield put({ "type": "changeNowidx", "nowidx": 0 });
    },
    //改变相册
    *changealbum(action, { put, call, select }){
      //改变相册
      yield put({ "type": "changeNowalbum", "nowalbum": action.nowalbum });
      //将序号归0
      yield put({ "type": "changeNowidx", "nowidx": 0 });
    },
    //下一张
    *goNext(action, { put, call, select }){
      //先得到idx
      const { nowidx }              = yield select(state => state.picshow);
      //得到nowalbum
      const { nowalbum }            = yield select(state => state.picshow);
      //得到images
      const { carinfo: { images } } = yield select(state => state.picshow);
      //判断是不是到这个图集的头了
      if ( nowidx < images[ nowalbum ].length - 1 ) {
        //没有到头，加1
        yield put({ "type": "changeNowidx", "nowidx": nowidx + 1 });
      } else {
        //图集顺序
        const albumarr = [ "view", "inner", "engine", "more" ];
        //现在的图集在数组中的位置
        let _now       = albumarr.indexOf(nowalbum);
        //让这个数字加1
        _now++;
        //改变相册
        yield put({ "type": "changeNowalbum", "nowalbum": albumarr[ _now % 4 ] });
        //将序号归0
        yield put({ "type": "changeNowidx", "nowidx": 0 });
      }
    },
    //上一张
    *goPrev(action, { put, call, select }){
      //先得到idx
      const { nowidx }              = yield select(state => state.picshow);
      //得到nowalbum
      const { nowalbum }            = yield select(state => state.picshow);
      //得到images
      const { carinfo: { images } } = yield select(state => state.picshow);
      //判断是不是到这个图集的头了
      if ( nowidx > 0 ) {

        //没有到头，加1
        yield put({ "type": "changeNowidx", "nowidx": nowidx - 1 });

      } else {
        //图集顺序
        const albumarr = [ "view", "inner", "engine", "more" ];

        //现在的图集在数组中的位置
        let _now = albumarr.indexOf(nowalbum);

        //让这个数字加1
        _now--;

        if ( _now === -1 ) { _now = 3; }

        //改变相册
        yield put({ "type": "changeNowalbum", "nowalbum": albumarr[ _now ] });
        //将序号归0
        yield put({ "type": "changeNowidx", "nowidx": images[ albumarr[ _now ] ].length - 1 });
      }
    },
  },
};