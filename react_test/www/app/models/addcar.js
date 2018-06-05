import * as R from "ramda";
import { fetchServer } from "./utils/server.js";
import { baseUrl } from '../httpmanager/SNHTTPManager';
import moment from 'moment';

export default {
  namespace: "addcar",
  state    : {
    step1: {
      brandandseries: { value: "", errors: [] },
      color         : { value: "", errors: [] },
      type          : { value: "", errors: [] },
      price         : { value: "", errors: [] },
      km            : { value: "", errors: [] },
      gearbox       : { value: "", errors: [] },
      displacement  : { value: "", errors: [] },
      fuel          : { value: "", errors: [] },
      buydate       : { value: "", errors: [] },
      licence       : { value: "", errors: [] },
      locality      : { value: "", errors: [] },
      environmental : { value: "", errors: [] },
    },
    step2: {
      view  : [],
      inner : [],
      engine: [],
      more  : [],
    },
    step3: {
      files: [
        // {
        //   filename: '新名字.doc',
        //   realpath: 'upload_4384d133fb71dac44b823d2bedd0a674.jpg',
        //   type:''
        // },
      ],
    },
  },
  reducers : {
    changeStep1(state, action){
      let newVar = R.set(R.lensProp("step1"), R.set(R.lensProp(action.propname), action.value, state.step1), state);
      console.log(newVar);
      return newVar;
    },

    changeErrorsStep1(state, action){

      let { values, errors } = action;

      // console.table(values);
      // console.dir(errors);

      let obj = {};

      for ( let key in state.step1 ) {
        if ( state.step1.hasOwnProperty(key) ) {

          if ( key === 'buydate' ) {

            obj[ key ] = {
              ...state.step1[ key ],
              value : values[ key ].valueOf(),
              errors: errors[ key ],
            };

          } else {
            obj[ key ] = {
              ...state.step1[ key ],
              value : values[ key ],
              errors: errors[ key ],
            };
          }

        }
      }

      let newVar = {
        ...state,
        step1: obj,
      };

      console.log('newVar = ', newVar);

      return newVar;
    },

    changeStep2(state, action){
      let { obj } = action;

      console.log("call reducers's changeStep2", obj);

      return R.set(R.lensProp("step2"), obj, state);
    },

    changeStep3(state, action){

      let { arr } = action;

      console.log("call reducers's changeStep3", arr);

      let map = arr.map((item, index) => ({ filename: item.changedfilename + "#" + item.realpath, realpath: item.realpath, type: item.type }));

      let newVar = R.set(R.lensProp("step3"), R.set(R.lensProp('files'), [ ...state.step3.files, ...map ], state.files), state);

      console.log(newVar);

      return newVar;
    },
    changeStep3Rename(state, action){

      let { filename, realpath } = action;

      console.log("call reducers's changeStep3Rename");

      let map = state.step3.files.map((item, index) => {
        if ( item.realpath === realpath ) {
          return { filename: filename + "#" + item.realpath, realpath: item.realpath, type: item.type };
        }
        return item;
      });

      let newVar = R.set(R.lensProp("step3"), R.set(R.lensProp('files'), map, state.files), state);

      console.log(newVar);

      return newVar;
    },
    changeStep3Delete(state, action){

      let { filename, realpath } = action;

      console.log("call reducers's changeStep3Delete");

      let filter = state.step3.files.filter((item, index) => {

        if ( item.realpath === realpath ) {
          return false;
        }
        return true;
      });

      let newVar = R.set(R.lensProp("step3"), R.set(R.lensProp('files'), filter, state.files), state);

      console.log(newVar);

      return newVar;
    },

    // addcar(state, action){
    //   console.log(state);
    //   return state;
    // },
  },
  effects  : {
    *addcar(action, { put, select }){

      const { step1, step2, step3 } = yield select(state => {

        console.log(state);
        console.log("■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■");
        console.log(state.addcar);

        return state.addcar;
      });

      yield fetch(baseUrl + "/addcar", {
        "method" : "POST",
        "headers": { "Content-Type": "application/json" },
        "body"   : JSON.stringify({ step1, step2, step3 }),
      });
    },
  },
};