# == Schema Information
#
# Table name: direct_message_subscriptions
#
#  id                :bigint           not null, primary key
#  workspace_user_id :bigint           not null
#  direct_message_id :bigint           not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#
class DirectMessageSubscription < ApplicationRecord
	belongs_to :workspace_user,
		primary_key: :id,
		foreign_key: :workspace_user_id,
		class_name: :WorkspaceUserSubscription

	belongs_to :direct_message,
		foreign_key: :direct_message_id,
		class_name: :DirectMessage
end
