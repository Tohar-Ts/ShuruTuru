const Tours = require('../mongoModels/tours'),
Tour = Tours.Tour,
Site = Tours.Site,
Guide = require('../mongoModels/guides');

module.exports = {
    //READ
    getTours: function (req, res) {
        Tour.find().populate('guide').sort({name:1}).then(tours =>{
            res.status(200).send(tours)
        }
        ).catch(e => res.status(500).send("There is an error on find the tours"+ e))
        
    },
    
    getTour: function (req, res) {
        const tourName = req.params["tour_name"];
        Tour.findOne({ 'name':  tourName}).populate('guide').then(tour =>
            res.status(200).send(tour)
        ).catch(e => res.status(400).send("This tour doesn't exist" + e))
    },
  
    //CREATE
    createTour: function (req, res) {

        const nameGuide = req.body.guide;
        console.log("guide name: " + nameGuide);
        if(!nameGuide){
            res.status(400).send("The name of the guide is required field")
            return;
        }
        Guide.findOne({ 'name':  nameGuide}).then(guide =>{

            //found the specific guide in the db and update id
            let guideId = guide._id.toString();
            req.body.guide = guideId;

            const nameTour = req.body.name;
            if(!nameTour){
                res.status(400).send("Tour name required.")
                return;
            }
            //we check if tour with this name is exist
            Tour.exists({ 'name':  nameTour}, function(err, result) {
                
                if (err) {
                    res.status(500).send("Error in checking if the Tour exists. " + err)
                }
                else {
                    if(result){
                        //There is a tour with this name already
                        res.status(400).send("tour with this name exists already")
                        console.log("tour with this name exists already")
                    }
                    else{
                        // create a the new tour is there no tour with this name -
                        const tour = new Tour(req.body); 

                        tour.save()
                            .then(tour => 
                            res.status(200).send()
                        ).catch(e => {
                            res.status(500).send("There is an error in saving the tour" + e)
                        });
                    }
                
                }
            });
        
        }).catch(e => {
            res.status(400).send("error in getting guide")
        });
    
    },
    
   
    //DELETE


    //delete the site
    deleteSite: function (req, res) {

        const tourName = req.params["tour_name"];
        const siteName = req.params["site_name"];

         //check if there is a tour with this name
         Tour.exists({'name': tourName}, function(err, result) {
            if (err) {
                res.status(500).send(e);
                console.log("error to check if tour exist" + err);
            }
            else {
                if(result){
                    //found tour with this name and check if there is a site with this name
                    Tour.exists({'name': tourName, "path.name": siteName}, function(err, result) {
                        if (err) {
                            res.status(500).send(e);
                            console.log("error to checking if site exist" + err);
                        }
                        else {
                            if(result){
                                // we found this site in this tour so we delete this path
                                Tour.updateOne( { name: tourName }, { $pull: { 'path': { name: siteName} }}
                                    ).then(user => {
                                        res.status(200).send()
                                    }).catch(e => {
                                        res.status(500).send(e)
                                    })
                            }
                            else{
                                //we did't found this site in this tour
                                console.log("This site don't exist in this tour")
                                res.status(400).send("This site don't exist in this tour")
                            }
                        }
                    
                    }) 
                }
                else{
                    //didn't find this tour
                    console.log("This tour don't exist.")
                    res.status(400).send("This tour don't exist.")
                }
            }
        })
    },

   //delete tour
    deleteTour: function (req, res) {
        const tourName = req.params["tour_name"];
        
        //making sure we got the tour name
        if(!tourName){
            res.status(400).send("Tour name required.")
            return;
        }
        
        //check if a tour with this name exist
        Tour.exists({ 'name':  tourName}, function(err, result) {
            
            if (err) {
                res.status(500).send(e);
                console.log("error check if tour exist" + err);
            }
            else {
                if(result){
                     //found the tour so we delete it
                    Tour.deleteOne( { name: tourName }).then(t => {
                        console.log(tourName +"is delete")
                        res.status(200).send()
                    }).catch(e => res.status(500).send(e));
                }
                else{
                    //didnt find a tour with this name
                    console.log("tour with this name don't exists")
                    res.status(400).send("tour with this name don't exists")
                }
            }
        })   
    },

 //UPDATE
 updateTour: function (req, res) {

    const tourName = req.params["tour_name"];
    const updates = Object.keys(req.body)
    const toUpdates = ['start_date', 'duration', 'price']
    const validToUpdates = updates.every((update) => toUpdates.includes(update))

    //check if the field wants to update is valid
    if (!validToUpdates) {
        return res.status(400).send({ error: 'invalid updates field' })
    }

    //update tour
    Tour.updateOne( { name: tourName }, req.body, { new: true, runValidators: true }).then(user => {
            if (!user) {
                return res.status(400).send("the tour doesn't exist")
            }
            else {
                res.status(200).send(user)
            }
        }).catch(e => res.status(500).send(e))
},

//update site on tour
createSiteInPath: function (req, res) {
    const tourName = req.params["tour_name"];
    const siteName = req.body.name;

    if(!siteName){
        res.status(400).send("the name site is required");
        return;
    }

    if(!req.body.country){
        res.status(400).send("the country site is required");
        return;
    }
  
    //check if tour with this name is exist already
    Tour.exists({'name': tourName}, function(err, result) {
        if (err) {
            res.status(500).send(e);
            console.log("error check tour exist" + err);
        }
        else {
            if(result){
                //check if a site with this name allready exist
                Tour.exists({'name': tourName, "path.name": siteName}, function(err, result) {
                    if (err) {
                        res.status(500).send(e);
                        console.log("error on check site exist" + err);
                    }
                    else {
                        if(result){ //we found with the same name site in this tour
                                res.status(400).send("site with this name already exist in this tour")
                        }
                        else{
                           //we didn't found with the same name site in this tour so we create a new site
                            const siteNew = new Site(req.body);
                            
                            Tour.updateOne( { name: tourName }, 
                                { '$addToSet': { 'path': siteNew } }
                                ).then(user => {
                                    console.log("updated new site")
                                    res.status(200).send()
                                }).catch(e => {
                                    console.log("error in update a new site" +e);
                                    res.status(500).send("error in update a new site" + e)
                                })
                        }
                    }
                
                }) 
            }
            else{
                //this tour is didn't found
                console.log("this tour is didn't found")
                res.status(400).send("this tour is didn't found")
            }
        }
    })

}

};