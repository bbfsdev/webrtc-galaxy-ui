class Addr < ActiveRecord::Base
  belongs_to :city, inverse_of: :addrs
  belongs_to :country, through: :city
  has_one :user, inverse_of: :addr
end
