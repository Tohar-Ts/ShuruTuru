const Guide = require('../mongoModels/guides')
module.exports = {

    //READ a spesific guide
    getGuide: function (req, res) {
        const guideName = req.params["guide_name"];
        Guide.findOne({ 'name':  guideName}).then(guide =>
            res.status(200).send(guide)
        ).catch(e => res.status(500).send("couldn't finde guide " + e))
    },

    //CREATE a new guide
    createGuide: function (req, res) {
        const guideName = req.body.name;
        if(!guideName){
            res.status(400).send("insert guide name!")
            return;
        }
        Guide.exists({ 'name':  guideName}, function(err, result) {
            if (err) {
                res.status(500).send("error" + err)
            }
            else {
                if(result){
                    res.status(400).send("Guide with the same name already exist.")
                }
                else{
                //add the new guide to mongodb
                const guide = new Guide(req.body)
                guide.save()
                    .then(guide => res.status(200).send()
                    ).catch(e => {
                        res.status(500).send("Error in adding guide to DataBase " + e)
                });
                }
            }
        })
    },
};
