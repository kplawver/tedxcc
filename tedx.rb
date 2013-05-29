require 'yaml'

class TedX < Sinatra::Base
  @@blog_url = "http://blog.tedxcreativecoast.com"
  @@live = false
  @@is_past = false
  @@sold_out = true
  
  # f = File.open("#{settings.public_folder}/index.html")
  # @@index_content = f.read
  # f.close

  set :static_cache_control, [:public, {:max_age => 2592000}]
  
  get '/' do
    @speakers = @@speakers ||= YAML.load(File.read("config/speakers.yml"))
    @live = @@live
    @is_past = @@is_past
    @sold_out = @@sold_out
    cache_control :public, :max_age => 24000
    erb :index
  end
  
  get '/*' do
    redirect "#{@@blog_url}#{request.path_info}"
  end
  
  
end