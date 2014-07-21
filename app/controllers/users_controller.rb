class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]
  before_filter :check_permissions

  # GET /users
  # GET /users.json
  def index
    @users = User.all.order(:role_id, :name)
    respond_to do |format|
      format.html
      format.json { render :index, layout: false }
    end
  end

  def by_role
    if Role.all.pluck(:name).include? params[:role]
      logger.debug "отдаю список пользователей с ролью #{params[:role]}"
      @role = Role.find_by(name: params[:role])
      @users = User.where(role_id: @role.id ).order(:name)
      respond_to do |format|
        format.html
        format.json { render json: @users.collect{|user| { id: user.id, name: user.name, email: user.email }}, layout: false }
      end
    end
  end

  # GET /users/1
  # GET /users/1.json
  def show
    respond_to do |format|
      format.html
      format.json { render :show, layout: false }
    end
  end

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
    # admin can create other users with no password confirmation
    if params[:user][:password] && (!params[:user][:password_confirmation]) && current_user.admin?
      params[:user][:password_confirmation] = params[:user][:password]
    end

    @user = User.new(user_params)

    respond_to do |format|
      if @user.save
        format.html { redirect_to @user, notice: 'User was successfully created.' }
        format.json { render :show, status: :created, location: @user }
      else
        format.html { redirect_to action: :new }
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
# need always set url with directory /currentlang/
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
      if params[:user].has_key?(:password) && (!params[:user][:password].empty?)
        params[:user][:password] = params[:user][:password].strip
        params[:user][:password_confirmation] = params[:user][:password_confirmation].strip
      else
        params[:user].delete(:password)
        params[:user].delete(:password_confirmation)
      end
      params.require(:user).permit(:name, :addr_id, :role_id, :email, :password, :password_confirmation)
    end
    def check_permissions
      true
    end
end
