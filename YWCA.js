if (Meteor.isClient) {
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

