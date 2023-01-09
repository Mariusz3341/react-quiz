import React from "react";
import PrintInput from "./PrintInput";
import PrintButton from "./PrintButton";
import Error from "./Error";
import { Navigate } from "react-router-dom";
import axios from "axios";
import withRouter from "./withRouter";
import PrintLabel from "./PrintLabel";
import PropTypes from "prop-types";

class EditQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newQuestion: {
        tresc: "",
        odpowiedzi: ["", "", "", ""],
        poprawnaOdpowiedz: "",
      },
      allFieldsFill: true,
      firstLetterUpperCase: true,
      answerMatch: true,
      id: this.props.params.questionId,
      added: false,
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:7777/questions/${this.state.id}`)
      .then((response) => {
        this.setState({ newQuestion: response.data });
      });
  }

  handleSubmit = () => {
    if (
      this.state.firstLetterUpperCase &&
      this.state.allFieldsFill &&
      this.state.answerMatch
    ) {
      console.log(this.state.newQuestion);
      axios
        .put(`http://localhost:7777/questions/${this.state.id}`, {
          id: Number(this.state.id),
          tresc: this.state.newQuestion.tresc,
          odpowiedzi: [
            this.state.newQuestion.odpowiedzi[0],
            this.state.newQuestion.odpowiedzi[1],
            this.state.newQuestion.odpowiedzi[2],
            this.state.newQuestion.odpowiedzi[3],
          ],
          poprawnaOdpowiedz: this.state.newQuestion.poprawnaOdpowiedz,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err.response.data);
        });

      this.setState({ added: true });
    }
  };

  checkIfAllFieldsFilled = () => {
    if (
      this.state.newQuestion.tresc.length > 0 &&
      this.state.newQuestion.poprawnaOdpowiedz.length > 0 &&
      this.state.newQuestion.odpowiedzi[0].length > 0 &&
      this.state.newQuestion.odpowiedzi[1].length > 0 &&
      this.state.newQuestion.odpowiedzi[2].length > 0 &&
      this.state.newQuestion.odpowiedzi[3].length > 0
    ) {
      this.setState({ allFieldsFill: true });
    } else {
      this.setState({ allFieldsFill: false });
    }
  };

  validateDataTresc = (e) => {
    let value = e.target.value;

    if (value.length === 0 || value[0] !== value[0].toUpperCase()) {
      this.setState({ firstLetterUpperCase: false });
    } else {
      this.setState({ firstLetterUpperCase: true });
    }

    this.setState((prevState) => {
      let prev = prevState.newQuestion;
      prev.tresc = value;
      return { newQuestion: prev };
    }, this.checkIfAllFieldsFilled);
  };

  validateDataPopOdp = (e) => {
    let value = e.target.value;

    this.setState((prevState) => {
      let prev = prevState.newQuestion;
      prev.poprawnaOdpowiedz = value;
      return { newQuestion: prev };
    }, this.checkIfAllFieldsFilled);

    if (
      value.length >= 0 &&
      (value === this.state.newQuestion.odpowiedzi[0] ||
        value === this.state.newQuestion.odpowiedzi[1] ||
        value === this.state.newQuestion.odpowiedzi[2] ||
        value === this.state.newQuestion.odpowiedzi[3])
    ) {
      this.setState({ answerMatch: true });
    } else {
      this.setState({ answerMatch: false });
    }
  };

  validateDataAnswers = (e) => {
    let id = e.target.id;
    let value = e.target.value;
    let index = id.charAt(3) - 1;

    this.setState((prevState) => {
      let prev = prevState.newQuestion;
      prev.odpowiedzi[index] = value;
      return { newQuestion: prev };
    }, this.checkIfAllFieldsFilled);
  };

  render() {
    return (
      <div className="border border-secondary col-4 p-4 mx-5 flex-column">
        <h2>Edytuj pytanie</h2>

        <div className="d-inline-flex flex-column">
          <div className="d-inline-flex  justify-content-end">
            <PrintLabel inner="Podaj treść pytania: " />
            <PrintInput
              type={"text"}
              id={"tresc"}
              value={this.state.newQuestion.tresc}
              validateFn={this.validateDataTresc}
            />
          </div>

          <div className="d-inline-flex  justify-content-end">
            <PrintLabel inner="Podaj pierwszą odpowiedź: " />
            <PrintInput
              type={"text"}
              id={"odp1"}
              value={this.state.newQuestion.odpowiedzi[0]}
              validateFn={this.validateDataAnswers}
            />
          </div>
          <div className="d-inline-flex  justify-content-end">
            <PrintLabel inner="Podaj drugą odpowiedź: " />
            <PrintInput
              type={"text"}
              id={"odp2"}
              value={this.state.newQuestion.odpowiedzi[1]}
              validateFn={this.validateDataAnswers}
            />
          </div>
          <div className="d-inline-flex  justify-content-end">
            <PrintLabel inner="Podaj trzecią odpowiedź: " />
            <PrintInput
              type={"text"}
              id={"odp3"}
              value={this.state.newQuestion.odpowiedzi[2]}
              validateFn={this.validateDataAnswers}
            />
          </div>
          <div className="d-inline-flex  justify-content-end">
            <PrintLabel inner="Podaj czwartą odpowiedź: " />
            <PrintInput
              type={"text"}
              id={"odp4"}
              value={this.state.newQuestion.odpowiedzi[3]}
              validateFn={this.validateDataAnswers}
            />
          </div>
          <div className="d-inline-flex  justify-content-end">
            <PrintLabel inner="Podaj poprawną odpowiedź: " />
            <PrintInput
              type={"text"}
              id={"popOdp"}
              value={this.state.newQuestion.poprawnaOdpowiedz}
              validateFn={this.validateDataPopOdp}
            />
          </div>
        </div>

        <div className="d-inline-flex flex-column my-2">
          <Error
            status={this.state.allFieldsFill}
            info={"Wszystkie pola są wymagane!"}
          />

          <Error
            status={this.state.firstLetterUpperCase}
            info={"Pierwsza litera treści pytania z dużej litery!"}
          />

          <Error
            status={this.state.answerMatch}
            info={
              "Poprawna odpowiedź musi być taka sama jak jedna z odpowiedzi!"
            }
          />
        </div>

        <div>
          <PrintButton
            class="btn btn-warning"
            type={"submit"}
            value={"Edytuj"}
            onClickFn={this.handleSubmit}
          />
        </div>

        {this.state.added && <Navigate to="/questions" />}
      </div>
    );
  }
}

EditQuestion.propTypes = {
  id: PropTypes.number,
};

export default withRouter(EditQuestion);