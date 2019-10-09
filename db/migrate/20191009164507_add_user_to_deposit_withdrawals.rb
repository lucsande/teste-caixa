class AddUserToDepositWithdrawals < ActiveRecord::Migration[6.0]
  def change
    add_reference :deposit_withdrawals, :user, null: false, foreign_key: true
  end
end
