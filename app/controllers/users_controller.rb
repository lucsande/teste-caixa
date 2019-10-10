class UsersController < ApplicationController
  include CurrentUserConcern

  def update
    user = User
           .find_by(security_number: params["user"]["security_number"])
           .try(:authenticate, params["user"]["password"])

    if session[:user_id] = user.id
      user.balance += params["amount"] unless params["withdrawal"]
      user.balance -= params["amount"] if params["withdrawal"]
      user.save
      render json: {
        status: :created,
        amount: params["amount"],
        user: user
      }
    else
      render json: { status: 401, error: true }
    end
  end
end
