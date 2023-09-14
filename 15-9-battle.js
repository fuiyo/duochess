const axios = require('axios');
const fs = require('fs');

const participants = await axios(`https://api.challonge.com/v1/tournaments/13468288/participants.json?api_key=V7xd1G8VoUp31zfmqvmCrnemBtXjDVmI6rc8fHn8`)
const data = [];
const groups = await axios(`https://api.challonge.com/v1/tournaments/13468288/matches.json?api_key=V7xd1G8VoUp31zfmqvmCrnemBtXjDVmI6rc8fHn8`)
groups.data.forEach((e, index) => {
const player1 = e.match.player1_id;
const player2 = e.match.player2_id;
if(!player1 || !player2)return;

const participant1 = participants.data.find(e=>e?.participant?.id == player1)
const participant2 = participants.data.find(e=>e?.participant?.id == player2)
data.push([participant1.participant.name, participant2.participant.name])
})

fs.writeFileSync("./15-9.json", JSON.stringify(data))
