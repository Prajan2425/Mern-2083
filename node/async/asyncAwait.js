
import fs from "fs/promises";

async function readData() {
    try {
        const data1 = await fs.readFile("data/file1.txt", "utf8");
        console.log(data1);
    } catch (error) {
        console.log(error);
    }
}
//readData();

const readMultipleData = async () => {
   try {
    const data1 = await fs.readFile("data/file1.txt", "utf8");
    const data2 = await fs.readFile("data/file2.txt", "utf8");
    const data3 = await fs.readFile("data/file3.txt", "utf8");
    console.log(data1);
    console.log(data2);
    console.log(data3);
} catch (error) {
    console.log(error);
   }
}

readMultipleData();