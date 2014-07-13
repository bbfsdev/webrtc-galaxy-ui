require 'test_helper'

class AddrsControllerTest < ActionController::TestCase
  setup do
    @addr = addrs(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:addrs)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create addr" do
    assert_difference('Addr.count') do
      post :create, addr: { city_id: @addr.city_id, contacts: @addr.contacts, country_id: @addr.country_id, local: @addr.local }
    end

    assert_redirected_to addr_path(assigns(:addr))
  end

  test "should show addr" do
    get :show, id: @addr
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @addr
    assert_response :success
  end

  test "should update addr" do
    patch :update, id: @addr, addr: { city_id: @addr.city_id, contacts: @addr.contacts, country_id: @addr.country_id, local: @addr.local }
    assert_redirected_to addr_path(assigns(:addr))
  end

  test "should destroy addr" do
    assert_difference('Addr.count', -1) do
      delete :destroy, id: @addr
    end

    assert_redirected_to addrs_path
  end
end
