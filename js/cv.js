/* CV.JS */

document.addEventListener('DOMContentLoaded', function(){

    var CV_Data = Backbone.Model.extend({
        urlRoot: './data/cv-sample.json'
    });

    var cv = new CV_Data;
    //console.log(cv);

    //underscore templates
    var templ_header = _.template("<strong><%= firstname %> <%= middlename %> <%= lastname %></strong><br />" +
    "<%= street %>, <%= zipcode %> <%= city %>, <%= country %><br />" +
    "Mobile: <%= mobile %> - E-mail: <%= email %><br />"
    //"Birthdate: <%= birthdate %> in <%= birthplace %>"
    );

    var templ_experience = _.template("<div class='section'><%= from %> - <%= until %> <%= position %><div class='right'><%= city %>, <%= country %></div></div>");

    var templ_education = _.template("<div class='section'><%= from %> - <%= until %> <%= position %><div class='right'><%= city %>, <%= country %></div></div>");

    var templ_language = _.template("<div class='section'><%= name %> - <%= level %></div>");

    var templ_skills = _.template("<div class='section'><%= name %> - <%= content %></div>");


    //Views
    var Header = Backbone.View.extend({
        el: "header",
        template: function (data) {
            //console.log(data.personal);
            var compiled = templ_header(data.personal);
            //console.log(compiled);
            return compiled;
        },
        initialize: function() {
            this.listenTo(this.model, "change", this.render);
        },
        render: function() {
            var content = this.template(this.model.attributes);
            //console.log('render', content);
            this.$el.html(content);
            return this;
        }
    });
    var head = new Header({
        model: cv
    });

    var Experience = Backbone.View.extend({
        el: $("#experience"),
        template: function (data) {
            var compiled = "";
            if (data.experience) {
                compiled = "<h2>Experience</h2>";
                var i = 0,
                    s = data.experience.length;
                for (i = 0; i < s; i = i + 1) {
                    compiled = compiled + templ_experience(data.experience[i]);
                }
            }
            //console.log(compiled);
            return compiled;
        },
        initialize: function() {
            this.listenTo(this.model, "change", this.render);
        },
        render: function() {
            var content = this.template(this.model.attributes);
            this.$el.html(content);
            return this;
        }
    });
    var exp = new Experience({
        model: cv
    });

    var Education = Backbone.View.extend({
        el: $("#education"),
        template: function (data) {
            var compiled = "";
            if (data.education) {
                compiled = "<h2>Education</h2>";
                var i = 0,
                    s = data.education.length;
                for (i = 0; i < s; i = i + 1) {
                    compiled = compiled + templ_education(data.education[i]);
                }
            }
            //console.log(compiled);
            return compiled;
        },
        initialize: function() {
            this.listenTo(this.model, "change", this.render);
        },
        render: function() {
            var content = this.template(this.model.attributes);
            this.$el.html(content);
            return this;
        }
    });
    var edu = new Education({
        model: cv
    });

    var Language = Backbone.View.extend({
        el: $("#languages"),
        template: function (data) {
            var compiled = "";
            if (data.languages) {
                compiled = "<h2>Language</h2>";
                var i = 0,
                    s = data.languages.length;
                for (i = 0; i < s; i = i + 1) {
                    compiled = compiled + templ_language(data.languages[i]);
                }
            }
            //console.log(compiled);
            return compiled;
        },
        initialize: function() {
            this.listenTo(this.model, "change", this.render);
        },
        render: function() {
            var content = this.template(this.model.attributes);
            this.$el.html(content);
            return this;
        }
    });
    var lang = new Language({
        model: cv
    });

    var Skills = Backbone.View.extend({
        el: $("#skills"),
        template: function (data) {
            var compiled = "";
            if (data.skills) {
                compiled = "<h2>Skills</h2>";
                var i = 0,
                    s = data.skills.length;
                for (i = 0; i < s; i = i + 1) {
                    compiled = compiled + templ_skills(data.skills[i]);
                }
            }
            //console.log(compiled);
            return compiled;
        },
        initialize: function() {
            this.listenTo(this.model, "change", this.render);
        },
        render: function() {
            var content = this.template(this.model.attributes);
            this.$el.html(content);
            return this;
        }
    });
    var skill = new Skills({
        model: cv
    });

    cv.fetch({
        "success": function (model, response, options) {
            //console.log('success', cv);

            //header
            var personal = cv.get('personal');
            if (personal !== undefined) {

                //console.log(personal);


            }//if

            //body


            //footer


        },
        "error": function (model, response, options) {
            console.log('error', response);
        }
    });




});

