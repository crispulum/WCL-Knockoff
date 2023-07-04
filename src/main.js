/* function openLog(callback) {

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


} */

function openLogAndPreProcess(callback, fileName) {


    const csv = require('csv-parser')
    const fs = require('fs')
    const results = [];

    fs.readFile(fileName, 'utf8', (err, csvData) => {
        if (err) {
            //handle errors lol
        }
        csvData = csvData.replace(/  /g, ',');
        //console.log(csvData)

        fs.writeFile(fileName, csvData, 'utf8', err => {
            if (err) {
                // Handle any errors that occur during the file write
                console.error(err);
                return;
            }

            console.log('File saved successfully.');
        });
    })


    fs.createReadStream(fileName)
        .pipe(csv(['Time', 'Type', 'PlayerID', 'SourceName', 'SourceFlags', 'SourceRaidFlag', 'TargetID', 'TargetName', 'TargetFlags', 'TargetRaidFlags', 'SpellID', 'SpellName', 'spellSchool', 'p14', 'p15', 'p16', 'p17', 'p18', 'p19', 'p20', 'p21', 'p22', 'p23', 'p24'
            , 'p25', 'p26', 'p27', 'mapID', 'p29', 'p30', 'amount', 'rawAmount', 'overkill', 'school', 'resisted', 'blocked', 'absorbed', 'critical', 'glancing', 'crushing']))
        .on('data', (data) => results.push(data))
        .on('end', () => {
            //console.log(results);
            return callback(results);
        });

}



function parseEncounter(inputData) {
    //inputs: an event log corresponding to a single encounter?
    //outputs: the parsed data. an object?


    const outputResults = {}
    const resolvers = {
        SPELL_DAMAGE: (element) => {
            if (!outputResults[element['SourceName']]) {
                outputResults[element['SourceName']] = { damage: 0, healing: 0, dead: false };
            }

            outputResults[element['SourceName']].damage += Number(element['amount']);

            if (Number(element['overkill']) > 0) {
                if (!outputResults[element['TargetName']]) {
                    outputResults[element['TargetName']] = { damage: 0, healing: 0, dead: true };
                } else {
                    outputResults[element['TargetName']].dead = true;
                }
            }
        },
        SPELL_PERIODIC_DAMAGE: (element) => {
            if (!outputResults[element['SourceName']]) {
                outputResults[element['SourceName']] = { damage: 0, healing: 0, dead: false };
            }

            outputResults[element['SourceName']].damage += Number(element['amount']);

            if (Number(element['overkill']) > 0) {
                if (!outputResults[element['TargetName']]) {
                    outputResults[element['TargetName']] = { damage: 0, healing: 0, dead: true };
                } else {
                    outputResults[element['TargetName']].dead = true;
                }
            }
        },

        HEAL: (element) => {
            if (!outputResults[element['SourceName']]) {
                outputResults[element['SourceName']] = { damage: 0, healing: 0, dead: false };
            }

            outputResults[element['SourceName']].healing += Number(element['amount']);
        }
    };


    /* inputData.forEach((element => {

        //condition 1
        if (element['Type'].includes("DAMAGE")) {
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


        //condition 2
        if (element['Type'].includes("HEAL")) {
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


    })) */
    //console.log(nameArray)

    inputData.forEach((element) => {
        const eventType = element['Type'];

        if (resolvers[eventType]) {
            resolvers[eventType](element);
        }
    });

    console.log(outputResults);
    return outputResults;

}

//openLog(parseEncounter);
//console.log(openLog(parseEncounter) + " is main CL")
//what the heck is an async

openLogAndPreProcess(parseEncounter, 'testshort.csv')


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


