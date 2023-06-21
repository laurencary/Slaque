# == Schema Information
#
# Table name: channels
#
#  id           :bigint           not null, primary key
#  owner_id     :bigint           not null
#  workspace_id :bigint           not null
#  name         :string           not null
#  description  :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class Channel < ApplicationRecord
	validates :name, presence: true, uniqueness: { scope: :workspace_id, message: "A channel already exists with that name" }

	belongs_to :owner,
		foreign_key: :owner_id,
		class_name: :User

	belongs_to :workspace,
		foreign_key: :workspace_id,
		class_name: :Workspace

	has_many :channel_subscriptions,
		foreign_key: :channel_id,
		class_name: :ChannelSubscription,
		dependent: :destroy

	has_many :workspace_users,
		through: :channel_subscriptions,
		source: :workspace_user

	has_many :messages,
		as: :messageable,
		dependent: :destroy

	def has_unread_message?(workspace_user_id)
		self.messages.any? { |message| message.unread_by_workspace_users.has_key?(workspace_user_id.to_s) }
	end
end
