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
    User.create!(email: 'ryan@user.io', password: 'pwryan')               #34
    

    puts "Creating workspaces..."

    Workspace.create!(name: 'Dunder Mifflin', owner_id: 27)
    Workspace.create!(name: 'Land of Oz', owner_id: 12)

    puts "Creating workspace user subscriptions..."

    WorkspaceUserSubscription.create!(user_id: 1, workspace_id: 2, full_name: 'Elphaba Thropp', display_name: 'Elphaba', title: 'Wicked Witch', pronunciation: 'el-fuh-baa')
    WorkspaceUserSubscription.create!(user_id: 2, workspace_id: 2, full_name: 'Nessarose Thropp', display_name: 'Nessa')
    WorkspaceUserSubscription.create!(user_id: 3, workspace_id: 2, full_name: 'Shell Thropp')
    WorkspaceUserSubscription.create!(user_id: 4, workspace_id: 2, full_name: 'Melena Throp')
    WorkspaceUserSubscription.create!(user_id: 5, workspace_id: 2, full_name: 'Boq')
    WorkspaceUserSubscription.create!(user_id: 6, workspace_id: 2, full_name: 'Doctor Dillamond', display_name: 'The OG GOAT', title: 'Professor')
    WorkspaceUserSubscription.create!(user_id: 7, workspace_id: 2, full_name: 'Fiyero Tigelaar', display_name: 'Fiyero')
    WorkspaceUserSubscription.create!(user_id: 8, workspace_id: 2, full_name: 'Madame Morrible', title: 'Headmistress')
    WorkspaceUserSubscription.create!(user_id: 9, workspace_id: 2, full_name: 'Milla')
    WorkspaceUserSubscription.create!(user_id: 10, workspace_id: 2, full_name: 'Pfanne', pronunciation: 'fane')
    WorkspaceUserSubscription.create!(user_id: 11, workspace_id: 2, full_name: 'Shenshen')
    WorkspaceUserSubscription.create!(user_id: 12, workspace_id: 2, full_name: 'Wizard of Oz', display_name: 'Wonderful')
    WorkspaceUserSubscription.create!(user_id: 13, workspace_id: 2, full_name: 'Galinda Upland', display_name: 'Glinda', title: 'The Good Witch')
    WorkspaceUserSubscription.create!(user_id: 32, workspace_id: 2, full_name: 'Demo 1')
    WorkspaceUserSubscription.create!(user_id: 33, workspace_id: 2, full_name: 'Demo 2')

    WorkspaceUserSubscription.create!(user_id: 14, workspace_id: 1, display_name: 'Jimothy', full_name: 'Jim Halpert', title: 'Salesman')
    WorkspaceUserSubscription.create!(user_id: 15, workspace_id: 1, full_name: 'Angela Martin', title: 'Accountant')
    WorkspaceUserSubscription.create!(user_id: 16, workspace_id: 1, full_name: 'Pam Beesley', title: 'Receptionist')
    WorkspaceUserSubscription.create!(user_id: 17, workspace_id: 1, full_name: 'Oscar Martinez', title: 'Accountant')
    WorkspaceUserSubscription.create!(user_id: 18, workspace_id: 1, full_name: 'Phyllis Lapin', title: 'Salesman')
    WorkspaceUserSubscription.create!(user_id: 19, workspace_id: 1, full_name: 'Toby Flenderson', title: 'Human Resources Manager')
    WorkspaceUserSubscription.create!(user_id: 20, workspace_id: 1, full_name: 'Kevin Malone', title: 'Accountant')
    WorkspaceUserSubscription.create!(user_id: 21, workspace_id: 1, full_name: 'Stanley Hudson', title: 'Salesman')
    WorkspaceUserSubscription.create!(user_id: 22, workspace_id: 1, full_name: 'Meredith Palmer', title: 'Supplier Relations')
    WorkspaceUserSubscription.create!(user_id: 23, workspace_id: 1, full_name: 'Kelly Kapoor', title: 'Customer Service Specialist')
    WorkspaceUserSubscription.create!(user_id: 24, workspace_id: 1, full_name: 'Darryl Philben', title: 'Warehouse Specialist')
    WorkspaceUserSubscription.create!(user_id: 25, workspace_id: 1, full_name: 'Roy Anderson', title: 'Warehouse Specialist')
    WorkspaceUserSubscription.create!(user_id: 26, workspace_id: 1, full_name: 'Lonny Collins', title: 'Warehouse Specialist')
    WorkspaceUserSubscription.create!(user_id: 27, workspace_id: 1, full_name: 'David Wallace', title: 'CEO')
    WorkspaceUserSubscription.create!(user_id: 28, workspace_id: 1, full_name: 'Jan Levinson', title: 'VP of Northeaster nSales')
    WorkspaceUserSubscription.create!(user_id: 29, workspace_id: 1, display_name: 'Michael Scarn', full_name: 'Michael Scott', title: 'Regional Manager')
    WorkspaceUserSubscription.create!(user_id: 30, workspace_id: 1, full_name: 'Dwight Shrute', title: 'Assistant to the Manager, Salesman')
    WorkspaceUserSubscription.create!(user_id: 31, workspace_id: 1, full_name: 'Creed Bratton', title: 'Quality Assurance')
    WorkspaceUserSubscription.create!(user_id: 32, workspace_id: 1, full_name: 'Demo 1', title: 'Thanks for checking out Slaque!')
    WorkspaceUserSubscription.create!(user_id: 33, workspace_id: 1, full_name: 'Demo 2', title: 'Thanks for checking out Slaque!')
    WorkspaceUserSubscription.create!(user_id: 34, workspace_id: 1, full_name: 'Ryan Howard', title: 'temp')
    

    puts "Create channels..."

    Channel.create!(owner_id: 12, workspace_id: 2, name: "ozians")                  #1 thank goodness no one mourns the wicked
    Channel.create!(owner_id: 5, workspace_id: 2, name: "munckinland")              
    Channel.create!(owner_id: 8, workspace_id: 2, name: "shiz-university")          #3 
    Channel.create!(owner_id: 13, workspace_id: 2, name: "popular-girls")           #4 
    Channel.create!(owner_id: 7, workspace_id: 2, name: "ozdust-ballroom-party")    #5
    Channel.create!(owner_id: 29, workspace_id: 1, name: "scranton-branch")         #6
    Channel.create!(owner_id: 29, workspace_id: 1, name: "everyone-except-toby")    #7
    Channel.create!(owner_id: 18, workspace_id: 1, name: "finer-things-club")       #8            #10
    Channel.create!(owner_id: 31, workspace_id: 1, name: "creeds-thoughts")         #9
    
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
    ChannelSubscription.create!(workspace_user_id: 14, channel_id: 1)
    ChannelSubscription.create!(workspace_user_id: 15, channel_id: 1)

    ChannelSubscription.create!(workspace_user_id: 5, channel_id: 2)
    ChannelSubscription.create!(workspace_user_id: 9, channel_id: 2)
    ChannelSubscription.create!(workspace_user_id: 10, channel_id: 2)
    ChannelSubscription.create!(workspace_user_id: 11, channel_id: 2)
    ChannelSubscription.create!(workspace_user_id: 13, channel_id: 2)
    ChannelSubscription.create!(workspace_user_id: 14, channel_id: 2)
    ChannelSubscription.create!(workspace_user_id: 15, channel_id: 2)

    ChannelSubscription.create!(workspace_user_id: 1, channel_id: 3)
    ChannelSubscription.create!(workspace_user_id: 2, channel_id: 3)
    ChannelSubscription.create!(workspace_user_id: 5, channel_id: 3)
    ChannelSubscription.create!(workspace_user_id: 6, channel_id: 3)
    ChannelSubscription.create!(workspace_user_id: 7, channel_id: 3)
    ChannelSubscription.create!(workspace_user_id: 8, channel_id: 3)
    ChannelSubscription.create!(workspace_user_id: 9, channel_id: 3)
    ChannelSubscription.create!(workspace_user_id: 10, channel_id: 3)
    ChannelSubscription.create!(workspace_user_id: 11, channel_id: 3)
    ChannelSubscription.create!(workspace_user_id: 13, channel_id: 3)
    ChannelSubscription.create!(workspace_user_id: 14, channel_id: 3)
    
    ChannelSubscription.create!(workspace_user_id: 9, channel_id: 4)
    ChannelSubscription.create!(workspace_user_id: 10, channel_id: 4)
    ChannelSubscription.create!(workspace_user_id: 11, channel_id: 4)
    ChannelSubscription.create!(workspace_user_id: 13, channel_id: 4)
    ChannelSubscription.create!(workspace_user_id: 14, channel_id: 4)

    ChannelSubscription.create!(workspace_user_id: 1, channel_id: 5)
    ChannelSubscription.create!(workspace_user_id: 2, channel_id: 5)
    ChannelSubscription.create!(workspace_user_id: 5, channel_id: 5)
    ChannelSubscription.create!(workspace_user_id: 7, channel_id: 5)
    ChannelSubscription.create!(workspace_user_id: 9, channel_id: 5)
    ChannelSubscription.create!(workspace_user_id: 10, channel_id: 5)
    ChannelSubscription.create!(workspace_user_id: 11, channel_id: 5)
    ChannelSubscription.create!(workspace_user_id: 13, channel_id: 5)
    ChannelSubscription.create!(workspace_user_id: 15, channel_id: 5)

    ChannelSubscription.create!(workspace_user_id: 16, channel_id: 6)
    ChannelSubscription.create!(workspace_user_id: 17, channel_id: 6)
    ChannelSubscription.create!(workspace_user_id: 18, channel_id: 6)
    ChannelSubscription.create!(workspace_user_id: 19, channel_id: 6)
    ChannelSubscription.create!(workspace_user_id: 20, channel_id: 6)
    ChannelSubscription.create!(workspace_user_id: 21, channel_id: 6)
    ChannelSubscription.create!(workspace_user_id: 22, channel_id: 6)
    ChannelSubscription.create!(workspace_user_id: 23, channel_id: 6)
    ChannelSubscription.create!(workspace_user_id: 24, channel_id: 6)
    ChannelSubscription.create!(workspace_user_id: 25, channel_id: 6)
    ChannelSubscription.create!(workspace_user_id: 26, channel_id: 6)
    ChannelSubscription.create!(workspace_user_id: 27, channel_id: 6)
    ChannelSubscription.create!(workspace_user_id: 28, channel_id: 6)
    ChannelSubscription.create!(workspace_user_id: 29, channel_id: 6)
    ChannelSubscription.create!(workspace_user_id: 30, channel_id: 6)
    ChannelSubscription.create!(workspace_user_id: 31, channel_id: 6)
    ChannelSubscription.create!(workspace_user_id: 32, channel_id: 6)
    ChannelSubscription.create!(workspace_user_id: 33, channel_id: 6)
    ChannelSubscription.create!(workspace_user_id: 34, channel_id: 6)
    ChannelSubscription.create!(workspace_user_id: 35, channel_id: 6)
    ChannelSubscription.create!(workspace_user_id: 36, channel_id: 6)

    ChannelSubscription.create!(workspace_user_id: 16, channel_id: 7)
    ChannelSubscription.create!(workspace_user_id: 17, channel_id: 7)
    ChannelSubscription.create!(workspace_user_id: 18, channel_id: 7)
    ChannelSubscription.create!(workspace_user_id: 19, channel_id: 7)
    ChannelSubscription.create!(workspace_user_id: 20, channel_id: 7)
    ChannelSubscription.create!(workspace_user_id: 22, channel_id: 7)
    ChannelSubscription.create!(workspace_user_id: 23, channel_id: 7)
    ChannelSubscription.create!(workspace_user_id: 24, channel_id: 7)
    ChannelSubscription.create!(workspace_user_id: 25, channel_id: 7)
    ChannelSubscription.create!(workspace_user_id: 26, channel_id: 7)
    ChannelSubscription.create!(workspace_user_id: 27, channel_id: 7)
    ChannelSubscription.create!(workspace_user_id: 28, channel_id: 7)
    ChannelSubscription.create!(workspace_user_id: 31, channel_id: 7)
    ChannelSubscription.create!(workspace_user_id: 32, channel_id: 7)
    ChannelSubscription.create!(workspace_user_id: 33, channel_id: 7)
    ChannelSubscription.create!(workspace_user_id: 34, channel_id: 7)
    ChannelSubscription.create!(workspace_user_id: 35, channel_id: 7)
    ChannelSubscription.create!(workspace_user_id: 36, channel_id: 7)

    ChannelSubscription.create!(workspace_user_id: 18, channel_id: 8)
    ChannelSubscription.create!(workspace_user_id: 19, channel_id: 8)
    ChannelSubscription.create!(workspace_user_id: 21, channel_id: 8)

    ChannelSubscription.create!(workspace_user_id: 33, channel_id: 9)
    ChannelSubscription.create!(workspace_user_id: 34, channel_id: 9)
    ChannelSubscription.create!(workspace_user_id: 36, channel_id: 9)

    
    puts "Creating direct messages..."
    DirectMessage.create!(workspace_id: 1) # 1 Michael, Jim, Dwitght, Demo 1
    DirectMessage.create!(workspace_id: 1) # 2 Demo 1, Demo 2
    DirectMessage.create!(workspace_id: 2) # 4 glinda to her friends demo 1 popular
    DirectMessage.create!(workspace_id: 2) # 6 Dr Dillamond and Elphaba demo 2
    DirectMessage.create!(workspace_id: 2) # 7 Demo 1 and Demo 2


    puts "Creating direct message subscriptions..."
    DirectMessageSubscription.create!(workspace_user_id: 31, direct_message_id: 1)
    DirectMessageSubscription.create!(workspace_user_id: 16, direct_message_id: 1)
    DirectMessageSubscription.create!(workspace_user_id: 32, direct_message_id: 1)
    DirectMessageSubscription.create!(workspace_user_id: 34, direct_message_id: 1)
    DirectMessageSubscription.create!(workspace_user_id: 34, direct_message_id: 2)
    DirectMessageSubscription.create!(workspace_user_id: 35, direct_message_id: 2)
    DirectMessageSubscription.create!(workspace_user_id: 1, direct_message_id: 3)
    DirectMessageSubscription.create!(workspace_user_id: 13, direct_message_id: 3)
    DirectMessageSubscription.create!(workspace_user_id: 14, direct_message_id: 3)
    DirectMessageSubscription.create!(workspace_user_id: 14, direct_message_id: 4)
    DirectMessageSubscription.create!(workspace_user_id: 15, direct_message_id: 4)


    # michael asking for dates
    # popular
    puts "Creating messages"
    Message.create!(workspace_author_id: 13, 
        content: "My granny is always giving me the most hideous hats. She got me a witch's hat", 
        messageable_id: 4, 
        messageable_type: "Channel", 
        unread_by_workspace_users: {  }, 
        edited: false)
    Message.create!(workspace_author_id: 10, 
        content: "What isn Oz's name!?", 
        messageable_id: 4, 
        messageable_type: "Channel", 
        unread_by_workspace_users: {  }, 
        edited: false)
    Message.create!(workspace_author_id: 13, 
        content: "I'd give it away, but I don't hate anyone that much.", 
        messageable_id: 4, 
        messageable_type: "Channel", 
        unread_by_workspace_users: {  }, 
        edited: false)
    Message.create!(workspace_author_id: 11, 
        content: "Yes you do!", 
        messageable_id: 4, 
        messageable_type: "Channel", 
        unread_by_workspace_users: {  }, 
        edited: false)
    Message.create!(workspace_author_id: 10, 
        content: "Give it to her! Just do it!", 
        messageable_id: 4, 
        messageable_type: "Channel", 
        unread_by_workspace_users: {  }, 
        edited: false)
    Message.create!(workspace_author_id: 13, 
        content: "Oh you're right. I'll give it to her", 
        messageable_id: 4, 
        messageable_type: "Channel", 
        unread_by_workspace_users: {  }, 
        edited: false)
    Message.create!(workspace_author_id: 5, 
        content: "Galinda, you are just to good! How do you stand it? I don't think I could!", 
        messageable_id: 2, 
        messageable_type: "Channel", 
        unread_by_workspace_users: {  }, 
        edited: false)
    Message.create!(workspace_author_id: 9, 
        content: "She's a terror, she's a tartar! I don't mean to show a bias, but Galinda, you're a martar.", 
        messageable_id: 2, 
        messageable_type: "Channel", 
        unread_by_workspace_users: {  }, 
        edited: false)
    Message.create!(workspace_author_id: 13, 
        content: "Well... these things are sent to try us.", 
        messageable_id: 2, 
        messageable_type: "Channel", 
        unread_by_workspace_users: {  }, 
        edited: false)
    Message.create!(workspace_author_id: 10, 
        content: "Poor Galinda, forced to reside with someone so disgustified. We just want to tell you, we're all on your side!", 
        messageable_id: 2, 
        messageable_type: "Channel", 
        unread_by_workspace_users: {  }, 
        edited: false)
    Message.create!(workspace_author_id: 11, 
        content: "We share your loathing, unadulterated loathing", 
        messageable_id: 2, 
        messageable_type: "Channel", 
        unread_by_workspace_users: {  }, 
        edited: false)
    Message.create!(workspace_author_id: 33, 
        content: "I turn all kinds of things into pies.", 
        messageable_id: 9, 
        messageable_type: "Channel", 
        unread_by_workspace_users: {  }, 
        edited: false)
    Message.create!(workspace_author_id: 33, 
        content: "Who hasn’t lived in a cave at one point or another? That’s what they’re for.", 
        messageable_id: 9, 
        messageable_type: "Channel", 
        unread_by_workspace_users: {  }, 
        edited: false)
    Message.create!(workspace_author_id: 33, 
        content: "Most people have a thing against bugs, but not me. I love the little guys. The way I see it, there’s more of them than there are of us, so you have to respect them just in case. If they ever got their stuff together, they could really do some serious damage. I’m talking city destruction, livestock relocation, and political domination here.", 
        messageable_id: 9, 
        messageable_type: "Channel", 
        unread_by_workspace_users: {  }, 
        edited: false)
    Message.create!(workspace_author_id: 18, 
        content: "Everyone ready to discuss Angela's Ashes tomorrow during lunch?", 
        messageable_id: 8, 
        messageable_type: "Channel", 
        unread_by_workspace_users: {  }, 
        edited: false)
    Message.create!(workspace_author_id: 19, 
        content: "Definitely, I'll bring the tea.", 
        messageable_id: 8, 
        messageable_type: "Channel", 
        unread_by_workspace_users: {  }, 
        edited: false)
    Message.create!(workspace_author_id: 21, 
        content: "We can listen to Vivaldi as well.", 
        messageable_id: 8, 
        messageable_type: "Channel", 
        unread_by_workspace_users: {  }, 
        edited: false)
    Message.create!(workspace_author_id: 5, 
        content: "Oh hallowed halls and vine draped walls, the proudliest site there is.", 
        messageable_id: 3, 
        messageable_type: "Channel", 
        unread_by_workspace_users: {  }, 
        edited: false)
    Message.create!(workspace_author_id: 8, 
        content: "Welcome, new students! I'm the headmistress here, at Shiz University. I have the highest hopes for some of you. Now regarding room assignments...", 
        messageable_id: 3, 
        messageable_type: "Channel", 
        unread_by_workspace_users: {  }, 
        edited: false)
    Message.create!(workspace_author_id: 13, 
        content: "I've already been assigned a private suite... I am Galinda Upland of the Upperuplands. I've applied to your sorcery seminar.", 
        messageable_id: 3, 
        messageable_type: "Channel", 
        unread_by_workspace_users: {  }, 
        edited: false)
    Message.create!(workspace_author_id: 1, 
        content: "Actually, my sister, Nessa, and I haven't received our room assignments.", 
        messageable_id: 3, 
        messageable_type: "Channel", 
        unread_by_workspace_users: {  }, 
        edited: false)
    Message.create!(workspace_author_id: 8, 
        content: " I don't seem to have you on my list. Oh, well a slight gulch, but not to fret! We'll find someplace to put you.", 
        messageable_id: 3, 
        messageable_type: "Channel", 
        unread_by_workspace_users: {  }, 
        edited: false)
    Message.create!(workspace_author_id: 7, 
        content: "So, whats the most swankified place in town?", 
        messageable_id: 5, 
        messageable_type: "Channel", 
        unread_by_workspace_users: {  }, 
        edited: false)
    Message.create!(workspace_author_id: 13, 
        content: "That would be the Ozdust Ballroom!", 
        messageable_id: 5, 
        messageable_type: "Channel", 
        unread_by_workspace_users: {  }, 
        edited: false)
    Message.create!(workspace_author_id: 7, 
        content: "Sounds perfect! We'll meet there later tonight.", 
        messageable_id: 5, 
        messageable_type: "Channel", 
        unread_by_workspace_users: {  }, 
        edited: false)
    Message.create!(workspace_author_id: 5, 
        content: "Miss Galinda, I hope you save one dance for me.", 
        messageable_id: 5, 
        messageable_type: "Channel", 
        unread_by_workspace_users: {  }, 
        edited: false)
    Message.create!(workspace_author_id: 13, 
        content: "Oh how very kind, Biq.", 
        messageable_id: 5, 
        messageable_type: "Channel", 
        unread_by_workspace_users: {  }, 
        edited: false)
    Message.create!(workspace_author_id: 31, 
        content: "Why is Toby the WORST???", 
        messageable_id: 7, 
        messageable_type: "Channel", 
        unread_by_workspace_users: {  }, 
        edited: false)
    Message.create!(workspace_author_id: 18, 
        content: "I don't think this is a good idea for a channel, Michael...", 
        messageable_id: 7, 
        messageable_type: "Channel", 
        unread_by_workspace_users: {  }, 
        edited: false)
    Message.create!(workspace_author_id: 17, 
        content: "This is highly inappropriate", 
        messageable_id: 7, 
        messageable_type: "Channel", 
        unread_by_workspace_users: {  }, 
        edited: false)
    Message.create!(workspace_author_id: 31, 
        content: "EVERYONE! Tonight is Casino Night in the warehouse. Great cause lined up for donations...", 
        messageable_id: 6, 
        messageable_type: "Channel", 
        unread_by_workspace_users: {  }, 
        edited: false)
    Message.create!(workspace_author_id: 25, 
        content: "Kobe Bryant has a foundation, and he is so hot.", 
        messageable_id: 6, 
        messageable_type: "Channel", 
        unread_by_workspace_users: {  }, 
        edited: false)
    Message.create!(workspace_author_id: 31, 
        content: "I am going to donate to Afghanistanis with AIDS.", 
        messageable_id: 6, 
        messageable_type: "Channel", 
        unread_by_workspace_users: {  }, 
        edited: false)
    Message.create!(workspace_author_id: 16, 
        content: "Oh, I think you mean the Aid to Afghanistan", 
        messageable_id: 6, 
        messageable_type: "Channel", 
        unread_by_workspace_users: {  }, 
        edited: false)
    Message.create!(workspace_author_id: 31, 
        content: "No, I mean Afghanistanis with AIDS", 
        messageable_id: 6, 
        messageable_type: "Channel", 
        unread_by_workspace_users: {  }, 
        edited: false)
    Message.create!(workspace_author_id: 20, 
        content: "Afghani", 
        messageable_id: 6, 
        messageable_type: "Channel", 
        unread_by_workspace_users: {  }, 
        edited: false)
    Message.create!(workspace_author_id: 31, 
        content: "What?", 
        messageable_id: 6, 
        messageable_type: "Channel", 
        unread_by_workspace_users: {  }, 
        edited: false)
    Message.create!(workspace_author_id: 20, 
        content: "Afghani", 
        messageable_id: 6, 
        messageable_type: "Channel", 
        unread_by_workspace_users: {  }, 
        edited: false)
    Message.create!(workspace_author_id: 31, 
        content: "That's a dog", 
        messageable_id: 6, 
        messageable_type: "Channel", 
        unread_by_workspace_users: {  }, 
        edited: false)
    Message.create!(workspace_author_id: 18, 
        content: "No, that's an afghan", 
        messageable_id: 6, 
        messageable_type: "Channel", 
        unread_by_workspace_users: {  }, 
        edited: false)
    Message.create!(workspace_author_id: 31, 
        content: "That's a shawl", 
        messageable_id: 6, 
        messageable_type: "Channel", 
        unread_by_workspace_users: {  }, 
        edited: false)
    Message.create!(workspace_author_id: 32, 
        content: "Wait, canine AIDS?", 
        messageable_id: 6, 
        messageable_type: "Channel", 
        unread_by_workspace_users: {  }, 
        edited: false)


    puts "Done!"
end

