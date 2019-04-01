process.env.NODE_ENV = 'test';

// Load modules
const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const {User} = require('../../models/User');
const app = require('../../server');

chai.use(chaiHttp);

describe('Postcard', () => {
    before((done) => {
        User.create({
            emailAddress: 'this_is@atest.com',
            password: 'testpassword'
        }, (err, user) => {
            if (err) console.error(err);
            done();
        });
    });
    

    // describe('/GET user', () => {
    //     it("should return authenticated user's doc", (done) => {
    //         chai.request(app)
    //             .get('/api/users')
    //             .auth('this_is@atest.com', 'testpassword')
    //             .end((err, res) => {
    //                 expect(res).to.have.status(200);
    //                 expect(res).to.be.json;
    //                 expect(res.body).to.have.property('_id');
    //                 expect(res.body).to.have.property('fullName', 'Test McTester');
    //                 expect(res.body).to.have.property('emailAddress');
    //                 expect(res.body).to.have.property('password');
    //                 done();
    //             });
    //     });

    //     it("should return a 401 if not authenticated", (done) => {
    //         chai.request(app)
    //             .get('/api/users')
    //             .auth('this_is@atest.com', 'NOTtestpassword')
    //             .end((err, res) => {
    //                 expect(res).to.have.status(401);
    //                 expect(res).to.be.json;
    //                 expect(res.body).to.have.property('message');
    //                 expect(res.body).to.have.property('error');
    //                 done();
    //             });
    //     });
    // });

    after((done) => {
        User.deleteOne({emailAddress: "Test McTester"}, (err) => {
            done();
        });
    });
});
