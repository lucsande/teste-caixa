class AddReceiverNameToTransactions < ActiveRecord::Migration[6.0]
  def change
    add_column :transactions, :receiver_name, :string
  end
end
