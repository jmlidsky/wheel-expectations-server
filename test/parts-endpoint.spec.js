const knex = require('knex')
const app = require('../src/app')
const { makePartsArray, makeMaliciousPart } = require('./parts.fixtures')

describe('Parts Endpoints', function () {
    let db

    before('make knex instance', () => {

        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)

    })

    after('disconnect from db', () => db.destroy())

    before('clean the table', () => db.raw('TRUNCATE parts RESTART IDENTITY CASCADE'))

    afterEach('cleanup', () => db.raw('TRUNCATE parts RESTART IDENTITY CASCADE'))

    describe('GET /api/parts', () => {
        context('Given no parts', () => {
            it('responds with 200 and an empty list', () => {
                return supertest(app)
                    .get('/api/parts')
                    .expect(200, [])
            })
        })

        context('Given there are parts in the database', () => {
            const testParts = makePartsArray();

            beforeEach('insert parts', () => {
                return db
                    .into('parts')
                    .insert(testParts)
            })

            it('responds with 200 and all of the parts', () => {
                return supertest(app)
                    .get('/api/parts')
                    .expect(200, testParts)
            })
        })

        context(`Given an XSS attack part`, () => {
            const { maliciousPart, expectedPart } = makeMaliciousPart()

            beforeEach('insert malicious part', () => {
                return db
                    .into('parts')
                    .insert([maliciousPart])
            })

            it('removes XSS attack content', () => {
                return supertest(app)
                    .get(`/api/parts`)
                    .expect(200)
                    .expect(res => {
                        expect(res.body[0].part_name).to.eql(expectedPart.part_name)
                        expect(res.body[0].part_description).to.eql(expectedPart.part_description)
                    })
            })
        })
    })
})