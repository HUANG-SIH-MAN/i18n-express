import express from "express";
import path from "path";
import i18next from "i18next";
import FilesystemBackend from "i18next-fs-backend";
import i18nextMiddleware from "i18next-http-middleware";

const app = express();
const port = 3000;

const outerFolderPath: string = path.resolve(__dirname, "..");
i18next
  .use(i18nextMiddleware.LanguageDetector)
  .use(FilesystemBackend)
  .init({
    backend: {
      // json 檔案來源
      loadPath: outerFolderPath + "/resources/{{lng}}/{{ns}}.json",
    },
    // 要使用的namespaces 檔案有哪些
    ns: ["response", "message"],
    defaultNS: "response", // 預設的namespaces檔案
    fallbackLng: "en", // 預設回覆的語言
    preload: ["en", "zh"], // 要使用的語言有哪些
  });

app.use(i18nextMiddleware.handle(i18next));
app.use(express.json());

app.get("/", (req, res) => {
  res.send(req.t("helloWorld"));
});

function sendIM(message: string) {
  console.log(message);
  return;
}

app.post("/order", (req, res) => {
  const { amount } = req.body;
  sendIM(req.t("finishOrder", { ns: "message" }));
  sendIM(req.t("message:finishOrder"));
  res.send(req.t("order", { amount }));
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
