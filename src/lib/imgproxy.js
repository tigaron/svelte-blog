import createHmac from "create-hmac";
import { imgproxy } from "$lib/variables.js";

const urlSafeBase64 = (url) => {
	return Buffer.from(url)
		.toString("base64")
		.replace(/=/g, "")
		.replace(/\+/g, "-")
		.replace(/\//g, "_");
};

const hexDecode = (hex) => Buffer.from(hex, "hex");

const sign = (salt, target, key) => {
	const hmac = createHmac("sha256", hexDecode(key));
	hmac.update(hexDecode(salt));
	hmac.update(target);
	return urlSafeBase64(hmac.digest());
};

const convert = (url, option, extension, api = imgproxy.api, salt = imgproxy.salt, key = imgproxy.key) => {
	const path = `/${option}/${urlSafeBase64(url)}.${extension}`;
	const signature = sign(salt, path, key);
	return `${api}/${signature}${path}`;
};

export default convert;
