class UiPreset < ActiveRecord::Base
  has_and_belongs_to_many :users
  validates :name, :attrs, presence: true
  validates :name, uniqueness: true
end
