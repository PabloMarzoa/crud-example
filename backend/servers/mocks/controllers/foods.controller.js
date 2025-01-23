const fs = require("fs");
const path = require("path");
let foods = [];

fs.readFile(path.resolve(__dirname, "../../../bbdd/bbdd.json"), "utf8", (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err);
        return;
    }
    foods = JSON.parse(jsonString);
    console.log("File data:", jsonString);
});

const getFood = (req, res, next) => {
    const index = foods.data.findIndex(el =>  el.id + '' === req.url.replace('/', ''));
    if (index === -1) {
        // NOT FOUND TEST
        res.status(404, {
            errors: [
                {
                    "code": "404",
                    "message": "Not Found",
                    "level": "FATAL",
                    "description": "Description of the Not Found error"
                }
            ]
        }).send();
    } else {
        // SUCCESS
        res.setHeader("content-type", "application/json");
        res.status(200)
            .send(foods.data[index]);
    }

    // ERROR TEST
    // res.status(500, {
    //   errors: [
    //     {
    //       "code": "500",
    //       "message": "Internal Server Error",
    //       "level": "FATAL",
    //       "description": "Description of the Internal Server Error error"
    //     }
    //   ]
    // }).sendStatus();
};

const getFoods = (req, res, next) => {
    // SUCCESS
    res.setHeader("content-type", "application/json");
    res.status(200)
        .send(foods.data);

    // ERROR TEST
    // res.status(500, {
    //   errors: [
    //     {
    //       "code": "500",
    //       "message": "Internal Server Error",
    //       "level": "FATAL",
    //       "description": "Description of the Internal Server Error error"
    //     }
    //   ]
    // }).sendStatus();
};

const postFood = (req, res, next) => {
    const index = foods.data.findIndex(el =>  el.id + '' === req.url.replace('/', ''));
    if (index === -1) {
        // NOT FOUND TEST
        res.status(404, {
            errors: [
                {
                    "code": "404",
                    "message": "Not Found",
                    "level": "FATAL",
                    "description": "Description of the Not Found error"
                }
            ]
        }).send();
    } else {
        if(req.body.id === foods.data[index].id) {
            // SUCCESS
            for (var prop in req.body) {
                foods.data[index][prop] = req.body[prop];
            }
            writeBBDD(foods);
            res.setHeader("content-type", "application/json");
            res.status(200)
                .send(foods.data);
        } else {
            // CONFLICT
            res.status(409, {
                errors: [
                    {
                        "code": "409",
                        "message": "Conflict",
                        "level": "FATAL",
                        "description": "You can not change the id"
                    }
                ]
            }).send();
        }
    }

    // ERROR TEST
    /*res.status(500, {
        errors: [
            {
                code: "500",
                message: "Internal Server Error",
                level: "FATAL",
                description: "Service Unavailable",
            },
        ],
    });*/
};

const putFood = (req, res, next) => {
    const index = foods.data.findIndex(el =>  el.id === req.body.id);
    if (index === -1) {
        // SUCCESS
        foods.data.push(req.body);
        writeBBDD(foods);
        res.setHeader("content-type", "application/json");
        res.status(200)
            .send(foods.data);
    } else {
        // CONFLICT
        res.status(409, {
            errors: [
                {
                    "code": "409",
                    "message": "Conflict",
                    "level": "FATAL",
                    "description": "Item with same index found"
                }
            ]
        }).send();
    }

    // ERROR TEST
    /*res.status(500, {
        errors: [
            {
                code: "500",
                message: "Internal Server Error",
                level: "FATAL",
                description: "Service Unavailable",
            },
        ],
    });*/
};

const deleteFood = (req, res, next) => {
    const index = foods.data.findIndex(el =>  el.id + '' === req.url.replace('/', ''));
    if (index === -1) {
        // NOT FOUND TEST
        res.status(404, {
            errors: [
                {
                    "code": "404",
                    "message": "Not Found",
                    "level": "FATAL",
                    "description": "Description of the Not Found error"
                }
            ]
        }).send();
    } else {
        // SUCCESS
        foods.data.splice(index, 1);
        writeBBDD(foods);
        res.setHeader("content-type", "application/json");
        res.status(200)
            .send(foods.data);
    }

    // ERROR TEST
    /*res.status(500, {
        errors: [
            {
                code: "500",
                message: "Internal Server Error",
                level: "FATAL",
                description: "Service Unavailable",
            },
        ],
    });*/
};

function writeBBDD(data) {
    fs.writeFile(path.resolve(__dirname, "../../../bbdd/bbdd.json"), JSON.stringify(data), err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })
}

module.exports = {
    getFood,
    getFoods,
    postFood,
    putFood,
    deleteFood
};
