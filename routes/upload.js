const multer = require('multer')
const Minio = require('minio')
const express = require("express")
const router = express.Router()

const minioClient = new Minio.Client({
  endPoint: 'localhost',
  port: 9000,
  useSSL: false,
  accessKey: 'minioadmin',
  secretKey: 'minioadmin'
})

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const generatePresignedUrl = async (bucketName, objectName, expirationTime) => {
  try {
    const url = await minioClient.presignedGetObject(bucketName, objectName, expirationTime)
    return url
  } catch (error) {
    console.error('Error generating presigned URL:', error)
    throw error
  }
}

router.post('/', upload.single('audio'), async (req, res) => {
  const file = req.file

  if (!file) {
    return res.status(400).send('Please upload an audio file')
  }

  const metaData = {
    'Content-Type': file.mimetype
  }

  const bucketName = req.body.username

  if (!bucketName) {
    return res.send('No username given')
  }

  const objectName = 'audio/' + file.originalname
  const bucketExists = await minioClient.bucketExists(bucketName)

  if (!bucketExists) {
    await minioClient.makeBucket(bucketName)
  }

  try {
    await minioClient.putObject(bucketName, objectName, file.buffer, metaData)
    const url = await generatePresignedUrl(bucketName, objectName, 60 * 60) // Expiration time is 1 hour
    return res.status(200).send(url)
  } catch (error) {
    console.error('Error uploading file to MinIO:', error)
    return res.status(500).send('Error uploading file to MinIO')
  }
})

module.exports = router
