const paths = ( server, mySQL, connection ) => {

	server.get( '/api/lists', (request, response ) => {
		const { ID } = request.query;
	
		const listQuery = 'SELECT * FROM ?? WHERE ?? = ?';
		const listInserts = [ 'lists', 'ID', ID ]
		const listSQL = mySQL.format( listQuery, listInserts );
		
		connection.query( listSQL, ( error, results, fields ) => {
			if( error ) return next( error );
	
			const dataToReturn = {
				success: true,
				data: {list: results}
			};
			const itemQuery = 'SELECT * FROM ?? WHERE ?? = ?';
			const itemInserts = [ 'items', 'listID', ID ];
			const itemSQL = mySQL.format( itemQuery, itemInserts );
	
			connection.query( itemSQL, ( error, results, fields ) => {
				if( error ) return next( error );
	
				dataToReturn.data.items = results;
				response.json( dataToReturn );
			});
		});
	});

	server.put( '/api/newitem', ( request, response ) => {
		const { name, listID, assignedUserID } = request.body;

		const itemQuery = 'INSERT INTO items ( name, listID, assignedUserID ) VALUES ( ?, ?, ? )';
		const itemInserts = [ name, listID, assignedUserID ];
		const itemSQL = mySQL.format( itemQuery, itemInserts );

		connection.query( itemSQL, ( error, results, fields ) => {
			if( error ) return next( error );
			console.log( `The item "${name}" has been added to "List ${listID}"` );

			const dataToReturn = {
				success: true,
				data: `The item "${name}" has been added to "List ${listID}"`
			};
			response.json( dataToReturn );
		});
	});
	server.patch( '/api/updateitem', ( request, response ) => {
		const { ID, name, listID, assignedUserID } = request.body;

		const itemUpdateQuery = 'UPDATE items SET ??=?, ??=?, ??=? WHERE ?? = ?';
		const itemUpdateInserts = [ 'name', name, 'listID', listID, 'assignedUserID', assignedUserID, 'ID', ID ];
		const itemUpdateSQL = mySQL.format( itemUpdateQuery, itemUpdateInserts );

		connection.query( itemUpdateSQL, ( error, resuls, fields ) => {
			if( error ) return next( error );
			const successString = `The item ${ID} has been updated to ${name}, ${assignedUserID}`;
			console.log( successString );

			const dataToReturn = {
				success: true,
				data: successString
			};
			response.json( dataToReturn );
		})
	});


}

module.exports = paths;