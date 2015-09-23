/* CV.JS */

$(function () {

    var CV_Model = Backbone.Model.extend({
        urlRoot: './data/cv-sample.json'
    });

    var cv = new CV_Model;

    //underscore templates
    var templates = {
        "header": _.template("<strong><%= firstname %> <%= middlename %> <%= lastname %></strong><br />"   +
            "<%= street %>, <%= zipcode %> <%= city %>, <%= country %><br />" +
            "Mobile: <%= mobile %>, E-mail: <%= email %>"),
            //"Birthdate: <%= birthdate %> in <%= birthplace %>"
        "experience": _.template("<div class='section'><div class='clearfix'><div class='tab'><%= from %> - <%= until %></div><%= position %><div class='right'><%= city %>, <%= country %></div></div>" +
        "<div class='tab'></div><%= description %></div>"),
        "education": _.template("<div class='section'><div class='tab'><%= from %> - <%= until %></div><%= position %><div class='right'><%= city %>, <%= country %></div></div>"),
        "languages": _.template("<div class='section'><div class='tab'><%= name %></div><%= level %></div>"),
        "skills": _.template("<div class='section'><div class='tab'><%= name %></div><%= content %></div>")
    };


    var View_Factory = {
        create_view: function (el, section_title, template_key, data_key) {
            return Backbone.View.extend({
                'el': el,
                'template': function (data) {
                    //console.log(data.personal);
                    var compiled = "";
                    //is array?
                    if (data[data_key].length) {
                        compiled = "<h2>" + section_title + "</h2>";
                        var i = 0,
                            s = data[data_key].length;
                        for (i = 0; i < s; i = i + 1) {
                            compiled = compiled + templates[template_key](data[data_key][i]);
                        }
                    } else {
                        compiled = templates[template_key](data[data_key]);
                        //console.log(compiled);
                    }//if-else

                    return compiled;
                },
                'initialize': function() {
                    this.listenTo(this.model, "change", this.render);
                },
                'render': function() {
                    var content = this.template(this.model.attributes);
                    //console.log('render', content);
                    this.$el.html(content);
                    return this;
                }
            });
        }
    };


    //Views
    var Header = View_Factory.create_view("header", "", "header", "personal");
    var head = new Header({
        model: cv
    });

    var Experience = View_Factory.create_view($("#experience"), "Experience", "experience", "experience");
    var exp = new Experience({
        model: cv
    });

    var Education = View_Factory.create_view($("#education"), "Education", "education", "education");
    var edu = new Education({
        model: cv
    });

    var Language = View_Factory.create_view($("#languages"), "Languages", "languages", "languages");
    var lang = new Language({
        model: cv
    });

    var Skills = View_Factory.create_view($("#skills"), "Skills", "skills", "skills");
    var skill = new Skills({
        model: cv
    });

    cv.fetch({
        "success": function (model, response, options) {
            //console.log('success', cv);
        },
        "error": function (model, response, options) {
            console.log('error', response);
        }
    });

});

