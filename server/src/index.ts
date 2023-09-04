import express from "express";
import cors from "cors";
import { config } from "dotenv";

import connectDB from "./database/database";
import itemRoutes from "./routes";

const main = async () => {
  config();

  const app = express();

  app.use(cors());
  app.use(express.json());

  itemRoutes(app);

  try {
    await connectDB();

    const port = process.env.PORT || 8000;
    app.listen(port, () => console.log(`Listening on port ${port}!`));
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
};

main();
