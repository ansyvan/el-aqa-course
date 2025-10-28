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

    it('Should check that breed "hound" has sub-breed "basset"', async() => {
        res = await DogRequests.getAllBreeds();
        expect(res).to.have.status(200);
        expect(res.body.message).to.have.property('hound');
        expect(res.body.message.hound).to.be.an('array').and.to.include('basset');
    });

    it('Should get a random dog image', async() => {
        res = await DogRequests.getRandomDogImage();
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.be.a('string').and.to.include('https://images.dog.ceo/');
        expect(res.body.message).to.match(/\.(jpg|jpeg|png)$/);
    });

    it('Should get all images for breed "hound"', async() => {
        res = await DogRequests.getAllImagesByBreed('hound');
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.be.an('array').and.to.not.be.empty;

        const randomImageUrl = _.sample(res.body.message);
        expect(randomImageUrl).to.be.a('string').and.to.include('https://images.dog.ceo/');
        expect(randomImageUrl).to.match(/\.(jpg|jpeg|png)$/);
    });

    it('Should get list of sub-breeds for breed "bulldog"', async() => {
        res = await DogRequests.getListOfSubBreeds('bulldog');
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.be.an('array').and.to.include('boston');
    });
});
