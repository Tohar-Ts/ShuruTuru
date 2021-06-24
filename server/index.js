const express = require('express'),
    tripsRoutes = require('./trips');
    guideRoutes = require('./guidesRoute');

var router = express.Router();

router.get("/trips", tripsRoutes.getTours);
router.get("/trips/:id", tripsRoutes.getTour);
router.delete("/trips/:id", (req,res,next)=>{console.log("in del"); next()},tripsRoutes.deleteTour);
router.delete("/path/:trip_id/:site_id", tripsRoutes.deleteSite);
router.post("/trip", tripsRoutes.createTour);
router.put('/trips/:id', tripsRoutes.updateTour);
router.put('/path/:trip_id', tripsRoutes.createSiteInPath);
router.get('/guides', guideRoutes.getGuides);
router.get('/guide/:guide_name', guideRoutes.getGuide);
router.post('/guide', guideRoutes.createGuide);
module.exports = router;
