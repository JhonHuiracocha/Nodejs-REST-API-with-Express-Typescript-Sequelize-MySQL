import "dotenv/config";
import app from "./app";

app.listen(app.get("port"), () => {
  console.log(
    `⚡️[server]: Server is running at https://localhost:${app.get("port")}`
  );
});
