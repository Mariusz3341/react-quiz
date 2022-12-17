import React from "react";
import PropTypes from "prop-types";
import Error from "./Error";
import PrintInput from "./PrintInput";
import PrintButton from "./PrintButton";

class AddQuestion extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            newQuestion: {tresc: "", odpowiedzi: ["", "", "", ""], poprawnaOdpowiedz: ""},
            allFieldsFill: false,
            firstLetterUpperCase: false,
            answerMatch: false,
        };
    }

    handleSubmit = () => {
        const {addQuestion}  = this.props;
        if(this.state.firstLetterUpperCase && this.state.allFieldsFill && this.state.answerMatch){
            addQuestion(this.state.newQuestion);
            this.setState(prevState => {
                let prev = prevState.newQuestion;
                prev.tresc = "";
                prev.odpowiedzi[0] = "";
                prev.odpowiedzi[1] = "";
                prev.odpowiedzi[2] = "";
                prev.odpowiedzi[3] = "";
                prev.poprawnaOdpowiedz = "";
            });
            this.setState({allFieldsFill: false});
            this.setState({firstLetterUpperCase: false});
            this.setState({answerMatch: false});
        }
    }

    checkIfAllFieldsFilled = () => {
        if(this.state.newQuestion.tresc.length > 0 && this.state.newQuestion.poprawnaOdpowiedz.length>0 && this.state.newQuestion.odpowiedzi[0].length > 0
            && this.state.newQuestion.odpowiedzi[1].length > 0 && this.state.newQuestion.odpowiedzi[2].length > 0 && this.state.newQuestion.odpowiedzi[3].length > 0){
            this.setState({allFieldsFill: true});
        } else {
            this.setState({allFieldsFill: false})
        }
    }

    validateDataTresc = (e) => {
        let value = e.target.value;

        if(value.length ===0 || value[0] !== value[0].toUpperCase()){
            this.setState({firstLetterUpperCase: false});
        } else {
             this.setState({firstLetterUpperCase: true});
        }

        this.setState((prevState) => {
            let prev = prevState.newQuestion;
            prev.tresc = value;
            return {newQuestion: prev};
            }, this.checkIfAllFieldsFilled);    
    }
    
    validateDataPopOdp = (e) => {
        let value = e.target.value;

        this.setState(prevState => {
            let prev = prevState.newQuestion
            prev.poprawnaOdpowiedz = value;
            return {newQuestion: prev}
        }, this.checkIfAllFieldsFilled);

        if(value.length>=0 && (value === this.state.newQuestion.odpowiedzi[0] || value === this.state.newQuestion.odpowiedzi[1] 
            || value === this.state.newQuestion.odpowiedzi[2] || value === this.state.newQuestion.odpowiedzi[3])){
                this.setState({answerMatch: true});
            } else {
                this.setState({answerMatch: false});
            }
    }

    validateDataAnswers = (e) => {
        let id = e.target.id
        let value = e.target.value;
        let index = id.charAt(3) - 1;

        this.setState(prevState => {
            let prev = prevState.newQuestion
            prev.odpowiedzi[index] = value;
           return {newQuestion: prev}
        }, this.checkIfAllFieldsFilled)
    }

    render() {
        return (
            <div>
                <PrintInput label={"Podaj treść pytania: "} type={"text"} id={"tresc"} value={this.state.newQuestion.tresc} validateFn={this.validateDataTresc}/><br/>
                <PrintInput label={"Podaj pierwszą odpowiedź: "} type={"text"} id={"odp1"} value={this.state.newQuestion.odpowiedzi[0]} validateFn={this.validateDataAnswers}/><br/>
                <PrintInput label={"Podaj drugą odpowiedź: "} type={"text"} id={"odp2"} value={this.state.newQuestion.odpowiedzi[1]} validateFn={this.validateDataAnswers}/><br/>
                <PrintInput label={"Podaj trzecią odpowiedź: "} type={"text"} id={"odp3"} value={this.state.newQuestion.odpowiedzi[2]} validateFn={this.validateDataAnswers}/><br/>
                <PrintInput label={"Podaj czwartą odpowiedź: "} type={"text"} id={"odp4"} value={this.state.newQuestion.odpowiedzi[3]} validateFn={this.validateDataAnswers}/><br/>
                <PrintInput label={"Podaj poprawną odpowiedź: "} type={"text"} id={"popOdp"} value={this.state.newQuestion.poprawnaOdpowiedz} validateFn={this.validateDataPopOdp}/><br/>
                <Error status={this.state.allFieldsFill} info={"Wszystkie pola są wymagane!"}/><br/>
                <Error status={this.state.firstLetterUpperCase} info={"Pierwsza litera treści pytania z dużej litery!"}/><br/>
                <Error status={this.state.answerMatch} info={"Poprawna odpowiedź musi być taka sama jak jedna z odpowiedzi!"}/><br/>
                <PrintButton type={"submit"} value={"submit"} onClickFn={this.handleSubmit}/><br/>
            </div>
        );
    }
}

AddQuestion.propTypes = { 
    addQuestion: PropTypes.func
}

export default AddQuestion;