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
		foreign_key: :owner_id,
		class_name: :User

	has_many :workspace_users,
		foreign_key: :workspace_id,
		class_name: :WorkspaceUserSubscription,
		dependent: :destroy

	has_many :channels,
		foreign_key: :workspace_id,
		dependent: :destroy

	has_many :direct_messages,
		foreign_key: :workspace_id,
		dependent: :destroy
end
