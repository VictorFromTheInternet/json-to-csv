const router = require('express').Router()
const user = require('../models/User_Model')

router.get('/', async (req, res) => {
    
    try{
        const fieldsToExclude = ['-__v', '-createdAt', '-updatedAt'].join(' ')
        const submissionData = await user.find().select(fieldsToExclude)
        if(!submissionData){
            return res.status(404).send({"message":"No users found"})
        }
        res.status(200).send(submissionData)

    }catch(err){
        console.error(err)
        res.status(500).send({"message":`Error fetching users: ${err}`})
    }
})


module.exports = router