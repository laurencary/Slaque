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
    Message.destroy_all
    DirectMessageSubscription.destroy_all
    DirectMessage.destroy_all
    ChannelSubscription.destroy_all
    Channel.destroy_all
    WorkspaceUserSubscription.destroy_all
    Workspace.destroy_all
    User.destroy_all

    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('workspaces')
    ApplicationRecord.connection.reset_pk_sequence!('workspace_user_subscriptions')
    ApplicationRecord.connection.reset_pk_sequence!('channels')
    ApplicationRecord.connection.reset_pk_sequence!('channel_subscriptions')
    ApplicationRecord.connection.reset_pk_sequence!('direct_messages')
    ApplicationRecord.connection.reset_pk_sequence!('direct_message_subscriptions')
    ApplicationRecord.connection.reset_pk_sequence!('messages')

    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(email: 'demo1@user.io', password: 'password')
    User.create!(email: 'demo2@user.io', password: 'password')
    User.create!(email: 'chris@user.io', password: 'pwchris')
    User.create!(email: 'lauren@user.io', password: 'pwlauren')
    User.create!(email: 'austin@user.io', password: 'pwaustin')
    User.create!(email: 'devon@user.io', password: 'pwdevon')
    User.create!(email: 'ivy@user.io', password: 'pwivyc')

    puts "Creating workspaces..."

    Workspace.create!(name: 'App Academy', owner_id: 3)
    Workspace.create!(name: 'Bay Area Ultimate', owner_id: 4)

    puts "Creating workspace user subscriptions..."

    WorkspaceUserSubscription.create!(user_id: 1, workspace_id: 1, full_name: 'Demo 1')
    WorkspaceUserSubscription.create!(user_id: 2, workspace_id: 1, full_name: 'Demo 2')
    WorkspaceUserSubscription.create!(user_id: 3, workspace_id: 1, full_name: 'Chris Cheasty', display_name: 'Chris C', title: 'Instructor')
    WorkspaceUserSubscription.create!(user_id: 4, workspace_id: 1, full_name: 'Lauren Cary', title: 'Student')
    WorkspaceUserSubscription.create!(user_id: 4, workspace_id: 2, full_name: 'Lauren Cary', display_name: 'LC', title: 'FAB Captain')
    WorkspaceUserSubscription.create!(user_id: 5, workspace_id: 2, full_name: 'Austin Cary')
    WorkspaceUserSubscription.create!(user_id: 6, workspace_id: 2, full_name: 'Devon Armstrong', title: 'League Organizer', pronunciation: 'd-EH-v-ih-n')
    WorkspaceUserSubscription.create!(user_id: 7, workspace_id: 2, full_name: 'Ivy Cheng')


    puts "Create channels..."

    Channel.create!(owner_id: 3, workspace_id: 1, name: "help-requests", description: "Post questions here and get help from the App Academy family")
    Channel.create!(owner_id: 1, workspace_id: 1, name: "2023-03-27-cohort")
    Channel.create!(owner_id: 7, workspace_id: 2, name: "general")
    Channel.create!(owner_id: 5, workspace_id: 2, name: "2023-fab", description: "Fab channel for 2023")
    Channel.create!(owner_id: 7, workspace_id: 2, name: "south-bay-league", description: "Update and sub requests for South Bay Ultimate Leagues")
    
    puts "Create channel subscriptions..."
    ChannelSubscription.create!(workspace_user_id: 1, channel_id: 1)
    ChannelSubscription.create!(workspace_user_id: 1, channel_id: 2)
    ChannelSubscription.create!(workspace_user_id: 2, channel_id: 2)
    ChannelSubscription.create!(workspace_user_id: 3, channel_id: 1)
    ChannelSubscription.create!(workspace_user_id: 3, channel_id: 2)
    ChannelSubscription.create!(workspace_user_id: 4, channel_id: 1)
    ChannelSubscription.create!(workspace_user_id: 4, channel_id: 2)
    ChannelSubscription.create!(workspace_user_id: 5, channel_id: 3)
    ChannelSubscription.create!(workspace_user_id: 5, channel_id: 4)
    ChannelSubscription.create!(workspace_user_id: 6, channel_id: 3)
    ChannelSubscription.create!(workspace_user_id: 6, channel_id: 5)
    ChannelSubscription.create!(workspace_user_id: 7, channel_id: 3)
    ChannelSubscription.create!(workspace_user_id: 7, channel_id: 5)
    ChannelSubscription.create!(workspace_user_id: 8, channel_id: 4)
    
    puts "Creating direct messages..."
    DirectMessage.create!(workspace_id: 1)
    DirectMessage.create!(workspace_id: 1)
    DirectMessage.create!(workspace_id: 2)
    DirectMessage.create!(workspace_id: 2)

    puts "Creating direct message subscriptions..."
    DirectMessageSubscription.create!(workspace_user_id: 1, direct_message_id: 1)
    DirectMessageSubscription.create!(workspace_user_id: 2, direct_message_id: 1)
    DirectMessageSubscription.create!(workspace_user_id: 4, direct_message_id: 1)
    DirectMessageSubscription.create!(workspace_user_id: 4, direct_message_id: 1)
    DirectMessageSubscription.create!(workspace_user_id: 1, direct_message_id: 2)
    DirectMessageSubscription.create!(workspace_user_id: 2, direct_message_id: 2)
    DirectMessageSubscription.create!(workspace_user_id: 5, direct_message_id: 3)
    DirectMessageSubscription.create!(workspace_user_id: 8, direct_message_id: 3)
    DirectMessageSubscription.create!(workspace_user_id: 5, direct_message_id: 4)
    DirectMessageSubscription.create!(workspace_user_id: 6, direct_message_id: 4)
    DirectMessageSubscription.create!(workspace_user_id: 7, direct_message_id: 4)

    puts "Creating messages"
    Message.create!(workspace_author_id: 4, content: "Can someone help me with my polymorphic associations?", messageable_id: 1, messageable_type: "Channel", read_by_workspace_users: {}, edited: false)
    Message.create!(workspace_author_id: 3, content: "Yeah, definitely. Let's hop on zoom!", messageable_id: 1, messageable_type:"Channel", read_by_workspace_users: {}, edited: false)
    Message.create!(workspace_author_id: 3, content: "Don't put off tonight's homework - it's super helpful for the assessment", messageable_id: 2, messageable_type:"Channel", read_by_workspace_users: {}, edited: true)
    Message.create!(workspace_author_id: 2, content: "Thanks for the reminder", messageable_id: 2, messageable_type:"Channel", read_by_workspace_users: {}, edited: false)
    Message.create!(workspace_author_id: 7, content: "Anybody missing a waterbottle? Black found after last night game", messageable_id: 3, messageable_type:"Channel", read_by_workspace_users: {}, edited: false)
    Message.create!(workspace_author_id: 6, content: "Oh that is mine!", messageable_id: 3, messageable_type:"Channel", read_by_workspace_users: {}, edited: false)
    Message.create!(workspace_author_id: 5, content: "Practice tonight at 6pm!", messageable_id: 4, messageable_type:"Channel", read_by_workspace_users: {}, edited: false)
    Message.create!(workspace_author_id: 7, content: "Games are on for tonight.", messageable_id: 5, messageable_type:"Channel", read_by_workspace_users: {}, edited: false)
    Message.create!(workspace_author_id: 4, content: "Hey - nice to see you two on Slaque!", messageable_id: 1, messageable_type:"DirectMessage", read_by_workspace_users: {}, edited: false)
    Message.create!(workspace_author_id: 1, content: "Welcome to direct messaging", messageable_id: 2, messageable_type:"DirectMessage", read_by_workspace_users: {}, edited: false)
    Message.create!(workspace_author_id: 2, content: "It's pretty neat! Let's try it out", messageable_id: 2, messageable_type:"DirectMessage", read_by_workspace_users: {}, edited: false)
    Message.create!(workspace_author_id: 8, content: "Hey - want to carpool to practice?", messageable_id: 3, messageable_type:"DirectMessage", read_by_workspace_users: {}, edited: false)
    Message.create!(workspace_author_id: 6, content: "Are tonight's games going to be cancelled?", messageable_id: 4, messageable_type:"DirectMessage", read_by_workspace_users: {}, edited: false)

    puts "Done!"
end

