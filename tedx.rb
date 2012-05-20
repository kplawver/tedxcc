class TedX < Sinatra::Base
  @@blog_url = "http://blog.tedxcreativecoast.com"
  @@live = false
  @@is_past = true
  
  # f = File.open("#{settings.public_folder}/index.html")
  # @@index_content = f.read
  # f.close

  set :static_cache_control, [:public, {:max_age => 2592000}]
  
  get '/' do
    @live = @@live
    @is_past = @@is_past
    cache_control :public, :max_age => 24000
    erb :index
  end
  
  get '/*' do
    redirect "#{@@blog_url}#{request.path_info}"
  end
  
  
end