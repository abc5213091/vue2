import * as types from './mutation-types'
import Vue from '../api'
let vm = new Vue()

export const login = ({ commit }, config) => {
	let opt = {
		method: 'PostUserLogin',
		version: '1.0',
		params: {
			userName: config.phone,
			password: config.password
		},
		cb: json =>{
			if(json.Result == '1'){
	    		commit(types.RECEIVE_USER, json.Data)
	    	}else{
	    		_.toast(json.Message)
	    	}
		}
	}
	vm.ajax(opt);
}