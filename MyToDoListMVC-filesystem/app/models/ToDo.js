exports.definition = {
        config: {
                columns: {
                    "title": "string",
                    "location": "string",
                    "alarm": "boolean",
                    "duedate": "date",
                    "image": "string"
                },
                adapter: {
                        type: "sql",
                        collection_name: "todo"
                }
        },              
        extendModel: function(Model) {          
                _.extend(Model.prototype, {
                        // extended functions and properties go here
                        validate: function(attrs) {
                                if (!attrs.title || attrs.title.length <= 0) { 
                                        Ti.API.info("nessun titolo");
                                        return "Error: No title!";
                                } 
                        }
                });
                
                return Model;
        },
        extendCollection: function(Collection) {                
                _.extend(Collection.prototype, {
                        // extended functions and properties go here
                });
                
                return Collection;
        }
};
