
exports.up = function(knex) {
  return knex.schema
    .createTable('habit_dates', habit_dates => {
        habit_dates.increments();
        habit_dates.string('momentjs', 256).notNullable();
        habit_dates.integer('habit_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('habits')
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('habit_dates')
};
