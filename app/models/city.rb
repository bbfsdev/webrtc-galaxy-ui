class City < ActiveRecord::Base
  belongs_to :country, inverse_of: :cities
  has_many :addrs, inverse_of: :city
  has_many :users, through: :addrs
end
