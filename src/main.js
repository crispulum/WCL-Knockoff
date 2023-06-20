function openLog() {

    //inputs: the file name, I guess?
    //outputs: an array of objects
    const csv = require('csv-parser')
    const fs = require('fs')
    const results = [];

    fs.createReadStream('testshort.csv')
        .pipe(csv(['Time/Type', 'PlayerID', 'SourceName', 'SourceFlags', 'SourceRaidFlag', 'TargetID', 'TargetName', 'TargetFlags', 'TargetRaidFlags', 'SpellID', 'SpellName', 'spellSchool', 'amount', 'p15', 'p16', 'p17', 'p18', 'p19', 'p20', 'p21', 'p22', 'p23', 'p24']))
        .on('data', (data) => results.push(data))
        .on('end', () => {
            console.log(results);
        });
}

openLog();

function parseEncounter() {
    //inputs: an event log corresponding to a single encounter
    //outputs: the parsed data


}


function visualizeData() {
    //inputs: the parsed data, probably in the form of an array of objects
    //outputs: uhhhhh a table? idk


}

function getNextEvent() {
    //inputs: the wcl file somehow lol
    //outputs: the next line from the file? I probably can't afford to copy the entire thing into memory


}

function parseEvent() {
    //inputs: a single event line
    //outputs: probably nothing? except it will modify the objects whose actors are involved
}

function categorizeEvent() {
    //inputs: an event 
    //outputs: the event's type, as represented by a string? I guess?

}

function getActor() {
    //inputs: an event
    //outputs: an event's actor

}

function getValue() {

    //inputs: an event
    //outputs: the damage or healing amount corresponding to the event
}


