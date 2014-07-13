class AddrsController < ApplicationController
  before_action :set_addr, only: [:show, :edit, :update, :destroy]

  # GET /addrs
  # GET /addrs.json
  def index
    @addrs = Addr.all
  end

  # GET /addrs/1
  # GET /addrs/1.json
  def show
  end

  # GET /addrs/new
  def new
    @addr = Addr.new
  end

  # GET /addrs/1/edit
  def edit
  end

  # POST /addrs
  # POST /addrs.json
  def create
    @addr = Addr.new(addr_params)

    respond_to do |format|
      if @addr.save
        format.html { redirect_to @addr, notice: 'Addr was successfully created.' }
        format.json { render :show, status: :created, location: @addr }
      else
        format.html { render :new }
        format.json { render json: @addr.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /addrs/1
  # PATCH/PUT /addrs/1.json
  def update
    respond_to do |format|
      if @addr.update(addr_params)
        format.html { redirect_to @addr, notice: 'Addr was successfully updated.' }
        format.json { render :show, status: :ok, location: @addr }
      else
        format.html { render :edit }
        format.json { render json: @addr.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /addrs/1
  # DELETE /addrs/1.json
  def destroy
    @addr.destroy
    respond_to do |format|
      format.html { redirect_to addrs_url, notice: 'Addr was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_addr
      @addr = Addr.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def addr_params
      params.require(:addr).permit(:country_id, :city_id, :local, :contacts)
    end
end
