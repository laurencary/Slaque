# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all

    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('workspaces')
    ApplicationRecord.connection.reset_pk_sequence!('workspace_user_subscriptions')

    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(email: 'demo1@user.io', password: 'password')
    User.create!(email: 'demo2@user.io', password: 'password')
    User.create!(email: 'austin@user.io', password: 'pwaustin')
    User.create!(email: 'devon@user.io', password: 'pwdevon')


    puts "Done!"
end