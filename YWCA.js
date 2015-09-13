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
Router.route('/post/:_program', function ()
{
	var params = this.params; // { _id: "5" }
	var program = params._program;

	this.render('Post', {
		data: function ()
		{
			return Posts.findOne({program: program})
		}
	})
});

Router.route('/newpost/:_program/:_volunteer_id/:_question/:_answer/:_picture', function ()
{
	var params = this.params; // { _id: "5" }
	var post_id = Math.floor((Math.random() * 999999999));
	var program = params._program;
	var volunteer_id = params._volunteer_id; // "5"
	var question = params._question;
	var answer = params._answer;
	var pictureBase64 = params._picture;

	Posts.insert({
		post_id: post_id,
		program: program,
		volunteer_id: volunteer_id,
		question: question,
		answer: answer,
		picture: pictureBase64
	});

	console.log('new post_id: ' + post_id);
});