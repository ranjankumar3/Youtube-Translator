//jshint esversion:6
const express = require('express');
const port = 3000;
const bodyParser = require('body-parser');
const https = require('https');


const app = express();

app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {


  res.sendFile(__dirname + "/index.html");
})


app.post('/', (req, res) => {

  /*get form data*/
  let link = req.body.link;

  /*regex to extract video id*/
  var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = link.match(regExp);
  if (match && match[2].length == 11) {
    var final_link = match[2];
    var filter = 1;
  } else {
    res.send("enter correct input , do a  back")
  }

  if (filter == 1) {


    /*api get*/
    url = `https://www.googleapis.com/youtube/v3/videos?key=
AIzaSyCPWMPAp1bgYvBDzIqZCh5oCr5nldAP2sI&part=snippet&id=${final_link}`

    https.get(url, response => {

      let data = "";

      response.on("data", chunk => {
        data += chunk;
      })

      response.on("end", () => {


        const result = JSON.parse(data);

        const title = result.items[0].snippet.title;


        const thumbnail = result.items[0].snippet.thumbnails.maxres.url;

        // const finalthumbnail = '<img src="' + thumbnail + '" alt="video thumbnail">'
        // console.log(finalthumbnail)

        res.render("result", { videoTitle: title, videoThumbnail:thumbnail});
      })

    })
  }




})



app.listen(port, () => {
  console.log(`running ${port}`)
})
