require 'net/ssh'

namespace :thin do
  desc 'остановить thin'
  task stop: :environment do
    numproc = (Rails.env == 'production' ? 2 : 1)
    print "Останавливаю #{numproc} thin..."
    system("bundle exec thin -s #{numproc} -S /tmp/adminka.socket -e #{Rails.env} stop >/dev/null")
    puts "закончил."
  end
  desc "запустить thin"
  task start: :environment do
    puts ENV['SECRET_KEY_BASE']
    numproc = (Rails.env == 'production' ? 2 : 1)
    print "Запускаю #{numproc} thin..."
    system("source ~/.profile && bundle exec thin -s #{numproc} -S /tmp/adminka.socket -e #{Rails.env} start >/dev/null")
    puts "закончил."
  end
end

namespace :db do
  desc "Установить все счётчики ID в актуальное значение"
  task :reset_seq => :environment do
    query = "SELECT  'SELECT SETVAL(' ||quote_literal(quote_ident(S.relname))|| ', MAX(' ||quote_ident(C.attname)|| ') ) FROM ' ||quote_ident(T.relname)|| ';'
FROM pg_class AS S, pg_depend AS D, pg_class AS T, pg_attribute AS C
WHERE S.relkind = 'S'
    AND S.oid = D.objid
    AND D.refobjid = T.oid
    AND D.refobjid = C.attrelid
    AND D.refobjsubid = C.attnum
ORDER BY S.relname;"
     ActiveRecord::Base.connection.execute(query).each{ |s| ActiveRecord::Base.connection.execute(s["?column?"])}
  end

  desc "снимок базы pg_dump"
  task :dump => :environment do
    config   = Rails.configuration.database_configuration
    bdname = config[Rails.env]['database']
    Dir.chdir 'log'
    now = Time.now.strftime("%Y-%m-%d")
    `export PGPASSWORD='#{config[Rails.env]['password']}'; pg_dump -f '#{bdname}.#{now}.sql' -d #{bdname} -U fifa --clean --quote-all-identifiers --serializable-deferrable`
    puts "#{bdname}.#{now}.sql"
  end

  desc 'заливка снимка базы TOTO в локальную базу'
  task :restore => :environment do
    config = Rails.configuration.database_configuration
    bdname = config[Rails.env]['database']
    bduser = config[Rails.env]['username']
    bdpass = config[Rails.env]['password']
    Dir.chdir 'log'
    last_dump = `ssh toto 'cd app/log; ls -l --sort=time toto3*sql |head -n 1'`.split(/\s+/).last
    system "scp toto:app/log/#{last_dump} ."
    puts "Восстанавливаю снимок #{last_dump} в базу #{bdname}. Окружение: #{Rails.env}"
    puts "export PGPASSWORD='#{bdpass}'; /usr/bin/psql -U #{bduser} -d #{bdname} -f #{last_dump}"
    system "export PGPASSWORD='#{bdpass}'; /usr/bin/psql -U #{bduser} -d #{bdname} -f #{last_dump}"
  end
end