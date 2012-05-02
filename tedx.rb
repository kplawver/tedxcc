class TedX < Sinatra::Base
  @@blog_url = "http://blog.tedxcreativecoast.com"
  
  f = File.open("#{settings.public_folder}/index.html")
  @@index_content = f.read
  f.close

  set :static_cache_control, [:public, :max_age => 2592000]
  
  get '/' do
    cache_control :public, :max_age => 24000
    body @@index_content
  end
  
  get '/*' do
    redirect "#{@@blog_url}#{request.path_info}"
  end
  
  
end