exports.up = function (knex) {
    return knex.schema
        .createTable('users', users => {
            users.increments();
            users.string('username', 128).notNullable().unique();
            users.string('password', 256).notNullable();
        })
        .createTable('categories', categories => {
            categories.increments();
            categories.string('category_name', 256).notNullable();
            categories.integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users');
        })
        .createTable('habits', habits => {
            habits.increments();
            habits.string('habit_text', 512).notNullable();
            habits.integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
            habits.integer('category_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('categories')
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('habits')
        .dropTableIfExists('categories')
        .dropTableIfExists('users')
};
