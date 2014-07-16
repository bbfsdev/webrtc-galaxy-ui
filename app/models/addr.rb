class Addr < ActiveRecord::Base
  belongs_to :city, inverse_of: :addrs
  delegate :country, to: :city
  has_one :user, inverse_of: :addr
end
