const multer = require("multer");

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb("images Folder Not Read as Destination","Images");
//     },
//     filename: (req, file, cb) => {

        

//         cb(null,file.fieldname);
//     }
// })

// const Upload = multer({ destination: storage });



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'Images')
    },
    filename: function (req, file, cb) {
        const extension = file.mimetype.split('/')[1];
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + '.'+ extension)
    }
  })
  
  const upload = multer({ storage: storage })

module.exports ={
    
    upload

} 
