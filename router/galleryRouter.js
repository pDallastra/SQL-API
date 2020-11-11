const express = require('express');
const router = express.Router();
const multer = require('multer');

const GalleryModel = require('../model/GalleryModel');
const ResClass = require('../model/ResClass');

const publicFolder = './public/files/';
const path = require('path');
const fs = require('fs')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, publicFolder)
    },
    filename: (req, file, cb) => {
        let fileName = `${file.fieldname.replace(/\//g, '')}-${Date.now()}${path.extname(file.originalname)}`
        req.body.title_path = publicFolder+fileName;
        cb(null, fileName)
    }
})

var upload = multer({storage: storage});
function deleteFile(path) {
    if(path != null){
        fs.unlinkSync(path);
        console.log('File Deleted')
    }
}

router.post('/', upload.single('file'), (req, res, next) => {
    let resp = new ResClass();

    if(req.file != null){
        GalleryModel.add(req.body, (error, data) => {

            if(error) {
                resp.error = true;
                resp.msg = "Error.",
                console.log("Error: ", error)
                deleteFile(req.body.title_path)
            } else {
                if(data.affectedRows > 0){
                    resp.msg = "Item sent successfully"
                } else {
                    resp.error = true;
                    resp.msg = "Can't proceed"
                    deleteFile(req.body.title_path);
                }
            }
            console.log('resp: ', resp);
            res.json(resp)
        });
    } else {
        resp.error = true;
        resp.msg = "Item not sent",
        res.json(resp);
    }
});

router.put("/", upload.single('file'), function(req, res, next){
    let resp = new ResClass();

        GalleryModel.edit(req.body, function(error, data){

            if(error){
                resp.error = true;
                resp.msg = "Error.",
                console.log("Error: ", error)
                deleteFile(req.body.title_path)
            }else{
                if(data.affectedRows > 0){
                    resp.msg = "Item edited successfully"
                }else{
                    resp.erro = true;
                    resp.msg = "Can't proceed."
                    console.log("erro: ", error);
                    deleteFile(req.body.title_path);
                }
            }
            console.log('resp:', resp);
            res.json(resp);
        });

});


router.get('/', (req, res, next) => {
    GalleryModel.getAll((error, data) => {
        let resp = new ResClass();

        if(error) {
            resp.error = true;
            resp.msg = "Error",
            console.log("Error: ", error)
        } else {
            resp.data = data
        }

        res.json(resp)
    });
});

router.get('/:id?', (req, res, next) => {
    GalleryModel.getId(req.params.id, (error, data) => {
        let resp = new ResClass();

        if(error) {
            resp.error = true;
            resp.msg = "Error",
            console.log("Error: ", error)
        } else {
            resp.data = data
        }

        res.json(resp)
    });
});

router.delete("/:id?", function(req, res, next){
    GalleryModel.delete(req.params.id, function(error, data){
        let resp = new ResClass();

        if(error){
            resp.error = true;
            resp.msg = "Error",
            console.log("Error: ", error)
        }else{
            if(data.affectedRows > 0){
                resp.msg = "Item deleted successfully."
            }else{
                resp.erro = true;
                resp.msg = "Can't proceed."
                console.log("erro: ", error);
                deleteFile(req.body.title_path);
            }
        }

        res.json(resp);
    });
});

module.exports = router;