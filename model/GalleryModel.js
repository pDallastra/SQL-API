const db = require('../db/dbConnection');

module.exports = class GalleryModel{

    static getAll(callback) {
       return db.query("SELECT * FROM gallery_video", callback);
    }

    static getId(id, callback){
        return db.query("SELECT * FROM gallery_video WHERE id_gallery_video = ?", [id], callback);
    }

    static add(data, callback){
        return db.query("INSERT INTO gallery_video (title, title_path) VALUES(?, ?)", [data.title, data.title_path], callback);
    }

    static edit(data, callback){
        if(data.title_path != null){
            return db.query("UPDATE gallery_video SET title = ?, title_path = ? WHERE id_gallery_video = ?", 
            [data.title, data.title_path, data.id_gallery_video], callback);
        }else{
            return db.query("UPDATE gallery_video SET title = ? WHERE id_gallery_video = ?", 
            [data.title, data.id_gallery_video], callback);
        }        
    }

    static delete(id, callback){
        return db.query("DELETE FROM gallery_video WHERE id_gallery_video = ?", 
        [id], callback);
    }
}
