import multer from "multer"

const upload = multer({
    dest: 'stagingUpload/'
})

const multerSingleFileMiddleware = upload.single('image')

export {
    multerSingleFileMiddleware
}