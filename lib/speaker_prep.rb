class SpeakerPrep
  require 'csv'
  require 'yaml'
  
  def self.read_csv
    csv = CSV.read("config/speakers.csv")

    speakers = []

    csv.each do |row|
      out = {}
  
      first_name = row[0].strip
      last_name = row[1].strip
      company = row[2].strip
      description = row[3].strip
      photo = "/images/speakers/2013/#{last_name}#{first_name}.jpg"
      id = "#{last_name.downcase}-#{first_name.downcase}"
  
      speakers << {
        :html_id => id,
        :first_name => first_name,
        :last_name => last_name,
        :company => company,
        :description => description,
        :photo => photo
      }
  
    end

    f = File.open("config/speakers.yml","w+")
    f.puts speakers.to_yaml
    f.close
  end
  
  def self.speaker_html
    menu = <<-EOS
    
    EOS
    
    html = <<-EOS
      <div class="speaker-bios" id="laura-spears-bio">
      	<a href="#laura-spears-bio" class="modal-close">X</a>
      	<div class="bio">
      		<ul class="speaker-name-sub">
      			<li class="speaker-name">Laura Spears</li>
      			<!-- <li class="speaker-sub">Creative Coast</li> -->
      		</ul>
      		<p class="speaker-bio">A native of Alabama, Laura Spears recently transferred to SCAD to major in Performing Arts.  A lifelong performer, Laura yearns to give those with no voice an outlet for expressing their struggles, triumphs, and everything in between. Her goal is to never stop exploring the many facets of performance.</p>
      	</div>
      	<div class="speaking-on">
      		<p class="speaking-on-title">Musical Performance</p>
      		<p class="speaking-on-excerpt">Laura will be performing with Lana Scott.</p>
      		<!-- <a class="readmore" href="#">Read more &#8594;</a> -->
      	</div>
      </div>
    EOS
  end
  
end