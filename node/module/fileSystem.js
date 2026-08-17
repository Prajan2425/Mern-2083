import fs from 'fs';
//synchornus method 
//Read file
//  const result = fs.readFileSync("data/data.txt","utf8");
// console.log(result);

// const image = fs.readFileSync("data/image.jpg", "base64");
// console.log(image);

//write file
// fs.writeFileSync("data/file.txt", "This is the updated file");
fs.readFile("data/data.txt", "utf8", (error, data) => {
    if (error) {
        console.log(error);
    } else {
        console.log(data);
    }
});