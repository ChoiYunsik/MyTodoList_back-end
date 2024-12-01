import Todo from "../../models/todo_schema.js";
import { getCurrentTime } from "../../utils/utils.js";
const getTodo = async (req, res) => {
    const { email } = req.query;
    try {
         // 이메일을 요청 본문에서 가져옴
        const todos = await Todo.find( { email }); // 이메일에 해당하는 할 일 조회
        console.log(todos)
        res.json(todos); // 조회된 데이터를 클라이언트에 반환
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '서버 오류' });
    }
};

const registerTodo = async (req, res) => {
    const { email, title } = req.body;

    // 이메일과 제목으로 Todo가 이미 존재하는지 확인
    try {
        // 이메일로 기존 Todo 조회
        const existingTodo = await Todo.findOne({ email, title });

        // 동일한 제목의 Todo가 이미 존재하면 에러 응답
        if (existingTodo) {
            return res.status(400).json({ message: "This todo already exists" });
        }

        // 새로운 Todo 생성
        const newTodo = new Todo({
            email: email,
            title: title
        });

        await newTodo.save(); // Todo 저장
        res.status(201).json(newTodo); // 성공 응답
    } catch (error) {
        console.error("Error while saving todo:", error); // 에러 로그
        res.status(500).json({ message: "Server error" });
    }

    
}

const updateTodo = async (req, res) => {
    //console.log(req.body)
    const {isChecked, title} = req.body
    console.log(isChecked, title)
   
    // console.log(isChecked)
   
    const updated = await Todo.updateOne(
        {title : title},
        {isChecked : isChecked}
    );
    res.status(200).json(isChecked)
 
}
const deleteTodo = async (req, res) => {
    const { title } = req.body
    const deleted = await Todo.deleteOne(
        {title : title}
    )
    const updatedTodo = await Todo.find();
    res.status(200).json(updatedTodo)


    
}
 const updateTodoTitle = async (req, res) => {
    const { id, title } = req.body; // `id`와 `title`을 요청 본문에서 추출
    if (!id || !title) {
      return res.status(400).json({ message: 'Invalid data' });
    }
  
    try {
      // 특정 문서를 찾아 업데이트
      const updatedTitle = await Todo.updateOne(
        { _id: id }, // 필터 조건 (id로 찾기)
        { $set: { title } } // 변경할 필드
      );
  
      if (updatedTitle.matchedCount === 0) {
        return res.status(404).json({ message: 'Todo not found' });
      }
  
      // 업데이트 후 모든 할 일 목록 반환
      const updatedTodo = await Todo.find();
      res.status(200).json(updatedTodo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
 }


export {registerTodo, updateTodo, deleteTodo, getTodo, updateTodoTitle}
