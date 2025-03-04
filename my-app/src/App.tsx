import Button from "./components/Button/Button";

function App() {
  return (
    <div className="container">
      <h1>회원 목록</h1>
      <Button variant="add">+ 추가</Button>
      <Button variant="cancel">취소</Button>
      <Button variant="save">저장</Button>
    </div>
  );
}

export default App;
