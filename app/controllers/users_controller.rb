class UsersController < ApplicationController
  include CurrentUserConcern

  def find
    user = User
           .find_by(security_number: params["security_number"])

    if user
      render json: {
        status: :found,
        user: { name: user.name, security_number: user.security_number }
      }
    else
      render json: { status: 500, error: true, request: params }
    end
  end

  def update
    transaction_type = params["transactionType"]
    amount = params["amount"]

    payer = User
           .find_by(security_number: params["payer"]["security_number"])
           .try(:authenticate, params["payer"]["password"])

    receiver = User
           .find_by(security_number: params["receiver"]["security_number"])

    if session[:user_id] == payer.id
      payer.balance += transaction_type == 'deposit' ? amount : -amount
      receiver.balance += amount if transaction_type == 'transfer'

      payer.save
      receiver.save
      transaction = Transaction.new(transaction_type: transaction_type, amount: amount)
      transaction.payer = payer
      transaction.receiver = receiver
      transaction.save!

      render json: {
        status: :created,
        transaction: transaction
      }
    else
      render json: { status: 401, error: true }
    end
  end
end
