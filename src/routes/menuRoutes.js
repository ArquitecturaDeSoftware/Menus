const menu = require( '../models/menu' );

module.exports = ( app ) => {

  //      GET      \\
  //Obtener menu por id_comedor
  app.get( '/api/menus', ( req, res ) => {
    const id_comedor = req.query.id_comedor;
    const get_all = req.query.get_all;
    if( !isNaN( id_comedor ) ){
      if( get_all ){
        menu.getMenusById( id_comedor, ( err, data ) => {
          if( !isNaN( err ) ){
            res.json( data );
          }
          else{
            res.status( 500 ).json( {"err": "Internal server error"} );
          }
        } );
      }
      else{
        const date = new Date( );
        fecha = date.getDate() + '/' + ( date.getMonth() + 1 ) + '/' + date.getFullYear();
        menu.getMenuById( id_comedor, fecha, ( err, data ) => {
          if( !isNaN( err ) ){
            res.json( data );
          }
          else{
            res.status( 500 ).json( {"err": "Internal server error"} );
          }
        } );
      }
    }
    else{
      menu.getMenus( ( err, data ) => {
        if( !isNaN( err ) ){
          res.json( data );
        }
        else{
          res.status( 500 ).json( {"err": "Internal server error"} );
        }
      } );
    }
  } );


  //      POST      \\
  //Agregar un menu
  app.post( '/api/menus', ( req, res ) => {
    if( !req.body.id_comedor ){
      res.status(400).json( { "err": "se debe ingresar un id de comedor" } );
    }
    else{
      const date = new Date();
      fecha = date.getDate() + '/' + ( date.getMonth() + 1 ) + '/' + date.getFullYear();
      const menuData = {
        id_menu: null,
        id_comedor: req.body.id_comedor,
        fecha: fecha,
        sopa: req.body.sopa,
        principio: req.body.principio,
        seco: req.body.seco,
        proteina: req.body.proteina,
        jugo: req.body.jugo,
        postre: req.body.postre,
        ensalada: req.body.ensalada
      };
      if( !req.body.sopa ) menuData.sopa = "Sin Sopa";
      if( !req.body.principio ) menuData.principio = "Sin Principio";
      if( !req.body.seco ) menuData.seco = "Sin Seco";
      if( !req.body.proteina ) menuData.proteina = "Sin Proteina";
      if( !req.body.jugo ) menuData.jugo = "Sin Jugo";
      if( !req.body.postre ) menuData.postre = "Sin Postre";
      if( !req.body.ensalada ) menuData.ensalada = "Sin Ensalada";
      menu.getMenuById( req.body.id_comedor, fecha, ( err, data ) => {
        if( !isNaN( err ) ){
          if( !( Object.keys( data ).length === 0 ) ){
            if( data[0]['fecha'] == fecha ){
              res.status( 400 ).json( {"msg" : "Can't create two menus on the same day"} );
            }
            else{
              menu.createMenu( menuData, ( err, data ) => {
                if( !isNaN( err ) ){
                  if( data && data.insertId ){
                    console.log( fecha );
                    res.redirect( "/api/menus/?id_comedor=" + req.body.id_comedor );
                  }
                }
                else{
                  res.status( 500 ).json( {"err": "Internal server error"} );
                }
              } );
            }
          }
          else{
            menu.createMenu( menuData, ( err, data ) => {
              if( !isNaN( err ) ){
                if( data && data.insertId ){
                  console.log( fecha );
                  res.redirect( "/api/menus/?id_comedor=" + req.body.id_comedor );
                }
              }
              else{
                res.status( 500 ).json( {"err": "Internal server error"} );
              }
            } );
          }
        }
      } );
    }
  } );

  //      PUT      \\
  app.put( '/api/menus', ( req, res ) => {
    const id_comedor = req.query.id_comedor;
    const menuData = {
      sopa: req.body.sopa,
      principio: req.body.principio,
      seco: req.body.seco,
      proteina: req.body.proteina,
      jugo: req.body.jugo,
      postre: req.body.postre,
      ensalada: req.body.ensalada
    };
    if( !req.body.sopa ) menuData.sopa = "Sin Sopa";
    if( !req.body.principio ) menuData.principio = "Sin Principio";
    if( !req.body.seco ) menuData.seco = "Sin Seco";
    if( !req.body.proteina ) menuData.proteina = "Sin Proteina";
    if( !req.body.jugo ) menuData.jugo = "Sin Jugo";
    if( !req.body.postre ) menuData.postre = "Sin Postre";
    if( !req.body.ensalada ) menuData.ensalada = "Sin Ensalada";
    const date = new Date();
    fecha = date.getDate() + '/' + ( date.getMonth() + 1 ) + '/' + date.getFullYear();
    if( !isNaN( id_comedor ) ){
      menu.updateMenu( id_comedor, fecha, menuData, ( err, data ) => {
        if( !isNaN( err ) ){
          if( data && data.msg ){
            res.json( data );
          }
        }
        else{
          res.status( 500 ).json( {"err" : "internal server error"} );
        }
      } );
    }
    else{
      res.status( 404 ).json( {"msg" : "not found"} );
    }
  } );

  //      DELETE      \\
  //app.delete( '/api/menus/:id',( req, res ) =>{
  //  const id = req.params.id;
  //  if( !isNaN( id ) ){
  //    menu.deleteMenu( id, ( err, data ) => {
  //      if( data && data.msg === 'deleted' ){
  //        res.json( data );
  //      }
  //      else if( data && data.msg === 'does not exist' ) {
  //        res.status( 404 ).json( data );
  //      }
  //      else{
  //        res.status( 500 ).json( {'msg': 'error'} );
  //      }
  //    } );
  //  }
  //} );
}
