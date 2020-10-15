import { app } from "./app";
const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
  } catch {

  }
  app.listen(PORT, () => {
    console.log(`App listening at port :: ${PORT} !!`);
  });
};
start();
