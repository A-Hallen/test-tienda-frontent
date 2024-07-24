const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3030;
const buildpath = path.join(__dirname, "..", "app");
app.use(express.static(buildpath));

app.get("/", (req, res) => {
  res.sendFile(path.join(buildpath, "index.html"));
});

app.get("/_content/*", (req, res) => {
	console.log("req content", `wwwroot${req.url}`);
	res.sendFile(path.join(buildpath, `wwwroot${req.url}`));
});

app.get("/css/*", (req, res) => {
	console.log("req css", `wwwroot/_content/FrontentCompartido${req.url}`);
	res.sendFile(path.join(buildpath, `wwwroot/_content/FrontentCompartido${req.url}`));
});

app.get("/FrontentWeb.styles.css", (req, res) => {
	res.sendFile(path.join(buildpath, `wwwroot/FrontentWeb.styles.css`));
});

/*
app.get("/_framework/blazor.webassembly.js", (req, res) => {
	res.sendFile(path.join(buildpath, `wwwroot/_framework/blazor.webassembly.js`));
});
*/

app.get("/_framework/*", (req, res) => {
	res.sendFile(path.join(buildpath, `wwwroot/${req.url}`));
});
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});