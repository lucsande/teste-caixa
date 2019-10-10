class User < ApplicationRecord
  has_many :deposit_withdrawals
  has_many :paid_transactions, class_name: 'Transaction'  , foreign_key: :payer_id
  has_many :received_transactions, class_name: 'Transaction', foreign_key: :receiver_id

  has_secure_password
  validates :security_number, uniqueness: true, presence: true, length: { is: 11 }
end
