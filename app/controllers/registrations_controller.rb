class RegistrationsController < ApplicationController
  def create
    security_number = params['user']['security_number'].gsub(/\D/, '')
    password = ''
    6.times { password += rand(10).to_s }

    user = User.create(
      name: params['user']['name'],
      security_number: security_number,
      password: password,
      password_confirmation: password
    )

    if user.id
      session[:user_id] = user.id
      render json: {
        status: :created,
        user: user,
        generated_password: password
      }
    else
      render json: { status: 500, error: true }
    end
  end
end
