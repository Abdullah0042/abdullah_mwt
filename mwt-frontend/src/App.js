import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ToDoList from "./ToDoList";
import EditTodo from "./EditTodo";
import NewTodo from "./addtodo";

function App() {
  return (
      <div className="App">
        <BrowserRouter>


          <Routes>
            <Route path="/" element={<ToDoList/>}/>
              <Route path="/edittodo/:id" element={<EditTodo/>}></Route>
              <Route path="/addtodo/" element={<NewTodo/>}></Route>
            {/* You can add more Route components here */}

          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;