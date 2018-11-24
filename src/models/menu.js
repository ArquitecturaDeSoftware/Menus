const mysql = require( 'mysql' );

connection = mysql.createConnection({
  host: '104.196.169.158',
  user: 'root',
  password: '1234',
  database: 'lunch'
});

const menuModel = {};

menuModel.getMenus = ( callback ) => {
  if( connection ){
    connection.query(
      `SELECT * FROM menu`,
      ( err, rows ) => {
        if( err ){
          callback( err, rows );
        }
        else{
          callback( null, rows );
        }
      }
    );
  }
};


menuModel.getMenuById = ( id_lunchroom, date, callback ) => {
  if( connection ){
    var sql = `
    SELECT * FROM menu WHERE id_lunchroom LIKE ${connection.escape( id_lunchroom )}
    AND date LIKE ${connection.escape( date )};
    `;
    connection.query(
      sql,
      ( err, rows ) => {
        if( err ){
          callback( err, rows );
        }
        else{
          callback( null, rows );
        }
      }
    );
  }
};

menuModel.getMenusById = ( id_lunchroom, callback ) => {
  if( connection ){
    var sql = `
    SELECT * FROM menu WHERE id_lunchroom LIKE ${connection.escape( id_lunchroom )}
    `;
    connection.query(
      sql,
      ( err, rows ) => {
        if( err ){
          callback( err, rows );
        }
        else{
          callback( null, rows );
        }
      }
    );
  }
};

menuModel.createMenu = ( menuData, callback ) => {
  if( connection ){
    connection.query(
      `INSERT INTO menu SET ?`, menuData,
      ( error, result ) => {
        if( error ){
          callback( error, result );
        }
        else{
          callback( null, { "insertId": result.insertId } );
        }
      } );
  }
};

menuModel.updateMenu = ( id_lunchroom, date, menuData, callback ) => {
  if( connection ){
    const sql = `
    UPDATE menu SET
    soup = ${connection.escape( menuData.soup ) },
    appetizer = ${connection.escape( menuData.appetizer )},
    main_course = ${connection.escape( menuData.main_course )},
    protein = ${connection.escape( menuData.protein )},
    juice = ${connection.escape( menuData.juice )},
    dessert = ${connection.escape( menuData.dessert )},
    salad = ${connection.escape( menuData.salad )}
    WHERE id_lunchroom LIKE ${connection.escape( id_lunchroom )} AND
    date LIKE ${connection.escape( date ) }
    `;
    connection.query(
      sql,
      ( err, result ) => {
        if( err ){
          callback( err, result );
        }
        else{
          callback( null, {'msg': 'success'} );
        }
      }
    );
  }
}

//menuModel.deleteMenu = ( id, callback ) => {
//  if( connection ){
//    const sqlExists = `
//    SELECT * FROM menu WHERE id_menu = ${connection.escape( id )}
//    `;
//    connection.query( sqlExists, ( err, row ) => {
//      if( err ){
//        throw err;
//      }
//      else{
//        if( isNaN( row ) ){
//          const sql = `
//          DELETE FROM menu WHERE id_menu = ${connection.escape( id )}
//          `;
//          connection.query( sql, ( error, result ) =>{
//            if( error ){
//              throw error;
//            }
//            else{
//              callback( null, {'msg': 'deleted'} );
//            }
//          } );
//        }
//        else{
//          callback( null, {'msg': 'does not exist'} );
//        }
//      }
//    } );
//  }
//}

module.exports = menuModel;
