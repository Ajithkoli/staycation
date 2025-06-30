const cloudinary=require('cloudinary').v2;
const {CloudinaryStorage}=require('multer-storage-cloudinary');

console.log("🔍 ENV CHECK:");
console.log("CLOUD_NAME:", process.env.CLOUD_NAME);
console.log("CLOUD_API_KEY:", process.env.CLOUD_API_KEY);
console.log("CLOUD_API_SECRET:", process.env.CLOUD_API_SECRET ? "✔️ Present" : "❌ Missing");

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
    
})

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'wanderlust_DEV',
    allowed_formats: ['jpeg', 'png', 'jpg'], // supports promises as well
  },
});

module.exports={
    cloudinary,
    storage
}