const menu = require( '../models/menu' );

module.exports = ( app ) => {

  //      GET      \\
  //Obtener todos los menus
  //Obtener menú del día por id_lnchroom
  //Obtener todos los menus por id_lunchroom
  app.get( '/api/menus', ( req, res ) => {
    const id_lunchroom = req.query.id_lunchroom;
    const get_all = req.query.get_all;
    if( !isNaN( id_lunchroom ) ){
      if( get_all ){
        menu.getMenusById( id_lunchroom, ( err, data ) => {
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
        menu.getMenuById( id_lunchroom, fecha, ( err, data ) => {
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
    if( !req.body.id_lunchroom ){
      res.status(400).json( { "err": "se debe ingresar un id de comedor" } );
    }
    else{
      const date = new Date();
      fecha = date.getDate() + '/' + ( date.getMonth() + 1 ) + '/' + date.getFullYear();
      const menuData = {
        id_menu: null,
        id_lunchroom: req.body.id_lunchroom,
        date: fecha,
        soup: req.body.soup,
        appetizer: req.body.appetizer,
        main_course: req.body.main_course,
        protein: req.body.protein,
        juice: req.body.juice,
        dessert: req.body.dessert,
        salad: req.body.salad
      };
      if( !req.body.soup ) menuData.soup = "Sin soup";
      if( !req.body.appetizer ) menuData.appetizer = "Sin appetizer";
      if( !req.body.main_course ) menuData.main_course = "Sin main_course";
      if( !req.body.protein ) menuData.protein = "Sin protein";
      if( !req.body.juice ) menuData.juice = "Sin juice";
      if( !req.body.dessert ) menuData.dessert = "Sin dessert";
      if( !req.body.salad ) menuData.salad = "Sin salad";
      menu.getMenuById( req.body.id_lunchroom, fecha, ( err, data ) => {
        if( !isNaN( err ) ){
          if( !( Object.keys( data ).length === 0 ) ){
            if( data[0]['date'] == fecha ){
              res.status( 400 ).json( {"msg" : "Can't create two menus on the same day"} );
            }
            else{
              menu.createMenu( menuData, ( err, data ) => {
                if( !isNaN( err ) ){
                  if( data && data.insertId ){
                    res.redirect( "/api/menus/?id_lunchroom=" + req.body.id_lunchroom );
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
                  res.redirect( "/api/menus/?id_lunchroom=" + req.body.id_lunchroom );
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
    const id_lunchroom = req.query.id_lunchroom;
    const menuData = {
      soup: req.body.soup,
      appetizer: req.body.appetizer,
      main_course: req.body.main_course,
      protein: req.body.protein,
      juice: req.body.juice,
      dessert: req.body.dessert,
      salad: req.body.salad
    };
    if( !req.body.soup ) menuData.soup = "Sin soup";
    if( !req.body.appetizer ) menuData.appetizer = "Sin appetizer";
    if( !req.body.main_course ) menuData.main_course = "Sin main_course";
    if( !req.body.protein ) menuData.protein = "Sin protein";
    if( !req.body.juice ) menuData.juice = "Sin juice";
    if( !req.body.dessert ) menuData.dessert = "Sin dessert";
    if( !req.body.salad ) menuData.salad = "Sin salad";
    const date = new Date();
    fecha = date.getDate() + '/' + ( date.getMonth() + 1 ) + '/' + date.getFullYear();
    if( !isNaN( id_lunchroom ) ){
      menu.updateMenu( id_lunchroom, fecha, menuData, ( err, data ) => {
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
