const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// router.get('/', (req, res) => {
//     console.log('req.user:', req.user);
//     pool.query('SELECT * FROM "secret";')
//         .then(results => res.send(results.rows))
//         .catch(error => {
//             console.log('Error making SELECT for secrets:', error);
//             res.sendStatus(500);
//         });
// });

router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('req.user:', req.user);
        pool.query(`SELECT * FROM "secret"
                    WHERE "secrecy_level" <= $1;`,[req.user.clearence_level])
            .then(results => res.send(results.rows))
            .catch(error => {
                console.log('Error making SELECT for secrets:', error);
                res.sendStatus(500);
            });
    } else {
      // They are not authenticated.
      res.sendStatus(403);
    }
  });

  // router.get('/return', (req, res) => {
  //   if (req.isAuthenticated()) {
  //     console.log('req.user:', req.user);
  //     pool.query(`SELECT * FROM "person";`)
  //     .then(results => console.log(results))
  //   }
  // })

module.exports = router;