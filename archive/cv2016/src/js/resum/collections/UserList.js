define(["jquery","backbone","models/UserModel"], function($, Backbone, User) {

    var UserList = Backbone.Collection.extend({

        model: User

    });

    // Returns the Model class
    return UserList;

});