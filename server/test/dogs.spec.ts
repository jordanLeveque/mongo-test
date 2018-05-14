import * as chai from 'chai';
import * as chaiHttp from 'chai-http';

process.env.NODE_ENV = 'test';
import { app } from '../app';
import dogModel from '../models/dogModel';

const should = chai.use(chaiHttp).should();

describe('dogs', () => {

  beforeEach((done) => {
    dogModel.remove({}, (err) => {
      done();
    });
  });

  describe('Backend tests for dogs', () => {

    it('should get all the dogs', (done) => {
      chai.request(app)
        .get('/api/dogs')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it('should get dogs count', (done) => {
      chai.request(app)
        .get('/api/dogs/count')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('number');
          res.body.should.be.eql(0);
          done();
        });
    });

    it('should create new dog', (done) => {
      const newDog = new dogModel({ name: 'Fluffy', weight: 4, age: 2 });
      chai.request(app)
        .post('/api/dog')
        .send(newDog)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.a.property('name');
          res.body.should.have.a.property('weight');
          res.body.should.have.a.property('age');
          done();
        });
    });

    it('should get a dog by its id', (done) => {
      const newDog = new dogModel({ name: 'dog', weight: 2, age: 4 });
      newDog.save((error, newdog) => {
        chai.request(app)
          .get(`/api/dog/${newdog.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('name');
            res.body.should.have.property('weight');
            res.body.should.have.property('age');
            res.body.should.have.property('_id').eql(newdog.id);
            done();
          });
      });
    });

    it('should update a dog by its id', (done) => {
      const newDog = new dogModel({ name: 'dog', weight: 2, age: 4 });
      newDog.save((error, newdog) => {
        chai.request(app)
          .put(`/api/dog/${newdog.id}`)
          .send({ weight: 5 })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });

    it('should delete a dog by its id', (done) => {
      const newDog = new dogModel({ name: 'dog', weight: 2, age: 4 });
      newDog.save((error, newdog) => {
        chai.request(app)
          .delete(`/api/dog/${newdog.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
  });

});


