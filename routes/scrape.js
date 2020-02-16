//Dependencies
const express = require('express'),
      cheerio = require('cheerio'),
      router = express.Router(),
      db = require('../models');

//route to scrape new articles
router.get("/scrape", function(req, res) {
  //configuring options object for request-promist
  axios.get("https://www.wsj.com/news/us").then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);
  
      // Now, we grab every h2 within an article tag, and do the following:
      // Save an empty result object
      var results = [];

      $("article").each(function(i, element) {
        
        // Add the text and href of every link, and save them as properties of the result object
        
        results.title = $(this)
          .find("a")
          .text();
        results.link = $(this)
          .find("a")
          .attr("href");
        results.summary = $(this)
          .find("p")
          .text();

        
        db.Article.create(results)
            .then(function(dbArticle) {
                // View the added result in the console
            console.log(dbArticle);
            })
            .catch(function(err) {
            // If an error occurred, log it
            console.log(err);
            });
        });
        // Create a new Article using the `result` object built from scraping
        
      // Send a message to the client
      res.send("scrape complete");
      console.log(result);
    });
});



module.exports = router;