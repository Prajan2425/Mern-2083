import http from "http";
const server = http.createServer((request, response) => {
    response.end ("Hello World");

    switch (request.url) {
        case "/":
            response.end("Hello World");
            break;
        case "/about":
            response.end("About Page");
            break;
        default:
            response.end("404 Not Found");
    }
});

server.listen(2000);