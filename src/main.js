function openLog(callback) {

    //inputs: the file name, I guess?
    //outputs: an array of objects
    const csv = require('csv-parser')
    const fs = require('fs')
    const results = [];

    fs.createReadStream('longlog.csv')
        .pipe(csv(['TimeType', 'PlayerID', 'SourceName', 'SourceFlags', 'SourceRaidFlag', 'TargetID', 'TargetName', 'TargetFlags', 'TargetRaidFlags', 'SpellID', 'SpellName', 'spellSchool', 'p14', 'p15', 'p16', 'p17', 'p18', 'p19', 'p20', 'p21', 'p22', 'p23', 'p24'
            , 'p25', 'p26', 'p27', 'mapID', 'p29', 'p30', 'amount', 'rawAmount', 'overkill', 'school', 'resisted', 'blocked', 'absorbed', 'critical', 'glancing', 'crushing']))
        .on('data', (data) => results.push(data))
        .on('end', () => {
            //console.log(results);
            return callback(results);
        });


}





//openLog();


/* function myOpenLog() {

    const fs = require('fs');

    fs.readFile('/home/ari/WCL-Knockoff/src/testlog.csv', 'utf8', (err, data) => {
        if (err) throw err;

        processCSVData(data);
    });
}


function processCSVData(csvData) {

    const lines = csvData.split('\n');
    const headers = ['Time/Type', 'PlayerID', 'SourceName', 'SourceFlags', 'SourceRaidFlag', 'TargetID', 'TargetName', 'TargetFlags', 'TargetRaidFlags', 'SpellID', 'SpellName', 'spellSchool', 'p14', 'p15', 'p16', 'p17', 'p18', 'p19', 'p20', 'p21', 'p22', 'p23', 'p24'
    , 'p25', 'p26', 'p27', 'mapID', 'p29', 'p30', 'amount', 'rawAmount', 'overkill', 'school', 'resisted', 'blocked', 'absorbed', 'critical', 'glancing', 'crushing'];


}
myOpenLog();
 */
function parseEncounter(inputData) {
    //inputs: an event log corresponding to a single encounter?
    //outputs: the parsed data. an object?


    const outputResults = {}
    inputData.forEach((element => {


        if (element['TimeType'].includes("DAMAGE")) {
            //handle damage event

            //if player already doesn't yet
            if (outputResults[element['SourceName']] == undefined) {
                outputResults[element['SourceName']] = { damage: 0, healing: 0, dead: false }
            }
            //if player does exist

            //outputResults[element['SourceName']]
            outputResults[element['SourceName']].damage += Number(element['amount']);
            if (Number(element['overkill']) > 0) {

                if (outputResults[element['TargetName']] == undefined) {
                    outputResults[element['TargetName']] = { damage: 0, healing: 0, dead: true }
                }
                //if player does exist
                else {

                    outputResults[element['TargetName']].dead = true;
                }


            }
        }
        //check if it killed someone



        if (element['TimeType'].includes("HEAL")) {
            //handle healing event

            //if player already doesn't yet
            if (outputResults[element['SourceName']] == undefined) {
                outputResults[element['SourceName']] = { damage: 0, healing: 0, dead: false }
            }
            //if player does exist
            else {

                //outputResults[element['SourceName']]
                outputResults[element['SourceName']].healing += Number(element['amount']);
            }

        }


    }))
    //console.log(nameArray)
    console.log(outputResults);
    return outputResults;

}

//openLog(parseEncounter);
console.log(openLog(parseEncounter) + " is main CL")


function visualizeData() {
    //inputs: the parsed data, probably in the form of an array of objects
    //outputs: uhhhhh a table? idk


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


