json.array!(@rooms) do |room|
  json.extract! room, :id, :name, :attrs
  json.url room_url(room, format: :json)
end
