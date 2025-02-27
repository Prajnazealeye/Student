const { Sequelize } = require("sequelize");
// require("dotenv").config();
class DatabaseConnector {
    constructor() {
      this.PG_DB_URI = process.env.PG_DB_URI;
      //console.log(process.env.PG_DB_URI)
      this.pgConn = new Sequelize(this.PG_DB_URI, { logging: Boolean(+process.env.PG_LOGGING) });
      this.POSTGRES_RETRY_COUNT = 0;
      this.POSTGRES_RETRY_LIMIT = 3;
      this.RETRY_TIMEOUT = 5 * 1000; // 5 seconds
    }
    handleDBConnectionError(db, error) {
        switch (db) {
         
    
          case "postgres":
            if (this.POSTGRES_RETRY_COUNT < this.POSTGRES_RETRY_LIMIT) {
              console.log("Postgres connection error", error);
              this.POSTGRES_RETRY_COUNT += 1;
              setTimeout(() => {
                console.log("Retrying...");
                this.connectToPostgres();
              }, this.RETRY_TIMEOUT);
            } else {
                console.log("Postgres connection error", error);
                console.log("Retry Limit Exceeded. Terminating process");
              process.exit(0);
            }
            break;
    
          default:
            break;
        }
      }

      async connectToPostgres() {
        this.pgConn
          .sync({ alter: true })
          .then(() => console.log("Connected to Postgres"))
          .catch((error) => {
            this.handleDBConnectionError("postgres", error);
          });
      }
    }
    
    const db = new DatabaseConnector();
    
    module.exports = db;
    