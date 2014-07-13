['Israel', 'Russia', 'Ukraine', 'Kazakhstan', 'Belarus', 'USA', 'Brazil', 'Mexica', 'Germany','Spain'].each do |cn|
  Country.create! name: cn
end

['guest','user','haver','moderator','admin'].each do |role|
  Role.create! name: role
end

admins = Role.find_by(name: 'admin')

admins.users << User.create!(name: 'Амнон Исраэли', email: 'amnonbb@gmail.com', sex: true, password: '12345678', password_confirmation: '12345678')
admins.users << User.create!(name: 'Йозеф Юдилевич', email: 'yosef.yudilevich@gmail.com', sex: true, password: '12345678', password_confirmation: '12345678')
admins.users << User.create!(name: 'Костя Вороницкий', email: 'kolmanv@gmail.com', sex: true, password: '12345678', password_confirmation: '12345678')
admins.users << User.create!(name: 'Guy Atia', email: 'guy.atia@gmail.com', sex: true, password: '12345678', password_confirmation: '12345678')
admins.users << User.create!(name: 'Дима Пекаровский', email: 'dimytch@a.toh.info', sex: true, password: '12345678', password_confirmation: '12345678')
