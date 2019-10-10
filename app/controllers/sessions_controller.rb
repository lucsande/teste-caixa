class SessionsController < ApplicationController
  include CurrentUserConcern

  def create
    user = User
           .find_by(security_number: params["user"]["security_number"])
           .try(:authenticate, params["user"]["password"])

    if user
      session[:user_id] = user.id
      puts session
      render json: {
        status: :created,
        logged_in: true,
        user: user
      }
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
