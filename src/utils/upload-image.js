// import cloudinary from "./cloudinary";

// export const UploadImage= async(file,folder)=>{

//   let buffer= await file.arrayBuffer();
//   let bytes= Buffer.from(buffer)

//   await new Promise(async(resolve, reject) => {
//    await cloudinary.uploader.upload_stream({
//       resource_type:"auto",
//       folder:folder
//     },async (err,result)=>{
//       if(err){
//         reject(err.message)
//       }
//       return resolve(result)
//     }).end(bytes)
//   });

// }

import cloudinary from "./cloudinary";

export const UploadImage = async (file, folder) => {
  const buffer = await file.arrayBuffer();
  const bytes = Buffer.from(buffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        folder: folder,
      },
      (err, result) => {
        if (err) {
          return reject(err.message);
        }
        resolve(result);
      }
    ).end(bytes);
  });
};

export const deleteImage = async (public_id) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(public_id, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};
