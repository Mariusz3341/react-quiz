import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.send('Server with questions');
});

app.get('/questions', (req, res) => {
    fs.readFile('./questions.json', 'utf8', (err, questionsJson) => {
        if (err) {
            console.log("File read failed in GET /questions: "+ err);
            res.status(500).send('File read failed');
            return;
        }
        console.log("GET: /questions");
        res.send(questionsJson);
    });
});

app.get('/questions/:id', (req, res) => {
    fs.readFile('./questions.json', 'utf8', (err, questionsJson) => {
        if (err) {
            console.log("File read failed in GET /questions/" + req.params.id + ": "+ err);
            res.status(500).send('File read failed');
            return;
        }
        var questions = JSON.parse(questionsJson);
        var question = questions.find(questiontmp => questiontmp.id == req.params.id);
        if (!question) {
            console.log("Can't find question with id: " + req.params.id);
            res.status(500).send('Cant find question with id: ' + req.params.id);
            return;
        }
        var questionJSON = JSON.stringify(question);
        console.log("GET: /questions/" + req.params.id);
        res.send(questionJSON);
    });
});

app.post('/questions', (req, res) => {
    fs.readFile('./questions.json', 'utf8', (err, questionsJson) => {
        if (err) {
            console.log("File read failed in POST /questions: "+ err);
            res.status(500).send('File read failed');
            return;
        }
        var questions = JSON.parse(questionsJson);
        var question = questions.find(questiontmp => questiontmp.id == req.body.id);
        if (!question) {
            questions.push(req.body);
            var newList = JSON.stringify(questions);
            fs.writeFile('./questions.json', newList, err => {
                if (err) {
                    console.log("Error writing file in POST /questions: "+ err);
                    res.status(500).send('Error writing file questions.json');
                } else {
                    res.status(201).send(req.body);
                    console.log("Successfully wrote file questions.json and added new question with id = " + req.body.id);
                }
            });
        } else {
            console.log("Question by id = " + req.body.id + " already exists");
            res.status(500).send('Question by id = ' + req.body.id + ' already exists');
            return;
        }
    });
});

app.delete('/questions/:id', (req, res) => {
    fs.readFile('./questions.json', 'utf8', (err, questionsJson) => {
        if (err) {
            console.log("File read failed in DELETE /questions: "+ err);
            res.status(500).send('File read failed');
            return;
        }
        var questions = JSON.parse(questionsJson);
        var questionIndex = questions.findIndex(questiontmp => questiontmp.id == req.params.id);
        if (questionIndex != -1) {
            questions.splice(questionIndex, 1);
            var newList = JSON.stringify(questions);
            fs.writeFile('./questions.json', newList, err => {
                if (err) {
                    console.log("Error writing file in DELETE /questions/" + req.params.id+": "+ err);
                    res.status(500).send('Error writing file questions.json');
                } else {
                    res.status(204).send();
                    console.log("Successfully deleted question with id = " + req.params.id);
                }
            });
        } else {
            console.log("Question by id = " + req.params.id + " does not exists");
            res.status(500).send('Question by id = ' + req.params.id + ' does not exists');
            return;
        }
    });
});

app.put('/questions/:id', (req, res) => {
    fs.readFile('./questions.json', 'utf8', (err, questionsJson) => {
        if (err) {
            console.log("File read failed in PUT /questions/" + req.params.id+": "+ err);
            res.status(500).send('File read failed');
            return;
        }
        var questions = JSON.parse(questionsJson);
        var questionBody = questions.find(questiontmp => questiontmp.id == req.body.id);
        if (questionBody && questionBody.id != req.params.id) {
            console.log("Question by id = " + questionBody.id + " already exists");
            res.status(500).send('Question by id = ' + questionBody.id + ' already exists');
            return;
        }
        var question = questions.find(questiontmp => questiontmp.id == req.params.id);
        if (!question) {
            questions.push(req.body);
            var newList = JSON.stringify(questions);
            fs.writeFile('./questions.json', newList, err => {
                if (err) {
                    console.log("Error writing file in PUT /questions/" + req.params.id+": "+err);
                    res.status(500).send('Error writing file questions.json');
                } else {
                    res.status(201).send(req.body);
                    console.log("Successfully wrote file questions.json and added new question with id = " + req.body.id);
                }
            });
        } else {
            for (var i = 0; i < questions.length; i++) {
                console.log(questions[i].id);
                if (questions[i].id == question.id) {
                    questions[i] = req.body;
                    
                }
            }
            var newList = JSON.stringify(questions);
            fs.writeFile('./questions.json', newList, err => {
                if (err) {
                    console.log("Error writing file in PUT /questions/" + req.params.id+": "+ err);
                    res.status(500).send('Error writing file questions.json');
                } else {
                    res.status(200).send(req.body);
                    console.log("Successfully wrote file questions.json and edit question with old id = " + req.params.id);
                }
            });
        }
    });
});

app.listen(7777, () => console.log("Server address http://localhost:7777"));