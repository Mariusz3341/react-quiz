import React from "react";
import PrintButton from "./PrintButton";
import QuestionContent from "./QuestionContent";
import PrintInput from "./PrintInput";
import PrintLabel from "./PrintLabel";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class QuizQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      numberQuestion: 1,
      answer: "",
      inputValue: "Następne",
      points: 0,
      done: false,
    };
  }

  setNextQuestion = (e) => {
    e.preventDefault();

    if (
      this.state.answer ===
      this.props.questions[this.state.id].poprawnaOdpowiedz
    ) {
      this.setState((prevState) => {
        let prevPoints = prevState.points;
        prevPoints = prevPoints + 1;
        return { points: prevPoints };
      });
    }

    if (this.state.numberQuestion === this.props.difficulty - 1) {
      this.setState({ inputValue: "Zakończ" });
    }

    this.setState((prevState) => {
      let prevId = prevState.id;
      let prevNumberQuestion = prevState.numberQuestion;
      prevId = prevId + 1;
      prevNumberQuestion = prevNumberQuestion + 1;
      return { id: prevId, numberQuestion: prevNumberQuestion };
    });

    if (this.state.numberQuestion === this.props.difficulty) {
      this.setState({ done: true });
    }

    e.target[0].checked = false;
    e.target[1].checked = false;
    e.target[2].checked = false;
    e.target[3].checked = false;
  };

  setAnswer = (e) => {
    this.setState({ answer: e.target.value });
  };

  render() {
    return (
      <div className="d-flex justify-content-center">
        {!this.state.done && (
          <div>
            <span className="d-flex justify-content-center">
              Pytanie {this.state.numberQuestion + "/" + this.props.difficulty}
            </span>
            <div className="border border-secondary p-4 rounded">
              <div className="mb-4">
                <strong>
                  <QuestionContent
                    tresc={this.props.questions[this.state.id].tresc}
                  />
                </strong>
              </div>
              <form onSubmit={this.setNextQuestion}>
                <div>
                  <PrintInput
                    type="radio"
                    name="answer"
                    value={this.props.questions[this.state.id].odpowiedzi[0]}
                    validateFn={(e) => this.setAnswer(e)}
                  />
                  <PrintLabel
                    inner={this.props.questions[this.state.id].odpowiedzi[0]}
                  />
                </div>

                <div>
                  <PrintInput
                    type="radio"
                    name="answer"
                    value={this.props.questions[this.state.id].odpowiedzi[1]}
                    validateFn={(e) => this.setAnswer(e)}
                  />
                  <PrintLabel
                    inner={this.props.questions[this.state.id].odpowiedzi[1]}
                  />
                </div>

                <div>
                  <PrintInput
                    type="radio"
                    name="answer"
                    value={this.props.questions[this.state.id].odpowiedzi[2]}
                    validateFn={(e) => this.setAnswer(e)}
                  />
                  <PrintLabel
                    inner={this.props.questions[this.state.id].odpowiedzi[2]}
                  />
                </div>

                <div>
                  <PrintInput
                    type="radio"
                    name="answer"
                    value={this.props.questions[this.state.id].odpowiedzi[3]}
                    validateFn={(e) => this.setAnswer(e)}
                  />
                  <PrintLabel
                    inner={this.props.questions[this.state.id].odpowiedzi[3]}
                  />
                </div>

                <div className="d-flex justify-content-center mt-3">
                  <PrintButton
                    class="btn btn-primary"
                    value={this.state.inputValue}
                    type="submit"
                  />
                </div>
              </form>
            </div>
          </div>
        )}
        {this.state.done && (
          <div>
            <h4>
              Twój wynik to: {this.state.points + "/" + this.props.difficulty}
            </h4> <br/>
            <Link to={`/`}>
          <PrintButton
            class={"btn btn-primary"}
            type={"submit"}
            value={"Wróć na stronę główną"}
          />
        </Link>
          </div>
        )}
      </div>
    );
  }
}

QuizQuestion.propTypes = {
  questions: PropTypes.array,
  difficulty: PropTypes.number,
};

export default QuizQuestion;
