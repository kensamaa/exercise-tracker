const router =require('express').Router();
let Exercise=require('../models/exercise.model');//the monge user model 

//first inpoint that handles the incoming http get request
router.route('/').get((req,res)=>{
    Exercise.find()//mongo method that get all exercise from database
    .then(exercises=>res.json(exercises))//get all exercise then return in json format the users from database
    .catch(err=>res.status(400).json('error :'+err));
});
//first inpoint that handles the incoming http post request
router.route('/add').post((req,res)=>{
    const username=req.body.username;
    const description=req.body.description;
    const duration=Number(req.body.duration);
    const date=Date.parse(req.body.date);

    const newExercise=new Exercise({
        username,
        description,
        duration,
        date,
    });//create new instance of user
    newExercise.save()//save the user to database
    .then(()=>res.json("exercise added"))
    .catch(err=>res.status(400).json('error' +err));
});
//id is like a variable , if we did a get :id we l get the id of the id we insered
router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
      .then(exercise => res.json(exercise))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  //if we passed the object id it gonna delete it from the database
  router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
      .then(() => res.json('Exercise deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  //update the exrecise by id
router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
      .then(exercise => {
        exercise.username = req.body.username;
        exercise.description = req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);
  
        exercise.save()
          .then(() => res.json('Exercise updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;