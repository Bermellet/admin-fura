const express = require('express');
const router = express.Router();
// DB
const Question = require('../models/question.js');
const Answer = require('../models/answer.js');

// API DEFINITIONS
router.get('/questions/:id', getQuestion);
router.get('/questions', listQuestions);
router.post('/questions', addQuestion);
router.put('/questions/:id', updateQuestion);
router.delete('/questions/:id', removeQuestion);

// API ROUTINES
async function listQuestions(req, res, next){
	const perPage = parseInt(req.query._perPage);
	const start = (parseInt(req.query._page) - 1) * perPage;
	const sortBy = (req.query._sortDir == 'ASC' ? '' : '-') + req.query._sortField;

	const count = await Question.count(JSON.parse(req.query._filters || '{}')).exec();
	res.set("X-Total-Count", count);

	const questions = await Question.find(JSON.parse(req.query._filters || '{}')).sort(sortBy).skip(start).limit(perPage).exec();
	res.send(questions);
}

async function getQuestion(req, res, next){
	var data = await Question.findById(req.params.id).lean().exec();
	if(!data) return res.status(404).send('Not found');
	data.opcions = data.options.reduce((prev, curr)=>{if(!prev.length) return prev+curr; return prev+', '+curr}, '');
	console.log("Question: ", data);
	res.send(data);
}

async function updateQuestion(req, res, next){
	console.log('BODY: ', req.body);
	if(req.body.id_fura){
		var q = await Question.findOne({id_fura: req.body.id_fura}).lean().exec();
		if(q && q._id != req.body._id) return res.status(500).send({error: 'id_fura already exists'});
	}
	if(req.body.id_fura && !req.body.id_fura.length) return res.status(500).send({error: "Camp id_fura can't be empty"});
	if(req.body.text && !req.body.text.length) return res.status(500).send({error: "Camp text can't be empty"});
	if(req.body.group && !req.body.group.length) return res.status(500).send({error: "Camp group can't be empty"});
	if(req.body.opcions && !req.body.opcions.length) return res.status(500).send({error: "Camp options can't be empty"});
	// if(req.body.options){
	// 	var Option = req.body.options.reduce((prev,curr)=>{if(prev) return prev; else return !curr.length}, false);
	// 	if(Option) return res.status(500).send({error: "Can't have an empty option"});
	// }
	var quest = Object.assign({}, req.body);
	if(quest.opcions) quest.options = quest.opcions.split(',').map((str)=>{return str.trim().replace(/\s\s+/g, ' ')});

	console.log('Question: ', quest);

	const data = await Question.findByIdAndUpdate(req.params.id, quest).lean().exec();
	if(!data) return res.status(404).send('Not found');
	res.send(data);
}

async function addQuestion(req, res, next) {
	if(!req.body || !req.body.questionnaire || !req.body.id_fura || !req.body.group || !req.body.text || !req.body.opcions) return res.status(500).send({error: 'Missing parameters'});
	var count = await Question.find({id_fura: req.body.id_fura}).count().exec();
	if(count > 0) return res.status(500).send({error: 'id_fura already exists'});
	var quest = Object.assign({}, req.body);
	quest.options = quest.opcions.split(',').map((str)=>{return str.trim().replace(/\s\s+/g, ' ')});

	console.log('Question: ', quest);
	const data = await Question.create(quest);
	res.send(data);
}

async function removeQuestion(req, res, next){
        // Find all answers with question this ID and delete them (keep database coherent)
        var deleteAnswers = await Answer.find({quest:req.params.id}).select('_id').lean().exec();
        
        for (var i=0; i<deleteAnswers.length; i++) {
            await Answer.findByIdAndRemove(deleteAnswers[i]._id).exec();
        }
        
        await Question.findByIdAndRemove(req.params.id).exec();
        res.send({});
}

module.exports = router;
