Posts = new Mongo.Collection("posts");

if (Meteor.isClient) {
  Template.home.created = function() {
    this.currentTab = new ReactiveVar("boys");

    this.currentTabIs = function(tabName) {
      return tabName === Template.instance().currentTab.get();
    };
  };

  Template.home.helpers({
    currentTabIs: function(tabName) {
      return Template.instance().currentTabIs(tabName);
    },
    activeIfCurrentTabIs: function(tabName) {
      console.log('activeIfCurrentTabIs ' + tabName);
      if (Template.instance().currentTabIs(tabName)) {
        return 'active';
      } else {
        return '';
      }
    }
  });

  Template.home.events({
    'click .tab-link a': function(e, template) {
      e.preventDefault();
      var $tabLink = $(e.currentTarget);
      var tabName = $tabLink.data('tab-name');
      template.currentTab.set(tabName || 'boys');
      console.log(template.currentTab);
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
	});
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
