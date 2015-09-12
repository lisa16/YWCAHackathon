Posts = new Mongo.Collection("posts");

if (Meteor.isClient)
{

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

Router.route('/', function ()
{
	this.render('home');
});

Router.route('/post1');

Router.route('/post2');

// given a url like "/post/5"
Router.route('/post/:_id', function ()
{
	var params = this.params; // { _id: "5" }
	var id = params._id; // "5"
	console.log(id);
});

Router.route('/newpost/:_id/:_question/:_answer/:_picture', function ()
{
	var params = this.params; // { _id: "5" }
	var id = params._id; // "5"
	var question = params._question;
	var pictureBase64 = params._picture;
	var answer = params._answer;
	Posts.insert({
		id: id,
		question: question,
		picture: pictureBase64,
		answer: answer
	});
});