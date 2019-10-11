class UsersController < ApplicationController
  include CurrentUserConcern

  def find
    security_number = params['user']['security_number'].gsub(/\D/, '')
    user = User
           .find_by(security_number: security_number)

    if user
      transactions = []

      if user.id == session[:user_id]
        user.paid_transactions.each { |transaction| transactions <<  transaction}
        user.received_transactions.each { |transaction| transactions << transaction }

        transactions = transactions.sort_by(&:created_at).reverse.map do |transaction|
          new_transaction = {}
          new_transaction[:id] = transaction.id
          new_transaction[:date] = transaction.created_at.in_time_zone('Brasilia').strftime('%d/%m/%y - %H:%m')
          new_transaction[:type] = transaction.transaction_type
          new_transaction[:amount] = transaction.amount
          new_transaction[:payer_id] = transaction.payer_id
          new_transaction[:payer_name] = User.find(transaction.payer_id).name
          new_transaction[:receiver_id] = transaction.receiver_id
          new_transaction[:receiver_name] = transaction.receiver_name

          new_transaction
        end
      end

      render json: {
        status: :created,
        user: { id:user.id, name: user.name, security_number: user.security_number, transactions: transactions.uniq }
      }
    else
      render json: { status: 500, error: true }
    end
  end

  def update
    payer_number = params['payer']['security_number'].gsub(/\D/, '')
    receiver_number = params['receiver']['security_number'].gsub(/\D/, '')
    transaction_type = params["transactionType"]
    amount = params["amount"]

    payer = User
           .find_by(security_number: payer_number)
           .try(:authenticate, params["payer"]["password"])

    receiver = User
           .find_by(security_number: receiver_number)

    if session[:user_id] == payer.id
      payer.balance += transaction_type == 'deposit' ? amount : -amount
      receiver.balance += amount if transaction_type == 'transfer'

      payer.save
      receiver.save
      transaction = Transaction.new(transaction_type: transaction_type, amount: amount, receiver_name: receiver.name)
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

  def destroy
    security_number = params['user']['security_number'].gsub(/\D/, '')
    user = User.find_by(security_number: security_number)
    authentication = user.try(:authenticate, params["user"]["password"])

    if authentication
      user.deleted = true
      user.save
      render json: { status: :deleted, user: user }
    else
      render json: { status: 401, error: true }
    end
  end
end
