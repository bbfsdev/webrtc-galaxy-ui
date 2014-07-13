json.array!(@addrs) do |addr|
  json.extract! addr, :id, :country_id, :city_id, :local, :contacts
  json.url addr_url(addr, format: :json)
end
