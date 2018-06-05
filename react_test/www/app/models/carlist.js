import * as R from "ramda";
import { requestWithPOST } from '../httpmanager/SNHTTPManager.js';
import { fetchServer } from "./utils/server.js";
export default {
  namespace: "carlist",
  state    : {
    filters : {
      brand        : '',
      series       : '',
      type         : [],
      color        : [],
      environmental: [],
      gearbox      : [],
      displacement : [],
      fuel         : [],
      // price        : [ 30, 70 ],
      // km           : [ 0, 100000 ],
      // buydate      : [ 1398891174000, 1498769574000 ],
      price        : [],
      km           : [],
      buydate      : [],
      licence      : "",
      locality     : "",
    },
    cars    : [],
    pageinfo: {
      page    : 1,
      pagesize: 3,
    },
    sortinfo: {
      sortby       : "id",
      sortdirection: 1		//1升序，-1倒序
    },
    count   : 0,
  },
  reducers : {
    //改变filter，会发来{propsname , value}，直接改变
    changeFilter_sync(state, { propsname, value }){
      return R.set(R.lensProp("filters"), R.set(R.lensProp(propsname), value, state.filters), state);
    },
    changePage_sync(state, { page = state.pageinfo.page }) {

      return R.set(R.lensProp("pageinfo"), R.set(R.lensProp("page"), page, state.pageinfo), state);
    },
    changePagesize_sync(state, { pagesize = state.pageinfo.pagesize }){
      return R.set(R.lensProp("pageinfo"), R.set(R.lensProp("pagesize"), pagesize, state.pageinfo), state);
    },
    changeSortby_sync(state, { sortby = state.sortinfo.sortby }) {
      return R.set(R.lensProp("sortinfo"), R.set(R.lensProp("sortby"), sortby, state.sortinfo), state);
    },
    changeSortdirection_sync(state, { sortdirection = state.sortinfo.sortdirection }) {
      return R.set(R.lensProp("sortinfo"), R.set(R.lensProp("sortdirection"), sortdirection, state.sortinfo), state);
    },
    changeCars(state, { cars }){
      return R.set(R.lensProp("cars"), cars, state);
    },
    changeCount(state, { count }) {
      return R.set(R.lensProp("count"), count, state);
    },
  },
  effects  : {
    //改变filter，会发来{propsname , value}，直接改变
    *changeFilter(action, { put, select, call }){

      let { propsname, value } = action;
      yield put({ "type": "changeFilter_sync", propsname, value });

      let { filters, pageinfo, sortinfo } = yield select(({ carlist }) => carlist);
      const { results, count }            = yield call(fetchServer, filters, pageinfo, sortinfo);

      yield put({ "type": "changeCars", "cars": results });
      yield put({ "type": "changeCount", "count": count });
      yield put({ "type": "changePage_sync", "page": 1 });
    },

    //用户改变分页或者排序
    *changePageOrSort(action, { put, select, call }) {

      changePage:{
        let { page, pagesize, sortby, sortdirection } = action;

        //得到现在的pagesize情况，看看用户是不是要更改pagesize
        let { pageinfo, sortinfo } = yield select(({ carlist }) => carlist);

        //根据用户传入的pagesize值和当前的值进行比较，如果用户更改了pagesize，此时就要将page变为1
        if ( pagesize ) {
          //如果pagesize存在
          page = pagesize !== pageinfo.pagesize ? 1 : page;
        }
        //根据用户传入的sortby值和当前的值进行比较，如果用户更改了sortby，此时就要将page变为1
        if ( sortby ) {
          page = sortby !== sortinfo.sortby ? 1 : page;
        }
        if ( sortdirection ) {
          page = sortdirection !== sortinfo.sortdirection ? 1 : page;
        }
        //调用同步，改变page和pagesize和sortby和sortdirection

        yield put({ "type": "changePage_sync", page });
        yield put({ "type": "changePagesize_sync", pagesize });
        yield put({ "type": "changeSortby_sync", sortby });
        yield put({ "type": "changeSortdirection_sync", sortdirection });

      }

      getPage:{
        //得到当前的过滤情况
        let { filters, pageinfo, sortinfo } = yield select(({ carlist }) => carlist);

        let { results, count } = yield call(fetchServer, filters, pageinfo, sortinfo);
        //改变
        yield put({ "type": "changeCars", "cars": results });
        yield put({ "type": "changeCount", "count": count });
      }

    },

    //初始化
    *init(action, { put, select, call }){

      let { filters, pageinfo, sortinfo } = yield select(({ carlist }) => carlist);
      const { results, count }            = yield call(fetchServer, filters, pageinfo, sortinfo);
      //改变
      yield put({ "type": "changeCars", "cars": results });
      yield put({ "type": "changeCount", "count": count });
    },
  },
};

