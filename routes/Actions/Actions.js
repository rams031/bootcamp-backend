const express = require('express')

const view = (model, res) => {
    model.find().then( response => {
        res.status(200).send(response)
    }).catch((err) => {
        res.send(500).send(err.message)
    })
}

const viewID = (model, params, res) => {
    model.find({ _id: params }).then( response => {
        res.status(200).send(response)
    }).catch((err) => {
        res.send(500).send(err.message)
    })
}

const create = (model, body, res) => {
    model.create(body).then( response => {
        res.status(200).send(response)
    }).catch((err) => {
        res.send(500).send(err.message)
    })
}

const login = () => {
    model.find({ email: req.body.email })
    .then( user => {
        //const valid = 
        //res.status(200).send(response)
    }).catch((err) => {
        res.send(500).send(err.message)
    })
}

const edit = (model, id, body, res) => {
    model.findOneAndUpdate({ _id : id }, body, {new: true}).then( response => {
        res.status(200).send(response)
    })
    .catch(err => {
        res.status(500).send(err.message);
    })
}

const deleteID = (model, id, res) => {
    model.findOneAndDelete({ _id : id }).then( response => {
        res.status(200).send(response)
    })
    .catch(err => {
        res.status(500).send(err.message);
    })
}

const validateID = (model, id, res) => {

    model.findOne({ _id : id }).then( response => {
        console.log(response)
        response.validateUser();
        return response.save();
    }).then( response => {
        res.send(response)
    })
    .catch(err => {
        res.status(500).send(err.message);
    })
}

module.exports = {
    view, 
    viewID, 
    create, 
    edit, 
    deleteID, 
    validateID
};