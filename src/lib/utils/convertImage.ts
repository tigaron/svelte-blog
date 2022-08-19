import createHmac from "create-hmac";
import { imgproxy } from "$lib/utils/variables";

function urlSafeBase64(url: Buffer | string) {
	return Buffer.from(url)
		.toString("base64")
		.replace(/=/g, "")
		.replace(/\+/g, "-")
		.replace(/\//g, "_");
};

function hexDecode(hex: string) {
	return Buffer.from(hex, "hex");
}

function sign(salt: string, target: string, key: string) {
	const hmac = createHmac("sha256", hexDecode(key));
	hmac.update(hexDecode(salt));
	hmac.update(target);
	return urlSafeBase64(hmac.digest());
};

function convertImage(url: string, option: string, extension: string, api = imgproxy.url, salt = imgproxy.salt, key = imgproxy.key) {
	const path = `/${option}/${urlSafeBase64(url)}.${extension}`;
	const signature = sign(salt, path, key);
	return `${api}/${signature}${path}`;
};

export default convertImage;
