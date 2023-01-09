import React, { useEffect, useState } from "react";
import QuestionContent from "./QuestionContent";
import QuestionAnswers from "./QuestionAnswers";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import PrintButton from "./PrintButton";

function Question(props) {
  const { questionId } = useParams();
  const [question, setQuestion] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:7777/questions/${questionId}`)
      .then((response) => setQuestion(response.data));
  }, []);

  function deleteQuestion() {
    axios
      .delete(`http://localhost:7777/questions/${questionId}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
    navigate("/questions");
  }

  return (
    <div className="border border-secondary col-4 p-4 mx-5">
      <h2>Szczegóły pytania</h2>
      {question && (
        <b>
          <QuestionContent tresc={question.tresc} />
        </b>
      )}
      {question && <QuestionAnswers odpowiedzi={question.odpowiedzi} />}
      {question && (
        <Link to={`/questions/edit/${question.id}`}>
          <PrintButton
            class={"btn btn-warning"}
            type={"submit"}
            value={"Edytuj"}
          />
        </Link>
      )}
      &emsp;
      <PrintButton
        class={"btn btn-danger"}
        type={"submit"}
        value={"Usuń"}
        onClickFn={deleteQuestion}
      />
    </div>
  );
}

export default Question;
