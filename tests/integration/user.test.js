import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import HttpStatus from 'http-status-codes';

import app from '../../src/index';

let authToken;
let noteID;

describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {});
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });

  describe('POST /userregister', () => {
    it('given new user when added should return status 201', (done) => {
      const userdetails = {
        firstName: "Shivangi",
        lastName: "Ranjan",
        email: "shivangi@gmail.com",
        password: "shivangi"
      };
      request(app)
        .post('/api/v1/users/userregister')
        .send(userdetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
          done();
        });
      });

    it('give message user already exist and should return status 409', (done) => {
      const userdetails = {
        firstName: "Shivangi",
        lastName: "Ranjan",
        email: "shivangi@gmail.com",
        password: "shivangi"
      };
      request(app)
        .post('/api/v1/users/userregister')
        .send(userdetails)
        .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.CONFLICT);
        done();
      });
    });

    it('give message for incorrect firstname and should return status 400', (done) => {
      const userdetails = {
        firstName: "S",
        lastName: "Ranjan",
        email: "shivangi@gmail.com",
        password: "shivangi"
        };
        request(app)
        .post('/api/v1/users/userregister')
        .send(userdetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
          done();
          });
      });

      it('give message for incorrect lastname and should return status 400', (done) => {
        const userdetails = {
          firstName: "SHivangi",
          lastName: "R",
          email: "shivangi@gmail.com",
          password: "shivangi"
        };
        request(app)
        .post('/api/v1/users/userregister')
        .send(userdetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
          done();
        });
      });
      
      it('give message for incorrect email and should return status 400', (done) => {
        const userdetails = {
          firstName: "SHivangi",
          lastName: "Ranjan",
          email: "s@.co",
          password: "shivangi"
        };
        request(app)
        .post('/api/v1/users/userregister')
        .send(userdetails)
        .end((err, res) => {
            expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
            done();
          });
        });
})

describe('POST /login', () => {

  it('login registered user when added should return status 200', (done) => {
    const userdetails = {      
      email: "shivangi@gmail.com",
      password: "shivangi"
    };
    request(app)
      .post('/api/v1/users/login')
      .send(userdetails)
      .end((err, res) => {
        authToken = res.body.data;
        expect(res.statusCode).to.be.equal(HttpStatus.OK);
        done();
      });

  });

  it('give message usser doess not exist and return status 404', (done) => {
    const userdetails = {      
      email: "shiva@gmail.com",
      password: "shivangi"
    };
    request(app)
      .post('/api/v1/users/login')
      .send(userdetails)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.NOT_FOUND);
        done();
      });

  });

  it('give message invalid password and return status 400', (done) => {
    const userdetails = {      
      email: "shivangi@gmail.com",
      password: "shiva"
    };
    request(app)
      .post('/api/v1/users/login')
      .send(userdetails)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
        done();
      });

  });
})

describe('POST /forgetpassword', () => {

  it('Take email of registered user when added should return status 200', (done) => {
    const userdetails = {      
      email: "shivangi@gmail.com"
    };
    request(app)
      .post('/api/v1/users/forgetpassword')
      .send(userdetails)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.OK);
        done();
      });

  });

  it('give message email not registered and  should return status 404', (done) => {
    const userdetails = {      
      email: "shiva@gmail.com"
    };
    request(app)
      .post('/api/v1/users/forgetpassword')
      .send(userdetails)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.NOT_FOUND);
        done();
      });

  });
})


describe('PUT /resetpassword', () => {

  it('Take new password of registered user when added should return status 200', (done) => {
    const userdetails = {      
      password: "shivanginewyy"
    };

    const newJwtoken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoaXZhbmdpQGdtYWlsLmNvbSIsImlkIjoiNjIyMjA2ODRkYTY2YWEyYjY4MGM3YjkyIiwiaWF0IjoxNjQ2Mzk3MDYwfQ.yxLc3ltDtP4jVw8-aN8jozeed1t2rhMSUO1kxWdZJ40";
    
    request(app)
      .put('/api/v1/users/resetpassword')
      .set('Authorization',`${newJwtoken}`)
      .send(userdetails)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.RESET_CONTENT);
        done();
      });

  });
  
})

describe('POST /Create New Note', () => {
  it('given new note when added should return status 201', (done) => {
    const notedetails = {
      Title: "Note-1",
      Description: "Test Note-1",
      Color: "Blue",
  };
    request(app)
      .post('/api/v1/note')
      .set('Authorization', `Bearer ${authToken}`)
      .send(notedetails)
      .end((err, res) => {
          noteID = res.body.data._id;
          console.log("res.body.data------", res.body.data);

          console.log("This is user Auth Token", authToken);
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
          done();
      });
    });
  })

  describe('GET /Get All Notes', () => {
    it('given all note when retrieve should return status 200', (done) => {
    
      request(app)
        .get('/api/v1/note')
        .set('Authorization', `Bearer ${authToken}`)
        
        .end((err, res) => {
            console.log("This is user Auth Token", authToken);
            expect(res.statusCode).to.be.equal(HttpStatus.OK);
            done();
        });
      });
    })

    describe('GET /Get Single Notes', () => {
      it('given single note when retrieve should return status 202', (done) => {
              
        request(app)
          .get(`/api/v1/note/${noteID}`)
          .set('Authorization', `Bearer ${authToken}`)
          
          .end((err, res) => {
              expect(res.statusCode).to.be.equal(HttpStatus.ACCEPTED);
              done();
          });
        });
      })

      describe('PUT /Update Notes', () => {
        it('give updated note when updated should return status 202', (done) => {
          const notedetails = {
            Title: "Note-1",
            Description: "Test Note-1",
            Color: "Red",
        };
                
          request(app)
            .put(`/api/v1/note/${noteID}`)
            .set('Authorization', `Bearer ${authToken}`)
            .send(notedetails)
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(HttpStatus.ACCEPTED);
                done();
            });
          });
        })

        describe('PUT /Archive Notes', () => {
          it('give archived note when arcchived should return status 202', (done) => {
                
            request(app)
              .put(`/api/v1/note/archive/${noteID}`)
              .set('Authorization', `Bearer ${authToken}`)
              
              .end((err, res) => {
                  expect(res.statusCode).to.be.equal(HttpStatus.ACCEPTED);
                  done();
              });
            });
          })
          describe('PUT /Trash Notes', () => {
            it('sent note to trash when trashed should return status 202', (done) => {
                  
              request(app)
                .put(`/api/v1/note/trash/${noteID}`)
                .set('Authorization', `Bearer ${authToken}`)
                
                .end((err, res) => {
                    expect(res.statusCode).to.be.equal(HttpStatus.ACCEPTED);
                    done();
                });
              });
            })

            describe('DELETE /Delete Notes', () => {
              it('delete note when deleted should return status 200', (done) => {
                    
                request(app)
                  .delete(`/api/v1/note/${noteID}`)
                  .set('Authorization', `Bearer ${authToken}`)
                  
                  .end((err, res) => {
                      expect(res.statusCode).to.be.equal(HttpStatus.OK);
                      done();
                  });
                });
              })

});