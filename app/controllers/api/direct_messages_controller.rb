class Api::DirectMessagesController < ApplicationController
    def show
        @direct_message = DirectMessage..where("id = #{params[:id]}").includes(:messages)
        render :show
    end
end
