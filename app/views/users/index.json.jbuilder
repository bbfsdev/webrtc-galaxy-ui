json.array!(@users) do |user|
  json.extract! user, :id, :name, :addr_id, :role_id
  json.url user_url(user, format: :json)
end
