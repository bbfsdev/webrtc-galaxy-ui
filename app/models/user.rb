class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  belongs_to :addr, inverse_of: :user
  belongs_to :role
  
  def man?
    self.sex
  end
  def woman?
    ! self.sex
  end
    
end
