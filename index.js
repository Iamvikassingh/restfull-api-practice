const express = require('express');
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const mongoose = require("mongoose");


const app = express();
const PORT = 8000;



// connection with mongoDB

mongoose.connect("mongodb://127.0.0.1:27017/youtube-app-1")
    .then(() => {
        console.log("connected to mongoDB");
    })
    .catch((err) => {
        console.log(err);
    })



const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,

    },
    last_name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },

    jobTitle: {
        type: String,
        required: true,
    }
},{timestamps:true})

const User = mongoose.model("Users", userSchema);

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
        return resp.json({ status: "pending" });
    })
    .delete((req, resp) => {
        return resp.json({ status: "pending" });
    })


app.post("/api/users", async (req, resp) => {
    const body = req.body;
    console.log("body", body)
    // users.push({ ...body, id: users.length + 1 });
    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    //     return resp.json({ status: "success", id: users.length });
    // })
    await User.create({
        first_name:body.first_name,
        last_name:body.last_name,
        jobTitle:body.jobTitle,
        email:body.email
    });
    return resp.status(200).json({ status: "success", id: users.length });
})



app.listen(PORT, () => console.log(`server is starting on the PORT : ${PORT}`)
);

