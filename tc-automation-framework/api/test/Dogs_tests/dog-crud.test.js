let res;

describe('Dog CRUD operations', () => {

    it('Should get all breeds', async() => {
        res = await DogRequests.getAllBreeds();
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.be.an('object').and.to.not.be.empty;
        expect(res.body.message).to.have.property('hound');
        expect(res.body.message.hound).to.be.an('array').and.to.include('basset');
    });
});
