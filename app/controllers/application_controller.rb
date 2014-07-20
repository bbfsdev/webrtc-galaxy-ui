class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  before_action :authenticate_user!
  protect_from_forgery with: :exception
  # before_filter :set_applocale

private
  def set_applocale
    lang = :ru
    # checking url
    if request.params[:ispeak] && request.params[:ispeak] =~ /^\w\w$/
      logger.debug "User asks for #{request.params[:ispeak]} language"
      lang = request.params[:ispeak]
    # checking cookies
    elsif 
      lang = cookies[:ispeak]
    # checking browser
    else
      ihave = %w(ru he de en)
      http_accept_language.compatible_language_from(ihave)
    end
    I18n.locale = lang
    cookies[:ispeak] = lang
  end
end
