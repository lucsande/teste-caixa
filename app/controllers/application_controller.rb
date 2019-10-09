class ApplicationController < ActionController::Base
  # skip_before_action :verify_autenticity_token
  protect_from_forgery with: :null_session
end
