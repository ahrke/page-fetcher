// > node fetcher.js http://www.example.com/ ./index.html
// Downloaded and saved 3261 bytes to ./index.html

const request = require('request');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const args = process.argv.splice(2);

const fetcher = (url, file) => {
  if (file === undefined || file.length === 0) {
    console.log(`invalid file name.`);
    return;
  }
  request(url, (error, response, body) => {
    if (error) {
      console.log(`error => ${error}`);
      return;
    }
    console.log('statusCode:', response && response.statusCode);
    
    // fs.readdir(__dirname, (err, data) => {
    //   for (let i = 0; i < data.length; i++) {
    //     if (data[i] === file) {
    //       rl.question(`there is a file with the same name. Do you want to overwrite?`, (answer) => {
    //         if (answer === 'no') {
    //           rl.close();
    //           return;
    //         }
    //         rl.close()
    //       })
    //     }
    //   }
    // })
    
    fs.writeFile(file, body, (error) => {
      if (error) throw error;
      console.log(`Downloaded and saved ${body.length} bytes to ${file}`);
    })
  });

  rl.close();
}

fetcher(args[0], args[1]);
