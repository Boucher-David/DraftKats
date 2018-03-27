const playerFetch = require('./playerFetch');

module.exports = () => {
  let sports = ['Soccer','Football','Baseball','Basketball'];
  sports.forEach(async (sport) => {
      let a = await playerFetch[sport](true);
      console.log(sport + ' fetch completed.');
  });
}