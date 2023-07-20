

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
                // Handle errors lol
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
    const outputResults = {};

    function makePlayer(playerName, targetName) {
        if (playerName != 'nil') {
            if (!outputResults[playerName]) {
                outputResults[playerName] = { damage: 0, healing: 0, damageTaken: 0, healingTaken: 0, dead: false };
            }

            if (!outputResults[targetName]) {
                outputResults[targetName] = { damage: 0, healing: 0, damageTaken: 0, healingTaken: 0, dead: false };
            }
        }
    }

    const resolvers = {
        SPELL_DAMAGE: (element) => {
            makePlayer(element['SourceName'], element['TargetName']);
            outputResults[element['SourceName']].damage += Number(element['amount']);
            outputResults[element['TargetName']].damageTaken += Number(element['amount']);

        },
        SPELL_PERIODIC_DAMAGE: (element) => {
            makePlayer(element['SourceName'], element['TargetName']);
            outputResults[element['SourceName']].damage += Number(element['amount']);
            outputResults[element['TargetName']].damageTaken += Number(element['amount']);

        },
        HEAL: (element) => {
            makePlayer(element['SourceName'], element['TargetName']);
            outputResults[element['SourceName']].healing += Number(element['amount']);
            outputResults[element['TargetName']].healingTaken += Number(element['amount']);
        },
        UNIT_DIED: (element) => {
            makePlayer(element['SourceName'], element['TargetName']);
            outputResults[element['TargetName']].dead = true;
        }
    };

    inputData.forEach((element) => {
        const eventType = element['Type'];

        if (resolvers[eventType]) {
            resolvers[eventType](element);
        }
    });

    console.log(outputResults);
    return outputResults;
}

openLogAndPreProcess(parseEncounter, 'testshort.csv')


