class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  belongs_to :addr, inverse_of: :user
  belongs_to :role, inverse_of: :users
  has_and_belongs_to_many :ui_presets
  
  validates :name, :role_id, :email, presence: true
  validates :name, :email, uniqueness: true
  validates :role_id, inclusion: { in: Role.first.id .. Role.last.id }

  def man?
    self.sex
  end
  def woman?
    ! self.sex
  end
  
  def role_is?(name)
    self.role.name == name
  end
  def method_missing(metoda, *args, &block)
    logger.debug "User.method_missing: '#{metoda}'"
    if metoda.to_s =~ /^(#{Role.all.pluck(:name).join('|')})\?$/
      role_is?($1)
    else
      super
    end
  end
end
