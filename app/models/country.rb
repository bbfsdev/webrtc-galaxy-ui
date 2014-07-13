class Country < ActiveRecord::Base
  has_many :cities, inverse_of: :country
  
  def inhabitants
    self.cities.users
  end

end
