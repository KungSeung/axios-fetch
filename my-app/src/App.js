import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
const server_URL = "http://localhost:4000/api/todo";

function App() {
  const [todoList, setTodoList] = useState(null);

  // 코드 중복 방지
  // 함수이용
  const fetchData = () => {
    fetch("http://localhost:4000/api/todo")
      .then((res) => res.json())
      .then((data) => setTodoList(data));
  };

  const axiosData = async () => {
    const response = await axios.get("http://localhost:4000/api/todo");
    setTodoList(response.data);
  };

  // 그냥 fetch 하면 get 요청이다
  useEffect(() => {
    axiosData();
  }, []);

  // onsubmit을 클릭하면 기본기능이 있다
  // query-parameter에 name이랑 값을 넣고 GET요청을 보내버림
  // 이 기본동작을 막는게 e.preventDefault()
  const onsubmitHandler = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    const done = e.target.done.checked;
    // axios로 데이터를 post 요청
    // axios 쓰는 이유 method, header, body 안 써도 자동으로 설정해줌
    // fetch 보다 코드도 적고 편하다.
    await axios.post(server_URL, { text, done });
    axiosData();

    // fetch로 데이터 요청
    // fetch("http://localhost:4000/api/todo", {
    //   method: "POST",
    //   headers: {
    //     "content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     text,
    //     done,
    //   }),
    // }).then(fetchData());
  };

  return (
    <div className="App">
      <div>TODO List</div>
      <form onSubmit={onsubmitHandler}>
        <input name="text"></input>
        <input name="done" type="checkbox"></input>
        <input type="submit" value="추가"></input>
      </form>
      {/* null 값을 참조하는 ㅈ같은 경우가 간혹있다 */}
      {/* todoList?. 이런식으로 선언해주면됨 */}
      <div style={{ display: "flex" }}>
        {todoList?.map((item) => (
          <div key={item.id}>
            <div>{item.id}</div>
            <div>{item.text}</div>
            <div>{item.done ? "y" : "n"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
