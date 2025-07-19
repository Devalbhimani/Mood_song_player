var mongoose= require('mongoose')
var ImageKit = require("imagekit");

var imagekit = new ImageKit({
    publicKey : process.env.PUBLICKEY,
    privateKey : process.env.PRIVETKEY,
    urlEndpoint : process.env.URLENDPOINT
});


function uploadFile(file){

    return new Promise((resolve, reject)=>{
        imagekit.upload({
            file:file.buffer,

            folder:"Audio"
        },(error, result)=>{
            if(error){
                reject(error)
            }else{
                resolve(result)
            }
        })
    })
}

module.exports= uploadFile;