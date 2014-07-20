require 'test_helper'

class UiPresetsControllerTest < ActionController::TestCase
  setup do
    @ui_preset = ui_presets(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:ui_presets)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create ui_preset" do
    assert_difference('UiPreset.count') do
      post :create, ui_preset: {  }
    end

    assert_redirected_to ui_preset_path(assigns(:ui_preset))
  end

  test "should show ui_preset" do
    get :show, id: @ui_preset
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @ui_preset
    assert_response :success
  end

  test "should update ui_preset" do
    patch :update, id: @ui_preset, ui_preset: {  }
    assert_redirected_to ui_preset_path(assigns(:ui_preset))
  end

  test "should destroy ui_preset" do
    assert_difference('UiPreset.count', -1) do
      delete :destroy, id: @ui_preset
    end

    assert_redirected_to ui_presets_path
  end
end
