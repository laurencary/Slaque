# == Schema Information
#
# Table name: direct_messages
#
#  id           :bigint           not null, primary key
#  workspace_id :bigint           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class DirectMessage < ApplicationRecord
	belongs_to :workspace,
		foreign_key: :workspace_id,
		class_name: :Workspace

	has_many :direct_message_subscriptions,
		foreign_key: :direct_message_id,
		class_name: :DirectMessageSubscription

	has_many :workspace_users,
		through: :direct_message_subscriptions,
		source: :workspace_user
	
	has_many :messages,
		as: :messageable,
		dependent: :destroy

	def getDirectMessageName
		users = self.workspace_users.map { |user| user.full_name }
		users.sort.join(', ')
	end

	def unread_message_count(workspace_user_id)
		self.messages.count { |message| message.unread_by_workspace_users.has_key?(workspace_user_id.to_s) }
	end

end
