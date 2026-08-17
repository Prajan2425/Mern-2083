//Promise
import fs from "fs/promises";
// fs.readFile("data/data.txt", "utf8").then((data)=>{
//     console.log(data);
// }).catch((error)=>{
//     console.log(error);
// })
// .finally(()=>{
//     console.log("Finally");
// });

fs.readFile("file1.txt", "utf8")

.then((data1)=>{
    console.log(data1);
    return fs.readFile("file2.txt", "utf8");
})
.then((data2)=> {
    console.log(data2);
    return fs.readFile("file3.txt", "utf8");
})
.then((data3)=>{
    console.log(data3);
})
.catch((error)=>{
    console.log(error);
}); 