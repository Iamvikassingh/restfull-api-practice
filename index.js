const express = require('express');
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: false })); //middleware

app.get('/users', (req, resp) => {
    const html = `
        <ul>
            ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
        </ul>
    `
    return resp.send(html)
})

app.get('/api/users', (req, resp) => {
    return resp.json(users)
})

app.route('/api/users/:id')
    .get((req, resp) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        return resp.json(user)
    })
    .patch((req, resp) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        user.push({...body , id});
        fs.appendFile("./MOCK_DATA.json",JSON.stringify(users), (err,data)=>{
            if(err) console.error(err);
            else console.log(data);
        })
        return resp.json({ status: "pending" });
    })
    .delete((req, resp) => {
        return resp.json({ status: "pending" });
    })


app.post("/api/users", (req, resp) => {
    const body = req.body;
    console.log("body", body)
    users.push({ ...body, id: users.length + 1 });
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return resp.json({ status: "success", id: users.length });
    })
})



app.listen(PORT, () => console.log(`server is starting on the PORT : ${PORT}`)
);