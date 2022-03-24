const server = require('../server/server.js');
const fs = require('fs');
const path = require('path');
const request = require('supertest');

//make a test account
//invoke the signup functionality
//check to see if the response at success is true.
//set up a bad test account
  //missing info
  //already has email
  //want to make sure that res.success is false.
//delete the test account.

xdescribe('Integration Tests', () => {
  const dummyAcct = {
    username: 'LEGIT_USERNAME',
    password: 'REAL_PASSWORD',
    email: 'test@test.test',
    firstName: 'Firstname',
    lastName: 'Lastname'
}

//   beforeAll(() => {
  
//   });
  
  // afterEach(() => {
  //   request(server)
  //     .delete('/login')
  //     .send(dummyAcct)
  //     // .expect('Content-Type', /json/)
  //     // .expect(200)
  //     // .then(res => {
  //     //   expect(res.body).toHaveProperty('success', true);
  //     // })

  //     // const req = 
  //     // {
  //     //   method: 'DELETE',
  //     //   headers: { 'Content-Type': 'application/json' },
  //     //   body: JSON.stringify(),
  //     // }
      
  //     // fetch('http://localhost:3000/feed', req)
  //     // .then(res => {
  //     //   return res.json()
  //     // })
  // });

  describe('#testing /SIGNUP and /LOGIN functionality', () => {

    describe ('POST to /SIGNUP', () => {

      it('request sends the new user info to the DB and gets back a success response', () => {
        return request(server)
        .post('/signup')
        .send(dummyAcct)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(res => {
          expect(res.body).toHaveProperty('success', true);
        })
      })
    });


    describe('POST to /LOGIN', () => {

      it('should send user ID & username back if correct user & pw', () => {
        return request(server)
        .post('/login')
        .send({ // this is the email and password from dummyAcct
          email: 'test@test.test',
          password: 'REAL_PASSWORD'
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .then(res => {
          expect(res.body).toHaveProperty(['userid']);
          expect(res.body).toHaveProperty(['username']);
          // console.log("test :", res.body)
        })
      })

      it('should send error if incorrect user & pw', () => {
        return request(server)
        .post('/login')
        .send({ // this is the WRONG email and password from dummyAcct
          email: 'test@test.test',
          password: 'FAKE_PASSWORD'
        })
        .expect('Content-Type', /json/)
        .expect(400)
      })
    })
    

    describe ('DELETE to /LOGIN', () => {

      it('request would send success message', () => {
        return request(server)
        .delete('/login')
        .send(dummyAcct)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(res => {
          expect(res.body).toHaveProperty('success', true);
        })
      })
    });
  })

  

});



// describe('/markets', () => {
//   describe('GET', () => {
//     it('responds with 200 status and application/json content type', () => {
//       return request(server)
//         .get('/markets')
//         .expect('Content-Type', /application\/json/)
//         .expect(200);
//     });

//     // For this test, you'll need to inspect the body of the response and
//     // ensure it contains the markets list. Check the markets.dev.json file
//     // in the dev database to get an idea of what shape you're expecting.
//     it('markets from "DB" json are in body of response', () => {
//     });
//   });

//   describe('PUT', () => {
//     it('responds with 200 status and application/json content type', () => {
//       return request(server)
//         .put('/markets')
//         .expect('Content-Type', /application\/json/)
//         .expect(200);
//     });

//     xit('responds with the updated market list', () => {
//     });

//     xit('responds to invalid request with 400 status and error message in body', () => {
//     });
//   });
// });
// });