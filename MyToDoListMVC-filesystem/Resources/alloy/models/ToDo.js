exports.definition = {
    config: {
        columns: {
            title: "string",
            location: "string",
            alarm: "boolean",
            duedate: "date",
            path: "string"
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

model = Alloy.M("ToDo", exports.definition, [ function(migration) {
    migration.name = "ToDo";
    migration.id = "201304110825997";
    migration.up = function(migrator) {
        migrator.db.execute("ALTER TABLE " + migrator.table + " ADD COLUMN path TEXT;");
    };
    migration.down = function(migrator) {
        var db = migrator.db;
        var table = migrator.table;
        db.execute("CREATE TEMPORARY TABLE ToDo_backup(title,location,alarm,duedate,path,alloy_id);");
        db.execute("INSERT INTO ToDo_backup SELECT title,location,alarm,duedate,path,alloy_id FROM " + table + ";");
        migrator.dropTable();
        migrator.createTable({
            columns: {
                title: "string",
                location: "string",
                alarm: "boolean",
                duedate: "date"
            }
        });
        db.execute("INSERT INTO " + table + " SELECT title,location,alarm,duedate,alloy_id FROM ToDo_backup;");
        db.execute("DROP TABLE ToDo_backup;");
    };
} ]);

collection = Alloy.C("ToDo", exports.definition, model);

exports.Model = model;

exports.Collection = collection;