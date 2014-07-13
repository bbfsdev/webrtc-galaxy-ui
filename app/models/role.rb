class Role < ActiveRecord::Base
  has_many :users, inverse_of: :role
end
