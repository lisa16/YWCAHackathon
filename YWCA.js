Posts = new Mongo.Collection("posts");

if (Meteor.isClient) {
    Template.body.helpers({
        posts: function () {
            return Posts.find({});
        }
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}

Router.route('/', function () {
    this.render('home');
});

Router.route('/post1');

Router.route('/post2');

// given a url like "/post/5"
Router.route('/post/:_id', function () {
    var params = this.params; // { _id: "5" }
    var id = params._id; // "5"
    console.log(id);
});

Router.route('/newpost/:_volunteer_id/:_question/:_answer/:_picture', function () {
    var params = this.params; // { _id: "5" }
    var volunteer_id = params._volunteer_id; // "5"
    var question = params._question;
    var pictureBase64 = params._picture;
    var answer = params._answer;
    var post_id = Math.floor((Math.random() * 999999999));

    Posts.insert({
        post_id: post_id,
        volunteer_id: volunteer_id,
        question: question,
        answer: answer,
        picture: pictureBase64
    });

    console.log('new post_id: ' + post_id);
});