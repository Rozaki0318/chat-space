class UsersController < ApplicationController

  def index
    @keyword = params[:keyword]
    if @keyword.length > 0
      @users = User.where('name LIKE(?)', "%#{params[:keyword]}%").where.not(id: current_user.id)
    else
      @users = []
    end
    respond_to do |format|
      format.html
      format.json
    end
  end

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path, updated: "アカウントが更新されました"
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
end
