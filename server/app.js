const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

// 웹에서 body에 데이터를 담아서 보내는데
// 이를 사용하기 위해선 parsing해야됨
// 다음 두 줄이 필요
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let id = 2;

const user = [
  {
    id: 1,
    text: "dd",
    done: false,
  },
];

app.get("/api/todo", (req, res) => {
  res.json(user);
});

app.post("/api/todo", (req, res) => {
  const { text, done } = req.body;
  console.log(req.body);
  user.push({
    id: id++,
    text,
    done,
  });
  return res.send("success");
});

// 웹과 서버의 포트는 다르게 열어줘야한다
app.listen(4000, function () {
  console.log("Example app listening on port 4000!");
});
