const PartsService = {
    getAllParts(knex) {
        return knex
            .select('*')
            .from('parts')
    }
}

module.exports = PartsService