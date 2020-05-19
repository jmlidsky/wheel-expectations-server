const BikesService = {
    getAllBikes(knex) {
        return knex
            .select('*')
            .from('bikes')
    },
    getBikeById(knex, id) {
        return knex
            .from('bikes')
            .select('*')
            .where('id', id)
            .first()
    }
}

module.exports = BikesService