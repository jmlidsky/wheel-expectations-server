const knex = require('knex')
const app = require('../src/app')
const { makeBikesArray, makeMaliciousBike } = require('./bikes.fixtures')

describe.only('Bikes Endpoints', function () {
    let db

    before('make knex instance', () => {

        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)

    })

    after('disconnect from db', () => db.destroy())

    before('clean the table', () => db.raw('TRUNCATE bikes RESTART IDENTITY CASCADE'))

    afterEach('cleanup', () => db.raw('TRUNCATE bikes RESTART IDENTITY CASCADE'))

    describe('GET /api/bikes', () => {
        context('Given no bikes', () => {
            it('responds with 200 and an empty list', () => {
                return supertest(app)
                    .get('/api/bikes')
                    .expect(200, [])
            })
        })

        context('Given there are bikes in the database', () => {
            const testBikes = makeBikesArray();

            beforeEach('insert bikes', () => {
                return db
                    .into('bikes')
                    .insert(testBikes)
            })

            it('responds with 200 and all of the bikes', () => {
                return supertest(app)
                    .get('/api/bikes')
                    .expect(200, testBikes)
            })
        })

        context(`Given an XSS attack bike`, () => {
            const { maliciousBike, expectedBike } = makeMaliciousBike()

            beforeEach('insert malicious bike', () => {
                return db
                    .into('bikes')
                    .insert([maliciousBike])
            })

            it('removes XSS attack content', () => {
                return supertest(app)
                    .get(`/api/bikes`)
                    .expect(200)
                    .expect(res => {
                        expect(res.body[0].bike_name).to.eql(expectedBike.bike_name)
                        expect(res.body[0].bike_description).to.eql(expectedBike.bike_description)
                    })
            })
        })
    })

    describe('GET /api/bikes/:id', () => {
        context('Given no bikes', () => {
            it('responds with 404', () => {
                const bikeId = 123456
                return supertest(app)
                    .get(`/api/bikes/${bikeId}`)
                    .expect(404, { error: { message: `Bike doesn't exist` } })

            })
        })

        context('Given there are bikes in the database', () => {
            const testBikes = makeBikesArray()

            beforeEach('insert bikes', () => {
                return db
                    .into('bikes')
                    .insert(testBikes)
            })

            it('responds with 200 and the specified bike', () => {
                const bikeId = 2
                const expectedBike = testBikes[bikeId - 1]
                return supertest(app)
                    .get(`/api/bikes/${bikeId}`)
                    .expect(200, expectedBike)
            })
        })

        context('Given an XSS attack bike', () => {
            const { maliciousBike, expectedBike } = makeMaliciousBike()

            beforeEach('insert malicious bike', () => {
                return db
                    .into('bikes')
                    .insert([maliciousBike])
            })

            it('removes XSS attack content', () => {
                return supertest(app)
                    .get(`/api/bikes/${maliciousBike.id}`)
                    .expect(200)
                    .expect(res => {
                        expect(res.body.bike_name).to.eql(expectedBike.bike_name)
                        expect(res.body.bike_description).to.eql(expectedBike.bike_description)
                    })
            })
        })
    })
})