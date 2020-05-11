import app from "./src/App";
import mongoose from "mongoose";

const port = process.env.PORT || 8080;

/* Connect to the database */
<<<<<<< HEAD
const mongoUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1/undefbackend'
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise
mongoose.set('useCreateIndex', true)
=======
const mongoUrl = process.env.MONGO_URL || "mongodb://127.0.0.1/undefbackend";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;
>>>>>>> 1627eab6b5282afc4923804638a296c4a2db798e

/* Start the server */
app.listen(port, () =>
  console.log(
    `Backend running on http://127.0.0.1:${port}, connected to db mongodb://${mongoose.connection.host}:${mongoose.connection.port}/${mongoose.connection.name}`
  )
);
