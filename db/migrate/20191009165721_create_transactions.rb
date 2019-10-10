class CreateTransactions < ActiveRecord::Migration[6.0]
  def change
    create_table :transactions do |t|
      t.float :amount
      t.string :transaction_type
      t.integer :payer_id, foreign_key: true
      t.integer :receiver_id, foreign_key: true

      t.timestamps
    end
  end
end
