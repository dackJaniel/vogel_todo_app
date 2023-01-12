import mongoose from "mongoose";

export function connect() {
  return mongoose
    .connect(
      "mongodb+srv://usr_daniel:MoL95JBYWgVs9sGO@database.fox6f.mongodb.net/todos",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        retryWrites: true,
      }
    )
    .then((res) => {
      console.log("database and server are running 🦄🦄🦄");
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
}
