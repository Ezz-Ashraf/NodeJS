const mongoose=require('mongoose');
const Schema =mongoose.Schema;

const postSchema= new Schema ({
	title:{
		type : String,
		required : true
	},
	content:{
		type  :String,
		required:true
	}
	,creator : {
		type: Object,
		required:true
	},
	imageURL:{
		type:String,
		required:true
	}
},{timestamps:true});
module.exports = mongoose.model('Post',postSchema);
