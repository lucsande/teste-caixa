class Transaction < ApplicationRecord
  belongs_to :payer
  belongs_to :receiver
end
