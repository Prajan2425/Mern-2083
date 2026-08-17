//scenario: Read file 1 => succuess => Read file 2 => success => Read file 3.
import fs from "fs";
fs.readFile("data/file1.txt", "utf8", (error1, data1) => {
    if (error1) {
        console.log(error1)
    } else {
        fs.readFile("data/file2.txt", "utf8", (error2, data2) => {
            if (error2) {
                console.log(error2);
            } else {
                fs.readFile("data/file3.txt", "utf8", (error3, data3) => {
                    if (error3) {
                        console.log(error3);
                    } else {
                        console.log(data1);
                        console.log(data2);
                        console.log(data3);
                    }
                });
            }
        });
    }
});
    