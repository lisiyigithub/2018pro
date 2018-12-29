import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

var state = {
	count:0,
	name:''
}

var mutations = {
	add(a){
		a.count++;
	},
	jian(a){
		a.count--;
	},
	shuju(a,b){
		a.name = b
	}
}

var getters = {}
var actions = {
	add:({commit})=>commit('add'),
	jian:({commit})=>commit('jian'),
	shuju:({commit})=>commit('shuju')
}
export default new Vuex.Store({
	state,
	mutations,
	getters,
	actions
})

/*var store = new Vuex.Store({
	state:{
		count:0
	},
	mutations:{
		add(a){
			a.count++;
		},
		jian(a){
			a.count--;
		}
	}
})
export default store;*/
