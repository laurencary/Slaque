# == Schema Information
#
# Table name: channel_subscriptions
#
#  id                :bigint           not null, primary key
#  workspace_user_id :bigint           not null
#  channel_id        :bigint           not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#
class ChannelSubscription < ApplicationRecord
    belongs_to :workspace_user,
        foreign_key: :workspace_user_id,
        class_name: :WorkspaceUserSubscription
    
    belongs_to :channel,
        foreign_key: :channel_id,
        class_name: :Channel
end
