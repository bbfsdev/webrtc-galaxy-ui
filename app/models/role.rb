class Role < ActiveRecord::Base
  has_many :users, inverse_of: :role
  validates :name, presence: true, uniqueness: true
end
