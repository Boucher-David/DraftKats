# DraftCats

We are developing mobile-first, so make sure to set your screen resolution to iPhone4 (320x480).


Issue 2 (Larry). Added Heroku. URL: https://draftkats.herokuapp.com/

## app.config should look like this:

```
  app.config = {
    "playerData": [], // put API data here
    "selected": "",
    "teams": 5,
    "position" : 1,
    "roster": {
      "football": [
        {"position":"WR", "value": 5},
        {"position":"RB", "value": 3},
        {"position":"QB", "value": 3},
        {"position":"TE", "value": 3},
        {"position":"WR/RB", "value": 3},
        {"position":"WR/RB/TE", "value": 3},
        {"position":"WR/RB/TE/QB", "value": 3},
        {"position":"K", "value": 3},
        {"position":"DEF", "value": 3},
      ],
      "soccer": [
        {"position":"FWD", "value": 3},
        {"position":"MID", "value": 5},
        {"position":"DEF", "value": 5},
        {"position":"GK", "value": 2},
      ]
    },
    "draftOrder": [1,2,3,4,5,5,4,3,2,1,1,2,3,4,5], // example snake draft
    "teamSelected" : { // we need to dynamically build this based on the # of teams in the draft.
      1: [],
      2: [],
      3: [],
      4: [],
      5: []
    }
  };
```
