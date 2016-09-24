'use strict';

const fs = require('fs');
const request = require('request');
const xlsx = require('node-xlsx');

let url = 'https://events.educause.edu/api/EventSearch/GetEventSessions?eventId=e16';
let data = [["Title","Location","Start","End","Description"]];

request.get(url, (error, response, body) => {

  let results = JSON.parse(body);

  results.allDays.forEach(day => {
    day.sessions.forEach(session => {
      data.push([session.title, session.location, cleanDateTime(session.start), cleanDateTime(session.end), session.description]);
    });
  });

  var buffer = xlsx.build([{name: "EDUCAUSE Sesions", data: data}]);
  fs.writeFile('educause_sessions.xlsx', buffer);

});

function cleanDateTime(input)
{
  return input.replace('T0', ' ').replace('T1', ' ').replace('Z', '');
}
