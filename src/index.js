const express = require( 'express' );
const app = express( );

const morgan = require( 'morgan' );
const bodyParser = require( 'body-parser' );

//setings
app.set( 'port', process.env.PORT || 3000 );
const port = process.env.PORT || 3000;

//midlewares
app.use( morgan( 'dev' ) );
app.use( bodyParser.json( ) );

//routes
require( './routes/menuRoutes' )( app );

app.listen( port, () => console.log( `Listening on port ${port}` ) );
