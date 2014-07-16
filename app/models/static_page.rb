class StaticPage < ActiveRecord::Base
  validates :title, :body, presence: true
  after_validation :make_html_cache

  private
  def make_html_cache
    md = Redcarpet::Markdown.new(Redcarpet::Render::HTML, autolink: true, tables: true, highlight: true, underline: true, lax_spacing: true, autolink: true, fenced_code_blocks: true, tables: true, no_intra_emphasis: true)
    self.html_cache = md.render(self.body)
  end
end
