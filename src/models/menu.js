const mysql = require( 'mysql' );

connection = mysql.createConnection({
  host: '192.168.99.101',
  user: 'root',
  password: '1234',
  database: 'almuerzos'
});

const menuModel = {};

menuModel.getMenus = ( callback ) => {
  if( connection ){
    connection.query(
      `SELECT * FROM menu ORDER BY id_comedor`,
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


menuModel.getMenuById = ( id_comedor, fecha, callback ) => {
  if( connection ){
    var sql = `
    SELECT * FROM menu WHERE id_comedor = ${connection.escape( id_comedor )}
    AND fecha LIKE ${connection.escape( fecha )};
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

menuModel.getMenusById = ( id_comedor, callback ) => {
  if( connection ){
    var sql = `
    SELECT * FROM menu WHERE id_comedor = ${connection.escape( id_comedor )}
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

menuModel.updateMenu = ( id_comedor, fecha, menuData, callback ) => {
  if( connection ){
    const sql = `
    UPDATE menu SET
    sopa = ${connection.escape( menuData.sopa ) },
    principio = ${connection.escape( menuData.principio )},
    seco = ${connection.escape( menuData.seco )},
    proteina = ${connection.escape( menuData.proteina )},
    jugo = ${connection.escape( menuData.jugo )},
    postre = ${connection.escape( menuData.postre )},
    ensalada = ${connection.escape( menuData.ensalada )}
    WHERE id_comedor = ${connection.escape( id_comedor )} AND
    fecha LIKE ${connection.escape( fecha ) }
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
