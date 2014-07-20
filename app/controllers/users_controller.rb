class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]
  before_filter :check_permissions

  # GET /users
  # GET /users.json
  def index
    @users = User.all.order(:role_id, :name)
    respond_to do |format|
      format.html
      format.json { render json: @users }
    end
  end

  # GET /users/1
  # GET /users/1.json
  def show
  end

#TODO: when creating user with role GROUP (eg. group)
# change view - drop name field, and obligatory select city and country
# make checks in model validations and in controller: create and update
  # GET /users/new
  def new
    @user = User.new
    @countries = Country.all.order(:name)
    @cities = City.all.order(:name)
  end

  # GET /users/1/edit
  def edit
    @countries = Country.all.order(:name)
    @cities = City.all.order(:name)
  end

  # POST /users
  # POST /users.json
  def create
    @user = User.new(user_params)

    respond_to do |format|
      if @user.save
        format.html { redirect_to @user, notice: 'User was successfully created.' }
        format.json { render :show, status: :created, location: @user }
      else
        format.html { render :new }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { render :edit }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user.destroy
    respond_to do |format|
      format.html { redirect_to users_url, notice: 'User was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

#TODO: need app-wide list of acceptable languages
# need always set url with param ?ispeak=currentlang
# need always accept setlanguage even before authentication
  def setlanguage
    if params[:code] =~ /^\w\w$/
      cookies[:language] = params[:code]
    else
      logger.warn "Incorrect language code submitted from #{current_user.id}:#{current_user.email}"
    end
#    redirect_to :
  end

  private
    def set_user
      @user = User.find(params[:id])
    end
    def user_params
      params.require(:user).permit(:name, :addr_id, :role_id)
    end
    def check_permissions
      # fish
    end
end
