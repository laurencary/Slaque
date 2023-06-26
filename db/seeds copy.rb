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
    User.create!(email: 'elphaba@user.io', password: 'pwelphaba')         # 1
    User.create!(email: 'nessa@user.io', password: 'pwnessa')             # 2
    User.create!(email: 'shell@user.io', password: 'pwshell')             # 3
    User.create!(email: 'melena@user.io', password: 'pwmelena')           # 4
    User.create!(email: 'boq@user.io', password: 'pwboqpw')               # 5
    User.create!(email: 'docdillamond@user.io', password: 'pwdillamond')  # 6
    User.create!(email: 'fiyero@user.io', password: 'pwfiyero')           # 7
    User.create!(email: 'morrible@user.io', password: 'pwmorrible')       # 8
    User.create!(email: 'milla@user.io', password: 'pwmilla')             # 9
    User.create!(email: 'pfanne@user.io', password: 'pwpfanne')           #10
    User.create!(email: 'shenshen@user.io', password: 'pwshen')           #11
    User.create!(email: 'wizard@user.io', password: 'wizard')             #12
    User.create!(email: 'galinda@user.io', password: 'pwgalinda')         #13

    User.create!(email: 'jim@user.io', password: 'pwjimpw')               #14
    User.create!(email: 'angela@user.io', password: 'pwangela')           #15
    User.create!(email: 'pam@user.io', password: 'pwpampw')               #16
    User.create!(email: 'oscar@user.io', password: 'pwoscar')             #17
    User.create!(email: 'philis@user.io', password: 'pwphilis')           #18
    User.create!(email: 'toby@user.io', password: 'pwtoby')               #19
    User.create!(email: 'kevin@user.io', password: 'pwkevin')             #20
    User.create!(email: 'stanley@user.io', password: 'pwstanley')         #21
    User.create!(email: 'meredith@user.io', password: 'pwmeredith')       #22
    User.create!(email: 'kelly@user.io', password: 'pwkelly')             #23
    User.create!(email: 'darryl@user.io', password: 'pwdarryl')           #24
    User.create!(email: 'roy@user.io', password: 'pwroypw')               #25
    User.create!(email: 'lonny@user.io', password: 'pwlonny')             #26
    User.create!(email: 'david@user.io', password: 'pwdavid')             #27
    User.create!(email: 'jan@user.io', password: 'pwjanpw')               #28
    User.create!(email: 'michael@user.io', password: 'pwmichael')         #29
    User.create!(email: 'dwight@user.io', password: 'pwdwight')           #30
    User.create!(email: 'creed@user.io', password: 'pwcreed')             #31
    
    User.create!(email: 'demo1@user.io', password: 'password')            #32
    User.create!(email: 'demo2@user.io', password: 'password')            #33
    

    puts "Creating workspaces..."

    Workspace.create!(name: 'Dunder Mifflin', owner_id: 27)
    Workspace.create!(name: 'Land of Oz', owner_id: 12)

    puts "Creating workspace user subscriptions..."

    WorkspaceUserSubscription.create!(user_id: 1, workspace_id: 1, full_name: 'Elphaba Thropp')
    WorkspaceUserSubscription.create!(user_id: 2, workspace_id: 1, full_name: 'Nessarose Thropp')
    WorkspaceUserSubscription.create!(user_id: 3, workspace_id: 1, full_name: 'Shell Thropp')
    WorkspaceUserSubscription.create!(user_id: 4, workspace_id: 1, full_name: 'Melena Throp')
    WorkspaceUserSubscription.create!(user_id: 5, workspace_id: 1, full_name: 'Boq')
    WorkspaceUserSubscription.create!(user_id: 6, workspace_id: 1, full_name: 'Doctor Dillamond')
    WorkspaceUserSubscription.create!(user_id: 7, workspace_id: 1, full_name: 'Fiyero Tigelaar')
    WorkspaceUserSubscription.create!(user_id: 8, workspace_id: 1, full_name: 'Madame Morrible')
    WorkspaceUserSubscription.create!(user_id: 9, workspace_id: 1, full_name: 'Milla')
    WorkspaceUserSubscription.create!(user_id: 10, workspace_id: 1, full_name: 'Pfanne')
    WorkspaceUserSubscription.create!(user_id: 11, workspace_id: 1, full_name: 'Shenshen')
    WorkspaceUserSubscription.create!(user_id: 12, workspace_id: 1, full_name: 'Wizard of Oz')
    WorkspaceUserSubscription.create!(user_id: 13, workspace_id: 1, full_name: 'Galinda Upland')


    puts "Create channels..."

    Channel.create!(owner_id: 12, workspace_id: 1, name: "ozians")
    Channel.create!(owner_id: 5, workspace_id: 1, name: "munckinland")
    Channel.create!(owner_id: 8, workspace_id: 1, name: "shiz-university")
    Channel.create!(owner_id: 13, workspace_id: 1, name: "popular-girls")
    Channel.create!(owner_id: 7, workspace_id: 1, name: "ozdust-ballroom-party")
    Channel.create!(owner_id: 29, workspace_id: 2, name: "scranton-branch")
    Channel.create!(owner_id: 29, workspace_id: 2, name: "everyone-except-toby")
    Channel.create!(owner_id: 17, workspace_id: 2, name: "finer-things-club")
    Channel.create!(owner_id: 30, workspace_id: 2, name: "sales")
    Channel.create!(owner_id: 15, workspace_id: 2, name: "accounting")
    Channel.create!(owner_id: 31, workspace_id: 2, name: "creeds-notes")
    
    puts "Create channel subscriptions..."
    ChannelSubscription.create!(workspace_user_id: 1, channel_id: 1)
    ChannelSubscription.create!(workspace_user_id: 2, channel_id: 1)
    ChannelSubscription.create!(workspace_user_id: 3, channel_id: 1)
    ChannelSubscription.create!(workspace_user_id: 4, channel_id: 1)
    ChannelSubscription.create!(workspace_user_id: 5, channel_id: 1)
    ChannelSubscription.create!(workspace_user_id: 6, channel_id: 1)
    ChannelSubscription.create!(workspace_user_id: 7, channel_id: 1)
    ChannelSubscription.create!(workspace_user_id: 8, channel_id: 1)
    ChannelSubscription.create!(workspace_user_id: 9, channel_id: 1)
    ChannelSubscription.create!(workspace_user_id: 10, channel_id: 1)
    ChannelSubscription.create!(workspace_user_id: 11, channel_id: 1)
    ChannelSubscription.create!(workspace_user_id: 12, channel_id: 1)
    ChannelSubscription.create!(workspace_user_id: 13, channel_id: 1)

    
    puts "Creating direct messages..."
    DirectMessage.create!(workspace_id: 1)
    DirectMessage.create!(workspace_id: 1)
    DirectMessage.create!(workspace_id: 2)
    DirectMessage.create!(workspace_id: 2)

    puts "Creating direct message subscriptions..."
    DirectMessageSubscription.create!(workspace_user_id: 1, direct_message_id: 1)
    DirectMessageSubscription.create!(workspace_user_id: 2, direct_message_id: 1)
    DirectMessageSubscription.create!(workspace_user_id: 4, direct_message_id: 1)
    DirectMessageSubscription.create!(workspace_user_id: 1, direct_message_id: 2)
    DirectMessageSubscription.create!(workspace_user_id: 2, direct_message_id: 2)
    DirectMessageSubscription.create!(workspace_user_id: 5, direct_message_id: 3)
    DirectMessageSubscription.create!(workspace_user_id: 8, direct_message_id: 3)
    DirectMessageSubscription.create!(workspace_user_id: 5, direct_message_id: 4)
    DirectMessageSubscription.create!(workspace_user_id: 6, direct_message_id: 4)
    DirectMessageSubscription.create!(workspace_user_id: 7, direct_message_id: 4)

    puts "Creating messages"
    Message.create!(workspace_author_id: 4, 
        content: "Can someone help me with my polymorphic associations?", 
        messageable_id: 1, 
        messageable_type: "Channel", 
        unread_by_workspace_users: { 1 => true }, 
        edited: false)
    Message.create!(workspace_author_id: 3, 
        content: "Yeah, definitely. Let's hop on zoom!", 
        messageable_id: 1, 
        messageable_type:"Channel", 
        unread_by_workspace_users: { 4 => true, 1 => true }, 
        edited: false)
    Message.create!(workspace_author_id: 3, 
        content: "Don't put off tonight's homework - it's super helpful for the assessment", 
        messageable_id: 2, 
        messageable_type:"Channel", 
        unread_by_workspace_users: { 1 => true, 4 => true }, 
        edited: true)
    Message.create!(workspace_author_id: 2, 
        content: "Thanks for the reminder", 
        messageable_id: 2, 
        messageable_type:"Channel", 
        unread_by_workspace_users: { 3=> true, 1 => true, 4 => true }, 
        edited: false)
    Message.create!(workspace_author_id: 7, 
        content: "Anybody missing a waterbottle? Black found after last night game", 
        messageable_id: 3, 
        messageable_type:"Channel", 
        unread_by_workspace_users: { 5=> true }, 
        edited: false)
    Message.create!(workspace_author_id: 6,
        content: "Oh that is mine!", 
        messageable_id: 3, 
        messageable_type:"Channel", 
        unread_by_workspace_users: { 5=> true, 7 => true }, 
        edited: false)
    Message.create!(workspace_author_id: 5,
        content: "Practice tonight at 6pm!", 
        messageable_id: 4, 
        messageable_type:"Channel", 
        unread_by_workspace_users: { }, 
        edited: false)
    Message.create!(workspace_author_id: 7,
        content: "Games are on for tonight.", 
        messageable_id: 5, 
        messageable_type:"Channel", 
        unread_by_workspace_users: { 6=> true }, 
        edited: false)
    Message.create!(workspace_author_id: 4,
        content: "Hey - nice to see you on Slaque!", 
        messageable_id: 1, 
        messageable_type:"DirectMessage", 
        unread_by_workspace_users: {  }, 
        edited: false)
    Message.create!(workspace_author_id: 4,
        content: "Welcome to direct messaging", 
        messageable_id: 2, 
        messageable_type:"DirectMessage", 
        unread_by_workspace_users: { 1 => true }, 
        edited: false)
    Message.create!(workspace_author_id: 2,
        content: "It's pretty neat! Let's try it out", 
        messageable_id: 2, 
        messageable_type:"DirectMessage", 
        unread_by_workspace_users: { 1 => true }, 
        edited: false)
    Message.create!(workspace_author_id: 8,
        content: "Hey - want to carpool to practice?", 
        messageable_id: 3, 
        messageable_type:"DirectMessage", 
        unread_by_workspace_users: { 5 => true }, 
        edited: false)
    Message.create!(workspace_author_id: 6,
        content: "Are tonight's games going to be cancelled?", 
        messageable_id: 4, 
        messageable_type:"DirectMessage", 
        unread_by_workspace_users: { 7 => true }, 
        edited: false)

    puts "Done!"
end

