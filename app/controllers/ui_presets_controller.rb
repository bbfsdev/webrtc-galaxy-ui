class UiPresetsController < ApplicationController
  before_action :set_ui_preset, only: [:show, :edit, :update, :destroy]

  # GET /ui_presets
  # GET /ui_presets.json
  def index
    @ui_presets = UiPreset.all.order(:name).includes(:users)
    respond_to do |format|
      format.html
      format.json { render json: @ui_presets }
    end
  end

  # GET /ui_presets/1
  # GET /ui_presets/1.json
  def show
  end

  # GET /ui_presets/new
  def new
    @ui_preset = UiPreset.new
  end

  # GET /ui_presets/1/edit
  def edit
  end

  # POST /ui_presets
  # POST /ui_presets.json
  def create
    @ui_preset = UiPreset.new(ui_preset_params)

    respond_to do |format|
      if @ui_preset.save
        format.html { redirect_to @ui_preset, notice: 'Ui preset was successfully created.' }
        format.json { render :show, status: :created, location: @ui_preset }
      else
        format.html { render :new }
        format.json { render json: @ui_preset.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /ui_presets/1
  # PATCH/PUT /ui_presets/1.json
  def update
    respond_to do |format|
      if @ui_preset.update(ui_preset_params)
        format.html { redirect_to @ui_preset, notice: 'Ui preset was successfully updated.' }
        format.json { render :show, status: :ok, location: @ui_preset }
      else
        format.html { render :edit }
        format.json { render json: @ui_preset.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /ui_presets/1
  # DELETE /ui_presets/1.json
  def destroy
    @ui_preset.destroy
    respond_to do |format|
      format.html { redirect_to ui_presets_url, notice: 'Ui preset was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_ui_preset
      @ui_preset = UiPreset.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def ui_preset_params
      params[:ui_preset]
    end
end
