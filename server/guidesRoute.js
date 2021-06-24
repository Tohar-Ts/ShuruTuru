const Guide = require('./mongooseModels/guides')

module.exports = {
    //read

    getGuides: function (req, res) {
        Guide.find().then(guides =>
            res.status(200).send(guides)
        ).catch(e => res.status(500).send("Error in finding the guide. " + e))
    },

    getGuide: function (req, res) {
        const guideName = req.params["guide_name"];
        Guide.findOne({ 'name':  guideName}).then(guide =>
            res.status(200).send(guide)
        ).catch(e => res.status(500).send("Error in finding the guide. " + e))
    },
    //create
    createGuide: function (req, res) {
        const guideName = req.body.name;
        if(!guideName){
            res.status(400).send("Guide name required.")
            return;
        }
        Guide.exists({ 'name':  guideName}, function(err, result) {
            if (err) {
                res.status(500).send("Error in checking if the guide exist. " + err)
                console.log("Error in checking if the guide exist. " + err)
            }
            else {
                if(result){
                    res.status(400).send("Guide with this name exist.")
                    console.log("Guide with this name exist. ")
                }
                else{
                //adding the new guide
                const guide = new Guide(req.body)

                guide.save()
                    .then(guide => 
                        res.status(200).send()
                    ).catch(e => {
                        res.status(500).send("Error in saving guide. " + e)
                        console.log("Error in saving guide. " + e)
                });
                }

            }
        })
    },
};
