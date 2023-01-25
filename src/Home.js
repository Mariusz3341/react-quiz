import React, { useState } from "react";
import PrintButton from "./PrintButton";
import QuizDifficulty from "./QuizDifficulty";

function Home() {
  const [clickStartButton, setClickStartButton] = useState(false);

  function startQuiz() {
    setClickStartButton(true);
  }

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="card">
        <div className="card-body shadow">
          <div className="d-flex justify-content-center mb-4">
            <h1>Quiz wiedzy o podlasiu</h1>
          </div>

          <div className="d-flex justify-content-center">
            {!clickStartButton && (
              <PrintButton
                class="btn btn-success"
                type={"submit"}
                value={"Rozpocznij quiz"}
                onClickFn={startQuiz}
              />
            )}
            {clickStartButton && <QuizDifficulty />}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
