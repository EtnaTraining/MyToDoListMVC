migration.up = function(migrator) {
	migrator.db.execute('ALTER TABLE ' + migrator.table + ' ADD COLUMN path TEXT;');
};

migration.down = function(migrator) {
	var db = migrator.db;
	var table = migrator.table;
	db.execute('CREATE TEMPORARY TABLE ToDo_backup(title,location,alarm,duedate,path,alloy_id);');
	db.execute('INSERT INTO ToDo_backup SELECT title,location,alarm,duedate,path,alloy_id FROM ' + table + ';');
	migrator.dropTable();
	migrator.createTable({
		columns : {
			"title" : "string",
			"location" : "string",
			"alarm" : "boolean",
			"duedate" : "date"
		}
	});
	db.execute('INSERT INTO ' + table + ' SELECT title,location,alarm,duedate,alloy_id FROM ToDo_backup;');
	db.execute('DROP TABLE ToDo_backup;');

};
