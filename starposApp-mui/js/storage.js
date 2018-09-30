//	localStorage 
function localSave(key, val) {																//保存
    window.localStorage.setItem(key, JSON.stringify(val))
};
function localFetch(key) {																	//抓取
    return JSON.parse(window.localStorage.getItem(key) || '[]')
};
function localRemove(key) {																	//删除
    window.localStorage.removeItem(key)
};
function localClear() {																		//清空
    window.localStorage.clear()
};

//	sessionStorage 临时会话保存
function sessionSave(key, val) {														//保存
    window.sessionStorage.setItem(key, JSON.stringify(val))
};
function sessionFetch(key) {															//抓取
    return JSON.parse(window.sessionStorage.getItem(key) || '[]')
};
function sessionRemove(key) {															//删除
    window.sessionStorage.removeItem(key)
};
function sessionClear() {																//清空
    window.sessionStorage.clear()
};