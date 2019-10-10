class UsersController < ApplicationController
  include CurrentUserConcern

  def update
    user = User
           .find_by(security_number: params["user"]["security_number"])
           .try(:authenticate, params["user"]["password"])

    if session[:user_id] = user.id
      amount = params["withdrawal"] ? -params["amount"] : params["amount"]
      transaction_type = params["withdrawal"] ? 'withdrawal' : 'deposit'
      user.balance += params["amount"]

      user.save
      transaction = DepositWithdrawal.create(type: transaction_type, value: amount)

      render json: {
        status: :created,
        amount: params["amount"],
        user: user,
        transaction: transaction
      }
    else
      render json: { status: 401, error: true }
    end
  end
end
