class HomeController < ApplicationController
  def index
    unless current_user.admin?
      redirect_to controller: 'home', action: 'room'
    end
    rooms = Room.all.order(:name)
    groups = User.joins(:role).where("roles.name = 'group'").order('roles.name')
  end

  def room
    rooms = Room.all.order(:name)
  end
end
