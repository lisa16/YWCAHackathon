Posts = new Mongo.Collection("posts");

if (Meteor.isClient)
{
	Template.uploadFileForm.events({
		'submit .new-post': function (event, template)
		{
			event.preventDefault();
			if (window.File && window.FileReader && window.FileList && window.Blob)
			{
				_.each(template.find('#files').files, function (file)
				{
					if (file.size > 1)
					{
						console.log("found file with size: " + file.size);
						var reader = new FileReader();
						reader.onload = function (e)
						{
							console.log("creating file: " + file.name);
							console.log("url: " + reader.result);

							var post_id = Math.floor((Math.random() * 999999999));
							var program = document.getElementById('program').value;
							var volunteer_id = document.getElementById('volunteer_id').value;
							var question = document.getElementById('question').value;
							var answer = document.getElementById('answer').value;

							Posts.insert({
								post_id: post_id,
								program: program,
								volunteer_id: volunteer_id,
								question: question,
								answer: answer,
								picture: reader.result
							});

							//Posts.insert({
							//	name: file.name,
							//	type: file.type,
							//	dataUrl: reader.result
							//});
						}
						reader.readAsDataURL(file);
					}
				});
			}
		}
	});
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
			templateData = { posts: Posts.find({program: program}) };
			return templateData;
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

