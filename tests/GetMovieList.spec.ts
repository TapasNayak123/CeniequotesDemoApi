import chai from 'chai';
import {expect} from 'chai'
import chaiHttp from 'chai-http';
const server = require('../src/index');
chai.should();
chai.use(chaiHttp);

describe('/GET Movie List', () => {
    it('/cinequotes-api/getMovieList for succes response ',  (done) => {
       chai.request(server)
          .get('/cinequotes-api/getMovieList')
          .end((err, res) => {
            expect(res.body.status).to.equal(200);
         //   expect(res.body.filmList).to.equal('object');
            // console.log("Res ", res.body);
            // console.log("err ", err);
                // res.should.have.status(200);
                // res.body.should.be.a('object');
                // res.body.should.have.property('res_code').eql(1);
            done();
          });
    });
});


describe('/GET/ quotes', () => {
    it('it should GET all the quotes', (done) => {
      chai.request(server)
      .get('/cinequotes-api/getQuotes/:The Wizard of Oz/quotes/:1')
          .end((err, res) => {
            expect(res.body.status).to.equal(200);
            done();
          })
    });
});

describe('/GET/ actor', () => {
  it('it should GET all the quotes respect to actor', (done) => {
    chai.request(server)
    .get('/cinequotes-api/getActor/:The Wizard of Oz/quotes/:1')
        .end((err, res) => {
          console.log("Actors1 ", res.body)
          expect(res.body.status).to.equal(undefined);
          done();
        })
  });
});

describe('/POST quote', () => {
    it('it should store the quote in firestore', (done) => {
        let quoteActor = {
          "FilmTitle":"Taxi Driver2",
          "Actor":"Robert DeNiro",
          "defaultLanguage":1,
          "Quote":{
                "EN":"You talking to me?"
              }
          }
      chai.request(server)
          .post('/cinequotes-api/addMovieDetails')
          .send(quoteActor)
          .end((err, res) => {
            console.log("Print response ", res.body)
            expect(res.body.status).to.equal(200);
                // res.should.have.status(200);
                // res.body.should.be.a('object');
                // res.body.should.have.property('res_code').eql(1);
            done();
          })
    });
});

// describe('/GET message from topic', () => {
//     it('it should GET message from topic and store in firestore', () => {
//       // chai.request(server)
//       //     .get('/translate')
//       //     .end((err, res) => {
//       //           res.should.have.status(200);
//       //           res.body.should.be.a('object');
//       //           res.body.should.have.property('res_code').eql(1);
//       //       done();
//       //     });
//     });
// });
