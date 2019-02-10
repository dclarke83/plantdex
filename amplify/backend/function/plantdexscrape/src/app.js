/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

var https = require('https');
var cheerio = require('cheerio');

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

app.get('/info/:url', function(req, res) {
  const detail = decodeURIComponent(req.params.url);
  const options = {
    port: 443,
    host: 'www.rhs.org.uk',
    path: '/Plants/' + detail
  };

  https.get(options, (result) => {
    if(result.statusCode !== 200) {
      console.log('Plant not found', detail);
      return res.status(404).send('Plant not found');
    }
    collectResponse(result, processResponse);
  }).on('error', error => {
    console.log(error);
    return res.status(500).send({message: error.message });
  });

  const collectResponse = (response, cb) => {
    let data = '';
    response.on('data', chunk => {
      data += chunk;
    });
    response.on('end', () => {
      cb(data);
    })
  }

  const processResponse = (data) => {
    const options = {
      normalizeWhitespace: true,
      decodeEntities: true
    };
    const $ = cheerio.load(data, options);
    
    const types = [
      'aquatic',
      'climber',
      'conifer',
      'fern',
      'grass',
      'perennial',
      'shrub',
      'spruce',
      'tree'
    ];

    const foundTypes = types.find(type => {
      return $('li[data-facettype=description]').text().includes(type);
    });

    let plant = {};
    plant.type = (foundTypes) ? foundTypes : '';
    plant.name = $('.Plant-formated-Name').text().trim();
    plant.commonName = $('.ib h2').text().trim();
    plant.mainImage = $('.plant-image img').attr('src');
    plant.height = $('.ultimate-height p').text().replace('Ultimate height', '').trim();
    plant.spread = $('.ultimate-spread p').text().replace('Ultimate spread', '').trim();
    plant.ageToMaxHeight = $('.time-to-ultimate-height p').text().replace('Time to ultimate height', '').trim();

    plant.sunlight = $('.sunlight li p').map((i, el) => {
      return $(el).text().trim().toLocaleLowerCase();
    }).get();

    plant.notes = $('p[data-facettype]').map((i, el) => {
      return $(el).text().trim().replace(/\n/,': ').replace(/\s\s+/g, ' ');
    }).get().join('\n');

    $('.li-hardiness p').each((i, el) => {
      if(['H1a', 'H1b', 'H1c', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7'].includes($(el).text().trim())) {
        plant.hardiness = $(el).text().trim().toLocaleLowerCase();
        return;
      }
    });

    $('.plant-detailed-description p').each((i, el) => {
      switch($('strong', el).text().trim()){
        case 'Foliage': {
          plant.foliage = $(el).text().replace('Foliage', '').trim().toLocaleLowerCase();
          break;
        }
        case 'Habit': {
          plant.habit = $(el).text().replace('Habit', '').trim().toLocaleLowerCase();
          break;       
        }   
        case 'Exposure': {
          plant.exposure = $(el).text().replace('Exposure', '').trim().toLocaleLowerCase().replace('exposed or sheltered', 'sheltered/exposed');
          break;         
        }
        case 'Moisture': {
          plant.moisture = $(el).text().replace('Moisture', '').trim().toLocaleLowerCase().split(', ');
          break;         
        }
        case 'Soil': {
          plant.soil = $(el).text().replace('Soil', '').trim().toLocaleLowerCase().split(', ');
          break;         
        }
        case 'pH': {
          plant.pH = $(el).text().replace('pH', '').trim().toLocaleLowerCase().split(', ');
          break;         
        }                          
        default: {
          return;
        }
      }
    });

    console.log(plant);

    return res.json(plant);
  }
});

/**********************
 * Example get method *
 **********************/

app.get('/items', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

app.get('/items/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/items', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/items/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example post method *
****************************/

app.put('/items', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/items/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/items', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/items/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
