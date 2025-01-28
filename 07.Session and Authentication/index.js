import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("It works");
});


app.get('/set-cookie', (req, res)=>{
    res.writeHead(200, {'Set-Cookie': 'username=John'}); res.end();
    //res.setHeader()
});

app.get('/get-cookie-manually', (req, res)=>{
    const cookie=req.header('Cookie');
    console.log(cookie);
    res.send("Cookie taken");
})

app.listen(3000, () =>
  console.log("Server listening on http://localhost:3000")
);

