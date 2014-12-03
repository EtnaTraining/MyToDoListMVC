exports.definition = {
	config: {
		columns: {
		    "title": "string",
		    "location": "string",
		    "alarm": "boolean",
		    "duedate": "date"
		},
		adapter: {
			type: "sql",
			collection_name: "todo"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
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
