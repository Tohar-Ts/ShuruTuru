const express = require('express'),
tripsRoutes = require('./trips');
guideRoutes = require('./guide');


var router = express.Router();


router.get('/guide/:guide_name', guideRoutes.getGuide);
router.post('/guide', guideRoutes.createGuide);

router.get("/trips", tripsRoutes.getTours);
router.get("/trips/:tour_name", tripsRoutes.getTour);

router.delete("/trips/:tour_name" ,tripsRoutes.deleteTour);
router.delete("/path/:tour_name/:site_name", tripsRoutes.deleteSite);
router.post("/trips", tripsRoutes.createTour);
router.put('/trips/:tour_name', tripsRoutes.updateTour);
router.put('/path/:tour_name', tripsRoutes.createSiteInPath);


module.exports = router;