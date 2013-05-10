exports.definition = {
    config: {
        columns: {
            title: "string",
            location: "string",
            alarm: "boolean",
            duedate: "date"
        },
        adapter: {
            type: "sql",
            collection_name: "ToDo"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {
            validate: function(attrs) {
                if (!attrs.title || 0 >= attrs.title.length) {
                    Ti.API.info("nessun titolo");
                    return "Error: No title!";
                }
            }
        });
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("ToDo", exports.definition, []);

collection = Alloy.C("ToDo", exports.definition, model);

exports.Model = model;

exports.Collection = collection;