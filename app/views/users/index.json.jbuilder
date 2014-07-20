json.array!(@users) do |user|
  json.extract! user, :id, :name, :addr_id, :role_id, :locked_at, :confirmed_at, :current_sign_in_at, :last_sign_in_at, :current_sign_in_ip, :last_sign_in_ip
  json.url user_url(user, format: :json)
end
