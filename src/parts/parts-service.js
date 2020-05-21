const PartsService = {
    getAllParts(knex) {
        return knex
            .select('*')
            .from('parts')
            .orderBy('part_name')
    }
}

module.exports = PartsService