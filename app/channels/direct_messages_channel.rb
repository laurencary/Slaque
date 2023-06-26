class DirectMessagesChannel < ApplicationCable::Channel
    def subscribed
        @direct_messages = DirectMessage.find_by(id: params[:id])
        stream_for @direct_messages
    end
end