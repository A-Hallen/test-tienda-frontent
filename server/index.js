const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const PORT = process.env.PORT || 3030;
const buildpath = path.join(__dirname, "..", "app", "wwwroot");
app.use(express.static(buildpath));

app.get("/", (req, res) => {
  res.sendFile(path.join(buildpath, "/index.html"));
});

app.get("/.well-known/assetlinks.json", (req, res) => {
	
	fs.readFile(path.join(buildpath, "../assetlinks.json"), (err, data) => {
		if(!err){
			res.setHeader('Content-Type', 'application/json');
			console.log("assetlinks sended");
			res.end(data);
		}
	}) 
	
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});