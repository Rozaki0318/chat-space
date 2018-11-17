json.array! @new_messages do |message|
  json.content      message.content
  json.id           message.id
  json.user_name         message.user.name
  json.image        message.image.url
  json.created_at         message.created_at.to_s(:datetime)
end
