import React from "react";
import Review from "./Review";
import AddQuestion from "./AddQuestion";

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [
        {
          id: 1,
          tresc: "Stolicą wojewódzwa podlaskiego jest:",
          odpowiedzi: ["Bielsk Podlaski", "Suwałki", "Białystok", "Augustów"],
          poprawnaOdpowiedz: "Białystok",
        },
        {
          id: 2,
          tresc: "Podlasie graniczy z:",
          odpowiedzi: [
            "Litwą i Białorusią",
            "Niemcami",
            "Ukrainą i Białorusią",
            "Czechami",
          ],
          poprawnaOdpowiedz: "Litwą i Białorusią",
        },
        {
          id: 3,
          tresc: "Sławną poetką z podlasia jest: ",
          odpowiedzi: [
            "Maria Konopnicka",
            "Wisława Szymborska",
            "Maria Pawlikowska-Jasnorzewska",
            "Maria Dąbrowska",
          ],
          poprawnaOdpowiedz: "Maria Konopnicka",
        },
        {
          id: 4,
          tresc: "Gdzie w Polsce leży podlasie: ",
          odpowiedzi: [
            "na zachodzie",
            "na południu",
            "na północnym-wschodzie",
            "na południowym-wschodzie",
          ],
          poprawnaOdpowiedz: "na północnym-wschodzie",
        },
      ],
    };
  }

  addNewQuestion = (question) => {
    this.setState((prevState) => {
      let prev = prevState.questions;
      prev.push({
        id: prev.length + 1,
        tresc: question.tresc,
        odpowiedzi: [
            question.odpowiedzi[0],
            question.odpowiedzi[1],
            question.odpowiedzi[2],
            question.odpowiedzi[3],
        ],
        poprawnaOdpowiedz: question.poprawnaOdpowiedz,
      });
      return { questions: prev };
    });
  };


  render() {
    return (
      <div>
        <Review questions={this.state.questions} />
        <AddQuestion addQuestion={this.addNewQuestion} />
      </div>
    );
  }
}

export default Quiz;
