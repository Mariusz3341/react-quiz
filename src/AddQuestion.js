import React from "react";
import Error from "./Error";
import PrintInput from "./PrintInput";
import PrintButton from "./PrintButton";
import axios from "axios";
import { Navigate } from "react-router-dom";
import PrintLabel from "./PrintLabel";

class AddQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newQuestion: {
        tresc: "",
        odpowiedzi: ["", "", "", ""],
        poprawnaOdpowiedz: "",
      },
      allFieldsFill: false,
      firstLetterUpperCase: false,
      answerMatch: false,
      added: false,
    };
  }

  handleSubmit = () => {
    if (
      this.state.firstLetterUpperCase &&
      this.state.allFieldsFill &&
      this.state.answerMatch
    ) {
      axios
        .post("http://localhost:7777/questions/", {
          id: Math.floor(Math.random() * 1000),
          tresc: this.state.newQuestion.tresc,
          odpowiedzi: [
            this.state.newQuestion.odpowiedzi[0],
            this.state.newQuestion.odpowiedzi[1],
            this.state.newQuestion.odpowiedzi[2],
            this.state.newQuestion.odpowiedzi[3],
          ],
          poprawnaOdpowiedz: this.state.newQuestion.poprawnaOdpowiedz,
        })
        .then((response) => console.log(response.data))
        .catch((error) => console.log(error));

      this.setState((prevState) => {
        let prev = prevState.newQuestion;
        prev.tresc = "";
        prev.odpowiedzi[0] = "";
        prev.odpowiedzi[1] = "";
        prev.odpowiedzi[2] = "";
        prev.odpowiedzi[3] = "";
        prev.poprawnaOdpowiedz = "";
      });
      this.setState({ allFieldsFill: false });
      this.setState({ firstLetterUpperCase: false });
      this.setState({ answerMatch: false });
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
      <div className="d-flex flex-row justify-content-center">
        <div className="card p-3">
          <div className="card-body">
            <h2>Dodaj pytanie do quizu</h2>

            <div>
              <div className="form-group">
                <PrintLabel inner="Tre???? pytania: " />
                <PrintInput
                  type={"text"}
                  id={"tresc"}
                  class="form-control"
                  value={this.state.newQuestion.tresc}
                  validateFn={this.validateDataTresc}
                />
              </div>
              <div className="form-group">
                <PrintLabel inner="Pierwsza odpowied??: " />
                <PrintInput
                  type={"text"}
                  id={"odp1"}
                  class="form-control"
                  value={this.state.newQuestion.odpowiedzi[0]}
                  validateFn={this.validateDataAnswers}
                />
              </div>
              <div className="form-group">
                <PrintLabel inner="Druga odpowied??: " />
                <PrintInput
                  type={"text"}
                  id={"odp2"}
                  class="form-control"
                  value={this.state.newQuestion.odpowiedzi[1]}
                  validateFn={this.validateDataAnswers}
                />
              </div>
              <div className="form-group">
                <PrintLabel inner="Trzecia odpowied??: " />
                <PrintInput
                  type={"text"}
                  id={"odp3"}
                  class="form-control"
                  value={this.state.newQuestion.odpowiedzi[2]}
                  validateFn={this.validateDataAnswers}
                />
              </div>

              <div className="form-group">
                <PrintLabel inner="Czwarta odpowied??: " />
                <PrintInput
                  type={"text"}
                  id={"odp4"}
                  class="form-control"
                  value={this.state.newQuestion.odpowiedzi[3]}
                  validateFn={this.validateDataAnswers}
                />
              </div>

              <div className="form-group">
                <PrintLabel inner="Poprawna odpowied??: " />
                <PrintInput
                  type={"text"}
                  id={"popOdp"}
                  class="form-control"
                  value={this.state.newQuestion.poprawnaOdpowiedz}
                  validateFn={this.validateDataPopOdp}
                />
              </div>
            </div>

            <div className="d-inline-flex flex-column my-2">
              <Error
                status={this.state.allFieldsFill}
                info={"Wszystkie pola s?? wymagane!"}
              />

              <Error
                status={this.state.firstLetterUpperCase}
                info={"Pierwsza litera tre??ci pytania z du??ej litery!"}
              />

              <Error
                status={this.state.answerMatch}
                info={
                  "Poprawna odpowied?? musi by?? taka sama jak jedna z odpowiedzi!"
                }
              />
            </div>
          </div>

          <div className="d-flex flex-row justify-content-center">
            <PrintButton
              class="btn btn-success"
              type={"submit"}
              value={"Dodaj"}
              onClickFn={this.handleSubmit}
            />
          </div>

          {this.state.added && <Navigate to="/questions" />}
        </div>
      </div>
    );
  }
}

export default AddQuestion;
