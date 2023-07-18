# Slaque

Live website: [Slaque](https://slaque-app-dddbd857f989.herokuapp.com/)

Slaque is a clone of the popular messaging app, Slack. Slaque allows users from a 
workspace to live chat with each other through channels and direct messages.

## Technologies Used
- JavaScript
- React
- Redux
- Ruby on Rails
- PostgreSQL
- ActionCable (for Websockets)
- HTML5
- CSS

Slaque's core application centers on the Websocket Communication Protocol which 
provides users with live updates without refreshing the page. I built the backend
using Ruby on Rails and a PostgreSQL database. The front end utilizes 
React.js, Redux (for global state management), HTML5, and CSS.

## Features
### LiveChat with the WebSocket Communication Protocol
- Logged in users that are subscribed to a given channel/direct message receive
live updates without having to refresh the page. Updates include
receiving messages, updating messages or omitting deleted messages.
- Currently, the user is subscribed to a single channel or direct message they have selected 


### User Authentication:
- Users can create an account and login with credentials, as well as log out.
- Users can login with Demo user accounts, providing access to all the application's features
- Most functionality requires a login.
- Authentication is created and validated using a Rails session object.


### Workspaces:
- Users can view a workspace
- Users can switch between workspaces they belong to
- Users can create and edit a profile specific to the workspace.

### Channels:
- Users can create a channel
- Users can browse all channels
- Users that are members of a channel can edit the description
- Users that are the owners of a channel can edit the name or delete the channel
- Users can leave a channel
- Users can join a channel
- Users can add other memebers of the workspace to a channel

### Direct Messages
- Users can create conversations with one or more workspace members
- Users can add other members of the workspace to a direct message

### Messages
- Users can live chat in a direct message or channel
- Users can create, edit, and delete their messages
- Users can see conversations with unread messages on refresh

## Highlighted Features
1. To handle unread messages, the site saves objects with the keys of the users who have not read a message. When it displays the messages to the user, it saves the first unread message so the application renders a new notification line above all the messages that are unread. It marks messages read when the conversation is selected, but it doesn't refresh the messages "slice of state" until the conversation is selected again or refreshed so it maintains the new line as messages are received and sent. I do however mark the channel or direct message read in the side bar.

```javascript
const MessagesView = ({ messageableId, messageableType, messageMembersArr }) => {
    const messagesEndRef = useRef(null)
    const workspaceUserId = useSelector(state => state.currentWorkspace.workspaceSubscriptionId)
    const messages = useSelector(getMessages);
    const unreadMessages = messages.filter(message => message.unread && message.workspaceAuthorId !== workspaceUserId)
    const firstUnreadMessage = unreadMessages[0];
    
    useEffect(() => {
        scrollToBottom();
    }, [messages, messageableId])
    
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <div className="message-scroll-container">
            <div className="messageable-details">
                {messageableType === 'channel' ? 
                    <ChannelTopDetails messageableId={messageableId}/> : 
                    <DirectMessageTopDetails
                        messageMembersArr={messageMembersArr} 
                        messageableId={messageableId} />
                }
            </div>
            <div className="primary-messages">
                {messages.map((message) => (
                    <>
                        { unreadMessages.length > 0 && 
                            message.id === firstUnreadMessage.id && (
                            <div key={`nms${message.id}`} className="new-messages-line">
                                <hr></hr>
                                <p>New</p>
                            </div>
                        )}
                        <div key={`msg${message.id}`}>
                            <MessageItem  message={message} 
                            messageableId={messageableId} 
                            messageableType={messageableType} />
                        </div>
                    </>
                ))}
            </div>
            <div ref={messagesEndRef} />
        </div>
    ) 
}
```

2. To ensure creating a new message is streamlined, I needed to perform three actions 
in the backend in a specific order. 
  * create the direct message
  * create the user subscriptions to the message
  * create the message with the content in the new message form
  
To do this, the application sends all the information for these actions to the thunk action to create the direct message. 
The direct message controller creates the direct message and the user subscriptions (shown below).
The thunk creator then creates the dispatches the createMessage thunk once it receives an 
okay response from the backend.

```ruby
def create
    @direct_message = DirectMessage.new(workspace_id: params[:workspace_id])
    @user_ids = params[:workspace_user_ids]
    if @direct_message.save
        @user_ids.each do |user_id|
            DirectMessageSubscription.create(workspace_user_id: user_id, direct_message_id: @direct_message.id)
        end
        render 'api/direct_messages/show'
    else
        render json: { errors: @direct_message.errors.full_messages }, status: :unprocessable_entity 
    end
end
```


## Features to add in the future
- In the future, WebSockets will be expanded so that when a user is logged in they will be 
  subscribed to updates from all channels and direct messages they are a part of.
- functionality to create a workspace
- functionality to leave a workspace
- Add mentions
- Add threads
- Add emojis to the message content
- Add formatting to messaging
- Add emoji reactions to messaegs.
