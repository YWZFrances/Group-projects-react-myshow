

let Tools = {
	getUserID:function(){
		let id = window.sessionStorage.getItem("userID")||window.localStorage.getItem("userID");
		if(!id){
			window.location.hash = "#/login"
		}
		return id
	},
	setUserID:function(key,value){
		localStorage.setItem(key,value)
	}
}
export  {Tools}
