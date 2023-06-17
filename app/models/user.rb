# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
    has_secure_password

    validates :email, 
		uniqueness: true,
		length: { in: 3..255 },
		format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :session_token, presence: true, uniqueness: true
    validates :password, length: { in: 6..255 }, allow_nil: true

	before_validation :ensure_session_token

	has_many :owned_workspaces,
		foreign_key: :owner_id,
		class_name: :Workspace,
		dependent: :destroy

	has_many :workspace_subscriptions,
		foreign_key: :user_id,
		class_name: :WorkspaceUserSubscription,
		dependent: :destroy

	has_many :workspaces,
		through: :workspace_subscriptions,
		source: :workspace

	def self.find_by_credentials(email, password)
		return User.find_by(email: email)&.authenticate(password)
	end

	def reset_session_token!
		self.session_token = generate_unique_session_token
		self.save!
		return self.session_token
	end

    private

	def generate_unique_session_token
		loop do
			session_token = SecureRandom::urlsafe_base64(16)
			return session_token unless User.exists?(session_token: session_token)
		end
	end

	def ensure_session_token
		self.session_token ||= generate_unique_session_token
	end
end
