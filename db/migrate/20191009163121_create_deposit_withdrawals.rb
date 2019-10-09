class CreateDepositWithdrawals < ActiveRecord::Migration[6.0]
  def change
    create_table :deposit_withdrawals do |t|
      t.string :type
      t.float :value

      t.timestamps
    end
  end
end
