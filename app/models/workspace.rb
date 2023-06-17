# == Schema Information
#
# Table name: workspaces
#
#  id         :bigint           not null, primary key
#  name       :string
#  owner_id   :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Workspace < ApplicationRecord
	validates :name, presence: true, uniqueness: true

	belongs_to :owner,
		primary_key: :id,
		foreign_key: :ownder_id,
		class_name: :User

	has_many :workspace_subscriptions,
		foreign_key: :workspace_id,
		class_name: :WorkspaceUserSubscription,
		dependent: :destroy
	
	has_many :workspace_users,
		through: :workspace_subscriptions
end
