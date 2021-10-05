
let timeRender = (d) =>{
	let date = new Date(d).toLocaleString();
	let modified = date.slice(0,-6) + " "+date.slice(-2);
	return modified;
}

const searchTableConfig ={
	options:{
		showEditButton:false
		,showDeleteButton:true
	}
	,columns:[
		{
			header:"Title"
			,data:"${!data.displayName ? 'Someone' : (data.displayName.length > 20 ? data.displayName.substring(0,20)+'...' : data.displayName) }"
			,type:"string"
			,width:"30%"
			,sortBy: 'displayName'
		},
		{
			header:"Description",
			data:"${!data.postText ? 'Post does not have text' : (data.postText.length > 35 ? data.postText.substring(0,35)+'...' : data.postText) }",
			type:"string",
			width:"30%",
			sortBy:'postText'
		},
		{
			header:"Date-Time"
			,data:"${timeRender(data.createdOn)}"
			,type:"date"
			,width:"25%"
			,sortBy: 'createdOn'
		},

	]

};