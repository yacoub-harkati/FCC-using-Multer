const express = require('express');
const cors = require('cors');
require('dotenv').config()
const path = require('path')
const multer = require('multer')
const app = express();
const bodyParser = require('body-parser')
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploaded_files'),
  filename: function(req, file, cb) {
    let formatedFileName = `${new Date().toDateString()} - ${path.basename(file.originalname)} - ${Math.floor(Math.random() * 1E5) }`
    cb(null, formatedFileName + path.extname(file.originalname))
  }
})
const upload = multer({storage: storage})
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.urlencoded({extended: true}))
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


app.post("/api/fileanalyse", upload.single('upfile'), (req, res) => {
  let response = {"name": req.file.originalname,"type":req.file.mimetype,"size":req.file.size}
  res.json(response)
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
