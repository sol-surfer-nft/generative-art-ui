// To convert dataUrl (which we get from our blob) to a a file object
export const dataURLtoFile = (dataurl, filename) => {
	const arr = dataurl.split(",");
	const mime = arr[0].match(/:(.*?);/)[1];
	const bstr = atob(arr[1]);
	let n = bstr.length;
	const u8arr = new Uint8Array(n);

	while (n--) u8arr[n] = bstr.charCodeAt(n);

	return new File([u8arr], filename, { type: mime });
};


// function getUrlByFileName(fileName,mimeType) {
// 	return new Promise(
// 			function (resolve, reject) {
// 					bucket.getObject({Key: fileName}, function (err, file) {
// 							var result =  mimeType + encode(file.Body);
// 							resolve(result)
// 					});
// 			}
// 	);
// }

// function encode(data)
// {
// 	var str = data.reduce(function(a,b){ return a+String.fromCharCode(b) },'');
// 	return btoa(str).replace(/.{76}(?=.)/g,'$&\n');
// }