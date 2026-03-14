import ImageKit from "@imagekit/nodejs";

type imagekitConfig = {
  publicKey: string;
  privateKey: string;
  urlEndpoint: string;
};

const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || "",
} as imagekitConfig);

const uploadFile = async (file: Buffer, fileName: string): Promise<string> => {
  const base64File = file.toString("base64");
  const response = await imageKit.files.upload({
    file: base64File,
    fileName: fileName,
  });
  return response.url || "";
};

export default uploadFile;
