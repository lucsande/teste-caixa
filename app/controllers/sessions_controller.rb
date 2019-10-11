class SessionsController < ApplicationController
  include CurrentUserConcern

  def create
    security_number = params['user']['security_number'].gsub(/\D/, '')
    user = User
           .find_by(security_number: security_number)
           .try(:authenticate, params["user"]["password"])

    if user && user.deleted == false
      session[:user_id] = user.id
      # puts "COOKIE SESSION -------------------- #{session}"
      render json: {
        status: :created,
        logged_in: true,
        user: user
      }
    elsif user
      render json: { status: 401, error: true, deleted: true }
    else
      render json: { status: 401, error: true }
    end
  end

  def logged_in
    if @current_user
      render json: {
        logged_in: true,
        user: @current_user
      }
    else
      render json: {
        logged_in: false,
        user: {}
      }
    end
  end

  def logout
    reset_session
    render json: { status: 200, logged_out: true }
  end
end
