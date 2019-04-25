module.exports = {
  uploadToAws(req, res, next) {
    const multer = require('multer')
    const multerS3 = require('multer-s3')
    const aws = require('aws-sdk')

    aws.config.update({
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      region: process.env.AWS_REGION,
    })

    const s3 = new aws.S3()

    const upload = multer({
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
      fileFilter: (req, file, cb) => {
        if (['image/jpeg', 'image/png'].includes(file.mimetype)) {
          cb(null, true)
        }
        cb(null, false)
      },
      storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET,
        acl: 'public-read-write',
        metadata: (req, file, cb) => {
          cb(null, {fieldName: 'image'})
        },
        key: (req, file, cb) => {
          cb(null, `${Date.now().toString()}_${file.originalname}`)
        }
      }),
    })

    return upload.single('image')(req, res, next)
  },
  saveToDb(knex, image) {
    return knex('images')
      .insert(image)
      .returning('*')
  }
}