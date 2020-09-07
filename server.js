
function server() {
    const express = require('express');
    const app = express();

    app.use(express.static('public'));
    app.use(express.urlencoded({ extended: true }))

    app.post('/file', function(req, res) {
        console.log('hi');
        const data = req.query.value;
        const command = './rgrep -g 1000 -multi ' + data + ' ./ettoday.rec';
        let exec= require('child_process').exec, child;

        console.log('start searching');
        child = exec(command, (err, stdout, stderr) => {
            console.log(stderr);
            if(err != null) {
                console.log(err);
            }
            
        }); 

        console.log(command); 
        res.send('rgrep start searching');
    })

    app.get('/record', (req, res) => {
        let data;
        setTimeout( () => {
            data = matchString();
            res.send(data);
        }, 2000);
    });

    app.listen(3000, function() {
        console.log('Server is running on port 3000');
    } )
}

function matchString() {
    const fs = require('fs');
    const fullPath = './tmp/';
    let path;
    let dataArr = [];
    const urlRegex = /@url:http:.+/g;
    const bodyRegex = /@body:(.*?)@Gais_REC/sg;
    const titleRegex = /@title:.+/g;
    var urlArr = [], bodyArr = [], titleArr = [];

   filenames = fs.readdirSync(fullPath);
   for(var i = 0; i < filenames.length; i++) {
        path = fullPath + filenames[i];
        data = fs.readFileSync(path, 'utf8');
        urlArr.push(data.match(urlRegex));
        bodyArr.push(data.match(bodyRegex));
        titleArr.push(data.match(titleRegex));  
   }

   let dic = {'url': urlArr, 'body': bodyArr, 'title': titleArr};
   return dic;
}

server();
